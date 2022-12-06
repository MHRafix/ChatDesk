import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getReceiver } from "../../../config/logics";

const ChatProfileModal: React.FC<{ dependency: IModalDep }> = ({
  dependency,
}) => {
  const { show, setShow } = dependency;
  const [receiver, setReceiver] = useState<ICUser | any>();

  // selected chat
  const selectedChat: IOneOneChat = useSelector(
    (state: ISelectorState) => state.user_info.selected_chat
  );

  // logged in user
  const loggedUser: ISignupApiRes = useSelector(
    (state: ISelectorState) => state.user_info.user_data
  );

  // message riceiver
  useEffect(() => {
    if (selectedChat?.users?.length > 0) {
      if (selectedChat?.isGroupChat) {
        setReceiver({
          user_name: selectedChat?.chatName,
          user_pic: selectedChat?.group_pic,
          user_email: selectedChat?.groupAdmin?.user_name,
        });
      } else {
        const messageReceiver: ICUser = getReceiver(
          loggedUser,
          selectedChat?.users
        );
        setReceiver(messageReceiver);
      }
    }
  }, [selectedChat]);

  // modal overlay
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
      <Modal onClose={() => setShow(false)} isOpen={show} isCentered>
        <OverlayTwo />
        <ModalContent>
          <ModalHeader fontSize={18}>
            {receiver?.user_name}
            {"'s "} {selectedChat?.isGroupChat ? "Group" : "Profile"}
          </ModalHeader>
          <ModalBody>
            <Box w="100%" textAlign="center">
              <Image
                className="rounded-xl"
                src={receiver?.user_pic}
                alt="user_pic"
                width={100}
                height={100}
                style={{ borderRadius: "999px" }}
              />
              <Text fontSize={18} fontWeight={600}>
                {receiver?.user_name}
              </Text>

              <Text
                fontSize={15}
                fontWeight={500}
                color="#c5c5c5"
                cursor="none"
              >
                {receiver?.user_email}
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatProfileModal;
