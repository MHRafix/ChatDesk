import { Box } from "@chakra-ui/layout";
import { Button, Flex, Text, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import Lottie from "react-lottie";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { getSender } from "../../../../config/logics";
import { initialSelectedChat } from "../../../../config/selectChat";
import { getMessages } from "../../../../hooks/httpServices/httpSendReq";
import { flexLayout } from "../../../../styles/style";
import {
  chatLoaderOptions,
  colorSchema,
  typingAnimationOptions,
} from "../../../../utils/special";
import SearchDrawer from "../../../common/Drawer/SearchDrawer";
import GroupModalController from "../../../common/NewGroup/GroupModalController";
import ChatControlInput from "../ChatContent/ChatInbox/ChatControl/ChatControlInput";
import ScrollableChat from "../ChatContent/ChatInbox/ChatMessages/ScrollableChat";
import ChatFriend from "../ChatContent/ChatInbox/InboxHeader/ChatFriend";
import ChatFriendsArea from "../ChatContent/RecentChat/ChatFriends/ChatFriendArea";
import SearchInput from "../ChatContent/RecentChat/SearchChat/SearchInput";

const baseUrl: any = process.env.NEXT_PUBLIC_ANALYTICS_BASE_URL;
var socket: any, selectedChatCompare: any;

const ChatMain: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState<ICUser>();
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [typing, setTyping] = useState<boolean>(false);
  const [istyping, setIsTyping] = useState<boolean>(false);
  const [inbox, setInbox] = useState<boolean>();
  const [notification, setNotification] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // all chat
  const allChat: IOneOneChat[] = useSelector(
    (state: ISelectorState) => state.user_info.all_chats
  );

  initialSelectedChat(dispatch, allChat);
  // useEffect(() => {
  // 	// initial selected chat
  // 	initialSelectedChat(dispatch, allChat);
  // }, [select_id]);

  // selected chat
  const selectedChat: IOneOneChat = useSelector(
    (state: ISelectorState) => state?.user_info?.selected_chat
  );

  // logged in user
  const loggedUser: ISignupApiRes = useSelector(
    (state: ISelectorState) => state.user_info.user_data
  );

  // set selected chat
  useEffect(() => {
    if (selectedChat?.users?.length > 0) {
      const sender: ICUser = getSender(loggedUser, selectedChat?.users);
      setUser(sender);
    }
  }, [selectedChat, loggedUser]);

  const handleSendMessage = async () => {
    socket.emit("stop typing", selectedChat._id);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedUser?.token}`,
        },
      };
      setNewMessage("");
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_ANALYTICS_BASE_API_URL}/messages/send_message/${loggedUser?._id}`,
        {
          content: newMessage,
          chat_id: selectedChat,
        },
        config
      );

      socket.emit("new message", data);
      setMessages([...messages, data]);
    } catch (err: any) {
      toast({
        title: "Faild to send the message!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  // socket io initial and connect here
  useEffect(() => {
    socket = io(baseUrl);
    socket.emit("setup", loggedUser && loggedUser);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  // fetch all chat messages
  useEffect(() => {
    if (!selectedChat) {
      return;
    } else {
      getMessages(
        loggedUser?.token,
        selectedChat?._id,
        toast,
        setMessages,
        setLoading
      );

      socket.emit("join chat", selectedChat?._id);
      selectedChatCompare = selectedChat;
    }
  }, [selectedChat, loggedUser]);

  // recieved message realtime
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved: any) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare?._id !== newMessageRecieved?.chat?._id
      ) {
        // send notification
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          // setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  // typing expression handler
  const typingHandler = (e: any) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat?._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat?._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      <Box
        px={{ base: 2, sm: 4 }}
        bg={colorSchema.grayWhite}
        color={colorSchema.black}
      >
        <Box display={{ base: "block", lg: "flex" }}>
          {/* recent chat side bar  */}
          <Box
            w={{ base: "100%", lg: "25%" }}
            display={{ base: inbox ? "none" : "block", lg: "block" }}
            h="89vh"
            borderRight={colorSchema.grayBorder}
            pr={{ base: 0, sm: 2 }}
          >
            <Box h="19%">
              <Flex
                display="flex"
                justifyContent="space-between"
                marginY={{ base: 0, lg: 2 }}
                py={{ base: 2, lg: 0 }}
              >
                <Button
                  p={2}
                  onClick={onOpen}
                  letterSpacing="1px"
                  fontSize={12}
                  colorScheme="whatsapp"
                >
                  <AiOutlineMessage size={20} />
                  &nbsp; Start Chat
                </Button>

                <SearchDrawer dependency={{ isOpen, onOpen, onClose }} />
                <GroupModalController />
              </Flex>
              <SearchInput />
            </Box>
            <Box h="77%" overflowY="scroll" id="recent_friends_area" my={2}>
              <ChatFriendsArea setInbox={setInbox} />
            </Box>
          </Box>

          {/* chat inbox */}
          <Box
            w={{ base: "100%", lg: "75%" }}
            display={{ base: inbox ? "block" : "none", md: "block" }}
            h="88vh"
          >
            {/* selected chat user info area */}
            <Box
              w="100%"
              h="12%"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box
                bg={colorSchema.smokeWhite}
                p={2}
                display={{ base: "block", lg: "none" }}
                borderRadius={100}
                color="#444"
                cursor="pointer"
                _hover={{ color: "#000", transition: ".3s" }}
                onClick={() => {
                  setInbox(false);
                  Cookies.remove("selectedChat");
                }}
              >
                <BiArrowBack size={25} />
              </Box>
              <ChatFriend />
            </Box>
            {user ? (
              <Box
                borderRadius={10}
                px={2}
                h="88%"
                bg={colorSchema.smokeWhite}
                color={colorSchema.black}
                style={flexLayout}
              >
                {/* chat loading gif */}
                {loading ? (
                  <Box
                    width={{ base: "300px", lg: "400px" }}
                    height={{ base: "300px", lg: "400px" }}
                    marginX="auto"
                  >
                    <Lottie
                      options={chatLoaderOptions}
                      width="100%"
                      height="100%"
                      style={{ marginBottom: 15, marginLeft: 0 }}
                    />
                  </Box>
                ) : (
                  // chat message inbox
                  <Box id="messages">
                    <ScrollableChat messages={messages} />
                    <Box w="100%" px={0.5} marginY={1.5}>
                      {istyping && (
                        <Box width="100px" height="50px">
                          <Lottie
                            options={typingAnimationOptions}
                            width="70%"
                            height="70%"
                            style={{ marginBottom: 15, marginLeft: 0 }}
                          />
                        </Box>
                      )}
                      <ChatControlInput
                        typingHandler={typingHandler}
                        onClick={handleSendMessage}
                        message={newMessage}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            ) : (
              // chat start alert
              <Box
                borderTopLeftRadius={10}
                borderTopRightRadius={10}
                h="88%"
                p={3}
                bg={colorSchema.smokeWhite}
                color={colorSchema.black}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  textAlign="center"
                  fontSize={20}
                  letterSpacing={1}
                  color="#444"
                >
                  Click on a chat and start messaging!
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatMain;
// 1050
