import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {
  AccountSignInOwnQuery,
  AccountSignInTokenRdo,
  AuthOwnSeekApi,
  AuthOwnFlowApi,
  FirstParameter,
  QueryResponse,
  CommandResponse,
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

  const refreshTokenMutation = useMutation<
  AxiosResponse<CommandResponse<AccountSignInTokenRdo>>,
  unknown,
  FirstParameter<typeof AuthOwnFlowApi.refreshToken>
  >({
    mutationFn: AuthOwnFlowApi.refreshToken,
    onSuccess: async (response) => {
      const tokenData = response.data.result;
      if (tokenData) {
        setTokens(tokenData);
      }
    },
    onError: (error) => {
      console.error('Refresh token failed:', error);
      signOut();
    },
  });

  const refreshToken = async (): Promise<boolean> => {
    try {
      if (!tokens?.refreshToken) {
        return false;
      }

      await refreshTokenMutation.mutateAsync({
        refreshToken: tokens.refreshToken,
      });
      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      return false;
    }
  };

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
    refreshToken,
    error: signInMutation.error,
    isSigningIn: signInMutation.isPending,
    isRefreshing: refreshTokenMutation.isPending,
  };
};
