import { Account } from '../types';
import { customerService } from './customerService';

export const accountService = {
  async getCustomerAccounts(): Promise<Account[]> {
    const { accounts } = await customerService.getCustomerWithAccounts();
    return accounts;
  },

  async getAccountDetails(accountNo: string): Promise<Account> {
    const accounts = await this.getCustomerAccounts();
    const account = accounts.find(acc => acc.account_no === accountNo);

    if (!account) {
      throw new Error('Account not found');
    }

    return account;
  },
};
