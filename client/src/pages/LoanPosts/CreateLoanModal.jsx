import React from 'react';
import { X, Loader } from 'lucide-react';
import * as S from './LoanPosts.Style';

const CreateLoanModal = ({ 
  showModal, 
  onClose, 
  formData, 
  onInputChange, 
  onSubmit, 
  isSubmitting 
}) => {
  if (!showModal) return null;

  return (
    <S.Modal>
      <S.ModalContent>
        <S.CloseButton onClick={onClose}>
          <X size={20} />
        </S.CloseButton>
        <h2 className="text-xl font-semibold mb-4">Create New Loan Post</h2>
        <S.Form onSubmit={onSubmit}>
          <S.FormGroup>
            <S.Label>Principal Amount ($)</S.Label>
            <S.Input
              type="number"
              name="principalAmount"
              value={formData.principalAmount}
              onChange={onInputChange}
              required
              min="0"
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Interest Rate (%)</S.Label>
            <S.Input
              type="number"
              name="interestRate"
              value={formData.interestRate}
              onChange={onInputChange}
              required
              min="0"
              step="0.1"
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Duration (months)</S.Label>
            <S.Input
              type="number"
              name="maxDuration"
              value={formData.maxDuration}
              onChange={onInputChange}
              required
              min="1"
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Purpose</S.Label>
            <S.TextArea
              name="purpose"
              value={formData.purpose}
              onChange={onInputChange}
              required
            />
          </S.FormGroup>
          <S.SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader className="animate-spin" size={16} />
                Creating...
              </>
            ) : (
              'Create Loan Post'
            )}
          </S.SubmitButton>
        </S.Form>
      </S.ModalContent>
    </S.Modal>
  );
};

export default CreateLoanModal;