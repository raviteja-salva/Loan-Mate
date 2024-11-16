import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled, { keyframes, css } from 'styled-components';
import {
  Wallet,
  CreditCard,
  TrendingUp,
  DollarSign,
  Activity,
  PieChart,
  Send,
  Download
} from 'lucide-react';
import { fetchUserStats } from '../../services/apiService';
import LoadingOverlay from '../../components/LoadingOverlay/LoadingOverlay';
import {
  DashboardWrapper,
  ContentContainer,
  WelcomeSection,
  StatsGrid,
  StatCard,
  MetricSection,
  IconBox,
  MetricInfo,
  MetricLabel,
  MetricValue,
  Section,
  SectionTitle,
  ChartSection,
  ChartGrid,
  ChartContainer
} from './Home.Style';
import {
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const colorScheme = {
  wallet: '#10b981',
  lending: '#6366f1',
  borrowing: '#f59e0b',
  interest: '#ec4899'
};


const Home = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ec4899'];

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetchUserStats(user.id);
        setStats(response.data);
      } catch (error) {
        toast.error('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [user.id]);

  if (loading) return <LoadingOverlay />;
  if (!stats) return null;

  const { lending, borrowing, wallet } = stats.stats;

  const loanComparisonData = [
    { name: 'Loans Given', value: lending.totalLoansGiven },
    { name: 'Loans Taken', value: borrowing.totalLoansTaken }
  ];

  const amountComparisonData = [
    { name: 'Amount Lent', value: lending.totalAmountLent },
    { name: 'Amount Borrowed', value: borrowing.totalAmountBorrowed },
    { name: 'Current Balance', value: wallet.currentBalance }
  ];

  const walletBreakdownData = [
    { name: 'Current Balance', value: wallet.currentBalance },
    { name: 'Interest Earned', value: wallet.totalInterestEarned },
    { name: 'Interest Paid', value: wallet.totalInterestPaid }
  ];

  return (
    <DashboardWrapper>
      <ContentContainer>
        <WelcomeSection>
          <h1>Welcome back, {stats.user.name}! 👋</h1>
          <p>Here's your latest financial overview</p>
        </WelcomeSection>

        <Section>
          <SectionTitle>Wallet Overview</SectionTitle>
          <StatsGrid>
            <StatCard delay="0s">
              <MetricSection>
                <IconBox bgColor={colorScheme.wallet}>
                  <Wallet size={28} color="white" />
                </IconBox>
                <MetricInfo>
                  <MetricLabel>Current Balance</MetricLabel>
                  <MetricValue>₹{wallet.currentBalance.toLocaleString()}</MetricValue>
                </MetricInfo>
              </MetricSection>
            </StatCard>

            <StatCard delay="0.1s">
              <MetricSection>
                <IconBox bgColor={colorScheme.interest}>
                  <TrendingUp size={28} color="white" />
                </IconBox>
                <MetricInfo>
                  <MetricLabel>Total Interest Earned</MetricLabel>
                  <MetricValue>₹{wallet.totalInterestEarned.toLocaleString()}</MetricValue>
                </MetricInfo>
              </MetricSection>
            </StatCard>

            <StatCard delay="0.2s">
              <MetricSection>
                <IconBox bgColor={colorScheme.borrowing}>
                  <DollarSign size={28} color="white" />
                </IconBox>
                <MetricInfo>
                  <MetricLabel>Total Interest Paid</MetricLabel>
                  <MetricValue>₹{wallet.totalInterestPaid.toLocaleString()}</MetricValue>
                </MetricInfo>
              </MetricSection>
            </StatCard>
          </StatsGrid>
        </Section>

        <Section>
          <SectionTitle>Lending Activity</SectionTitle>
          <StatsGrid>
            <StatCard delay="0.3s">
              <MetricSection>
                <IconBox bgColor={colorScheme.lending}>
                  <Send size={28} color="white" />
                </IconBox>
                <MetricInfo>
                  <MetricLabel>Total Loans Given</MetricLabel>
                  <MetricValue>{lending.totalLoansGiven}</MetricValue>
                </MetricInfo>
              </MetricSection>
            </StatCard>

            <StatCard delay="0.4s">
              <MetricSection>
                <IconBox bgColor={colorScheme.lending}>
                  <Activity size={28} color="white" />
                </IconBox>
                <MetricInfo>
                  <MetricLabel>Active Loans</MetricLabel>
                  <MetricValue>{lending.activeLoanCount}</MetricValue>
                </MetricInfo>
              </MetricSection>
            </StatCard>

            <StatCard delay="0.5s">
              <MetricSection>
                <IconBox bgColor={colorScheme.lending}>
                  <PieChart size={28} color="white" />
                </IconBox>
                <MetricInfo>
                  <MetricLabel>Total Amount Lent</MetricLabel>
                  <MetricValue>₹{lending.totalAmountLent.toLocaleString()}</MetricValue>
                </MetricInfo>
              </MetricSection>
            </StatCard>
          </StatsGrid>
        </Section>

        <Section>
          <SectionTitle>Borrowing Activity</SectionTitle>
          <StatsGrid>
            <StatCard delay="0.6s">
              <MetricSection>
                <IconBox bgColor={colorScheme.borrowing}>
                  <Download size={28} color="white" />
                </IconBox>
                <MetricInfo>
                  <MetricLabel>Total Loans Taken</MetricLabel>
                  <MetricValue>{borrowing.totalLoansTaken}</MetricValue>
                </MetricInfo>
              </MetricSection>
            </StatCard>

            <StatCard delay="0.7s">
              <MetricSection>
                <IconBox bgColor={colorScheme.borrowing}>
                  <CreditCard size={28} color="white" />
                </IconBox>
                <MetricInfo>
                  <MetricLabel>Active Loans</MetricLabel>
                  <MetricValue>{borrowing.activeLoans}</MetricValue>
                </MetricInfo>
              </MetricSection>
            </StatCard>

            <StatCard delay="0.8s">
              <MetricSection>
                <IconBox bgColor={colorScheme.borrowing}>
                  <DollarSign size={28} color="white" />
                </IconBox>
                <MetricInfo>
                  <MetricLabel>Total Amount Borrowed</MetricLabel>
                  <MetricValue>₹{borrowing.totalAmountBorrowed.toLocaleString()}</MetricValue>
                </MetricInfo>
              </MetricSection>
            </StatCard>
          </StatsGrid>
        </Section>
        
        <ChartSection>
          <SectionTitle>Financial Analytics</SectionTitle>
          <ChartGrid>
           
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={loanComparisonData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#6366f1" name="Number of Loans" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>

          
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={walletBreakdownData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {walletBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </ChartGrid>
        </ChartSection>

        <ChartSection>
          <SectionTitle>Amount Comparison</SectionTitle>
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={amountComparisonData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#6366f1" 
                  strokeWidth={2}
                  name="Amount (₹)"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartSection>


      </ContentContainer>
    </DashboardWrapper>
  );
};

export default Home;