import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {
  AccountSignInOwnQuery,
  AccountSignInTokenRdo,
  AuthOwnSeekApi,
  FirstParameter,
  QueryResponse,
  UserOwnSeekApi,
} from '@beribturing/api-stub';
import {useAuthContext} from '~/lib/auth';

export const useAuth = () => {
  const {
    user,
    loading,
    tokens,
    signOut,
    setUser,
    setTokens,
  } = useAuthContext();

  const signInMutation = useMutation<
    AxiosResponse<QueryResponse<AccountSignInTokenRdo>>,
    unknown,
    FirstParameter<typeof AuthOwnSeekApi.accountSignIn>
  >({
    mutationFn: AuthOwnSeekApi.accountSignIn,
    onSuccess: async (response, variables) => {
      const tokenData = response.data.result;
      if (tokenData) {
        setTokens(tokenData);
        try {
          const userResponse = await UserOwnSeekApi.userMe({});
          const userMeData = userResponse.data.result;
          if (userMeData) {
            setUser(userMeData);
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          setUser(null);
        }
      }
    },
    onError: (error) => {
      console.error('Sign in failed:', error);
    },
  });

  const signIn = async (phoneNumber: string, password: string): Promise<boolean> => {
    try {
      const query: AccountSignInOwnQuery = {
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
