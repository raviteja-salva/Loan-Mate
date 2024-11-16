import React, { useState, useEffect } from 'react';
import { fetchTakenLoans, payLoan } from '../../services/apiService';
import { toast } from 'react-toastify';
import {
  Container,
  DashboardHeader,
  PayButton,
  SearchContainer,
  SearchInput,
  SearchIcon,
  TableContainer,
  Table,
  Th,
  Td,
  Tr,
  StatusBadge,
  LoadingSpinner,
  EmptyState,
} from '../LoansGiven/LoansGiven.Style';

const LoanTaken = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLoans, setFilteredLoans] = useState([]);

  const fetchLoans = async () => {
    try {
      const response = await fetchTakenLoans();
      setLoans(response.data.loans);
      setFilteredLoans(response.data.loans);
    } catch (error) {
      toast.error('Failed to fetch loans. Please try again later.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Error fetching loans:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  useEffect(() => {
    const filtered = loans.filter((loan) =>
      loan.lender.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLoans(filtered);
  }, [searchTerm, loans]);

  const handlePayment = async (loanId) => {
    try {
      await payLoan(loanId);
      await fetchLoans();
      toast.success('Payment processed successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error('Failed to process payment. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Payment error:', error);
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container>
      <DashboardHeader>
        <SearchContainer>
          <SearchIcon size={20} />
          <SearchInput
            type="text"
            placeholder="Search by lender name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </DashboardHeader>

      <TableContainer>
        <Table>
          <thead>
            <Tr>
              <Th>LENDER NAME</Th>
              <Th>PRINCIPAL AMOUNT</Th>
              <Th>TOTAL AMOUNT</Th>
              <Th>DURATION</Th>
              <Th>INTEREST RATE</Th>
              <Th>STATUS</Th>
              <Th>ACTION</Th>
            </Tr>
          </thead>
          <tbody>
            {filteredLoans.map((loan) => (
              <Tr key={loan._id}>
                <Td>{loan.lender.name.toUpperCase()}</Td>
                <Td>₹{loan.principalAmount.toLocaleString()}</Td>
                <Td>₹{loan.totalAmount.toLocaleString()}</Td>
                <Td>{loan.duration} months</Td>
                <Td>{loan.interestRate}%</Td>
                <Td>
                  <StatusBadge status={loan.status}>
                    {loan.status.toUpperCase()}
                  </StatusBadge>
                </Td>
                <Td>
                  {loan.status === 'approved' && (
                    <PayButton onClick={() => handlePayment(loan._id)}>
                      PAY
                    </PayButton>
                  )}
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
        {filteredLoans.length === 0 && (
          <EmptyState>
            <p>No loans found matching your search.</p>
          </EmptyState>
        )}
      </TableContainer>
    </Container>
  );
};

export default LoanTaken;