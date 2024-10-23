import { Container, Typography } from "@mui/joy";
import { usePageEffect } from "../core/page";

export const Component = function Privacy() {
  usePageEffect({ title: "Privacy Policy" });

  return (
    <Container sx={{ my: 3 }} maxWidth="sm">
      <Typography level="h1" gutterBottom>
        Privacy Policy
      </Typography>
    </Container>
  );
};
