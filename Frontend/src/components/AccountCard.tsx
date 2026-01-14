import { Link } from 'react-router-dom';
import { Account } from "../types";
import { CreditCard, PiggyBank, ArrowRight } from 'lucide-react';

interface AccountCardProps {
  account: Account;
}

export const AccountCard = ({ account }: AccountCardProps) => {
  const isSavings = account.discriminator === 'SA';
  const Icon = isSavings ? CreditCard : PiggyBank;

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
      }).format(amount);
    };

  return (
    <Link
      to={`/accounts/${account.account_no}`}
      className="block bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 overflow-hidden group"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${isSavings ? 'bg-blue-50' : 'bg-green-50'}`}>
              <Icon className={`h-6 w-6 ${isSavings ? 'text-blue-600' : 'text-green-600'}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {isSavings ? 'Savings Account' : 'Fixed Deposit'}
              </h3>
              <p className="text-sm text-gray-500">{account.account_no}</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500 mb-1">Balance</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(account.balance)}</p>
          </div>

          {isSavings && account.interest_rate && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Interest Rate</span>
              <span className="font-medium text-gray-900">{account.interest_rate}%</span>
            </div>
          )}

          {!isSavings && account.fd_interest_rate && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Interest Rate</span>
                <span className="font-medium text-gray-900">{account.fd_interest_rate}%</span>
              </div>
              {account.duration_in_months && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium text-gray-900">{account.duration_in_months} months</span>
                </div>
              )}
            </div>
          )}

          {isSavings && account.overdraft_limit && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Overdraft Limit</span>
              <span className="font-medium text-gray-900">{formatCurrency(account.overdraft_limit)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
