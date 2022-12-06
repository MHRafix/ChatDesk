import {
  Box,
  Flex,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useDisclosure,
  WrapItem,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { MdOutlineNotifications } from "react-icons/md";
import { useSelector } from "react-redux";
import Logo from "../../../assets/images/logo_icons/logo.png";
import { colorSchema } from "../../../utils/special";
import ConfirmModal from "../modal/ConfirmModal";
import ProfileModal from "../modal/ProfileModal";

const Header: React.FC = () => {
  const user_info = useSelector((state: any) => state.user_info.user_data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState<boolean>(false);

  return (
    <Box
      w="100%"
      py={{ base: 2, sm: 1 }}
      px={{ base: 2, sm: 6 }}
      color={colorSchema.black}
      bg={colorSchema.smokeWhite}
    >
      <ConfirmModal dependency={{ isOpen, onOpen, onClose }} />
      <ProfileModal dependency={{ show, setShow }} />
      <Flex alignItems="center">
        <Box>
          <Flex alignItems="center" cursor="pointer">
            <Box
              width={{ base: "35px", sm: "45px" }}
              height={{ base: "35px", sm: "45px" }}
            >
              <Image src={Logo} alt="logo" width={100} height={100} />
            </Box>
            &nbsp;
            <Heading
              as="h3"
              size={{ base: "lg", sm: "xl" }}
              letterSpacing={1.5}
            >
              <Flex alignItems="center">
                <Text color={colorSchema.green}>Chat</Text>
                <Text color={colorSchema.skyBlue}>Desk</Text>
              </Flex>
            </Heading>
          </Flex>
        </Box>
        <Spacer />
        <Box>
          <Flex alignItems="center" justifyContent="between">
            <WrapItem marginX={{ base: 1, sm: 3 }} cursor="pointer">
              <Icon
                w={6}
                h={6}
                color={colorSchema.black}
                aria-label="setting_icon"
                rounded="full"
                as={HiOutlineLightBulb}
              />
            </WrapItem>
            <WrapItem marginX={{ base: 1, sm: 3 }} cursor="pointer">
              <Icon
                w={6}
                h={6}
                color={colorSchema.black}
                aria-label="setting_icon"
                rounded="full"
                as={MdOutlineNotifications}
              />
            </WrapItem>
            <WrapItem marginInlineStart={{ base: 1, sm: 3 }} cursor="pointer">
              <Menu>
                <MenuButton
                  style={{ marginTop: "8px" }}
                  width={{ base: 35, sm: 45 }}
                  height={{ base: 35, sm: 45 }}
                >
                  {user_info?.user_pic && (
                    <Image
                      src={user_info?.user_pic}
                      alt="user_pic"
                      width={45}
                      height={45}
                      style={{ borderRadius: "99999999px" }}
                    />
                  )}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    color="#242626"
                    fontWeight={600}
                    letterSpacing={1.2}
                    fontSize={14}
                    onClick={() => setShow(true)}
                    icon={
                      <FaUserCircle size={20} color={colorSchema.deepGreen} />
                    }
                  >
                    My Profile
                  </MenuItem>

                  <MenuItem
                    color="#242626"
                    fontWeight={600}
                    letterSpacing={1.2}
                    fontSize={14}
                    onClick={() => {
                      onOpen();
                    }}
                    icon={
                      <FaSignOutAlt size={20} color={colorSchema.deepRed} />
                    }
                  >
                    Logout Now
                  </MenuItem>
                </MenuList>
              </Menu>
            </WrapItem>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
