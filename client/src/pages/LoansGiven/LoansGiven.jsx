import React, { useState, useEffect } from 'react';
import { fetchGivenLoans } from '../../services/apiService';
import { ToastContainer, toast } from 'react-toastify';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import 'react-toastify/dist/ReactToastify.css';
import {  
  Users, 
  Search,
  AlertCircle 
} from 'lucide-react';
import {StatusBadge, EmptyState, Td, Th, Tr, SearchContainer, SearchInput, SearchIcon, TableContainer, Table, Container, LoadingSpinner, DashboardHeader} from './LoansGiven.Style';


const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const LoansGiven = () => {
  const [loansData, setLoansData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadLoans = async () => {
      try {
        const response = await fetchGivenLoans();
        setLoansData(response.data);
        setLoading(false);
        toast.success('Loans data loaded successfully!');
      } catch (err) {
        setLoading(false);
        toast.error('Failed to load loans data');
      }
    };
    loadLoans();
  }, []);

  const filteredLoans = loansData?.loans?.filter(loan => 
    loan.borrower?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <LoadingOverlay />
    );
  }

  if (!loansData) {
    return (
      <Container>
        <EmptyState>
          <AlertCircle />
          <p>No data available at the moment</p>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
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
        theme="colored"
      />

      <DashboardHeader>
        <SearchContainer>
          <SearchIcon size={20} />
          <SearchInput 
            type="text"
            placeholder="Search by borrower name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </DashboardHeader>

      <TableContainer>
        {filteredLoans && filteredLoans.length > 0 ? (
          <Table>
            <thead>
              <tr>
                <Th>Borrower Name</Th>
                <Th>Principal Amount</Th>
                <Th>Total Amount</Th>
                <Th>Duration (months)</Th>
                <Th>Interest Rate</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => (
                <Tr key={loan._id}>
                  <Td>{loan.borrower?.name}</Td>
                  <Td>{formatCurrency(loan.principalAmount)}</Td>
                  <Td>{formatCurrency(loan.totalAmount)}</Td>
                  <Td>{loan.duration}</Td>
                  <Td>{loan.interestRate}%</Td>
                  <Td>
                    <StatusBadge status={loan.status}>
                      {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                    </StatusBadge>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState>
            <Users size={64} />
            <p>{searchTerm ? 'No loans found matching your search' : 'No loans available'}</p>
          </EmptyState>
        )}
      </TableContainer>
    </Container>
  );
};

export default LoansGiven;
