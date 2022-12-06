import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import {
  storeAllChats,
  storeAllUsers,
  storeSelectedChat,
  storeSingleChatUser,
} from "../../redux/user_data/action";
import { storeUserData } from "./../../redux/user_data/action";
import httpReq from "./httpReqConfig";

// update req sender here
export const authReqSender = async (reqConfig: IReqSenderPr): Promise<void> => {
  const { req_data, resetForm, setProcessing, api_url, router, toast } =
    reqConfig;

  try {
    const data: any = await httpReq.post(
      `${process.env.NEXT_PUBLIC_ANALYTICS_BASE_API_URL}/authentication/users/${api_url}`,
      req_data
    );

    // server success
    if (data?.success) {
      Cookies.set("user_information", JSON.stringify(data), {
        expires: 30, // 30 days
        secure: true,
        sameSite: "strict",
        path: "/",
      });

      toast({
        title: data.success,
        status: "success",
        isClosable: true,
        position: "top",
        duration: 3000,
      });
      setProcessing(false);
      resetForm({ values: "" });
      setTimeout(() => {
        Router.push("/chat");
      }, 2000);

      // server error
    } else if (data.error) {
      toast({
        title: data.error,
        status: "error",
        isClosable: true,
        position: "top",
        duration: 3000,
      });
      setProcessing(false);
      resetForm({ values: "" });
    }

    // try catch error
  } catch (err: any) {
    toast({
      title: err.message,
      status: "error",
      isClosable: true,
      position: "top",
      duration: 3000,
    });
    setProcessing(false);
    resetForm({ values: "" });
  }
};

// get data
export const getData = async (
  jwt_token: string | undefined,
  user_id: string | undefined,
  dispatch: any,
  end_point: string
): Promise<any> => {
  if (jwt_token) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwt_token}`,
        },
      };

      axios
        .get(
          `${process.env.NEXT_PUBLIC_ANALYTICS_BASE_API_URL}/chats/single_chat/${end_point}`,
          config
        )
        .then((res) => {
          dispatch(storeAllChats(res?.data));
        });
      axios
        .get(
          `${process.env.NEXT_PUBLIC_ANALYTICS_BASE_API_URL}/authentication/users/all_users`,
          config
        )
        .then((res) => {
          if (res?.data) {
            const all_users = res.data.filter(
              (data: IChatUsers) => data._id !== user_id
            );
            dispatch(storeAllUsers(all_users));
          }
        });
    } catch (error: any) {
      alert(error.message);
    }
  }
};

// create new chat
export const handleCreateChat = async (dependencies: IChatCreateDep) => {
  const { _id, jwt_token, onClose, setLoading, uid, dispatch, toast } =
    dependencies;

  try {
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt_token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_ANALYTICS_BASE_API_URL}/chats/single_chat/create_chat/${uid}`,
      { user_id: _id },
      config
    );

    if (data?._id) {
      Cookies.set("selected_chat", JSON.stringify(data?._id));
      dispatch(storeSingleChatUser(data));
      setLoading(false);
      toast({
        title: "Chat successfully created!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      onClose();
    } else if (data?.error) {
      setLoading(false);
      toast({
        title: data.error,
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      onClose();
    }
  } catch (error: any) {
    setLoading(false);
    toast({
      title: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
    onClose();
  }
};

// get all messages
export const getMessages = async (
  jwt_token: string | undefined,
  chat_id: string,
  toast: any,
  setMessages: (message: string) => void,
  setLoading: (state: boolean) => void
) => {
  try {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt_token}`,
      },
    };

    if (chat_id) {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_ANALYTICS_BASE_API_URL}/messages/${chat_id}`,
        config
      );
      setMessages(data);
      setLoading(false);
    }
  } catch (err: any) {
    setLoading(false);
    toast({
      title: "Faild to load messages!",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }
};

// create new chat
export const createGroupChat = async (dependencies: IGChatCreateDep) => {
  const { _id, jwt_token, onClose, setLoading, dispatch, toast, reqData } =
    dependencies;

  try {
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt_token}`,
      },
    };
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_ANALYTICS_BASE_API_URL}/chats/group_chat/create_chat/${_id}`,
      reqData,
      config
    );

    if (data) {
      Cookies.set("selected_chat", JSON.stringify(data?._id));
      dispatch(storeSingleChatUser(data));
      setLoading(false);
      toast({
        title: "Group successfully created!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      onClose();
    }
  } catch (error: any) {
    setLoading(false);
    toast({
      title: error.message,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom-left",
    });
  }
};

// update profile info
export const updateAccInfo = async (dependencies: IUADet) => {
  const {
    _id,
    jwt_token,
    setShow,
    setLoading,
    dispatch,
    toast,
    reqData,
    setLoadingT,
    reqName,
  } = dependencies;

  try {
    if (reqName) {
      setLoading(true);
    } else {
      setLoadingT(true);
    }
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt_token}`,
      },
    };
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_ANALYTICS_BASE_API_URL}/authentication/users/update_details/${_id}`,

      reqData,
      config
    );

    if (data) {
      Cookies.set("user_information", JSON.stringify(data));
      dispatch(storeUserData(data));
      if (reqName) {
        setLoading(false);
      } else {
        setLoadingT(false);
      }
      toast({
        title: "Profile successfully updated!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setShow(false);
    }
  } catch (error: any) {
    if (reqName) {
      setLoading(false);
    } else {
      setLoadingT(false);
    }
    toast({
      title: error.message,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }
};

// update profile info
export const updateGroupDetalis = async (dependencies: IUGName) => {
  const { jwt_token, setShow, setLoading, dispatch, toast, reqData, endPoint } =
    dependencies;

  try {
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt_token}`,
      },
    };
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_ANALYTICS_BASE_API_URL}/chats/group_chat/${endPoint}`,
      reqData,
      config
    );

    if (data) {
      // Cookies.set('selected_chat', JSON.stringify(data?._id));
      dispatch(storeSelectedChat(data));
      setLoading(false);
      toast({
        title: data.successMssg,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      setShow(false);
    } else if (data.error) {
      setLoading(false);
      toast({
        title: "Faild to update group!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  } catch (error: any) {
    setLoading(false);
    toast({
      title: error.message,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }
};
