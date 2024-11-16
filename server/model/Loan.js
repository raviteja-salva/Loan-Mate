const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
    lender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    borrower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    principalAmount: {
      type: Number,
      required: [true, 'Principal amount is required'],
      min: [100, 'Principal amount must be at least 100']
    },
    interestRate: {
      type: Number,
      required: [true, 'Interest rate is required'],
      min: [0, 'Interest rate cannot be negative'],
      max: [100, 'Interest rate cannot exceed 100%']
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [1, 'Duration must be at least 1 month']
    },
    status: {
      type: String,
      enum: ['pending', 'waiting_approval', 'approved', 'rejected', 'completed'],
      default: 'pending'
    },
    purpose: {
      type: String,
      required: [true, 'Loan purpose is required'],
      minlength: [10, 'Purpose must be at least 10 characters'],
      maxlength: [500, 'Purpose cannot exceed 500 characters']
    },
    totalAmount: {
      type: Number,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    approvedAt: Date,
    completedAt: Date
  });
  
  loanSchema.pre('save', function(next) {
    if (!this.totalAmount) {
      const interest = (this.principalAmount * this.interestRate * this.duration) / (12 * 100);
      this.totalAmount = this.principalAmount + interest;
    }
    next();
  });

module.exports = mongoose.model('Loan', loanSchema);
