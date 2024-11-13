import { Box, Button } from "@mui/joy";
import { showConnect } from "@stacks/connect";
import { UserSession } from "@stacks/connect-react";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useCallback, useState } from "react";
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
      publicKeys?: string[];
    };
  };
}

interface ExtendedUserSession extends UserSession {
  signMessage(message: string): Promise<{
    publicKey: string;
    signature: string;
  }>;
}

export function WalletConnectButton() {
  const [address, setAddress] = useState<string | null>(null);
  const [userSession, setUserSession] = useState<ExtendedUserSession | null>(
    null,
  );

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
      const walletAddress =
        payload.authResponsePayload?.profile?.stxAddress?.mainnet;

      if (!walletAddress) {
        console.error("Missing wallet address");
        return;
      }

      setAddress(walletAddress);
      const newUserSession = new UserSession() as ExtendedUserSession;
      setUserSession(newUserSession);

      try {
        // Get nonce
        const { nonce } = await getNonceToSign({
          address: walletAddress,
          blockchain: "stacks",
        });

        // Sign message using Stacks wallet
        const signatureResponse = await newUserSession.signMessage(nonce);

        // Verify signature
        const { token } = await verifySignedMessage({
          address: walletAddress,
          publicKey: signatureResponse?.publicKey,
          signature: signatureResponse?.signature,
        });

        // Sign in to Firebase with custom token
        const auth = getAuth();
        await signInWithCustomToken(auth, token);
      } catch (error) {
        console.error("Error during signature verification:", error);
        handleDisconnect();
      }
    },
    [handleDisconnect],
  );

  const handleOpenAuth = () => {
    const newUserSession = new UserSession() as ExtendedUserSession;
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
  };

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
      }}
    >
      {!address ? (
        <Button
          onClick={handleOpenAuth}
          style={{
            padding: "8px 16px",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#3b82f6",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Connect Wallet
        </Button>
      ) : (
        <Button
          onClick={handleDisconnect}
          style={{
            padding: "8px 16px",
            fontWeight: "bold",
            color: "white",
            backgroundColor: "#ef4444",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Disconnect
        </Button>
      )}
    </Box>
  );
}
