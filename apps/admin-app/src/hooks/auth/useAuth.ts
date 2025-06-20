import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { 
  AccountSignInAdmQuery, 
  AuthAdmSeekApi, 
  AccountSignInTokenRdo, 
  QueryResponse,
  FirstParameter 
} from '@beribturing/api-stub';
import { useAuthContext, User } from '../../lib/auth';

export const useAuth = () => {
  const { 
    user, 
    loading, 
    tokens, 
    signOut, 
    setUser, 
    setTokens 
  } = useAuthContext();

  const signInMutation = useMutation<
    AxiosResponse<QueryResponse<AccountSignInTokenRdo>>,
    unknown,
    FirstParameter<typeof AuthAdmSeekApi.accountSignIn>
  >({
    mutationFn: AuthAdmSeekApi.accountSignIn,
    onSuccess: (response, variables) => {
      const tokenData = response.data.result;
      if (tokenData) {
        setTokens(tokenData);
        
        // Create user object from sign in data
        const userData: User = {
          id: 'admin-user', // You might want to get this from a separate API call
          name: 'Admin User', // You might want to get this from a separate API call
          phoneNumber: variables.phoneNumber,
          role: 'admin',
        };
        
        setUser(userData);
      }
    },
    onError: (error) => {
      console.error('Sign in failed:', error);
    },
  });

  const signIn = async (phoneNumber: string, password: string): Promise<boolean> => {
    try {
      const query: AccountSignInAdmQuery = {
        phoneNumber,
        password,
      };

      await signInMutation.mutateAsync(query);
      return true;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  };

  const isAuthenticated = !!user && !!tokens;

  return {
    user,
    tokens,
    loading: loading || signInMutation.isPending,
    isAuthenticated,
    signIn,
    signOut,
    error: signInMutation.error,
    isSigningIn: signInMutation.isPending,
  };
};