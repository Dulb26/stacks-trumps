import { openSignatureRequestPopup, showConnect } from "@stacks/connect";
import { UserSession } from "@stacks/connect-react";
import { StacksMainnet } from "@stacks/network";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithCustomToken,
} from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import {
  getNonceToSign,
  verifySignedMessage,
} from "../core/firebase-functions";

interface AuthPayload {
  authResponsePayload?: {
    profile?: {
      stxAddress?: {
        mainnet?: string;
      };
    };
    public_keys?: string[];
  };
}

export function useWalletAuth() {
  const [address, setAddress] = useState<string | null>(null);
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence);

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAddress(user.uid);
        setUserSession(new UserSession());
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDisconnect = useCallback(() => {
    if (userSession) {
      userSession.signUserOut("/");
    }
    setAddress(null);
    setUserSession(null);
    const auth = getAuth();
    auth.signOut();
  }, [userSession]);

  const onFinish = useCallback(
    async (payload: AuthPayload) => {
      setIsAuthenticating(true);
      const walletAddress =
        payload.authResponsePayload?.profile?.stxAddress?.mainnet;

      if (!walletAddress) {
        console.error("Missing wallet address");
        setIsAuthenticating(false);
        return;
      }

      try {
        const { nonce } = await getNonceToSign({
          address: walletAddress,
          blockchain: "stacks",
        });

        const signaturePromise = new Promise((resolve) => {
          openSignatureRequestPopup({
            message: nonce,
            network: new StacksMainnet(),
            appDetails: {
              name: "Stacks Top Trumps",
              icon: "https://your-app-icon-url.com/icon.png",
            },
            onFinish: (data) => {
              resolve(data);
            },
          });
        });

        const signatureData = (await signaturePromise) as {
          signature: string;
          publicKey: string;
        };

        const verificationData = {
          address: walletAddress.toUpperCase(),
          signature: signatureData.signature,
          publicKey: signatureData.publicKey,
        };

        const { token } = await verifySignedMessage(verificationData);
        const auth = getAuth();
        await signInWithCustomToken(auth, token);
        setAddress(walletAddress);
        const newUserSession = new UserSession();
        setUserSession(newUserSession);
      } catch (error) {
        console.error("Error during signature verification:", error);
        handleDisconnect();
      } finally {
        setIsAuthenticating(false);
      }
    },
    [handleDisconnect],
  );

  const handleOpenAuth = useCallback(() => {
    const newUserSession = new UserSession();
    setUserSession(newUserSession);
    showConnect({
      onFinish,
      authOrigin: "https://stacks-wallet-web.hiro.so",
      redirectTo: "/",
      userSession: newUserSession,
      appDetails: {
        name: "Stacks Top Trumps",
        icon: "https://your-app-icon-url.com/icon.png",
      },
    });
  }, [onFinish]);

  return {
    address,
    handleOpenAuth,
    handleDisconnect,
    isAuthenticating,
  };
}
