import React from "react";
import { Form, Input, Button, Card, Row, Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { resetState, LoginUser } from "../../redux";
import { Redirect } from "react-router-dom";
import { Anchor } from "antd";

function SignIn() {
    const { Link } = Anchor;
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const login = ({ email, password, remember }) =>
        dispatch(LoginUser(email, password, remember));
    const loginFail = (errorInfo) => {
        console.log("Failed:", errorInfo);
        dispatch(resetState());
    };

    return (
        <>
            {user && isAuthenticated && <Redirect to="/" />}
            {!isAuthenticated && (
                <Row justify="space-around">
                    <Card title="Sign In!" style={{ width: 450, marginTop: "25vh" }}>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={login}
                            onFinishFailed={loginFail}
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
                                <Input />
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
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                wrapperCol={{ offset: 8, span: 16 }}
                            >
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" disabled={loading} htmlType="submit">
                                    SignIn
                                </Button>
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 8,
                                    span: 16,
                                }}
                            >
                                <Anchor>
                                    <Link href="/signup" title="Don't have an account?" />
                                    <Link href="/forgotpassword" title="forgot password" />
                                </Anchor>
                            </Form.Item>
                        </Form>
                    </Card>
                </Row>
            )}
        </>
    );
}

export default SignIn;
