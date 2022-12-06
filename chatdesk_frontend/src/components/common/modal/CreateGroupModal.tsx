import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getMembersIds } from "../../../config/logics";
import avatarUploader from "../../../hooks/cloudinaryUploader/avatarUploader";
import { createGroupChat } from "../../../hooks/httpServices/httpSendReq";
import { formInputStyle } from "../../../styles/style";
import { colorSchema } from "../../../utils/special";
import SelectMembers from "../NewGroup/SelectMembers";

const CreateGroupModal: React.FC<{ dependency: IDisclosure }> = ({
  dependency,
}) => {
  const looged_user = useSelector(
    (state: ISelectorState) => state.user_info.user_data
  );
  const all_users = useSelector(
    (state: ISelectorState) => state.user_info.all_users
  );

  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onClose, onOpen } = dependency;
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const toast = useToast();

  // handle search user
  const handleSeachUser = (e: any) => {
    const members: any = all_users.filter((user) =>
      user.user_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setUsers(members);
  };

  // selected group members
  const grpoupMembers: IMember[] = useSelector(
    (state: ISelectorState) => state.user_info.selected_members
  );

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // handle create group form
  const handleCreatGroup = async (data: any) => {
    if (grpoupMembers.length < 2) {
      toast({
        title: "Select minimum two group members!",
        status: "warning",
        position: "top",
        duration: 3000,
        isClosable: true,
      });
    } else {
      setLoading(true);

      // upload group avatar
      const { avatar_upload_cloudinary } = avatarUploader(data?.group_pic[0]);
      const group_pic = await avatar_upload_cloudinary();

      // is uploaded then proceed
      if (group_pic) {
        // create group request data obj
        const reqData: IGReq = {
          group_name: data.group_name,
          group_pic,
          users: getMembersIds(grpoupMembers),
        };

        // make dependencies of req of server
        const dependencies: IGChatCreateDep = {
          _id: looged_user?._id,
          jwt_token: looged_user?.token,
          onClose,
          setLoading,
          dispatch,
          toast,
          reqData,
        };

        // send reqto server
        createGroupChat(dependencies);

        // reset form value
        reset();
      } else {
        setLoading(false);
        toast({
          title: "Group avatar uploading faild!",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  return (
    <>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <OverlayTwo />
        <ModalContent
          justifyContent="between"
          alignItems="center"
          display="flex"
        >
          <ModalBody w="100%">
            <Box>
              <Text
                fontWeight={700}
                fontSize={20}
                display="flex"
                alignItems="center"
                color="#444"
                letterSpacing={1.2}
              >
                Create Group Chat
              </Text>

              <Box my={3}>
                <form onSubmit={handleSubmit(handleCreatGroup)}>
                  {
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      my={2}
                    >
                      <AvatarGroup size="sm" max={2}>
                        {grpoupMembers?.map((member: IMember, i: number) => (
                          <Avatar
                            key={i}
                            name={member.id}
                            src={member.user_pic}
                          />
                        ))}
                      </AvatarGroup>

                      {loading ? (
                        <button
                          style={{
                            background: "#53e598",
                            color: "#fff",
                            padding: "8px",
                            borderRadius: "999999px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                        >
                          Creating &nbsp;
                          <Spinner size="sm" color="green.500" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          style={{
                            background: "#53e598",
                            color: "#fff",
                            padding: "8px",
                            borderRadius: "999999px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "15px",
                          }}
                        >
                          Create Group &nbsp;
                          <AiOutlineUsergroupAdd size={25} />
                        </button>
                      )}
                    </Flex>
                  }
                  <>
                    <FormLabel fontSize={15} textTransform="capitalize">
                      Group Name
                    </FormLabel>
                    <input
                      type="text"
                      style={formInputStyle}
                      {...register("group_name", {
                        required: true,
                        maxLength: 20,
                      })}
                    />
                    {errors.group_name && (
                      <Text color={colorSchema.deepRed}>
                        Group name is required!
                      </Text>
                    )}

                    <FormLabel fontSize={15} textTransform="capitalize" mt={2}>
                      group pic
                    </FormLabel>
                    <input
                      type="file"
                      {...register("group_pic", {
                        required: true,
                        maxLength: 20,
                      })}
                      style={formInputStyle}
                    />
                    {errors.group_pic && (
                      <Text color={colorSchema.deepRed}>
                        Group pic is required!
                      </Text>
                    )}

                    <Box>
                      <Text my={2}>Select Members</Text>
                      <DebounceInput
                        onChange={handleSeachUser}
                        debounceTimeout={800}
                        style={formInputStyle}
                        type="search"
                        placeholder="Search user..."
                      />

                      {users?.length ? (
                        <Box id="search_result" h={130} overflowY="scroll">
                          {users.map((user: ICUser, i: number) => (
                            <SelectMembers key={i} user_data={user} />
                          ))}
                        </Box>
                      ) : null}
                    </Box>
                  </>
                </form>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateGroupModal;
