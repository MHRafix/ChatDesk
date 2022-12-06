import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { setTimeout } from "timers";
import { authSignout } from "../../../hooks/userInfo/userAuth";
import { colorSchema } from "../../../utils/special";

const ConfirmModal: React.FC<{
  dependency: IDisclosure;
}> = ({ dependency }) => {
  const router = useRouter();
  const [procced, setProcced] = useState(false);
  const { isOpen, onClose, onOpen } = dependency;
  if (procced) {
    authSignout(procced);
    setTimeout(() => {
      Router.push("/");
    }, 2000);
  }
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <OverlayTwo />
        <ModalContent
          justifyContent="between"
          alignItems="center"
          display="flex"
        >
          <ModalBody>
            <Box textAlign="center" marginY={3}>
              <Text display="flex" alignItems="center" justifyContent="center">
                <VscSignOut size={35} color="red" />
              </Text>
              <Text marginY={2} color={colorSchema.deepRed} letterSpacing={1.2}>
                Logout Request!
              </Text>
            </Box>
            <Text color="whatsapp.400" letterSpacing={1.2}>
              Are you sure to be looged out?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button
              borderRadius={100}
              w="120px"
              colorScheme="whatsapp"
              onClick={onClose}
            >
              No
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button
              borderRadius={100}
              w="120px"
              colorScheme="red"
              onClick={() => {
                setProcced(true);
                onClose();
              }}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModal;
