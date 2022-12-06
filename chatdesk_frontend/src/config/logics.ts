// get message sender
export const getSender = (loggedUser: ISignupApiRes, users: ICUser[]) => {
  return users[0]?._id === loggedUser?._id ? users[1] : users[0];
};

// get message receiver
export const getReceiver = (loggedUser: ISignupApiRes, users: ICUser[]) => {
  return users[1]?._id === loggedUser?._id ? users[0] : users[1];
};

// is sender is same
export const isSameSender = (
  messages: any,
  m: any,
  i: number,
  userId: string | undefined
) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

// define last message
export const isLastMessage = (
  messages: any,
  i: number,
  userId: string | undefined
) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

// sender margin
export const isSameSenderMargin = (
  messages: any,
  m: any,
  i: number,
  userId: string | undefined
) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

// is both user same
export const isSameUser = (messages: any, m: any, i: number) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

// get selected members ids
export const getMembersIds = (members: IMember[]) => {
  let membersId: string[] = [];

  members.map((member: IMember) => membersId.push(member.id));

  return membersId;
};
