"use client";

import {
  useMutation,
  useQuery,
  type QueryObserverResult,
  type RefetchOptions,
  type UseMutateAsyncFunction,
} from "@tanstack/react-query";
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import env from "@env";
import type { AuthUser } from "@/interfaces/User";
import { auth } from "../firebase/config";
import { queryClient } from "./ReactQueryProvider";

type SignInProps =
  | {
      email: string;
      password: string;
    }
  | {
      provider: "google" | "apple";
    };

interface AuthContextData {
  user?: AuthUser | null;
  isLoading: boolean;
  updateUser: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<AuthUser | null, Error>>;
  signIn: UseMutateAsyncFunction<void, Error, SignInProps, unknown>;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

async function getUser() {
  if (!auth.currentUser) {
    return null;
  }

  const token = await auth.currentUser.getIdToken();
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/me`, {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error getting user info");
  }

  return response.json().then((data) => data.data as AuthUser);
}

export default function AuthProvider({ children }: PropsWithChildren<{}>) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(
    undefined,
  );

  const {
    data: user,
    refetch,
    isLoading,
  } = useQuery<AuthUser | null>({
    queryKey: ["user", "me"],
    queryFn: getUser,
    enabled: isAuthenticated !== undefined,
  });

  const { mutateAsync: signOut } = useMutation({
    mutationFn: async () => {
      await auth.signOut();
      // clear cookie
      document.cookie = `token=; path=/; max-age=0`;
    },
  });

  const { mutateAsync: signIn } = useMutation({
    mutationFn: async (props: SignInProps) => {
      if (auth.currentUser) {
        return;
      }

      if ("provider" in props) {
        switch (props.provider) {
          case "google":
            // Sign in with Google
            const provider = new GoogleAuthProvider();

            await signInWithPopup(auth, provider);
            break;
          case "apple":
            // Sign in with Apple
            const appleProvider = new OAuthProvider("apple.com");

            await signInWithPopup(auth, appleProvider);
            break;
        }
      } else {
        await signInWithEmailAndPassword(auth, props.email, props.password);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "me"],
      });
    },
  });

  useEffect(() => {
    // Set cookie
    auth.onIdTokenChanged(async () => {
      const token = await auth.currentUser?.getIdToken();
      document.cookie = `token=${token}; path=/; max-age=3600`;
    });

    return () => {
      auth.onIdTokenChanged(() => {});
    };
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged(async (fUser) => {
      if (fUser) {
        setIsAuthenticated(true);
        await refetch();
      } else {
        setIsAuthenticated(false);
        queryClient.invalidateQueries({
          queryKey: ["user", "me"],
        });
      }

      // refresh the page
      router.refresh();
    });

    return () => {
      auth.onAuthStateChanged(() => {});
    };
  }, [refetch, router]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        updateUser: refetch,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
