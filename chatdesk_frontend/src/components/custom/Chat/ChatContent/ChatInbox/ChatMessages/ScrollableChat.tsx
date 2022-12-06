import { Avatar, Box, Tooltip } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../../../../../config/logics";

const ScrollableChat: React.FC<{ messages: any[] }> = ({ messages }) => {
  const user = useSelector(
    (state: ISelectorState) => state.user_info.user_data
  );

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div
            id="message_feed"
            style={{ display: "flex", overflowY: "hidden" }}
            key={m._id}
          >
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip
                label={m.sender.user_name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m?.sender?.user_name}
                  src={m?.sender?.user_pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#8BECBB" : "#3CC9F7"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                fontSize: 15,
              }}
            >
              {m?.content}
            </span>
          </div>
        ))}
      {!messages?.length && (
        <Box
          w="100%"
          h="100%"
          fontSize="lg"
          display="flex"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          color="#444"
          letterSpacing={1}
        >
          You have no conversation...!
        </Box>
      )}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
