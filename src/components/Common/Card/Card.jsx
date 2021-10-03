import { Avatar, Card } from "antd";
import React from "react";
import styles from "./card.module.less";
import AppButton from "../AppButton/AppButton";
import { Row, Col, Divider } from "antd";
import AppInput from "../AppInput/AppInput";
import { Input } from "antd";

function CardCustom() {
    const { Meta } = Card;
    const { TextArea } = Input;

    return (
        <>
            <Row>
                <div
                    style={{
                        height: "100vh",
                        width: "300px",
                        backgroundColor: "#111C56",
                    }}
                >
                    test{" "}
                </div>
                <Row style={{ width: `calc(100% - 300px)` }}>
                    <Col xs={{ span: 24 }} lg={{ span: 8, offset: 1 }} style={{ marginTop: "15px" }}>
                        <Card className={styles.cardContainer} loading={false}>
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
                        </Card>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 13, offset: 1 }} style={{ marginTop: "15px" }}>
                        <Card loading={false} style={{ height: "100%" }}>
                            <div style={{display: "flex",flexDirection: "column",}}>
                                <div
                                    style={{
                                        display: "flex",
                                        height: "20%",
                                        marginBottom: "20px",
                                        alignContent: "center",
                                    }}
                                >
                                    <div
                                        style={{
                                            width: "30%",
                                            fontSize: "20px",
                                        }}
                                    >
                                        <b> Email</b>
                                    </div>
                                    <div
                                        style={{
                                            width: "70%",
                                            fontSize: "20px",
                                        }}
                                    >
                                        <AppInput
                                            placeholder="Name"
                                            isPassword={false}
                                            size="large"
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                </div>
                                <Divider />

                                <div
                                    style={{
                                        display: "flex",
                                        height: "20%",
                                        marginBottom: "20px",
                                        alignContent: "center",
                                    }}
                                >
                                    <div style={{ width: "30%", fontSize: "20px" }}>
                                        <b> Phone</b>
                                    </div>
                                    <div style={{ width: "70%", fontSize: "20px" }}>
                                        <AppInput
                                            placeholder="Name"
                                            isPassword={false}
                                            size="large"
                                            style={{ width: "100%" }}
                                        />
                                    </div>
                                </div>
                                <Divider />
                                <div
                                    style={{
                                        display: "flex",
                                        height: "20%",
                                        marginBottom: "20px",
                                        alignContent: "center",
                                    }}
                                >
                                    <div style={{ width: "30%", fontSize: "20px" }}>
                                        <b>Address</b>
                                    </div>
                                    <div style={{ width: "70%", fontSize: "20px" }}>
                                        <AppInput
                                            placeholder="Name"
                                            isPassword={false}
                                            size="large"
                                            style={{ width: "100%",backgroundColor:"#FFFFFF" }}
                                        />
                                    </div>
                                </div>
                                <Divider />
                                <div
                                    style={{
                                        display: "flex",
                                        height: "30%",
                                        alignContent: "center",
                                    }}
                                >
                                    <div style={{ width: "30%", fontSize: "20px" }}>
                                        <b>Description</b>
                                    </div>
                                    <div style={{ width: "70%", fontSize: "20px" }}>
                                        <TextArea
                                            placeholder="Name"
                                            isPassword={false}
                                            size="large"
                                            style={{ width: "100%", height: "100px" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 8, offset: 1 }} style={{ marginTop: "15px" }}>
                        <Card className={styles.cardContainer} loading={false}>
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
                                <b>Subscription</b>
                            </div>
                            <div className={styles.role}>Premium</div>
                            <div className={styles.action}>
                                <AppButton size="large">Update Subscription</AppButton>
                            </div>
                        </Card>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 13, offset: 1 }} style={{ marginTop: "15px" }}>
                        <Card className={styles.cardContainer} loading={false}>
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
                        </Card>
                    </Col>
                </Row>
            </Row>
        </>
    );
}

export default CardCustom;
