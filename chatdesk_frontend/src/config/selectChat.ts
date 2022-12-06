import Cookies from "js-cookie";
import { storeSelectedChat } from "../redux/user_data/action";

const idCookie = Cookies.get("selected_chat");

// update selected chat data
export const handleChatData = (
  data: any,
  dispatch: (chat: IOneOneChat | string | any) => void
) => {
  Cookies.set("selected_chat", JSON.stringify(data?._id));
  dispatch(storeSelectedChat(data));
};

// initial selected chat
export const initialSelectedChat = (
  dispatch: (chat: IOneOneChat | string | any) => void,
  all_chats: IOneOneChat[]
) => {
  const cookieChat: any = Cookies.get("selected_chat");
  const select_id = Cookies.get("selected_chat") && JSON.parse(cookieChat);

  if (select_id) {
    const selected_chat: any = all_chats?.find(
      (chat: IOneOneChat) => chat?._id === select_id
    );

    dispatch(storeSelectedChat(selected_chat));
  }
  return true;
};

// selected chat id
export const select_id: string = idCookie && JSON.parse(idCookie);
