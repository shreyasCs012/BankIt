import { Link } from 'react-router-dom';
import { Account } from "../types";
import { CreditCard, PiggyBank, ArrowRight } from 'lucide-react';

interface AccountCardProps {
  account: Account;
}

export const AccountCard = ({ account }: AccountCardProps) => {
  const isSavings = account.discriminator === 'SA';
  const Icon = isSavings ? CreditCard : PiggyBank;

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(amount);

  return (
    <Link
      to={`/accounts/${account.account_no}`}
      className="group block bg-white rounded-2xl border border-gray-100
                 shadow-sm hover:shadow-lg transition-all duration-200
                 hover:-translate-y-1 overflow-hidden"
    >
      <div className="p-6">

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-xl
                ${isSavings ? 'bg-purple-50' : 'bg-emerald-50'}`}
            >
              <Icon
                className={`h-6 w-6
                  ${isSavings ? 'text-purple-600' : 'text-emerald-600'}`}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {isSavings ? 'Savings Account' : 'Fixed Deposit'}
              </h3>
              <p className="text-sm text-gray-500">
                {account.account_no}
              </p>
            </div>
          </div>

          <ArrowRight
            className="h-5 w-5 text-gray-400
                       group-hover:text-purple-600
                       group-hover:translate-x-1
                       transition-all"
          />
        </div>

        {/* Balance */}
        <div className="mb-5">
          <p className="text-sm text-gray-500 mb-1">Balance</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(account.balance)}
          </p>
        </div>

        {/* Details */}
        <div className="space-y-3 text-sm">

          {isSavings && account.interest_rate && (
            <div className="flex justify-between">
              <span className="text-gray-500">Interest Rate</span>
              <span className="font-semibold text-gray-900">
                {account.interest_rate}%
              </span>
            </div>
          )}

          {!isSavings && account.fd_interest_rate && (
            <>
              <div className="flex justify-between">
                <span className="text-gray-500">Interest Rate</span>
                <span className="font-semibold text-gray-900">
                  {account.fd_interest_rate}%
                </span>
              </div>

              {account.duration_in_months && (
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-semibold text-gray-900">
                    {account.duration_in_months} months
                  </span>
                </div>
              )}
            </>
          )}

          {isSavings && account.overdraft_limit && (
            <div className="flex justify-between">
              <span className="text-gray-500">Overdraft Limit</span>
              <span className="font-semibold text-gray-900">
                {formatCurrency(account.overdraft_limit)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Accent */}
      <div
        className={`h-1 w-full
          ${isSavings ? 'bg-purple-600' : 'bg-emerald-600'}`}
      />
    </Link>
  );
};
