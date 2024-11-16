import React from 'react';
import { Clock, Calendar, User, FileText } from 'lucide-react';
import { FaRupeeSign } from "react-icons/fa";
import {InfoItem , ApplyButton, Card, CardHeader, LoanAmount, Status, CardContent} from './LoanCard.Style'

const LoanCard = ({ loan, user, onApply }) => (
  <Card>
    <CardHeader>
      <LoanAmount>{loan.principalAmount.toLocaleString()}</LoanAmount>
      <Status status={loan.status}>
        {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
      </Status>
    </CardHeader>
    <CardContent>
      <InfoItem>
        <Clock size={18} />
        {loan.duration} months duration
      </InfoItem>
      <InfoItem>
        <FaRupeeSign size={18} />
        {loan.interestRate}% interest rate
      </InfoItem>
      <InfoItem>
        <User size={18} />
        {loan.lender.name}
      </InfoItem>
      <InfoItem>
        <FileText size={18} />
        {loan.purpose}
      </InfoItem>
      <InfoItem>
        <Calendar size={18} />
        {new Date(loan.createdAt).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })}
      </InfoItem>
      <ApplyButton
        onClick={() => onApply(loan._id)}
        disabled={loan.lender._id === user.id || loan.status !== 'pending'}
      >
        {loan.lender._id === user.id 
          ? 'Your Post' 
          : loan.status === 'pending' 
            ? 'Apply Now' 
            : 'Not Available'}
      </ApplyButton>
    </CardContent>
  </Card>
);

export default LoanCard;