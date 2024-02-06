import { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogBody,
  DialogFooter,
  Flex,
  Typography,
  Button,
} from "@strapi/design-system";
import { Eye, Trash, ExclamationMarkCircle } from "@strapi/icons";

import { HtmlMedia } from "../../types";

interface ActionsProps {
  media?: HtmlMedia | null;
  onDelete: () => void;
}
export const Actions = ({ media, onDelete }: ActionsProps) => {
  const [isDeleteConfirmationVisible, setIsDeleteConfirmationVisible] =
    useState(false);

  const deleteHandler = () => {
    onDelete?.();
    setIsDeleteConfirmationVisible(false);
  };

  const viewHandler = () => {
    const url = window.location.origin + media?.viewUrl;
    window.open(url);
  };

  if (!media) {
    return null;
  }
  return (
    <>
      <IconButton onClick={viewHandler} label="View" id="view" icon={<Eye />} />

      <IconButton
        label="Delete"
        icon={<Trash />}
        onClick={() => setIsDeleteConfirmationVisible(true)}
      />

      <Dialog
        onClose={() => setIsDeleteConfirmationVisible(false)}
        title="Confirmation"
        isOpen={isDeleteConfirmationVisible}
      >
        <DialogBody icon={<ExclamationMarkCircle />}>
          <Flex direction="column" alignItems="center" gap={2}>
            <Flex justifyContent="center">
              <Typography id="confirm-description">
                Are you sure you want to delete this?
              </Typography>
            </Flex>
          </Flex>
        </DialogBody>
        <DialogFooter
          startAction={
            <Button
              onClick={() => setIsDeleteConfirmationVisible(false)}
              variant="tertiary"
            >
              Cancel
            </Button>
          }
          endAction={
            <Button
              variant="danger-light"
              startIcon={<Trash />}
              onClick={deleteHandler}
            >
              Confirm
            </Button>
          }
        />
      </Dialog>
    </>
  );
};
