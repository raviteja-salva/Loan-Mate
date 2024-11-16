const express = require('express');
const loanController = require('../controllers/loanController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', loanController.getLoans);
router.get('/:id', loanController.getLoanById);

// Protected routes
router.use(authMiddleware.protect);

// User loan management
router.get('/user/loans', loanController.getUserLoans);
router.get('/user/given-loans', loanController.getGivenLoans);
router.get('/user/taken-loans', loanController.getTakenLoans);
router.post('/offers', loanController.createLoanOffer);
router.post('/apply/:id', loanController.applyForLoan);
router.patch('/:id/approve', loanController.approveLoan);
router.patch('/:id/status', loanController.updateLoanStatus);
router.get('/stats/:userId',  loanController.getUserStats);
router.post('/:id/pay', loanController.payLoan);


module.exports = router;