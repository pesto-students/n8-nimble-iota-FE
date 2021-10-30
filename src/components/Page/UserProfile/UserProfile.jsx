import { CloudUploadOutlined, TrophyTwoTone } from "@ant-design/icons";
import { Avatar, Col, Divider, Input, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppButton from "src/components/Common/AppButton/AppButton";
import AppInput from "src/components/Common/AppInput/AppInput";
import CardCustom from "src/components/Common/Card/Card";
import CustomTag from "src/components/Common/CustomTag/CustomTag";
import Mounter from "src/components/Common/Mounter/Mounter";
import styles from "src/components/Page/UserProfile/Userprofile.module.less";
import TicketListItem from "src/components/TicketModal/TicketListItem";
import { colors } from "src/config/constants";
import roles from "src/config/roles";
import { ChangeImage, getUserData, updateUserData } from "src/redux";
import { checkIfPremiumUser, getProjectFromProjectList } from "src/util/helperFunctions";
import { useRouting } from "src/util/hooks";
import { displayRazorpay } from "src/components/Page/UserProfile/Razorpay";
import Notification from "src/components/Common/Notification/Notification";
import axios from "src/service/Axios";

function UserProfile() {
    const { TextArea } = Input;
    const { user, userProfile } = useSelector((state) => state.user);
    const projects = useSelector((state) => state.projectList.projects);

    const inputFile = useRef(null);
    const [locationText, setLocationtext] = useState(userProfile?.location ?? "");
    const [introText, setIntroText] = useState(userProfile?.selfintro ?? "");
    const [phone, setPhone] = useState(userProfile?.phone ?? "");
    const { navigate, url } = useRouting();

    const updateSub = () => {
        return (
            <div className={styles.action}>
                <AppButton
                    onClick={()=>displayRazorpay(userProfile,updatePaymentRequest)}
                    disabled={checkIfPremiumUser(userProfile.subscription)}
                    style={{ width: "100%" }}
                >
                    {checkIfPremiumUser(userProfile.subscription) && "Already Subscribed"}
                    {!checkIfPremiumUser(userProfile.subscription) && "Update Subscription"}
                </AppButton>
            </div>
        );
    };
    
    const updateSubscriptionButton = Mounter(updateSub, {})(roles.scrummastersandadmins);

    const openUploadBox = () => {
        inputFile.current.click();
    };
    const handleUpload = (e) => {
        const imgToUpload = e.target.files[0];
        dispatch(ChangeImage(imgToUpload, userProfile?.email ?? "", user.id));
    };
    const dispatch = useDispatch();

    const handleLocationTextChange = (e) => setLocationtext(e.target.value);
    const handleIntroTextChange = (e) => setIntroText(e.target.value);
    const handlePhoneChange = (e) => setPhone(e.target.value);

    const handleUpdate = () => {
        dispatch(updateUserData(userProfile.name, phone, locationText, introText, user.id));
    };

    useEffect(() => {
        dispatch(getUserData(user.id));
    }, []);

    useEffect(() => {
        setIntroText(userProfile?.selfintro ?? "");
        setLocationtext(userProfile?.location ?? "");
        setPhone(userProfile?.phone ?? "");
    }, [userProfile]);


    const handleProjectClick = (pid) => {
        let urlSplit = url.split("/");
        urlSplit = urlSplit.slice(0, -1);
        const projectUrl = `${urlSplit.join("/")}/${pid}`;
        navigate(projectUrl, true);
    };

    const updatePaymentRequest = async (updatePaymentObject) => {
        const resp = await axios.post("/updatePayment", updatePaymentObject);
        if (resp.data.success) {
            dispatch(getUserData(user.id));
            return Notification("success", resp.data.message);
        } else {
            return Notification("error", "Failed to update subscription.");
        }
    };

    return (
        <CardCustom style={{ width: "100%" }} loading={false}>
            {/* <div style={{ textAlign: "right" }}>
                <a href="#">change password ?</a>
            </div> */}
            <Row>
                <Col xs={{ span: 24 }} lg={{ span: 7, offset: 1 }} style={{ padding: "15px" }}>
                    <CardCustom className={styles.cardContainer} loading={false}>
                        <div className={styles.profilePicContainer}>
                            <Avatar className={styles.avatar} src={userProfile?.imgurl ?? ""} />
                        </div>
                        <div className={styles.meta}>{userProfile?.name ?? ""}</div>
                        <div className={styles.role}>{user?.role?.name ?? ""}</div>
                        <div className={styles.action}>
                            <AppButton style={{ width: "100%", marginTop: "28px" }} onClick={openUploadBox}>
                                <CloudUploadOutlined /> Update Profile Picture
                            </AppButton>
                            <input className={styles.inputButton} ref={inputFile} type="file" onChange={handleUpload} />
                        </div>
                    </CardCustom>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 13, offset: 2 }} style={{ padding: "15px" }}>
                    <CardCustom className={styles.cardContainer} loading={false}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <TicketListItem
                                label="Email"
                                Component={
                                    <AppInput
                                        placeholder="Email"
                                        isPassword={false}
                                        size="large"
                                        style={{ width: "70%" }}
                                        value={userProfile?.email ?? ""}
                                        disabled={true}
                                    />
                                }
                            />
                            <Divider className={styles.dividerStyle} />
                            <TicketListItem
                                label="Phone"
                                Component={
                                    <AppInput
                                        placeholder="Phone"
                                        isPassword={false}
                                        size="large"
                                        style={{ width: "70%" }}
                                        value={phone}
                                        onChange={handlePhoneChange}
                                    />
                                }
                            />
                            <Divider className={styles.dividerStyle} />
                            <TicketListItem
                                label="Address"
                                Component={
                                    <AppInput
                                        placeholder="Location"
                                        isPassword={false}
                                        size="large"
                                        style={{ width: "70%" }}
                                        value={locationText}
                                        onChange={handleLocationTextChange}
                                    />
                                }
                            />
                            <Divider className={styles.dividerStyle} />
                            <TicketListItem
                                label="Description"
                                Component={
                                    <TextArea
                                        placeholder="This is your description"
                                        size="large"
                                        style={{ width: "70%" }}
                                        value={introText}
                                        onChange={handleIntroTextChange}
                                    />
                                }
                            />
                        </div>
                        <AppButton onClick={handleUpdate} style={{ float: "right", marginTop: "8px" }}>
                            Save
                        </AppButton>
                    </CardCustom>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 7, offset: 1 }} style={{ padding: "15px" }}>
                    <CardCustom className={styles.cardContainer} loading={false}>
                        <div className={styles.profilePicContainer}>
                            <TrophyTwoTone style={{ fontSize: "150px" }} />
                        </div>
                        <div className={styles.meta}>Subscription</div>
                        <div className={styles.role}>
                            {checkIfPremiumUser(userProfile.subscription) ? "Premium" : "Free Version"}
                        </div>
                        {updateSubscriptionButton}
                    </CardCustom>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 13, offset: 2 }} style={{ padding: "15px" }}>
                    <CardCustom className={styles.cardContainer} loading={false}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <TicketListItem label="View My Projects" Component={<></>} />
                            <Divider className={styles.dividerStyle} />
                            {userProfile.projects?.map((pid, index) => {
                                const projectItem = getProjectFromProjectList(projects, pid);
                                return (
                                    projectItem && (
                                        <TicketListItem
                                            key={index}
                                            label={projectItem?.projectName ?? ""}
                                            Component={
                                                <>
                                                    <CustomTag
                                                        color={colors.tagBlue}
                                                        text={"Click to Open"}
                                                        onClick={() => {
                                                            handleProjectClick(pid);
                                                        }}
                                                    />
                                                </>
                                            }
                                        />
                                    )
                                );
                            })}
                        </div>
                    </CardCustom>
                </Col>
            </Row>
        </CardCustom>
    );
}

export default UserProfile;
