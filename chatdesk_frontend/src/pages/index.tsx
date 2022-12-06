import Cookies from "js-cookie";
import type { NextPage } from "next";
import Router from "next/router";
import { useEffect } from "react";
import AccountMain from "../components/custom/Account/AccountMain";

const AccountPage: NextPage = () => {
  // take user info
  const userCookie: string | undefined = Cookies.get("user_information");
  const user: ISignupApiRes = userCookie && JSON.parse(userCookie);

  useEffect(() => {
    if (user?.user_email) {
      // redirect to chat
      Router.push("/chat");
    }
  }, [user?.user_email]);

  return (
    <>
      <AccountMain />
    </>
  );
};

export default AccountPage;
