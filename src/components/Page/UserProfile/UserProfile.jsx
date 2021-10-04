import React from "react";
import { Avatar, Card } from "antd";
import AppButton from "../../Common/AppButton/AppButton";
import { Row, Col, Divider } from "antd";
import AppInput from "../../Common/AppInput/AppInput";
import { Input } from "antd";
import CardCustom from "../../Common/Card/Card";
import styles from "./Userprofile.module.less";
import TicketListItem from "../../TicketModal/TicketListItem";

function UserProfile() {
    const { Meta } = Card;
    const { TextArea } = Input;

    return (
        <CardCustom style={{ width: "100%" }} loading={false}>
            <Row>
                <Col xs={{ span: 24 }} lg={{ span: 5, offset: 1 }} style={{ padding: "15px" }}>
                    <CardCustom className={styles.cardContainer} loading={false}>
                        <div className={styles.profilePicContainer}>
                            <Avatar
                                className={styles.avatar}
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            />
                        </div>
                        <div className={styles.meta}>Suresh Menon</div>
                        <div className={styles.role}>Scrum Master</div>
                        <div className={styles.action}>
                            <AppButton style={{ width: "100%" }}>Upload Profile Picture</AppButton>
                        </div>
                    </CardCustom>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 10, offset: 2 }} style={{ padding: "15px" }}>
                    <CardCustom className={styles.cardContainer} loading={false}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <TicketListItem
                                label="Title"
                                Component={
                                    <AppInput
                                        placeholder="Name"
                                        isPassword={false}
                                        size="large"
                                        style={{ width: "70%" }}
                                    />
                                }
                            />
                            <Divider />
                            <TicketListItem
                                label="Phone"
                                Component={
                                    <AppInput
                                        placeholder="Phone"
                                        isPassword={false}
                                        size="large"
                                        style={{ width: "70%" }}
                                    />
                                }
                            />
                            <Divider />
                            <TicketListItem
                                label="Address"
                                Component={
                                    <AppInput
                                        placeholder="Address"
                                        isPassword={false}
                                        size="large"
                                        style={{ width: "70%" }}
                                    />
                                }
                            />
                            <Divider />
                            <TicketListItem
                                label="Phone"
                                Component={
                                    <AppInput
                                        placeholder="Phone"
                                        isPassword={false}
                                        size="large"
                                        style={{ width: "70%" }}
                                    />
                                }
                            />
                            <Divider />
                            <TicketListItem
                                label="Phone"
                                Component={
                                    <TextArea
                                        placeholder="This is your description"
                                        isPassword={false}
                                        size="large"
                                        style={{ width: "70%"}}
                                    />
                                }
                            />
                        </div>
                    </CardCustom>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 5, offset: 1 }} style={{ padding: "15px" }}>
                    <CardCustom className={styles.cardContainer} loading={false}>
                        <div className={styles.profilePicContainer}>
                            <Avatar
                                className={styles.avatar}
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            />
                        </div>
                        <div className={styles.meta}>Suresh Menon</div>
                        <div className={styles.role}>Scrum Master</div>
                        <div className={styles.action}>
                            <AppButton style={{ width: "100%" }}>Upload Profile Picture</AppButton>
                        </div>
                    </CardCustom>
                </Col>
                <Col xs={{ span: 24 }} lg={{ span: 13, offset: 1 }} style={{ marginTop: "15px" }}>
                    <CardCustom className={styles.cardContainer} loading={false}>
                        <div className={styles.profilePicContainer}>
                            <Avatar
                                style={{
                                    width: 154,
                                    height: 154,
                                    border: "1px solid #eae7e7",
                                }}
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            />
                        </div>
                        <div className={styles.meta}>
                            <b>Suresh Menon</b>
                        </div>
                        <div className={styles.role}>Scrum Master</div>
                        <div className={styles.action}>
                            <AppButton size="large">Upload Profile Pic</AppButton>
                        </div>
                    </CardCustom>
                </Col>
            </Row>
        </CardCustom>
    );
}

export default UserProfile;
