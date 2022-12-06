import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { storeUserData } from "../../redux/user_data/action";

// store logged in user data to redux store
export const useAuth = (): void => {
  const userCookie: string | undefined = Cookies.get("user_information");
  const dispatch = useDispatch();
  const user_info: ISignupApiRes = userCookie && JSON.parse(userCookie);

  useEffect(() => {
    dispatch(storeUserData(user_info));
  }, [user_info, dispatch]);
  return;
};

// signout function
export const authSignout = (procced: boolean): void => {
  if (procced) {
    Cookies.remove("user_information");
    Cookies.remove("selected_chat");
  }
};
