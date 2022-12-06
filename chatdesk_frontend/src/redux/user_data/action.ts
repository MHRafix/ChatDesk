/**
 * redux types
 */

// store logged in user type
export const storeUser: { STORE_USER: string } = {
  STORE_USER: "STORE_USER",
};

// all chats data
export const storeAllChat: { STORE_CHATS: string } = {
  STORE_CHATS: "STORE_CHATS",
};

// single chat data
export const storeSingleChat: { STORE_SINGLE_CHAT: string } = {
  STORE_SINGLE_CHAT: "STORE_SINGLE_CHAT",
};

// all users data
export const storeAllUser: { STORE_USERS: string } = {
  STORE_USERS: "STORE_USERS",
};

// all users data
export const selectedChat: { STORE_SELECTED_CHAT: string } = {
  STORE_SELECTED_CHAT: "STORE_SELECTED_CHAT",
};

// notification type
export const setNotification: { STORE_NOTIFICATION: string } = {
  STORE_NOTIFICATION: "STORE_NOTIFICATION",
};

// add member type
export const setMember: { STORE_MEMBER: string } = {
  STORE_MEMBER: "STORE_MEMBER",
};

// add member type
export const dropMember: { REMOVE_MEMBER: string } = {
  REMOVE_MEMBER: "REMOVE_MEMBER",
};

/**
 * redux actions
 */

// store loggedin user data action
export const storeUserData = (
  user: ISignupApiRes
): { type: string; payload: ISignupApiRes } => {
  return { type: storeUser.STORE_USER, payload: user };
};

// store all chats data action
export const storeAllChats = (
  chats: IOneOneChat[]
): { type: string; payload: IOneOneChat[] } => {
  return { type: storeAllChat.STORE_CHATS, payload: chats };
};

// single chat
export const storeSingleChatUser = (
  chat: IOneOneChat
): { type: string; payload: IOneOneChat } => {
  return { type: storeSingleChat.STORE_SINGLE_CHAT, payload: chat };
};

// store all users data action
export const storeAllUsers = (
  users: ISignupApiRes[]
): { type: string; payload: ISignupApiRes[] } => {
  return { type: storeAllUser.STORE_USERS, payload: users };
};

// store all users data action
export const storeSelectedChat = (
  chat: IOneOneChat | string
): { type: string; payload: IOneOneChat | string } => {
  return { type: selectedChat.STORE_SELECTED_CHAT, payload: chat };
};

// store all users data action
export const storeNewNotification = (
  notification: any
): { type: string; payload: any } => {
  return { type: setNotification.STORE_NOTIFICATION, payload: notification };
};

// store member data action
export const storeMember = (
  member: IMember
): { type: string; payload: IMember } => {
  return { type: setMember.STORE_MEMBER, payload: member };
};

// remove member
export const removeMember = (
  member: IMember
): { type: string; payload: IMember } => {
  return { type: dropMember.REMOVE_MEMBER, payload: member };
};
