import { Box, Button } from "@mui/joy";
import { showConnect } from "@stacks/connect";
import { UserSession } from "@stacks/connect-react";
import { useCallback, useState } from "react";
// import { getNFTHoldings } from "../api/stacksApi";

interface AuthPayload {
  authResponsePayload?: {
    profile?: {
      stxAddress?: {
        mainnet?: string;
      };
    };
  };
}

export function WalletConnectButton() {
  const [address, setAddress] = useState<string | null>(null);
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  const onFinish = useCallback(
    async (payload: AuthPayload) => {
      setAddress(
        payload.authResponsePayload?.profile?.stxAddress?.mainnet ?? null,
      );
      if (payload.authResponsePayload?.profile?.stxAddress?.mainnet) {
        try {
          // const holdings = await getNFTHoldings(
          //   payload.authResponsePayload.profile.stxAddress.mainnet,
          // );
          // setNftCount(0);
        } catch (error) {
          console.error("Error fetching NFT holdings:", error);
        }
      }
      setUserSession(new UserSession());
    },
    [setAddress],
  );

  const handleOpenAuth = () => {
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
  };

  const handleDisconnect = () => {
    if (userSession) {
      userSession.signUserOut("/");
    }
    setAddress(null);
    // setNftCount(null);
    setUserSession(null);
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
        <>
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
        </>
      )}
    </Box>
  );
}
