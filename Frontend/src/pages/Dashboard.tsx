import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { AccountCard } from '../components/AccountCard';
import { useAuth } from '../context/AuthContext';
import { accountService } from '../services/accountService';
import { customerService } from '../services/customerService';
import { Account, DashboardSummary } from '../types';
import {
  Wallet,
  TrendingUp,
  CreditCard,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

export const Dashboard = () => {
  const { customer } = useAuth();

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [accountsData, summaryData] = await Promise.all([
          accountService.getCustomerAccounts(),
          customerService.getDashboardSummary().catch(() => null),
        ]);

        setAccounts(accountsData.slice(0, 3));
        setSummary(summaryData);
      } catch (err) {
        console.error(err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
      }).format(amount);
    };


  const calculateTotalBalance = () => {
    return accounts.reduce((total, account) => total + account.balance, 0);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {customer?.customer_name?.split(' ')[0]}
            </h1>
            <p className="text-gray-600">
              Here's an overview of your banking activity
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
              <div className="p-3 bg-white/20 rounded-lg w-fit mb-4">
                <Wallet className="h-6 w-6" />
              </div>
              <p className="text-blue-100 text-sm mb-1">Total Balance</p>
              <p className="text-3xl font-bold">
                {formatCurrency(
                  summary?.total_balance ?? calculateTotalBalance()
                )}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="p-3 bg-green-50 rounded-lg w-fit mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-gray-600 text-sm mb-1">Active Accounts</p>
              <p className="text-3xl font-bold text-gray-900">
                {summary?.accounts_count ?? accounts.length}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="p-3 bg-orange-50 rounded-lg w-fit mb-4">
                <CreditCard className="h-6 w-6 text-orange-600" />
              </div>
              <p className="text-gray-600 text-sm mb-1">Account Types</p>
              <div className="flex items-baseline space-x-2">
                <p className="text-3xl font-bold text-gray-900">
                  {summary?.savings_accounts ??
                    accounts.filter((a) => a.discriminator === 'SA').length}
                </p>
                <span className="text-sm text-gray-500">SA</span>
                <span className="text-gray-300">|</span>
                <p className="text-3xl font-bold text-gray-900">
                  {summary?.fixed_deposits ??
                    accounts.filter((a) => a.discriminator === 'FD').length}
                </p>
                <span className="text-sm text-gray-500">FD</span>
              </div>
            </div>
          </div>

          {/* Accounts */}
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Recent Accounts
            </h2>
            <Link
              to="/accounts"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {accounts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No accounts found
              </h3>
              <p className="text-gray-600">
                You don't have any active accounts yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.map((account) => (
                <AccountCard
                  key={account.account_no}
                  account={account}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
