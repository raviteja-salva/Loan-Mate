import React, { useState } from 'react';
import { FaCalculator, FaCalendarAlt, FaPercent, FaDollarSign, FaRupeeSign } from 'react-icons/fa';
import {ResultCard, ResultLabel, ResultValue, InputGroup, Input, Button, ResultsContainer, Container, Card, Title, Form} from './InterestCalculater.Style';

const InterestCalculator = () => {
  const [formData, setFormData] = useState({
    principal: '',
    rate: '',
    fromDate: '',
    toDate: new Date().toISOString().split('T')[0]
  });

  const [result, setResult] = useState(null);

  const calculateInterest = (e) => {
    e.preventDefault();
    
    const principal = parseFloat(formData.principal);
    const rate = parseFloat(formData.rate);
    const fromDate = new Date(formData.fromDate);
    const toDate = new Date(formData.toDate);
    
    const durationInDays = (toDate - fromDate) / (1000 * 60 * 60 * 24);
    const durationInYears = durationInDays / 365;
    
    const totalAmount = principal * Math.pow((1 + rate / 100), durationInYears);
    const interestEarned = totalAmount - principal;
    
    setResult({
      durationInDays,
      durationInYears,
      totalAmount,
      interestEarned
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container>
      <Card>
        <Title>Interest Calculator</Title>
        <Form onSubmit={calculateInterest}>
          <InputGroup>
            <FaRupeeSign />
            <Input
              type="number"
              name="principal"
              placeholder="Principal Amount"
              value={formData.principal}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <FaPercent />
            <Input
              type="number"
              step="0.01"
              name="rate"
              placeholder="Interest Rate (%)"
              value={formData.rate}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <FaCalendarAlt />
            <Input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <FaCalendarAlt />
            <Input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          <Button type="submit">
            <FaCalculator style={{ marginRight: '8px' }} />
            Calculate Interest
          </Button>
        </Form>

        {result && (
          <ResultsContainer>
            <ResultCard>
              <ResultLabel>Duration</ResultLabel>
              <ResultValue>{result.durationInYears.toFixed(2)} years</ResultValue>
              <ResultLabel>({Math.floor(result.durationInDays)} days)</ResultLabel>
            </ResultCard>
            
            <ResultCard>
              <ResultLabel>Total Amount</ResultLabel>
              <ResultValue>
                ${result.totalAmount.toFixed(2)}
              </ResultValue>
            </ResultCard>
            
            <ResultCard>
              <ResultLabel>Principal Amount</ResultLabel>
              <ResultValue>
                ${parseFloat(formData.principal).toFixed(2)}
              </ResultValue>
            </ResultCard>
            
            <ResultCard>
              <ResultLabel>Interest Earned</ResultLabel>
              <ResultValue>
                ${result.interestEarned.toFixed(2)}
              </ResultValue>
            </ResultCard>
          </ResultsContainer>
        )}
      </Card>
    </Container>
  );
};

export default InterestCalculator;