import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../../styles/AuthStyles';
import { loginUser } from '../../services/apiService';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginUser(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.PageContainer>
      <S.IntroSection>
        <S.IntroTitle>Welcome to LoanMate</S.IntroTitle>
        <S.IntroSubtitle>
          Your trusted platform for seamless loan management and connections between lenders and borrowers.
        </S.IntroSubtitle>
        <S.FeatureList>
          <S.FeatureItem index={0}>Post and discover loan opportunities</S.FeatureItem>
          <S.FeatureItem index={1}>Simple interest calculation</S.FeatureItem>
          <S.FeatureItem index={2}>Real-time notifications</S.FeatureItem>
          <S.FeatureItem index={3}>Secure transaction management</S.FeatureItem>
        </S.FeatureList>
      </S.IntroSection>
      
      <S.FormSection>
        <S.Form onSubmit={handleSubmit}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Login to Your Account</h2>
          {error && <S.Error>{error}</S.Error>}
          
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
          
          <S.Button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </S.Button>
          
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <span>Don't have an account? </span>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigate('/signup'); }}
              style={{ color: '#3e92cc', textDecoration: 'none' }}
            >
              Sign up
            </a>
          </div>
        </S.Form>
      </S.FormSection>
    </S.PageContainer>
  );
};

export default Login;