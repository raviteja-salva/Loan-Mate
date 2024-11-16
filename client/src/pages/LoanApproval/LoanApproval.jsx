import React, { useEffect, useState } from 'react';
import { fetchUserLoans, updateLoanStatus, approveLoan } from '../../services/apiService';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DetailLabel, ActionButtons, Button, DetailRow, DetailValue, LoanCard, LoanHeader, Amount, StatusBadge, LoanDetails, LoanGrid, LoadingSpinner,PageContainer, EmptyState } from './LoanApproval.Style';

const LoanApprovalPage = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const userToken = localStorage.getItem('token');

  useEffect(() => {
    const getLoans = async () => {
      try {
        const userLoans = await fetchUserLoans(userToken);
        setLoans(userLoans);
        setLoading(false);
      } catch (err) {
        toast.error('Failed to load loans. Please try again.');
        setLoading(false);
      }
    };

    getLoans();
  }, [userToken]);

  const handleAction = async (loanId, action) => {
    try {
      if (action === 'approved') {
        await approveLoan(loanId);
      }
      const updatedLoan = await updateLoanStatus(loanId, action, userToken);
      setLoans((prev) =>
        prev.map((loan) => (loan._id === loanId ? { ...loan, status: updatedLoan.status } : loan))
      );
      toast.success(`Loan ${action} successfully!`);
    } catch (err) {
      toast.error(`Failed to update loan: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingOverlay />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      
      {loans.length === 0 ? (
        <EmptyState>
          <h3>No Loans Available</h3>
          <p>There are currently no loans waiting for approval. New loan applications will appear here when they're submitted.</p>
        </EmptyState>
      ) : (
        <LoanGrid>
          {loans.map((loan, index) => (
            <LoanCard key={loan._id} $index={index}>
              <LoanHeader>
                <Amount>
                ₹{loan.principalAmount.toLocaleString()}
                  <span>INR</span>
                </Amount>
                <StatusBadge $status={loan.status}>
                  {loan.status.replace('_', ' ')}
                </StatusBadge>
              </LoanHeader>

              <LoanDetails>
                <DetailRow>
                  <DetailLabel>Purpose</DetailLabel>
                  <DetailValue>{loan.purpose}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Borrower</DetailLabel>
                  <DetailValue>{loan.borrower?.name || 'N/A'}</DetailValue>
                </DetailRow>
                <DetailRow>
                  <DetailLabel>Application ID</DetailLabel>
                  <DetailValue>{loan._id.slice(0, 8).toUpperCase()}</DetailValue>
                </DetailRow>
              </LoanDetails>

              {loan.status === 'waiting_approval' && (
                <ActionButtons>
                  <Button
                    className="approve"
                    onClick={() => handleAction(loan._id, 'approved')}
                  >
                    Approve Loan
                  </Button>
                  <Button
                    className="reject"
                    onClick={() => handleAction(loan._id, 'rejected')}
                  >
                    Reject
                  </Button>
                </ActionButtons>
              )}
            </LoanCard>
          ))}
        </LoanGrid>
      )}
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </PageContainer>
  );
};

export default LoanApprovalPage;
