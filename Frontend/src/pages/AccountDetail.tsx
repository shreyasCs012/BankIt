import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from "../components/Navbar";
import { accountService } from '../services/accountService';
import { Account } from '../types';
import { ArrowLeft, CreditCard, PiggyBank, AlertCircle, Calendar, Percent, DollarSign, TrendingUp } from 'lucide-react';

export const AccountDetail = () => {
  const { accountNo } = useParams<{ accountNo: string }>();
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAccount = async () => {
      if (!accountNo) return;

      try {
        setLoading(true);
        const data = await accountService.getAccountDetails(accountNo);
        setAccount(data);
      } catch (err) {
        setError('Failed to load account details');
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [accountNo]);

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
      }).format(amount);
    };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </>
    );
  }

  if (error || !account) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-800">{error || 'Account not found'}</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  const isSavings = account.discriminator === 'SA';
  const Icon = isSavings ? CreditCard : PiggyBank;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="font-medium">Back</span>
          </button>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-xl mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-4 bg-white/20 rounded-xl">
                  <Icon className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-1">
                    {isSavings ? 'Savings Account' : 'Fixed Deposit'}
                  </h1>
                  <p className="text-blue-100 text-lg">{account.account_no}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-blue-100 text-sm mb-2">Current Balance</p>
              <p className="text-5xl font-bold">{formatCurrency(account.balance)}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Account Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Account Number</p>
                  <p className="text-lg font-semibold text-gray-900">{account.account_no}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Account Type</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {isSavings ? 'Savings Account' : 'Fixed Deposit'}
                  </p>
                </div>
              </div>

              {isSavings && account.interest_rate && (
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Percent className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Interest Rate</p>
                    <p className="text-lg font-semibold text-gray-900">{account.interest_rate}% p.a.</p>
                  </div>
                </div>
              )}

              {!isSavings && account.fd_interest_rate && (
                <>
                  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Percent className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">FD Interest Rate</p>
                      <p className="text-lg font-semibold text-gray-900">{account.fd_interest_rate}% p.a.</p>
                    </div>
                  </div>

                  {account.duration_in_months && (
                    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <Calendar className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Duration</p>
                        <p className="text-lg font-semibold text-gray-900">{account.duration_in_months} months</p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {isSavings && account.overdraft_limit && (
                <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Overdraft Limit</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(account.overdraft_limit)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <p className="text-sm text-blue-800">
              This is a read-only view of your account. For transactions or account modifications, please visit your nearest branch or contact customer support.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
