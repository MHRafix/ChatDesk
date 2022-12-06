import ChatLoader from "../assets/images/others/chat_loader.json";
import InitialChatLoader from "../assets/images/others/initial_loader.json";
import animationData from "../components/common/loader/typing.json";

export const colorSchema: IColorType = {
  grayShadow: "0px 0px 3px 3px #e0e0e0",
  green: "#8BECBB",
  deepGreen: "#53e598",
  skyBlue: "#3CC9F7",
  white: "#ffffff",
  black: "#000000",
  grayBorder: "1px solid #eee",
  grayDark: "#161616",
  grayBlack: "#111",
  smokeWhite: "#f6f6f6",
  grayWhite: "#eee",
  smokeDark: "#080808",
  deepRed: "#FE3F55",
};

// lootify config
// typing animation
export const typingAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

// chat loader options
export const chatLoaderOptions = {
  loop: true,
  autoplay: true,
  animationData: ChatLoader,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

// chat loader options
export const initialChatLoaderOptions = {
  loop: true,
  autoplay: true,
  animationData: InitialChatLoader,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
