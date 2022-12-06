import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import MemberCard from "../Chat/MemberCard";

const RemoveGroupMemberModal: React.FC<{ dependency: IModalDep }> = ({
  dependency,
}) => {
  const { show, setShow } = dependency;

  // selected chat
  const selectedChat: IOneOneChat = useSelector(
    (state: ISelectorState) => state.user_info.selected_chat
  );

  // loggedin user
  const loggedUser: ISignupApiRes = useSelector(
    (state: ISelectorState) => state.user_info.user_data
  );

  // group members without admin
  const restMembers = selectedChat?.users?.filter(
    (member: ICUser) => member._id !== loggedUser._id
  );

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
          <ModalHeader fontSize={18}>Remove group member</ModalHeader>
          <ModalBody>
            <Box
              w="100%"
              textAlign="center"
              h="250px"
              overflowY="scroll"
              overflowX="hidden"
              id="remove_member_wrapper"
            >
              {restMembers?.map((member: ICUser, i: number) => (
                <MemberCard
                  key={i}
                  member={member}
                  jwt_token={loggedUser?.token}
                  chatId={selectedChat?._id}
                  setShow={setShow}
                />
              ))}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RemoveGroupMemberModal;
