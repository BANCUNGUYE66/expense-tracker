import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Collapse,
  Typography
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandLess,
  ExpandMore
} from '@mui/icons-material';
import { useCategories } from '../contexts/CategoryContext';

function CategoryForm({ category, onSubmit, onClose, isSubcategory = false }) {
  const [formData, setFormData] = useState(category || {
    name: '',
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
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {isSubcategory ? 'Add Subcategory' : 'Save Category'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

function CategoryItem({ category, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const { addSubcategory } = useCategories();
  const [subcategoryDialogOpen, setSubcategoryDialogOpen] = useState(false);

  const handleAddSubcategory = (subcategory) => {
    addSubcategory(category.id, subcategory);
  };

  return (
    <>
      <ListItem>
        <ListItemText
          primary={category.name}
          secondary={category.description}
          onClick={() => setOpen(!open)}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={() => setSubcategoryDialogOpen(true)}>
            <AddIcon />
          </IconButton>
          <IconButton onClick={() => onEdit(category)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(category.id)}>
            <DeleteIcon />
          </IconButton>
          {category.subcategories?.length > 0 && (
            <IconButton onClick={() => setOpen(!open)}>
              {open ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
        </ListItemSecondaryAction>
      </ListItem>
      
      {category.subcategories?.length > 0 && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {category.subcategories.map((subcategory) => (
              <ListItem key={subcategory.id} sx={{ pl: 4 }}>
                <ListItemText
                  primary={subcategory.name}
                  secondary={subcategory.description}
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      )}

      <Dialog
        open={subcategoryDialogOpen}
        onClose={() => setSubcategoryDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add Subcategory</DialogTitle>
        <DialogContent>
          <CategoryForm
            onSubmit={handleAddSubcategory}
            onClose={() => setSubcategoryDialogOpen(false)}
            isSubcategory
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

function Categories() {
  const { categories, addCategory, deleteCategory, updateCategory } = useCategories();
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleAdd = (category) => {
    addCategory(category);
  };

  const handleEdit = (category) => {
    updateCategory(selectedCategory.id, category);
    setSelectedCategory(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Categories</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Category
        </Button>
      </Box>

      <Paper>
        <List>
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              onEdit={(category) => {
                setSelectedCategory(category);
                setOpen(true);
              }}
              onDelete={handleDelete}
            />
          ))}
        </List>
      </Paper>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          setSelectedCategory(null);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedCategory ? 'Edit Category' : 'Add Category'}
        </DialogTitle>
        <DialogContent>
          <CategoryForm
            category={selectedCategory}
            onSubmit={selectedCategory ? handleEdit : handleAdd}
            onClose={() => {
              setOpen(false);
              setSelectedCategory(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Categories;
  