# Personal Expense Tracker

A comprehensive expense tracking application built with React.js that helps users manage their financial transactions across multiple accounts.

## Features

- Track income and expenses across multiple accounts (bank, mobile money, cash)
- Generate custom time-period reports
- Budget monitoring with notifications
- Category and subcategory management
- Transaction categorization
- Visual representation of financial data
- Responsive dashboard interface

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository: https://github.com/BANCUNGUYE66/expense-tracker.git
2. Navigate to the project directory: cd expense-tracker
3. Install dependencies: npm install
4. Start the development server: npm start

# Personal Expense Tracker

A comprehensive web application built with React.js that helps users manage their financial transactions across multiple accounts, track budgets, and generate detailed financial reports.

## 🌟 Features

### Transaction Management
- Track income and expenses across multiple accounts (bank, mobile money, cash)
- Categorize transactions with custom categories and subcategories
- Add detailed transaction information including date, amount, description
- View transaction history with filtering options

### Budget Management
- Set budgets for different categories
- Real-time budget tracking
- Automated notifications for:
  - When reaching 80% of budget limit
  - When exceeding budget limit
- Visual progress indicators for budget utilization

### Category Management
- Create custom categories and subcategories
- Organize transactions by categories
- Track spending patterns by category

### Reports and Analytics
- Generate custom date-range reports
- Visual representation of financial data through charts and graphs
- View spending patterns by category and account
- Export transaction history
- Summary statistics for income, expenses, and balance

### Notifications
- Real-time budget alerts
- Visual notification center
- Toast notifications for immediate alerts
- Notification history tracking

## 🚀 Getting Started

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository: bash
 git clone https://github.com/BANCUNGUYE66/expense-tracker.git
```bash
npm install
```

4. Start the development server
```bash
npm start
```

5. Open your browser and visit `http://localhost:3000`

## 🛠️ Built With

- **React.js** - Frontend framework
- **Material-UI** - UI component library
- **Recharts** - Charting library
- **React Router** - Navigation
- **React Context** - State management
- **React Toastify** - Toast notifications

## 📱 Application Structure

```
src/
├── components/         # Reusable UI components
├── contexts/          # React Context providers
├── pages/             # Main application pages
├── utils/             # Helper functions
└── App.js             # Main application component
```

## 📋 Pages

1. **Dashboard**
   - Overview of financial status
   - Quick access to recent transactions
   - Summary charts and statistics

2. **Transactions**
   - Add/Edit/Delete transactions
   - Transaction history
   - Filter and search functionality

3. **Categories**
   - Manage categories and subcategories
   - Link transactions to categories
   - Category-wise spending analysis

4. **Budget**
   - Set and manage budgets
   - Track budget progress
   - Budget notifications

5. **Reports**
   - Generate custom reports
   - Visual data representation
   - Export functionality

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_API_URL=your_api_url
```

## 🚀 Deployment

To build the application for production:

```bash
npm run build
```

This will create a `build` directory with production-ready files.

## 🌐 Live Demo

Access the live demo at: [Expense Tracker Demo](https://678ff43014c3ad4688a69327--boisterous-cobbler-0a1d6a.netlify.app/)

## 📝 Future Enhancements

- [ ] Multi-currency support
- [ ] Receipt image upload
- [ ] Export reports to PDF/Excel
- [ ] Mobile application
- [ ] Recurring transaction setup
- [ ] Budget templates
- [ ] Financial goals tracking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## 👤 Author

Your Name
- GitHub: [@bancunguye66](https://github.com/bancunguye66)
- LinkedIn: [Bancunguye66](https://linkedin.com/in/bancunguye66)

## 🙏 Acknowledgments

- Material-UI for the component library
- Recharts for the charting capabilities
- React community for the amazing tools and libraries