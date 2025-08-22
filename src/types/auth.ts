export type UserRole = 'admin' | 'corretor' | 'suporte';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  permissions: string[];
  firstLogin: boolean;
  lastLogin?: Date;
}

export interface Profile {
  id: string;
  user_id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  permissions: string[];
  first_login: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginForm {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (credentials: LoginForm) => Promise<void>;
  logout: () => void;
  checkSession: () => Promise<void>;
  clearError: () => void;
}

export type AuthStore = AuthState & AuthActions;