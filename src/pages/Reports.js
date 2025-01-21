import { useState } from 'react';
import {
  Box,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useTransactions } from '../contexts/TransactionContext';
import { useCategories } from '../contexts/CategoryContext';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

function Reports() {
  const { transactions } = useTransactions();
  const { categories } = useCategories();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [reportData, setReportData] = useState(null);

  const generateReport = () => {
    let filteredTransactions = [...transactions];

    // Apply date filters
    if (startDate) {
      filteredTransactions = filteredTransactions.filter(t => 
        new Date(t.date) >= new Date(startDate)
      );
    }
    if (endDate) {
      filteredTransactions = filteredTransactions.filter(t => 
        new Date(t.date) <= new Date(endDate)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filteredTransactions = filteredTransactions.filter(t => 
        t.categoryId === selectedCategory
      );
    }

    // Calculate summaries
    const summary = {
      totalIncome: 0,
      totalExpenses: 0,
      byCategory: {},
      byAccount: {},
      transactions: filteredTransactions,
    };

    filteredTransactions.forEach(transaction => {
      const amount = Number(transaction.amount);
      if (transaction.type === 'Income') {
        summary.totalIncome += amount;
      } else {
        summary.totalExpenses += amount;
      }

      // Summarize by category
      const category = categories.find(c => c.id === transaction.categoryId)?.name || 'Uncategorized';
      summary.byCategory[category] = (summary.byCategory[category] || 0) + amount;

      // Summarize by account
      summary.byAccount[transaction.account] = (summary.byAccount[transaction.account] || 0) + amount;
    });

    setReportData(summary);
  };

  const formatChartData = (data) => {
    return Object.entries(data).map(([name, value]) => ({
      name,
      value: Number(value.toFixed(2))
    }));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Financial Reports
      </Typography>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type="date"
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type="date"
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              select
              label="Category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={generateReport}
            >
              Generate Report
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {reportData && (
        <Grid container spacing={3}>
          {/* Summary Cards */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Total Income</Typography>
              <Typography variant="h4" color="primary">
                ${reportData.totalIncome.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Total Expenses</Typography>
              <Typography variant="h4" color="error">
                ${reportData.totalExpenses.toFixed(2)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Net Balance</Typography>
              <Typography variant="h4" color={reportData.totalIncome - reportData.totalExpenses >= 0 ? "success" : "error"}>
                ${(reportData.totalIncome - reportData.totalExpenses).toFixed(2)}
              </Typography>
            </Paper>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                Expenses by Category
              </Typography>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={formatChartData(reportData.byCategory)}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {formatChartData(reportData.byCategory).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" gutterBottom>
                Transactions by Account
              </Typography>
              <ResponsiveContainer>
                <BarChart data={formatChartData(reportData.byAccount)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Transactions Table */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Transaction Details
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Account</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Description</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reportData.transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.type}</TableCell>
                        <TableCell>${Number(transaction.amount).toFixed(2)}</TableCell>
                        <TableCell>{transaction.account}</TableCell>
                        <TableCell>
                          {categories.find(c => c.id === transaction.categoryId)?.name || 'Uncategorized'}
                        </TableCell>
                        <TableCell>{transaction.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default Reports;
  