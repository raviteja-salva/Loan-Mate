const Loan = require('../model/Loan');
const mongoose = require('mongoose');
const User = require('../model/User');

class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filter() {
      
      const queryObj = { ...this.queryString };
      const excludedFields = ['page', 'sort', 'limit', 'fields', 'search'];
      excludedFields.forEach(el => delete queryObj[el]);
  
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
      
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
    }
  
    search() {
      if (this.queryString.search) {
        const searchQuery = {
          $or: [
            { purpose: { $regex: this.queryString.search, $options: 'i' } },
            { status: { $regex: this.queryString.search, $options: 'i' } }
          ]
        };
        this.query = this.query.find(searchQuery);
      }
      return this;
    }
  
    sort() {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }
      return this;
    }
  
    limitFields() {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v');
      }
      return this;
    }
  
    paginate() {
      const page = parseInt(this.queryString.page, 10) || 1;
      const limit = parseInt(this.queryString.limit, 10) || 10;
      const skip = (page - 1) * limit;
  
      this.query = this.query.skip(skip).limit(limit);
      return this;
    }
}

exports.createLoanOffer = async (req, res) => {
    try {
      const user = await User.findById(req.user._id);
      if (user.wallet.balance < req.body.principalAmount) {
        return res.status(400).json({
          status: 'error',
          message: 'Insufficient wallet balance to offer this loan'
        });
      }
  
      const loan = await Loan.create({
        ...req.body,
        lender: req.user._id
      });
  
      user.wallet.balance -= loan.principalAmount;
      await user.save({ validateModifiedOnly: true }); 
  
      res.status(201).json({
        status: 'success',
        data: { loan }
      });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
};
  

exports.applyForLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({
        status: 'error',
        message: 'Loan not found'
      });
    }

    if (loan.status !== 'pending') {
      return res.status(400).json({
        status: 'error',
        message: 'This loan is no longer available'
      });
    }

    if (loan.lender.toString() === req.user._id.toString()) {
      return res.status(400).json({
        status: 'error',
        message: 'You cannot apply for your own loan offer'
      });
    }

    loan.borrower = req.user._id;
    loan.status = 'waiting_approval';
    await loan.save();

    res.status(200).json({
      status: 'success',
      data: { loan }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.approveLoan = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan || loan.lender.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        status: 'error',
        message: 'Loan not found or unauthorized'
      });
    }

    if (loan.status !== 'waiting_approval') {
      return res.status(400).json({
        status: 'error',
        message: 'Loan is not in waiting approval status'
      });
    }

    const borrower = await User.findById(loan.borrower);
    borrower.wallet.balance += loan.principalAmount;
    await borrower.save({ validateModifiedOnly: true });

    loan.status = 'approved';
    loan.approvedAt = Date.now();
    await loan.save();

    res.status(200).json({
      status: 'success',
      data: { loan }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getUserLoans = async (req, res) => {
  try {
    const givenLoans = await Loan.find({ lender: req.user._id })
      .populate('borrower', 'name email');
    
    const takenLoans = await Loan.find({ borrower: req.user._id })
      .populate('lender', 'name email');

    const user = await User.findById(req.user._id);

    res.status(200).json({
      status: 'success',
      data: {
        givenLoans,
        takenLoans,
        wallet: {
          balance: user.wallet.balance,
          totalInterestEarned: user.wallet.totalInterestEarned,
          totalInterestPaid: user.wallet.totalInterestPaid
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getGivenLoans = async (req, res) => {
  try {
    const features = new APIFeatures(
      Loan.find({ lender: req.user._id }).populate('borrower', 'name email'),
      req.query
    )
      .search(['borrower.name', 'borrower.email'])
      .sort()
      .limitFields()
      .paginate();

    const loans = await features.query;
    const totalCount = await Loan.countDocuments({ lender: req.user._id });

    const user = await User.findById(req.user._id);

    res.status(200).json({
      status: 'success',
      results: loans.length,
      totalPages: Math.ceil(totalCount / (req.query.limit || 10)),
      currentPage: parseInt(req.query.page) || 1,
      data: {
        loans,
        wallet: {
          balance: user.wallet.balance,
          totalInterestEarned: user.wallet.totalInterestEarned
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get Taken Loans
exports.getTakenLoans = async (req, res) => {
  try {
    const features = new APIFeatures(
      Loan.find({ borrower: req.user._id }).populate('lender', 'name email'),
      req.query
    )
      .search(['lender.name', 'lender.email'])
      .sort()
      .limitFields()
      .paginate();

    const loans = await features.query;
    const totalCount = await Loan.countDocuments({ borrower: req.user._id });

    const user = await User.findById(req.user._id);

    res.status(200).json({
      status: 'success',
      results: loans.length,
      totalPages: Math.ceil(totalCount / (req.query.limit || 10)),
      currentPage: parseInt(req.query.page) || 1,
      data: {
        loans,
        wallet: {
          balance: user.wallet.balance,
          totalInterestPaid: user.wallet.totalInterestPaid
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};



// Get all published loans with filters, pagination, and search
exports.getLoans = async (req, res) => {
  try {
    const features = new APIFeatures(Loan.find(), req.query)
      .filter()
      .search()
      .sort()
      .limitFields()
      .paginate();

    const loans = await features.query.populate({
      path: 'lender',
      select: 'name email'
    });

    const totalLoans = await Loan.countDocuments(features.query._conditions);
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const totalPages = Math.ceil(totalLoans / limit);

    res.status(200).json({
      status: 'success',
      results: loans.length,
      pagination: {
        currentPage: page,
        totalPages,
        totalResults: totalLoans,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      data: {
        loans
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Get loan details by ID
exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate({
      path: 'lender',
      select: 'name email'
    });

    if (!loan) {
      return res.status(404).json({
        status: 'error',
        message: 'Loan not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        loan
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

// Update loan route to include status validation
exports.updateLoanStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid loan status'
      });
    }

    const loan = await Loan.findById(req.params.id);
    
    if (!loan) {
      return res.status(404).json({
        status: 'error',
        message: 'Loan not found'
      });
    }

    if (loan.lender.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: 'error',
        message: 'You are not authorized to update this loan'
      });
    }

    loan.status = status;
    await loan.save();

    res.status(200).json({
      status: 'success',
      data: {
        loan
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getUserStats = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'User not found'
      });
    }

    const loansAsLender = await Loan.find({ lender: userId });
    const loansAsBorrower = await Loan.find({ borrower: userId });

    const lendingStats = {
      totalLoansGiven: loansAsLender.length,
      activeLoanCount: loansAsLender.filter(loan => loan.status === 'approved').length,
      totalAmountLent: loansAsLender.reduce((sum, loan) => sum + loan.principalAmount, 0),
      totalInterestEarned: user.wallet.totalInterestEarned
    };

    
    const borrowingStats = {
      totalLoansTaken: loansAsBorrower.length,
      activeLoans: loansAsBorrower.filter(loan => loan.status === 'approved').length,
      totalAmountBorrowed: loansAsBorrower.reduce((sum, loan) => sum + loan.principalAmount, 0),
      totalInterestPaid: user.wallet.totalInterestPaid
    };

  
    const walletStats = {
      currentBalance: user.wallet.balance,
      totalInterestEarned: user.wallet.totalInterestEarned,
      totalInterestPaid: user.wallet.totalInterestPaid
    };

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          isLender: user.isLender,
          isBorrower: user.isBorrower,
          createdAt: user.createdAt
        },
        stats: {
          lending: lendingStats,
          borrowing: borrowingStats,
          wallet: walletStats
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.payLoan = async (req, res) => {
  try {
   
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const loan = await Loan.findById(req.params.id).populate('lender');
      
     
      if (!loan) {
        throw new Error('Loan not found');
      }
      if (loan.borrower.toString() !== req.user._id.toString()) {
        throw new Error('You are not authorized to pay this loan');
      }

      if (loan.status !== 'approved') {
        throw new Error('Loan is not in approved status');
      }

      const borrower = await User.findById(req.user._id).session(session);
      
      if (borrower.wallet.balance < loan.totalAmount) {
        throw new Error('Insufficient wallet balance to pay the loan');
      }

    
      const lender = await User.findById(loan.lender).session(session);

      const interestAmount = loan.totalAmount - loan.principalAmount;

      borrower.wallet.balance -= loan.totalAmount;
      borrower.wallet.totalInterestPaid += interestAmount;
      await borrower.save({ session, validateModifiedOnly: true });

      lender.wallet.balance += loan.totalAmount;
      lender.wallet.totalInterestEarned += interestAmount;
      await lender.save({ session, validateModifiedOnly: true });

      loan.status = 'completed';
      loan.completedAt = Date.now();
      await loan.save({ session, validateModifiedOnly: true });

      await session.commitTransaction();

      res.status(200).json({
        status: 'success',
        message: 'Loan payment successful',
        data: {
          loan,
          borrowerBalance: borrower.wallet.balance,
          totalInterestPaid: borrower.wallet.totalInterestPaid
        }
      });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};