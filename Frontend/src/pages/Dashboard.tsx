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
   <>
  <Navbar />

  <div className="min-h-screen bg-[#F6F7FB]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">
          Welcome back, {customer?.customer_name?.split(' ')[0]}
        </h1>
        <p className="text-gray-600">
          Here’s an overview of your banking activity
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        {/* Total Balance */}
        <div className="relative overflow-hidden rounded-2xl p-6 text-white shadow-xl
                        bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800">

          <div className="absolute -top-16 -right-16 w-40 h-40 bg-white/10 rounded-full" />

          <div className="relative z-10">
            <div className="p-3 bg-white/20 rounded-xl w-fit mb-4">
              <Wallet className="h-6 w-6" />
            </div>

            <p className="text-purple-200 text-sm mb-1">Total Balance</p>

            <p className="text-4xl font-extrabold tracking-tight">
              {formatCurrency(
                summary?.total_balance ?? calculateTotalBalance()
              )}
            </p>

            <p className="text-xs text-purple-200 mt-2">
              Updated just now
            </p>
          </div>
        </div>

        {/* Active Accounts */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100
                        hover:shadow-lg transition-all duration-200">
          <div className="p-3 bg-emerald-50 rounded-xl w-fit mb-4">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
          </div>

          <p className="text-gray-500 text-sm mb-1">Active Accounts</p>

          <p className="text-3xl font-bold text-gray-900">
            {summary?.accounts_count ?? accounts.length}
          </p>
        </div>

        {/* Account Types */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100
                        hover:shadow-lg transition-all duration-200">
          <div className="p-3 bg-amber-50 rounded-xl w-fit mb-4">
            <CreditCard className="h-6 w-6 text-amber-600" />
          </div>

          <p className="text-gray-500 text-sm mb-3">Account Types</p>

          <div className="flex items-center gap-6">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {summary?.savings_accounts ??
                  accounts.filter(a => a.discriminator === 'SA').length}
              </p>
              <p className="text-xs text-gray-500">Savings</p>
            </div>

            <div className="h-8 w-px bg-gray-200" />

            <div>
              <p className="text-2xl font-bold text-gray-900">
                {summary?.fixed_deposits ??
                  accounts.filter(a => a.discriminator === 'FD').length}
              </p>
              <p className="text-xs text-gray-500">Fixed Deposit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Accounts Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Recent Accounts
        </h2>

        <Link
          to="/accounts"
          className="flex items-center gap-2 text-purple-600
                     hover:text-purple-700 font-semibold transition"
        >
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Accounts Grid */}
      {accounts.length === 0 ? (
        <div className="bg-white rounded-2xl p-14 text-center border border-gray-200">
          <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No accounts found
          </h3>
          <p className="text-gray-600">
            You don’t have any active accounts yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map(account => (
            <div
              key={account.account_no}
              className="hover:-translate-y-1 transition-all duration-200"
            >
              <AccountCard account={account} />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
   </>
    </>
  );
};
