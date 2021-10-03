import React, { useState } from "react";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword } from "../../redux";
import logo from "../../assets/roundlogo.svg";
import { FullLengthButton } from "../Common/AppButton/AppButton";
import AppInput from "../Common/AppInput/AppInput";

function ResetPswd() {
    const dispatch = useDispatch();
    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const { loading } = useSelector((state) => state.user);
    const onChangeOldPassword = (e) => setOldPassword(e.target.value);
    const onChangeNewPassword = (e) => setNewpassword(e.target.value);
    const resetPassword = () => {
        dispatch(ResetPassword(oldpassword, newpassword));
    };
    return (
        <>
            <div align="middle">
                <img src={logo} alt="Nimble" />
                <h3>Reset Password</h3>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    layout="vertical"
                    align="middle"
                    initialValues={{
                        remember: true,
                    }}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Old Password"
                        name="oldpassword"
                        type="password"
                        value={oldpassword}
                        onChange={onChangeOldPassword}
                        rules={[
                            {
                                required: true,
                                message: "Please enter old password!",
                            },
                        ]}
                    >
                        <AppInput isPassword={true} />
                    </Form.Item>

                    <Form.Item
                        label="New Password"
                        name="NewPassword"
                        type="password"
                        value={newpassword}
                        onChange={onChangeNewPassword}
                        rules={[
                            {
                                required: true,
                                message: "Please enter new password!",
                            },
                        ]}
                    >
                        <AppInput isPassword={true} />
                    </Form.Item>

                    <Form.Item>
                        <FullLengthButton
                            type="primary"
                            htmlType="submit"
                            onClick={resetPassword}
                            disabled={loading}
                        >
                            Reset
                        </FullLengthButton>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default ResetPswd;
