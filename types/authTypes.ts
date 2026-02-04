// types/authTypes.ts
// Define los tipos de datos para autenticación

export interface User {
    id: string;
    email: string;
    name: string;
  }
  
  export interface AuthCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends AuthCredentials {
    name: string;
    confirmPassword: string;
  }
  
  export interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (credentials: AuthCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => void;
  }