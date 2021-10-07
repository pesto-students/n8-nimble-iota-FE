import React from "react";
import { useSelector } from "react-redux";
import { Avatar, Card } from "antd";
import { Row, Col, Divider } from "antd";
import { Input } from "antd";
import styles from "src/components/Page/UserProfile/Userprofile.module.less";
import CardCustom from "src/components/Common/Card/Card";
import TicketListItem from "src/components/TicketModal/TicketListItem";
import AppButton from "src/components/Common/AppButton/AppButton";
import AppInput from "src/components/Common/AppInput/AppInput";
import { CheckCircleTwoTone, TrophyTwoTone } from "@ant-design/icons";
import CustomTag from "src/components/Common/CustomTag/CustomTag";
import { colors } from "src/config/constants";

function UserProfile() {
    const { TextArea } = Input;
    const { user } = useSelector((state) => state.user);

    const name = user ? user.name : "";
    const role = user ? user.role.name : "";
    const email = user ? user.email : "";
    const selfintro = user ? user.selfintro : "";
    const location = user ? user.location : ""
    const phone = user ? user.phone : ""

    return (
        <CardCustom style={{ width: "100%" }} loading={false}>
            <Row>
                <Col xs={{ span: 24 }} lg={{ span: 7, offset: 1 }} style={{ padding: "15px" }}>
                    <CardCustom className={styles.cardContainer} loading={false}>
                        <div className={styles.profilePicContainer}>
                            <Avatar
                                className={styles.avatar}
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            />
                        </div>
                        <div className={styles.meta}>{name}</div>
                        <div className={styles.role}>{role}</div>
                        <div className={styles.action}>
                            <AppButton style={{ width: "100%" }}>Upload Profile Picture</AppButton>
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
                                        value={email}
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
                                        value={location}
                                    />
                                }
                            />
                            <Divider className={styles.dividerStyle} />
                            <TicketListItem
                                label="Description"
                                Component={
                                    <TextArea
                                        placeholder="This is your description"
                                        isPassword={false}
                                        size="large"
                                        style={{ width: "70%" }}
                                        value={selfintro}
                                    />
                                }
                            />
                        </div>
                    </CardCustom>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 7, offset: 1 }} style={{ padding: "15px" }}>
                    <CardCustom className={styles.cardContainer} loading={false}>
                        <div className={styles.profilePicContainer}>
                            <TrophyTwoTone style={{ fontSize: "150px" }} />
                        </div>
                        <div className={styles.meta}>Subscription</div>
                        <div className={styles.role}>Premium</div>
                        <div className={styles.action}>
                            <AppButton disabled={true} style={{ width: "100%" }}>
                                Update Subscption
                            </AppButton>
                        </div>
                    </CardCustom>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 13, offset: 2 }} style={{ padding: "15px" }}>
                    <CardCustom className={styles.cardContainer} loading={false}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <TicketListItem label="View My Projects" Component={<></>} />
                            <Divider className={styles.dividerStyle} />
                            <TicketListItem
                                label="Default Project"
                                Component={
                                    <>
                                        <CustomTag color={colors.tagBlue} text={"Click to Open"}/>
                                    </>
                                }
                            />
                        </div>
                    </CardCustom>
                </Col>
            </Row>
        </CardCustom>
    );
}

export default UserProfile;
