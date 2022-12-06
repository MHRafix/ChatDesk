import Cookies from "js-cookie";
import type { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ChatMain from "../../components/custom/Chat/ChatMain";
import { getData } from "../../hooks/httpServices/httpSendReq";

const Chat: NextPage = () => {
  // take user info
  const userCookie: string | undefined = Cookies.get("user_information");
  const user: ISignupApiRes = userCookie && JSON.parse(userCookie);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user?.user_email) {
      Router.push("/");
    }
  }, [user?.user_email]);

  // send req to server for all user data
  useEffect(() => {
    getData(user?.token, user?._id, dispatch, `fetch_chat/${user?._id}`);
  }, []);

  return (
    <>
      <ChatMain />
    </>
  );
};

export default Chat;
