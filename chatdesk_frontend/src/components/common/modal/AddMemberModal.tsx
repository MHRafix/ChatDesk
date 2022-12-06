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
import AddMemberCard from "../Chat/AddMemberCard ";

const AddMemberModal: React.FC<{ dependency: IModalDep }> = ({
  dependency,
}) => {
  const { show, setShow } = dependency;

  // selected chat
  const selectedChat: IOneOneChat = useSelector(
    (state: ISelectorState) => state.user_info.selected_chat
  );

  //logged user
  const loggedUser: ISignupApiRes = useSelector(
    (state: ISelectorState) => state.user_info.user_data
  );

  // all users
  const allUsers = useSelector(
    (state: ISelectorState) => state.user_info.all_users
  );

  // // users without added members
  // var restUsers: ISignupApiRes[];

  // // selectedChat?.users.filter((chatUser: ICUser) => {
  // for (let chatUser of selectedChat?.users) {
  // 	// const restUsers = allUsers?.filter((user: ICUser) => user._id !== chatUser._id);
  // 	restUsers = allUsers?.filter(
  // 		(user: ISignupApiRes) => user?._id !== chatUser?._id
  // 	);

  // 	// restUsers = filteredUsers;
  // 	// });
  // }

  // console.log('all', allUsers);
  // console.log('rest', restUsers);

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
          <ModalHeader fontSize={18}>Add group member</ModalHeader>
          <ModalBody>
            <Box
              w="100%"
              textAlign="center"
              h="250px"
              overflowY="scroll"
              overflowX="hidden"
              id="add_member_wrapper"
            >
              {allUsers?.map((member: ISignupApiRes, i: number) => (
                <AddMemberCard
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

export default AddMemberModal;
