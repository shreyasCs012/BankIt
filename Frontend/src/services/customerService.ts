import { apiClient } from "../api/apiClient";
import { Customer, DashboardSummary, Account } from "../types";

/**
 * Bank server response models
 */
interface BankCustomerResponse {
  customerId: number;
  customerName: string;
  customerMail: string;
  accounts: BankAccount[];
}

interface BankAccount {
  accountNo: string;
  balance: number;
  discriminator: string;
  interestRate?: number;
  fdInterestRate?: number;
  durationInMonths?: number;
  overdraftLimit?: number;
  customerId?: number;
}

/**
 * 🔁 Account mapper
 */
const mapBankAccount = (bankAccount: BankAccount): Account => {
  console.log("🔄 Mapping bank account:", bankAccount);

  const discriminator =
    bankAccount.discriminator === "SAV"
      ? "SA"
      : (bankAccount.discriminator as "SA" | "FD");

  return {
    account_no: bankAccount.accountNo,
    balance: bankAccount.balance,
    discriminator,
    interest_rate: bankAccount.interestRate,
    fd_interest_rate: bankAccount.fdInterestRate,
    duration_in_months: bankAccount.durationInMonths,
    overdraft_limit: bankAccount.overdraftLimit,
    customer_id: bankAccount.customerId?.toString() || "",
  };
};

export const customerService = {
  /**
   * 👤 Get basic customer profile
   */
  async getCustomerProfile(): Promise<Customer> {
    console.log("📡 Calling GET /me/profile (profile only)");

    const response = await apiClient.get<BankCustomerResponse>("/me/profile");
    const bankCustomer = response.data;

    console.log("✅ Bank customer response:", bankCustomer);

    return {
      customer_id: bankCustomer.customerId.toString(),
      customer_name: bankCustomer.customerName,
      customer_mail: bankCustomer.customerMail,
    };
  },

  /**
   * 👤 + 💳 Customer with accounts
   */
  async getCustomerWithAccounts(): Promise<{
    customer: Customer;
    accounts: Account[];
  }> {
    console.log("📡 Calling GET /me/profile (with accounts)");

    const response = await apiClient.get<BankCustomerResponse>("/me/profile");
    const bankCustomer = response.data;

    console.log("✅ Bank customer + accounts:", bankCustomer);

    return {
      customer: {
        customer_id: bankCustomer.customerId.toString(),
        customer_name: bankCustomer.customerName,
        customer_mail: bankCustomer.customerMail,
      },
      accounts: (bankCustomer.accounts || []).map(mapBankAccount),
    };
  },

  /**
   * 📊 Dashboard summary
   */
  async getDashboardSummary(): Promise<DashboardSummary> {
    console.log("📡 Building dashboard summary");

    const { accounts } = await this.getCustomerWithAccounts();

    const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
    const savingsAccounts = accounts.filter(
      (acc) => acc.discriminator === "SA"
    ).length;
    const fixedDeposits = accounts.filter(
      (acc) => acc.discriminator === "FD"
    ).length;

    const summary = {
      total_balance: totalBalance,
      accounts_count: accounts.length,
      savings_accounts: savingsAccounts,
      fixed_deposits: fixedDeposits,
    };

    console.log("📊 Dashboard summary:", summary);

    return summary;
  },
};
