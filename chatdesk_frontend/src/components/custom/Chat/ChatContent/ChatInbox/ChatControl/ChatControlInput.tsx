import { Box, Flex, FormControl, Input } from "@chakra-ui/react";
import React from "react";
import { FiSend } from "react-icons/fi";

const ChatControlInput: React.FC<{
  typingHandler: (e: any) => void;
  onClick: () => void;
  message: string;
}> = ({ typingHandler, onClick, message }) => {
  const inputStyle = {
    opacity: 1,
    color: "#111",
    fontSize: 14,
    outline: "none",
    letterSpacing: 1,
    width: "100%",
    background: "#e1e1e1",

    padding: "10px",
    marginBottom: "5px",
  };
  return (
    <>
      <Box w="100%">
        <Flex
          w="100%"
          justifyContent="center"
          alignItems="center"
          mx="auto"
          textAlign="center"
        >
          <FormControl
            w="100%"
            justifyContent="center"
            alignItems="center"
            mx="auto"
            textAlign="center"
          >
            <Input
              borderRadius="99999999px"
              placeholder="Type a message..."
              style={inputStyle}
              onChange={(e: any) => typingHandler(e)}
            />
            <button
              className="btn_send"
              type="submit"
              onClick={() => onClick()}
              disabled={message ? false : true}
              style={{
                backgroundColor: message ? "#3cc9f7" : "",
              }}
            >
              <FiSend
                size={25}
                style={{ marginTop: "2px", marginRight: "2px" }}
              />
            </button>
          </FormControl>
        </Flex>
      </Box>
    </>
  );
};

export default ChatControlInput;
{
  /* <Box w='6%' style={flexLayout}>
				<IconButton
					bg={colorSchema.deepGreen}
					color={colorSchema.black}
					borderRadius={100}
					aria-label='voice'
					size='xs'
					icon={<BsEmojiFrown size={15} />}
				/>
				<IconButton
					bg={colorSchema.deepGreen}
					color={colorSchema.black}
					borderRadius={100}
					aria-label='voice'
					size='xs'
					icon={<BiImageAdd size={15} />}
				/>
			</Box> */
}
{
  /* <Box w='2%'>
				<IconButton
					bg={colorSchema.deepGreen}
					color={colorSchema.black}
					borderRadius={100}
					aria-label='voice'
					size='xs'
					icon={<MdSettingsVoice size={15} />}
				/>
			</Box> */
}
