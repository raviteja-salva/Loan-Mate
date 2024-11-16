# LoanMate - Loan Management System

## Overview

LoanMate is a comprehensive loan management platform that connects lenders and borrowers. It provides a streamlined interface for posting loans, managing applications, and tracking loan status. The platform features mock payment implementations for demonstration purposes.

## 🌟 Key Features

- **Public Loan Postings**: Users can create and browse loan offerings with customizable interest rates and durations
- **Smart Dashboard**: Separate interfaces for managing loans given and taken, with data visualization
- **Interest Calculator**: Simple interest calculation tool
- **Real-time Notifications**: Instant alerts for loan approval/rejection
- **Mock Wallet System**: Simulated payment system for demonstration
- **Search & Filter**: Advanced filtering options for loan management

## 🚀 Live Demo

Experience LoanMate without installation:
- **URL**: [https://loan-mate.vercel.app/](https://loan-mate.vercel.app/)
- **Demo Credits**: New users receive 100,000 in mock currency upon signup

## 🛠 Installation & Setup

### Prerequisites
- Node.js
- MongoDB
- npm or yarn

### Local Development Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/loanmate.git
cd loanmate
```

2. Frontend Setup
```bash
cd client
npm install
npm start
# Access frontend at http://localhost:3000
```

3. Backend Setup
```bash
cd server
npm install
nodemon server.js
# Server runs on http://localhost:5000
```

## 💻 Tech Stack

### Core Technologies
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

### Additional Libraries & Tools
- **Authentication**: JWT
- **UI Components**: 
  - Lucide React
  - React Icons
  - Styled Components
- **Data Visualization**: Recharts
- **Deployment**: Vercel

## 🎯 Features In Detail

### User Authentication
- Secure signup/login system
- JWT-based authentication
- Initial mock credit allocation

### Dashboard Features
- Interactive analytics and statistics
- Intuitive navigation with header and sidebar
- Real-time wallet balance tracking

### Loan Management
1. **Loan Posts**
   - Create loan offerings
   - Browse available loans
   - Apply for loans
   - Status tracking

2. **Loans Taken**
   - View borrowed loans
   - Track payment status
   - Make mock payments

3. **Loans Given**
   - Monitor lending portfolio
   - Approve/reject applications
   - Track repayments

### Additional Tools
- **Interest Calculator**
  - Simple interest calculation
  - Customizable parameters:
    - Principal amount
    - Interest rate
    - Duration

### Utility Features
- Advanced search functionality
- Multi-parameter filtering
- Real-time notifications
- Responsive design

## 🧪 Testing

To test the complete functionality:
1. Create two separate accounts
2. Use one account to post a loan
3. Switch to the second account to apply
4. Test approval/rejection process
5. Verify mock payment system

## 📝 Note

* This project uses mock payment implementations and does not involve real currency transactions. All monetary values and transactions are simulated for demonstration purposes.
* Due to the limitations of Render's free-tier deployment, API responses may take longer than usual. We appreciate your patience while using this website.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ by Raviteja
