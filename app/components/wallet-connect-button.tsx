import { Box, Button } from "@mui/joy";
import { useWalletAuth } from "../hooks/useWalletAuth";

export function WalletConnectButton() {
  const { address, handleOpenAuth, handleDisconnect, isAuthenticating } =
    useWalletAuth();

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
          disabled={isAuthenticating}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3b82f6",
            borderRadius: "4px",
            cursor: isAuthenticating ? "not-allowed" : "pointer",
          }}
        >
          {isAuthenticating ? "Connecting..." : "Connect Wallet"}
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
