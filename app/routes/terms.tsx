import { Container, Typography } from "@mui/joy";
import { usePageEffect } from "../core/page";

export const Component = function Terms() {
  usePageEffect({ title: "Terms of Use" });

  return (
    <Container maxWidth="sm" sx={{ my: 3 }}>
      <Typography level="h1" gutterBottom>
        Terms of Service
      </Typography>
      <Typography gutterBottom>
        Our Terms of Service are currently being updated. Please check back
        later.
      </Typography>
    </Container>
  );
};
