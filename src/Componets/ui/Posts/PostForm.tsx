import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
} from "@nextui-org/react";

export default function PostForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = React.useState("opaque");

  const handleOpen = (backdrop) => {
    setBackdrop(backdrop);
    onOpen();
  };

  return (
    <>
      {/* Parent Div that opens the modal */}
      <div
        onClick={() => handleOpen(backdrop)}
        className="shadow-2xl border border-gray-400 p-6 rounded-xl cursor-pointer mb-10"
      >
        <div className="flex justify-center items-center gap-10 px-5">
          <div className="h-16 w-full border dark:border-white light:border-black rounded-2xl px-5 py-2 flex items-center">
            Start a post, try writing with AI
          </div>
        </div>
      </div>

      {/* Modal with a Form */}
      <Modal backdrop={backdrop} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New Post
              </ModalHeader>
              <ModalBody>
                {/* Form Inside Modal */}
                <form>
                  <Input
                    label="Title"
                    placeholder="Enter post title"
                    fullWidth
                    clearable
                  />
                  <Input
                    label="Content"
                    placeholder="Write your post content here"
                    fullWidth
                    clearable
                    as="textarea"
                    rows={4}
                    className="mt-4"
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Post
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
