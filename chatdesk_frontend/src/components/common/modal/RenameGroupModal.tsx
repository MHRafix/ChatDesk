import {
  Box,
  Button,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { useDispatch, useSelector } from "react-redux";
import { updateGroupDetalis } from "../../../hooks/httpServices/httpSendReq";
import { colorSchema } from "../../../utils/special";

const RenameGroupModal: React.FC<{ dependency: IModalDep }> = ({
  dependency,
}) => {
  const { show, setShow } = dependency;
  const [loading, setLoading] = useState<boolean>(false);
  const [done, setDone] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const toast = useToast();
  const dispatch = useDispatch();

  // selected chat
  const selectedChat: IOneOneChat = useSelector(
    (state: ISelectorState) => state.user_info.selected_chat
  );

  // all chats
  const allChats: IOneOneChat[] = useSelector(
    (state: ISelectorState) => state.user_info.all_chats
  );

  // loggedin user
  const loggedUser: ISignupApiRes = useSelector(
    (state: ISelectorState) => state.user_info.user_data
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

  // handle change group name
  const handleChangeName = (e: any) => {
    setLoading(true);
    const groupChats = allChats.filter(
      (chat: IOneOneChat) => chat.isGroupChat === true
    );

    const isSameName = groupChats.find(
      (chat: IOneOneChat) =>
        chat.chatName.toLowerCase() === e.target.value.toLowerCase()
    );

    if (isSameName) {
      setLoading((state: boolean) => false);
      setDone((state: boolean) => false);
      setName("");
    } else {
      setLoading((state: boolean) => false);
      setDone((state: boolean) => true);
      setName(e.target.value);
    }
  };

  // handle rename group
  const handleRenaming = () => {
    setLoading(true);
    const dependency = {
      jwt_token: loggedUser.token,
      setShow,
      setLoading,
      dispatch,
      toast,
      reqData: { chatId: selectedChat?._id, chatName: name },
      endPoint: "rename",
    };

    updateGroupDetalis(dependency);
  };

  return (
    <>
      <Modal onClose={() => setShow(false)} isOpen={show} isCentered>
        <OverlayTwo />
        <ModalContent>
          <ModalHeader fontSize={18}>Rename group name</ModalHeader>
          <ModalBody>
            <FormLabel htmlFor="label" fontSize={15} letterSpacing={1.2}>
              New Name
            </FormLabel>
            <Box w="100%" textAlign="center">
              <DebounceInput
                onChange={handleChangeName}
                debounceTimeout={800}
                style={{
                  border: done ? "1px solid #999" : "1px solid red",
                  borderRadius: "5px",
                  width: "100%",
                  padding: "5px",
                  outline: "none",
                  color: "#333",
                }}
              />

              {!done && (
                <Text
                  textAlign="left"
                  fontSize={14}
                  color={colorSchema.deepRed}
                  letterSpacing={1.1}
                  mt={1}
                >
                  Group is already exist with this name!
                </Text>
              )}

              <Button
                mt={2}
                colorScheme="whatsapp"
                letterSpacing={1.2}
                w="100%"
                isLoading={loading}
                disabled={!done || name === ""}
                onClick={() => handleRenaming()}
              >
                <Text fontSize={14}>Rename Now</Text>
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RenameGroupModal;
