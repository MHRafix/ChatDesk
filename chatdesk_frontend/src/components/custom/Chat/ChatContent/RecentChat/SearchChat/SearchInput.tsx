import { Flex } from "@chakra-ui/react";
import React from "react";
import { BiSearch } from "react-icons/bi";

const SearchInput: React.FC = () => {
  const inputStyle = {
    opacity: 1,
    color: "#111",
    fontSize: 14,
    outline: "none",
    letterSpacing: 1,
    width: "90%",
    background: "#e1e1e1",
    borderTopRightRadius: "99999999px",
    borderBottomRightRadius: "99999999px",
    padding: "6px 10px",
  };
  return (
    <Flex w="100%" justifyContent="between" alignItems="center">
      <button className="btn_search">
        <BiSearch />
      </button>
      <input placeholder="Search or start chat" style={inputStyle} />
    </Flex>
  );
};

export default SearchInput;
