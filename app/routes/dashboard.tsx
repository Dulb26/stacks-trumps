import { Box, Card, CardContent, Container, Typography } from "@mui/joy";
import { usePageEffect } from "../core/page";
import { useWalletAuth } from "../hooks/useWalletAuth";

export const Component = function Dashboard(): JSX.Element {
  usePageEffect({ title: "Dashboard" });
  const { nfts, isLoadingNfts } = useWalletAuth();

  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ mb: 2 }} level="h2">
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        {isLoadingNfts ? (
          <Card sx={{ gridArea: "1 / 1 / 2 / -1" }}>
            <CardContent sx={{ minHeight: 300 }}>
              <Typography>Loading NFTs...</Typography>
            </CardContent>
          </Card>
        ) : (
          nfts.map((nft) => (
            <Card key={nft.id}>
              <CardContent sx={{ minHeight: 150 }}>
                <Typography level="h3">{nft.name}</Typography>
                <Typography>{nft.description}</Typography>
                {nft.image && (
                  <Box
                    component="img"
                    src={nft.image}
                    alt={nft.name}
                    sx={{
                      width: "100%",
                      height: "auto",
                      maxHeight: 200,
                      objectFit: "contain",
                      mt: 2,
                    }}
                  />
                )}
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Container>
  );
};
