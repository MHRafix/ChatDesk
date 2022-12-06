import { useSelector } from "react-redux";
import ChatCard from "../../../../../common/Chat/ChatCard";
import SkeltonLoader from "../../../../../common/Skelton/SkeltonLoader";

const ChatFriendsArea = ({
  setInbox,
}: {
  setInbox: (state: boolean) => void;
}) => {
  const all_chats: IOneOneChat[] = useSelector(
    (state: ISelectorState) => state?.user_info?.all_chats
  );

  return (
    <>
      {all_chats?.length ? (
        <>
          {all_chats?.map((chat: IOneOneChat, i: number) => (
            <ChatCard key={i} chat_data={chat} setInbox={setInbox} />
          ))}
        </>
      ) : (
        <SkeltonLoader />
      )}
    </>
  );
};

export default ChatFriendsArea;
