import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface DynamicModalProps {
  title: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  isOpen: boolean;
  backdrop?: "opaque" | "blur" | "transparent";
  children: React.ReactNode; // Accept children
}

const CustomModal: React.FC<DynamicModalProps> = ({
  title,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isOpen,
  backdrop = "opaque",
  children, // Render the children
}) => {
  return (
    <Modal backdrop={backdrop} isOpen={isOpen} onClose={onCancel}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              {onCancel && (
                <Button color="danger" variant="light" onPress={onCancel}>
                  {cancelText}
                </Button>
              )}
              {onConfirm && (
                <Button color="primary" onPress={onConfirm}>
                  {confirmText}
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
