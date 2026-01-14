export interface Customer {
  customer_id: string;
  customer_name: string;
  customer_mail: string;
}

export interface Account {
  account_no: string;
  balance: number;
  discriminator: 'SA' | 'FD';
  interest_rate?: number;
  fd_interest_rate?: number;
  duration_in_months?: number;
  overdraft_limit?: number;
  customer_id: string;
}

export interface DashboardSummary {
  total_balance: number;
  accounts_count: number;
  savings_accounts: number;
  fixed_deposits: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
  bankCode: string; // ✅ REQUIRED for login only
}

export interface LoginResponse {
  success: boolean;
  token: string;        // ✅ REQUIRED
  message?: string;     // optional
}

export interface ApiError {
  message: string;
  status?: number;
}
