import {
  dropMember,
  selectedChat,
  setMember,
  setNotification,
  storeAllChat,
  storeAllUser,
  storeSingleChat,
  storeUser,
} from "./action";

const initialState: IInitState = {
  user_data: {},
  all_chats: [],
  all_users: [],
  selected_chat: {},
  new_notification: [],
  selected_members: [],
};

export default function reducer(
  state = initialState,
  {
    type,
    payload,
  }: {
    type: string;
    payload:
      | ISignupApiRes
      | IOneOneChat[]
      | ISignupApiRes
      | boolean
      | IOneOneChat
      | string
      | any
      | IMember;
  }
) {
  switch (type) {
    // loggedin user
    case storeUser.STORE_USER: {
      return { ...state, user_data: payload };
    }

    // all chat
    case storeAllChat.STORE_CHATS: {
      return { ...state, all_chats: payload };
    }
    // single chat
    case storeSingleChat.STORE_SINGLE_CHAT: {
      return { ...state, all_chats: [...state.all_chats, payload] };
    }

    // all users
    case storeAllUser.STORE_USERS: {
      return { ...state, all_users: payload };
    }

    // selected chat
    case selectedChat.STORE_SELECTED_CHAT: {
      return { ...state, selected_chat: payload };
    }

    // selected chat
    case setNotification.STORE_NOTIFICATION: {
      return {
        ...state,
        new_notification: [...state.new_notification, payload],
      };
    }

    // selected members
    case setMember.STORE_MEMBER: {
      return {
        ...state,
        selected_members: [payload, ...state?.selected_members],
      };
    }

    // remove members
    case dropMember.REMOVE_MEMBER: {
      if (state.selected_members.length === 1) {
        return {
          ...state,
          selected_members: [],
        };
      } else {
        const updatedMembers = state.selected_members.filter(
          (member: IMember) => member.id !== payload.id
        );

        return {
          ...state,
          selected_members: updatedMembers,
        };
      }
    }

    default:
      return state;
  }
}
