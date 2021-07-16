import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

export function initReactQueryAuth(config) {
  const AuthContext = React.createContext(null);
  AuthContext.displayName = "AuthContext";

  const {
    loadUser,
    loginFn,
    registerFn,
    logoutFn,
    key = "auth-user",
    ErrorComponent = () => <div>Oops!</div>,
    LoaderComponent = () => <div>Loading...</div>,
  } = config;

  function AuthProvider({ children }) {
    const queryClient = useQueryClient();

    const {
      data: user,
      error,
      status,
      isLoading,
      isIdle,
      isSuccess,
      refetch,
    } = useQuery({
      queryKey: key,
      queryFn: loadUser,
    });

    const setUser = React.useCallback(
      (data) => queryClient.setQueryData(key, data),
      [queryClient]
    );

    const loginMutation = useMutation({
      mutationFn: loginFn,
      onSuccess: (user) => {
        setUser(user);
      },
    });

    const registerMutation = useMutation({
      mutationFn: registerFn,
      onSuccess: (user) => {
        setUser(user);
      },
    });

    const logoutMutation = useMutation({
      mutationFn: logoutFn,
      onSuccess: () => {
        queryClient.clear();
      },
    });

    const value = React.useMemo(
      () => ({
        user,
        error,
        refetchUser: refetch,
        login: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isLoading,
        logout: logoutMutation.mutateAsync,
        isLoggingOut: logoutMutation.isLoading,
        register: registerMutation.mutateAsync,
        isRegistering: registerMutation.isLoading,
      }),
      [
        user,
        error,
        refetch,
        loginMutation.mutateAsync,
        loginMutation.isLoading,
        logoutMutation.mutateAsync,
        logoutMutation.isLoading,
        registerMutation.mutateAsync,
        registerMutation.isLoading,
      ]
    );

    if (isLoading || isIdle) {
      return <LoaderComponent />;
    }

    if (error) {
      return <ErrorComponent error={error} />;
    }

    if (isSuccess) {
      return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
      );
    }

    return <div>Unhandled status: {status}</div>;
  }

  function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context) {
      throw new Error(`useAuth must be used within an AuthProvider`);
    }
    return context;
  }

  return { AuthProvider, useAuth };
}
