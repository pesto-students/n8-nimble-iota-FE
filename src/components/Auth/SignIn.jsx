import React, { useState } from "react";
import { Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { LoginUser, ForgotPassword } from "../../redux";
import logo from "../../assets/roundlogo.svg";
import { FullLengthButton } from "../Common/AppButton/AppButton";
import AppInput from "../Common/AppInput/AppInput";
import { Typography } from "antd";
import { validateEmail } from "../../util/validation";
import styles from "./Auth.module.less";
import openAuthNotification from "../Common/AuthNotification/AuthNotification";

function SignIn() {
    const { Text } = Typography;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const login = () => {
        if (!validateEmail(email))
            return openAuthNotification("Validation Failed", "invalid email");
        dispatch(LoginUser(email, password));
    };
    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);
    const resendPassword = () => {
        if (!validateEmail(email))
            return openAuthNotification("Validation Failed", "invalid email");
        dispatch(ForgotPassword(email));
    };
    return (
        <>
            <div align="middle">
                <img src={logo} alt="Nimble" />
                <h3>Log In to Nimble</h3>
                <Form
                    name="basic"
                    layout="vertical"
                    align="middle"
                    labelCol={{
                        span: 8,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        type="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Email!",
                            },
                        ]}
                    >
                        <AppInput value={email} onChange={onChangeEmail} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        type="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <AppInput
                            isPassword={true}
                            value={password}
                            onChange={onChangePassword}
                        />
                    </Form.Item>
                    <Form.Item>
                        <FullLengthButton
                            type="primary"
                            size="large"
                            disabled={loading}
                            htmlType="submit"
                            onClick={login}
                        >
                            Log in
                        </FullLengthButton>
                    </Form.Item>
                    <Form.Item>
                        <Text type="secondary">
                            forgot password?
                            <Text
                                className={styles.link}
                                onClick={resendPassword}
                            >
                                {" " + "Resend password"}
                            </Text>
                        </Text>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default SignIn;
