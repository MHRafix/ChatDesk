import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formInputStyle } from "../../../styles/style";
import UserCard from "../Chat/UserCard";

const SearchDrawer: React.FC<{ dependency: IDisclosure }> = ({
  dependency,
}) => {
  const all_users = useSelector(
    (state: ISelectorState) => state.user_info.all_users
  );
  const [result, setResult] = useState<ISignupApiRes[]>();
  const { isOpen, onClose } = dependency;
  const handleSearchUser = (userName: string) => {
    const searchResult = all_users.filter((user: ISignupApiRes) =>
      user.user_name.toLowerCase().includes(userName.toLowerCase())
    );
    setResult(searchResult);
  };

  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search user by name</DrawerHeader>

          <DrawerBody>
            <Box>
              <input
                placeholder="Type a valid name..."
                onChange={(e: any) => handleSearchUser(e.target.value)}
                style={formInputStyle}
              />
            </Box>
            <Box>
              {result?.length ? (
                <>
                  {result?.map((user: ISignupApiRes, i: number) => (
                    <UserCard key={i} user_data={user} onClose={onClose} />
                  ))}
                </>
              ) : (
                <Text>Search your friends.</Text>
              )}
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchDrawer;
