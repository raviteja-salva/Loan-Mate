import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as S from './LoanPosts.Style';
import { loanService } from '../../services/apiService';
import SearchBar from '../../components/Searchbar/Searchbar';
import Filters from '../../components/Filters/Filters';
import LoanCard from '../LoanCard/LoanCard';
import CreateLoanModal from './CreateLoanModal';
import Pagination from '../../components/Pagination/Pagination';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';

const LoanPosts = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    hasNextPage: false,
    hasPrevPage: false
  });
  const [activeFilter, setActiveFilter] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    principalAmount: '',
    interestRate: '',
    maxDuration: '',
    purpose: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchLoans();
  }, [search, currentPage, activeFilter]);

  const fetchLoans = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 8,
        ...(search && { search }),
        ...(activeFilter && { sort: activeFilter })
      };

      const response = await loanService.getLoans(params);
      setLoans(response.data.loans);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Failed to fetch loans');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (loanId) => {
    try {
      setIsSubmitting(true);
      await loanService.applyForLoan(loanId);
      toast.success('Successfully applied for loan');
      fetchLoans();
    } catch (error) {
      toast.error(error.message || 'Failed to apply for loan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateLoan = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await loanService.createLoan(formData);
      toast.success('Loan post created successfully');
      setShowCreateModal(false);
      setFormData({
        principalAmount: '',
        interestRate: '',
        maxDuration: '',
        purpose: ''
      });
      fetchLoans();
    } catch (error) {
      toast.error(error.message || 'Failed to create loan post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <S.ContentWrapper>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <S.Header>
        <SearchBar search={search} setSearch={setSearch} />
        <S.CreateButton onClick={() => setShowCreateModal(true)}>
          <Plus size={20} />
          Create Loan Post
        </S.CreateButton>
      </S.Header>

      <Filters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

      <S.CardsGrid>
        {loans.map((loan) => (
          <LoanCard
            key={loan._id}
            loan={loan}
            user={user}
            onApply={handleApply}
          />
        ))}
      </S.CardsGrid>

      <CreateLoanModal
        showModal={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleCreateLoan}
        isSubmitting={isSubmitting}
      />

      <Pagination
        pagination={pagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {(loading || isSubmitting) && <LoadingOverlay />}
    </S.ContentWrapper>
  );
};

export default LoanPosts;