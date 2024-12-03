import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Stack,
} from "@mui/joy";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { addSupportedCollection } from "../core/firebase-functions";

interface AddCollectionDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AddCollectionDialog({
  open,
  onClose,
}: AddCollectionDialogProps) {
  const [slug, setSlug] = useState("");
  const [blockchain, setBlockchain] = useState("stacks");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await addSupportedCollection({
        slug,
        blockchain,
      });
      enqueueSnackbar("Collection added successfully!", { variant: "success" });
      onClose();
      // Reset form
      setSlug("");
    } catch (error) {
      console.error("Error adding collection:", error);
      enqueueSnackbar("Failed to add collection. Please try again.", {
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add Supported Collection</DialogTitle>
          <DialogContent>
            <Stack spacing={2}>
              <FormControl required>
                <FormLabel>Collection Slug</FormLabel>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="Enter collection slug"
                />
              </FormControl>

              <FormControl required>
                <FormLabel>Blockchain</FormLabel>
                <Input
                  value={blockchain}
                  onChange={(e) => setBlockchain(e.target.value)}
                  placeholder="Enter blockchain name"
                  disabled
                />
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button
              variant="plain"
              color="neutral"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isSubmitting}>
              Add Collection
            </Button>
          </DialogActions>
        </form>
      </ModalDialog>
    </Modal>
  );
}
