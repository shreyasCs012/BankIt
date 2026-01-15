import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { AccountCard } from '../components/AccountCard';
import { accountService } from '../services/accountService';
import { Account } from '../types';
import { CreditCard, AlertCircle, Filter } from 'lucide-react';

export const Accounts = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'SA' | 'FD'>('ALL');

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const data = await accountService.getCustomerAccounts();
        setAccounts(data);
        setFilteredAccounts(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load accounts');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    if (filter === 'ALL') {
      setFilteredAccounts(accounts);
    } else {
      setFilteredAccounts(
        accounts.filter((account) => account.discriminator === filter)
      );
    }
  }, [filter, accounts]);

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
              Your Accounts
            </h1>
            <p className="text-gray-600">
              Manage and view all your banking accounts
            </p>
          </div>

          {error && (
            <div className="mb-6 flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          {/* Filter */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Filter:
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('ALL')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filter === 'ALL'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                All ({accounts.length})
              </button>
              <button
                onClick={() => setFilter('SA')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filter === 'SA'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Savings (
                {accounts.filter((a) => a.discriminator === 'SA').length})
              </button>
              <button
                onClick={() => setFilter('FD')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  filter === 'FD'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                Fixed Deposits (
                {accounts.filter((a) => a.discriminator === 'FD').length})
              </button>
            </div>
          </div>

          {/* Accounts List */}
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
  );
};
