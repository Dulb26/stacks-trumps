import {
  AddCircleOutline,
  ExpandMoreRounded,
  NotificationsRounded,
} from "@mui/icons-material";
import { Box, BoxProps, Button, IconButton } from "@mui/joy";
import { Fragment, Suspense, useState } from "react";
import { useIsAdmin } from "../hooks/useIsAdmin";
import { useWalletAuth } from "../hooks/useWalletAuth";
import { AddCollectionDialog } from "./add-collection-dialog";
import { ColorSchemeButton } from "./button-color-scheme";
import { WalletConnectButton } from "./wallet-connect-button";

export function Toolbar(props: ToolbarProps): JSX.Element {
  const { sx, ...other } = props;

  return (
    <Box
      sx={{
        alignItems: "center",
        borderBottom: "1px solid",
        borderColor: "divider",
        display: "flex",
        gap: 1,
        px: 2,
        ...sx,
      }}
      component="header"
      {...other}
    >
      <Button
        color="neutral"
        variant="plain"
        endDecorator={<ExpandMoreRounded />}
        children="Stacks Top Trumps"
      />

      <Box sx={{ flexGrow: 1 }} component="span" />

      <Suspense>
        <ActionButtons />
      </Suspense>

      <WalletConnectButton />
    </Box>
  );
}

function ActionButtons(): JSX.Element {
  const { userId } = useWalletAuth();
  const { isAdmin } = useIsAdmin(userId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Fragment>
      <ColorSchemeButton variant="soft" size="sm" />

      <IconButton variant="soft" size="sm">
        <NotificationsRounded />
      </IconButton>

      {isAdmin && (
        <>
          <Button
            variant="soft"
            size="sm"
            color="primary"
            startDecorator={<AddCircleOutline />}
            onClick={() => setIsDialogOpen(true)}
          >
            Add Collection
          </Button>
          <AddCollectionDialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          />
        </>
      )}
    </Fragment>
  );
}

type ToolbarProps = Omit<BoxProps<"header">, "children">;
