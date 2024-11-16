const jwt = require('jsonwebtoken');
const User = require('../model/User');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '24h'
  });
};

const handleDuplicateKeyError = (error) => {
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    return `An account with this ${field} already exists.`;
  }
  return error.message;
};

exports.signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already registered. Please use a different email or login.'
      });
    }

   
    const user = await User.create({
      name: req.body.name,
      email: req.body.email.toLowerCase(), 
      password: req.body.password,
      phoneNumber: req.body.phoneNumber,
      isLender: req.body.isLender || true,
      isBorrower: req.body.isBorrower || true
    });

    const token = signToken(user._id);

    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      isLender: user.isLender,
      isBorrower: user.isBorrower
    };

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: userResponse
      }
    });
  } catch (error) {
    const errorMessage = handleDuplicateKeyError(error);
    res.status(400).json({
      status: 'error',
      message: errorMessage,
      errorCode: error.code || 'UNKNOWN_ERROR'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

   
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide both email and password'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'No account found with this email'
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect password'
      });
    }

    
    const token = signToken(user._id);

   
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      isLender: user.isLender,
      isBorrower: user.isBorrower
    };

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: userResponse
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
      errorCode: error.code || 'UNKNOWN_ERROR'
    });
  }
};

