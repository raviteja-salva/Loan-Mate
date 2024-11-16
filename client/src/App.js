import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import LoanPosts from './pages/LoanPosts/LoanPosts';
import LoanApprovalPage from './pages/LoanApproval/LoanApproval';
import LoansGiven from './pages/LoansGiven/LoansGiven';
import LoansTaken from './pages/LoansTaken/LoansTaken';
import InterestCalculater from './pages/InterestCalculater/InterestCalculater';
import './App.css';


const Calculator = () => <h1>LoanPosts</h1>;


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes with Layout */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/loan-posts" element={
          <ProtectedRoute>
            <Layout>
              <LoanPosts />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/loans-given" element={
          <ProtectedRoute>
            <Layout>
              <LoansGiven />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/loans-taken" element={
          <ProtectedRoute>
            <Layout>
              <LoansTaken />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/calculator" element={
          <ProtectedRoute>
            <Layout>
              <InterestCalculater />
            </Layout>
          </ProtectedRoute>
        } />
        <Route path="/loan-approve" element={
          <ProtectedRoute>
            <Layout>
              <LoanApprovalPage />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
