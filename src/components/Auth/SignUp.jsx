import React, { useState, useEffect } from "react";
import { Form } from "antd";
import Axios from "../../service/Axios";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../../redux";
import logo from "../../assets/roundlogo.svg";
import { FullLengthButton } from "../Common/AppButton/AppButton";
import AppInput from "../Common/AppInput/AppInput";
import AppSelect from "../Common/AppSelect/AppSelect";
import { validateEmail } from "../../util/validation";
import openAuthNotification from "../Common/AuthNotification/AuthNotification";

function SignUp() {
    const dispatch = useDispatch();
    const [allroles, setAllRoles] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [role, setRole] = useState(null);
    const { loading } = useSelector((state) => state.user);

    useEffect(() => {
        Axios.get("/allroles")
            .then((res) => {
                res.data[0]["disabled"] = true;
                setAllRoles(res.data);
            })
            .catch((error) => {
                alert("error: " + error);
            });
    }, []);
    const register = () => {
        if (!validateEmail(email))
            return openAuthNotification("Validation Failed", "invalid email");
        if (
            name &&
            password &&
            confirmpassword &&
            role &&
            password === confirmpassword
        ) {
            dispatch(RegisterUser(name, email, password, { _id: role }));
        }
    };
    const onChangeName = (e) => setName(e.target.value);
    const onChangeEmail = (e) => setEmail(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);
    const onChangeConfirmPassword = (e) => setConfirmpassword(e.target.value);
    const onChangeRole = (value) => setRole(value);

    return (
        <>
            <div align="middle">
                <img src={logo} alt="Nimble" />
                <h3>Register with Nimble</h3>
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
                        label="Name"
                        name="name"
                        value={name}
                        onChange={onChangeName}
                        rules={[
                            {
                                required: true,
                                message: "Please input your Name!",
                            },
                        ]}
                    >
                        <AppInput />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={onChangeEmail}
                        rules={[
                            {
                                required: true,
                                message: "Please input your Email!",
                            },
                        ]}
                    >
                        <AppInput />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={onChangePassword}
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <AppInput isPassword={true} />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmpassword"
                        type="password"
                        value={confirmpassword}
                        onChange={onChangeConfirmPassword}
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                        ]}
                    >
                        <AppInput isPassword={true} />
                    </Form.Item>

                    <Form.Item
                        label="Role"
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: "Please select your role!",
                            },
                        ]}
                    >
                        <AppSelect options={allroles} onChange={onChangeRole} />
                    </Form.Item>

                    <Form.Item>
                        <FullLengthButton
                            type="primary"
                            htmlType="submit"
                            onClick={register}
                            disabled={loading}
                        >
                            Register
                        </FullLengthButton>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default SignUp;
