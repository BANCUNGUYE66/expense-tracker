import { Box, Grid, Paper, Typography } from '@mui/material';
import { useTransactions } from '../contexts/TransactionContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

function Dashboard() {
  const { transactions } = useTransactions();

  // Calculate total income and expenses
  const totals = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'Income') {
      acc.income += Number(transaction.amount);
    } else {
      acc.expenses += Number(transaction.amount);
    }
    return acc;
  }, { income: 0, expenses: 0 });

  // Prepare data for charts
  const chartData = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString();
    const existingDay = acc.find(item => item.date === date);
    
    if (existingDay) {
      if (transaction.type === 'Income') {
        existingDay.income += Number(transaction.amount);
      } else {
        existingDay.expenses += Number(transaction.amount);
      }
    } else {
      acc.push({
        date,
        income: transaction.type === 'Income' ? Number(transaction.amount) : 0,
        expenses: transaction.type === 'Expense' ? Number(transaction.amount) : 0
      });
    }
    return acc;
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Income</Typography>
            <Typography variant="h4">${totals.income.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Total Expenses</Typography>
            <Typography variant="h4">${totals.expenses.toFixed(2)}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Balance</Typography>
            <Typography variant="h4">
              ${(totals.income - totals.expenses).toFixed(2)}
            </Typography>
          </Paper>
        </Grid>

        {/* Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Income vs Expenses
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#4caf50" name="Income" />
                <Bar dataKey="expenses" fill="#f44336" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
  