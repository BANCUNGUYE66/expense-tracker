import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  LinearProgress,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useBudgets } from '../contexts/BudgetContext';
import { useCategories } from '../contexts/CategoryContext';

function BudgetForm({ budget, onSubmit, onClose }) {
  const { categories } = useCategories();
  const [formData, setFormData] = useState(budget || {
    name: '',
    limit: '',
    period: 'Monthly',
    categoryId: '',
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
            label="Budget Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="number"
            label="Limit Amount"
            value={formData.limit}
            onChange={(e) => setFormData({ ...formData, limit: Number(e.target.value) })}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Period"
            value={formData.period}
            onChange={(e) => setFormData({ ...formData, period: e.target.value })}
            required
          >
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Yearly">Yearly</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            select
            label="Category"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            required
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
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

function BudgetCard({ budget, onEdit, onDelete }) {
  const progress = (budget.spent / budget.limit) * 100;
  const { categories } = useCategories();
  const category = categories.find(cat => cat.id === budget.categoryId);

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">{budget.name}</Typography>
          <Typography variant="subtitle1">{budget.period}</Typography>
        </Box>
        
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Category: {category?.name || 'Unknown'}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">
              ${budget.spent} of ${budget.limit}
            </Typography>
            <Typography variant="body2">
              {progress.toFixed(1)}%
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={Math.min(progress, 100)}
            color={progress > 100 ? "error" : progress > 80 ? "warning" : "primary"}
          />
        </Box>
      </CardContent>
      <CardActions>
        <IconButton size="small" onClick={() => onEdit(budget)}>
          <EditIcon />
        </IconButton>
        <IconButton size="small" onClick={() => onDelete(budget.id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

function Budget() {
  const { budgets, addBudget, deleteBudget, updateBudget } = useBudgets();
  const [open, setOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const handleAdd = (budget) => {
    addBudget(budget);
  };

  const handleEdit = (budget) => {
    updateBudget(selectedBudget.id, budget);
    setSelectedBudget(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      deleteBudget(id);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Budgets</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Budget
        </Button>
      </Box>

      <Grid container spacing={3}>
        {budgets.map((budget) => (
          <Grid item xs={12} sm={6} md={4} key={budget.id}>
            <BudgetCard
              budget={budget}
              onEdit={(budget) => {
                setSelectedBudget(budget);
                setOpen(true);
              }}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedBudget(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedBudget ? 'Edit Budget' : 'Add Budget'}
        </DialogTitle>
        <DialogContent>
          <BudgetForm
            budget={selectedBudget}
            onSubmit={selectedBudget ? handleEdit : handleAdd}
            onClose={() => {
              setOpen(false);
              setSelectedBudget(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Budget;
  