import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { BiCloudUpload, BiEditAlt } from "react-icons/bi";
import { FaTimes } from "react-icons/fa";
import { FcEditImage } from "react-icons/fc";
import { MdOutlineDone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import avatarUploader from "../../../hooks/cloudinaryUploader/avatarUploader";
import { updateAccInfo } from "../../../hooks/httpServices/httpSendReq";
import { colorSchema } from "../../../utils/special";

const ProfileModal: React.FC<{ dependency: IModalDep }> = ({ dependency }) => {
  const user: ISignupApiRes = useSelector(
    (state: ISelectorState) => state.user_info.user_data
  );
  const { show, setShow } = dependency;
  const [editT, setEditT] = useState<boolean>(false);
  const [input, setInput] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [editP, setEditP] = useState<boolean>(false);
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingT, setLoadingT] = useState<boolean>(false);
  const dispatch = useDispatch();
  const toast = useToast();

  // modal overlay
  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  // handle change pic
  const handleChangePic = async () => {
    setLoading(true);
    const { avatar_upload_cloudinary } = avatarUploader(pic);
    const imgUrl = await avatar_upload_cloudinary();

    if (imgUrl) {
      updateAccInfo({
        _id: user?._id,
        jwt_token: user?.token,
        setShow,
        setLoading,
        dispatch,
        toast,
        reqData: { pic: imgUrl },
        reqName: true,
      });
    } else {
      setLoading(false);

      toast({
        title: "Faild to change picture!",
        status: "error",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Modal onClose={() => setShow(false)} isOpen={show} isCentered>
        <OverlayTwo />
        <ModalContent pb={2}>
          <ModalHeader fontSize={18} pb={editP || editT ? 2 : 0}>
            My Account Details
          </ModalHeader>
          <ModalBody>
            <Box w="98%">
              <Box position="relative" textAlign="center">
                <Image
                  onMouseOver={() => setEditP((state: boolean) => !state)}
                  className="rounded-xl"
                  src={pic ? URL.createObjectURL(pic) : user?.user_pic}
                  alt="user_pic"
                  width={100}
                  height={100}
                  style={{ borderRadius: "999px" }}
                />

                {editP && (
                  <>
                    <label
                      id="input_label"
                      htmlFor="file"
                      style={{
                        width: "20px",
                        height: "20px",
                        display: "block",
                        margin: "10px auto",
                        position: "absolute",
                        bottom: "10px",
                        left: "65%",
                        zIndex: 1000,
                      }}
                    >
                      <div id="file_field_wrapper">
                        <Text
                          p={2}
                          background={colorSchema.smokeWhite}
                          cursor="pointer"
                          _hover={{
                            background: colorSchema.grayWhite,
                            transition: ".3s",
                          }}
                          position="absolute"
                          top="-12px"
                          borderRadius="999px"
                        >
                          <FcEditImage color={colorSchema.green} size={18} />
                        </Text>
                        <input
                          type="file"
                          id="file"
                          accept="image/*"
                          onChange={(e: any) => setPic(e.target.files[0])}
                        />
                      </div>
                    </label>
                    {pic && (
                      <>
                        {loading ? (
                          <Text
                            p={2}
                            background={colorSchema.green}
                            borderRadius="999px"
                            position="absolute"
                            bottom="20px"
                            left={{ md: "73%", base: "77%" }}
                            cursor="unset"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            w="30px"
                            h="30px"
                          >
                            <Spinner size="xs" color="green.500" />
                          </Text>
                        ) : (
                          <Text
                            p={2}
                            background={colorSchema.deepGreen}
                            cursor="pointer"
                            _hover={{
                              background: colorSchema.green,
                              transition: ".3s",
                            }}
                            borderRadius="999px"
                            position="absolute"
                            bottom="20px"
                            left={{ md: "73%", base: "77%" }}
                            onClick={handleChangePic}
                          >
                            <BiCloudUpload size={16} />
                          </Text>
                        )}
                      </>
                    )}
                  </>
                )}
              </Box>
              <Box position="relative" textAlign="center">
                {input ? (
                  <DebounceInput
                    value={user.user_name}
                    onChange={(e: any) => setName(e.target.value)}
                    debounceTimeout={800}
                    style={{
                      border: "1px solid #999",
                      borderRadius: "5px",
                      width: "100%",
                      padding: "5px",
                      outline: "none",
                      color: "#333",
                    }}
                  />
                ) : (
                  <Text
                    onMouseOver={() => setEditT((state: boolean) => !state)}
                    fontSize={18}
                    fontWeight={500}
                    letterSpacing={1.2}
                  >
                    {user?.user_name}
                  </Text>
                )}
                <Text
                  fontSize={15}
                  fontWeight={500}
                  color="#c5c5c5"
                  cursor="none"
                >
                  {user.user_email}
                </Text>
                {/* <audio
										src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
										// controls
										autoPlay
									></audio> */}
                {editT && (
                  <>
                    <Text
                      p={2}
                      background={colorSchema.smokeWhite}
                      cursor="pointer"
                      _hover={{
                        background: colorSchema.grayWhite,
                        transition: ".3s",
                      }}
                      borderRadius="999px"
                      position="absolute"
                      top="-35px"
                      right={{ base: "90%", md: "25px" }}
                      onClick={() => {
                        setInput((state: boolean) => !state);
                        setName("");
                      }}
                    >
                      {input ? (
                        <FaTimes color={colorSchema.deepRed} size={15} />
                      ) : (
                        <BiEditAlt color={colorSchema.green} size={15} />
                      )}
                    </Text>
                    {name && (
                      <>
                        {loadingT ? (
                          <Text
                            p={2}
                            background={colorSchema.green}
                            borderRadius="999px"
                            position="absolute"
                            top="-35px"
                            right={{ base: "77%", md: "-10px" }}
                            cursor="unset"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            w="32px"
                            h="32px"
                          >
                            <Spinner size="xs" color="green.500" />
                          </Text>
                        ) : (
                          <Text
                            p={2}
                            background={colorSchema.deepGreen}
                            cursor="pointer"
                            _hover={{
                              background: colorSchema.grayWhite,
                              transition: ".3s",
                            }}
                            borderRadius="999px"
                            position="absolute"
                            top="-35px"
                            right={{ base: "77%", md: "-10px" }}
                            onClick={() => {
                              updateAccInfo({
                                _id: user?._id,
                                jwt_token: user?.token,
                                setShow,
                                setLoadingT,
                                dispatch,
                                toast,
                                reqData: { name },
                                reqName: false,
                              });
                              setTimeout(() => {
                                setName("");
                                setInput(false);
                              }, 4000);
                            }}
                          >
                            <MdOutlineDone
                              fontWeight={700}
                              color={colorSchema.white}
                              size={15}
                            />
                          </Text>
                        )}
                      </>
                    )}
                  </>
                )}
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
