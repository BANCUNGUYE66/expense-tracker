import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { TransactionProvider } from './contexts/TransactionContext'; // Import the provider
import { CategoryProvider } from './contexts/CategoryContext';
import { BudgetProvider } from './contexts/BudgetContext';
import theme from './theme';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import Budget from './pages/Budget';
import Reports from './pages/Reports';
import Layout from './components/Layout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TransactionProvider>
        <CategoryProvider>
          <BudgetProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/budget" element={<Budget />} />
                  <Route path="/reports" element={<Reports />} />
                </Routes>
              </Layout>
            </Router>
          </BudgetProvider>
        </CategoryProvider>
      </TransactionProvider>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
