import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonCircle,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { useSelector } from "react-redux";
import { getSender } from "../../../../../../config/logics";
import {
  flexLayout,
  name_heading,
  small_text,
} from "../../../../../../styles/style";
import { colorSchema } from "../../../../../../utils/special";
import AddMemberModal from "../../../../../common/modal/AddMemberModal";
import ChatProfileModal from "../../../../../common/modal/ChatProfileModal";
import RemoveGroupMemberModal from "../../../../../common/modal/RemoveGroupMemberModal";
import RenameGroupModal from "../../../../../common/modal/RenameGroupModal";

const ChatFriend: React.FC = () => {
  const [user, setUser] = useState<ICUser>();
  const [show, setShow] = useState<boolean>(false);
  const [rename, setRename] = useState<boolean>(false);
  const [remove, setRemove] = useState<boolean>(false);
  const [add, setAdd] = useState<boolean>(false);

  // selected chat
  const selectedChat: IOneOneChat = useSelector(
    (state: ISelectorState) => state?.user_info?.selected_chat
  );

  // loggedin user
  const logged_user: ISignupApiRes = useSelector(
    (state: ISelectorState) => state.user_info.user_data
  );

  // selected chat sender user
  useEffect(() => {
    if (selectedChat?.users?.length > 0) {
      const this_data: ICUser = getSender(logged_user, selectedChat?.users);
      setUser(this_data);
    }
  }, [selectedChat, logged_user]);

  const date = new Date(selectedChat?.last_message?.createdAt);
  const messageTime = date.getDate() + " " + date.toLocaleString();
  return (
    <>
      {/* chat user profile modal */}
      <ChatProfileModal dependency={{ show, setShow }} />
      <RenameGroupModal
        dependency={{
          show: rename,
          setShow: setRename,
        }}
      />

      <RemoveGroupMemberModal
        dependency={{ show: remove, setShow: setRemove }}
      />

      <AddMemberModal dependency={{ show: add, setShow: setAdd }} />

      {user ? (
        <Box style={flexLayout}>
          <Box style={flexLayout}>
            {user && (
              <Image
                src={
                  selectedChat?.isGroupChat
                    ? selectedChat?.group_pic
                    : user?.user_pic
                }
                alt="user_pic"
                width={40}
                height={40}
                style={{ borderRadius: "100px" }}
              />
            )}
          </Box>
          <Box mx={1.5}>
            <Text style={name_heading} color="#000 !important">
              {selectedChat?.isGroupChat
                ? selectedChat?.chatName
                : user?.user_name}
            </Text>
            <Text
              fontSize={small_text.fontSize}
              style={small_text}
              color="#444 !important"
            >
              Last seen&nbsp;
              {messageTime.slice(14, 19) + " " + messageTime.slice(23, 25)}
            </Text>
          </Box>
        </Box>
      ) : (
        <Box w="100px" height="45px">
          <SkeletonCircle size="5" />
          <SkeletonText mt={1} noOfLines={2} spacing="1" />
        </Box>
      )}
      {selectedChat?.users?.length > 0 && (
        <Box>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<BsThreeDotsVertical size={22} />}
              variant="outline"
            />
            <MenuList>
              <MenuItem
                color="#242626"
                fontWeight={600}
                letterSpacing={1.2}
                fontSize={14}
                icon={<FaUserCircle size={20} color={colorSchema.deepGreen} />}
                onClick={() => setShow((state: boolean) => true)}
              >
                View {selectedChat.isGroupChat ? "Group" : "Profile"}
              </MenuItem>
              {selectedChat.isGroupChat && (
                <>
                  <MenuItem
                    color="#242626"
                    fontWeight={600}
                    letterSpacing={1.2}
                    fontSize={14}
                    icon={<AiOutlineEdit size={20} color="#FEDE57" />}
                    onClick={() => setRename((state: boolean) => true)}
                  >
                    Rename Group
                  </MenuItem>
                  <MenuItem
                    color="#242626"
                    fontWeight={600}
                    letterSpacing={1.2}
                    fontSize={14}
                    icon={<HiUserAdd size={20} color={colorSchema.skyBlue} />}
                    onClick={() => setAdd((state: boolean) => true)}
                  >
                    Add Member
                  </MenuItem>
                  <MenuItem
                    color="#242626"
                    fontWeight={600}
                    letterSpacing={1.2}
                    fontSize={14}
                    icon={
                      <HiUserRemove size={20} color={colorSchema.deepRed} />
                    }
                    onClick={() => setRemove((state: boolean) => true)}
                  >
                    Remove Member
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </Box>
      )}
    </>
  );
};

export default ChatFriend;
