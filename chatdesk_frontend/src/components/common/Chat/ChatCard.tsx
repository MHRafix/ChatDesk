import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getSender } from "../../../config/logics";
import { handleChatData, select_id } from "../../../config/selectChat";

import { name_heading, small_text } from "../../../styles/style";
import { colorSchema } from "../../../utils/special";

const ChatCard = ({
  chat_data,
  setInbox,
}: {
  chat_data: IOneOneChat;
  setInbox: (state: boolean) => void;
}) => {
  const { chatName, isGroupChat, users, group_pic } = chat_data;

  // loggedin user
  const loggedUser: ISignupApiRes = useSelector(
    (state: ISelectorState) => state.user_info.user_data
  );

  // get sender user
  const userData = getSender(loggedUser, users);
  const dispatch = useDispatch();

  // const date = new Date(chat_data?.createdAt);
  // const messageTime = date.getDate() + " " + date.toLocaleString();
  return (
    <Box
      h="70px"
      display="flex"
      alignItems="center"
      justifyContent="between"
      cursor="pointer"
      borderRadius={5}
      p={1}
      bg={
        chat_data?._id === select_id
          ? colorSchema.deepGreen
          : colorSchema.grayWhite
      }
      shadow="xs"
      marginX={1}
      marginBottom={2}
      marginTop={0.5}
      id="chat_user_card"
      onClick={() => {
        setInbox(true);
        handleChatData(chat_data, dispatch);
      }}
    >
      <Flex alignItems="center" w="16%">
        <Image
          src={isGroupChat ? group_pic : userData?.user_pic}
          alt="user_pic"
          width={35}
          height={35}
          style={{ borderRadius: "9999999px" }}
        />
      </Flex>

      <Box mx={1.5} w="60%">
        <Text style={name_heading} textTransform="capitalize">
          {!isGroupChat ? userData?.user_name.slice(0, 7) : chatName}
        </Text>
        <Text fontSize={small_text.fontSize} style={small_text}>
          {chat_data?.last_message?.content.slice(0, 15)}
          {chat_data?.last_message?.content && "..."}
        </Text>
      </Box>
      <Box ml={2} w="24%" textAlign="right">
        {/* <Text fontSize='10px' style={small_text}>
					{messageTime.slice(14, 19) + ' ' + messageTime.slice(23, 25)}
				</Text> */}
        <Badge variant="solid" bg={colorSchema.deepGreen}>
          <Text fontSize="10px" letterSpacing={0.5}></Text>
        </Badge>
      </Box>
    </Box>
  );
};

export default ChatCard;
