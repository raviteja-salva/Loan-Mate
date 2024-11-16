import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/AuthStyles';
import { signupUser } from '../../services/apiService';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    isLender: false,
    isBorrower: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.isLender && !formData.isBorrower) {
      setError('Please select at least one role (Lender or Borrower)');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      await signupUser(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.PageContainer>
      <S.IntroSection>
        <S.IntroTitle>Join LoanMate Today</S.IntroTitle>
        <S.IntroSubtitle>
          Start your journey with LoanMate and experience a new way of loan management. Whether you're a lender or borrower, we've got you covered.
        </S.IntroSubtitle>
        <S.FeatureList>
          <S.FeatureItem index={0}>Create custom loan listings</S.FeatureItem>
          <S.FeatureItem index={1}>Track your loans in real-time</S.FeatureItem>
          <S.FeatureItem index={2}>Manage multiple roles efficiently</S.FeatureItem>
          <S.FeatureItem index={3}>Secure and transparent process</S.FeatureItem>
        </S.FeatureList>
      </S.IntroSection>
      
      <S.FormSection>
        <S.Form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Create Your Account</h2>
          {error && <S.Error>{error}</S.Error>}
          
          <S.InputGroup>
            <S.Input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </S.InputGroup>
          
          <S.InputGroup>
            <S.Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </S.InputGroup>
          
          <S.InputGroup>
            <S.Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </S.InputGroup>
          
          <S.InputGroup>
            <S.Input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </S.InputGroup>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
              <input
                type="checkbox"
                name="isLender"
                checked={formData.isLender}
                onChange={handleChange}
                style={{ marginRight: '0.5rem' }}
              />
              I want to be a Lender
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                name="isBorrower"
                checked={formData.isBorrower}
                onChange={handleChange}
                style={{ marginRight: '0.5rem' }}
              />
              I want to be a Borrower
            </label>
          </div>
          
          <S.Button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </S.Button>
          
          <S.LinkContainer>
                <span>Already have an account?</span>
                <S.Link 
                    href="#" 
                    onClick={(e) => { 
                    e.preventDefault(); 
                    navigate('/login'); 
                    }}
                >
                    Login
                </S.Link>
              </S.LinkContainer>
        </S.Form>
      </S.FormSection>
    </S.PageContainer>
  );
};

export default Signup;