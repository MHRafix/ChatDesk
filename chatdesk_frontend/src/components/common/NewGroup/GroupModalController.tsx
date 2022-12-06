import { Button, useDisclosure } from "@chakra-ui/react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import CreateGroupModal from "../modal/CreateGroupModal";

const GroupModalController = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        p={2}
        onClick={onOpen}
        letterSpacing="1px"
        fontSize={12}
        colorScheme="facebook"
      >
        <AiOutlineUsergroupAdd size={22} /> &nbsp; New Group
      </Button>
      <CreateGroupModal dependency={{ isOpen, onOpen, onClose }} />
    </>
  );
};

export default GroupModalController;
