import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Grid,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useTransactions } from '../contexts/TransactionContext';

const accountTypes = ['Bank', 'Cash', 'Mobile Money'];
const transactionTypes = ['Income', 'Expense'];

function TransactionForm({ transaction, onSubmit, onClose }) {
  const [formData, setFormData] = useState(transaction || {
    date: new Date().toISOString().split('T')[0],
    type: 'Expense',
    amount: '',
    account: 'Bank',
    description: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} sx={{ pt: 2 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="date"
            label="Date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            {transactionTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="number"
            label="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Account"
            value={formData.account}
            onChange={(e) => setFormData({ ...formData, account: e.target.value })}
          >
            {accountTypes.map((account) => (
              <MenuItem key={account} value={account}>{account}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">Save</Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

function Transactions() {
  const { transactions, addTransaction, deleteTransaction, updateTransaction } = useTransactions();
  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleAdd = (transaction) => {
    addTransaction(transaction);
  };

  const handleEdit = (transaction) => {
    updateTransaction(selectedTransaction.id, transaction);
    setSelectedTransaction(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Transactions</h1>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Transaction
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Account</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>${Number(transaction.amount).toFixed(2)}</TableCell>
                <TableCell>{transaction.account}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => {
                    setSelectedTransaction(transaction);
                    setOpen(true);
                  }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(transaction.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog 
        open={open} 
        onClose={() => {
          setOpen(false);
          setSelectedTransaction(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedTransaction ? 'Edit Transaction' : 'Add Transaction'}
        </DialogTitle>
        <DialogContent>
          <TransactionForm
            transaction={selectedTransaction}
            onSubmit={selectedTransaction ? handleEdit : handleAdd}
            onClose={() => {
              setOpen(false);
              setSelectedTransaction(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Transactions;
  