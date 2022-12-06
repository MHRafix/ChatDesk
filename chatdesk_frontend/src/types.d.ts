interface IMember {
  id: string;
  user_pic: string;
}

// recent chat user interface
interface ICUser {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user_email: string;
  user_name: string;
  user_pic: string;
  user_role: boolean;
  __v: number;
}

interface IGReq {
  group_name: string;
  group_pic: string;
  users: string[];
}

// one one chat interface
interface IOneOneChat {
  _id: string;
  chatName: string;
  createdAt: string;
  isGroupChat: boolean;
  updatedAt: string;
  last_message?: any;
  groupAdmin?: ICUser;
  group_pic?: string | undefined | StaticImport;
  users: ICUser[];
  __v: number;
}

// initial state of reducer interface
interface IInitState {
  user_data: ISignupApiRes | any;
  selected_chat: IOneOneChat | any;
  all_chats: IOneOneChat[];
  all_users: ISignupApiRes[];
  new_notification: any;
  selected_members: IMember[];
}

// interface of chat
interface IChatUsers {
  _id: string;
  user_name: string;
  user_email: string;
  user_password: string;
  user_pic: string;
  last_message?: string;
}

// redux selector state interface
interface ISelectorState {
  user_info: {
    all_chats: IOneOneChat[];
    all_users: ISignupApiRes[];
    user_data: ISignupApiRes;
    selected_chat: IOneOneChat;
    selected_members: IMember[];
  };
}

// chat interface
interface IChat {
  isGroupChat: boolean;
  users: [
    {
      name: string;
      email: string;
    }
  ];
  _id: string;
  chatName: string;
}

// interface of login
interface ILoginData {
  _id?: string;
  user_email: string;
  user_password: string;
}

// interface of signup
interface ISignupData {
  user_name: string;
  user_email: string;
  user_password: string;
  cnf_password: string;
}

// color schema interface
interface IColorType {
  grayShadow: string;
  green: string;
  deepGreen: string;
  skyBlue: string;
  white: string;
  black: string;
  grayBorder: string;
  grayDark: string;
  grayBlack: string;
  smokeWhite: string;
  grayWhite: string;
  smokeDark: string;
  deepRed: string;
}

// interface UserDetails
interface IUserDetails {
  user_name: string;
  user_pic: blur;
  last_seen: string;
}

// text style interface
interface IText {
  fontSize: string | number;
  letterSpacing: string | number;
  color: string;
  fontWeight?: number;
  fontFamilly?: string;
}

// flex layout interface
interface IFlex {
  display: string;
  justifyContent: string;
  alignItems: string;
}

// toast interface
interface IToast {
  type: string;
  text: string;
}

interface ITostConfig {
  title: string;
  position: string;
  status: string;
  isClosable: boolean;
}

// login return interface
interface ILoginReturn {
  initialValues: ILoginData;
  validationSchema: any;
  onSubmit: (
    valuse: ILoginData,
    { resetForm }: { resetForm: () => void }
  ) => void;
  processing: boolean;
}

interface ISignupReturn {
  initialValues: ISignupData;
  validationSchema: any;
  onSubmit: (
    valuse: ISignupData,
    { resetForm }: { resetForm: () => void }
  ) => void;
  processing: boolean;
  setUserpic: (state: IImageFiles | any) => void;
}

// text field interface
interface ITextField {
  type?: string;
  name: string;
  label: string;
}

// signin api res interface
interface ISigninApiResData {
  _id?: string;
  user_name: string;
  user_email: string;
  user_role: boolean;
  user_pic: string;
  success: string;
  token: string | undefined;
}

// api user interface
interface IApiUser {
  _id: string;
  user_name: string;
  user_email: string;
  user_password: string;
  user_role: boolean;
  user_pic: string;
}

interface ISignupApiUser {
  _id?: string;
  user_name: string;
  user_email: string;
  user_password: string;
  user_role: boolean;
  user_pic: string;
  success: string;
  token: string | undefined;
}

interface ISignupApiRes {
  _id?: string;
  user_name: string;
  user_email: string;
  user_role: boolean;
  user_pic: string;
  success: string;
  token: string | undefined;
}

interface IAuthResponse {
  _id: string;
  user_name: string;
  user_email: string;
  user_role: boolean;
  user_pic: string;
  success?: string;
  token: string | undefined;
  error?: string;
}

// post req sender
interface IReqSenderPr {
  req_data: ILoginData | ISignupFullData;
  resetForm: (values: { values: string }) => void;
  setProcessing: (state: boolean) => void;
  api_url: string;
  router: any;
  toast: any;
}

// interfaceof image file
interface IImageFiles {
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
  lastModified: number;
  lastModifiedDate: any;
}

interface IFileField {
  name: string;
  label: string;
  setState: (state: IImageFiles | any) => void;
}

interface ISignupFullData {
  user_name: string;
  user_email: string;
  user_password: string;
  user_role: boolean;
  user_pic: string;
}

interface IUserInfo {
  _id: string;
  user_name: string;
  user_email: string;
  user_pic: string;
  user_role: boolean;
  token: string | undefined;
}

// chakra disclosure interface
interface IDisclosure {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  // setProcced: (state: boolean) => void;
}

interface IModalDep {
  show: boolean;
  setShow: (state: boolean) => void;
}

interface PersistentStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: any): void;
}

interface IChatCreateDep {
  _id: string | undefined;
  uid: string | undefined;
  setLoading: (state: boolean) => void;
  jwt_token: string | undefined;
  onClose: () => void;
  dispatch: (data: any) => void;
  toast: any;
}

interface IGChatCreateDep {
  _id: string | undefined;
  setLoading: (state: boolean) => void;
  jwt_token: string | undefined;
  onClose?: any;
  dispatch: (data: any) => void;
  toast: any;
  reqData: IGReq;
  setShow?: any;
}

interface IUADet {
  _id: string | undefined;
  jwt_token: string | undefined;
  setShow: (state: boolean) => void;
  setLoadingT?: any;
  setLoading?: any;
  dispatch: any;
  toast: any;
  reqData: { name?: string; pic?: string };
  reqName: boolean;
}

interface IUGName {
  jwt_token: string | undefined;
  setShow: (state: boolean) => void;
  setLoading: (state: boolean) => void;
  dispatch: any;
  toast: any;
  reqData: { chatId: string; chatName?: string; userId?: string };
  endPoint: string;
}

interface INewMessg {
  sender: string | undefined | string[];
  content: any;
  chat: string;
}
