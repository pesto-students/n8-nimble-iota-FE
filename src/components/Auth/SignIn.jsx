import { Form, Typography } from "antd";
import { withFormik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import assetMap from "src/assets";
import styles from "src/components/Auth/Auth.module.less";
import AppButton from "src/components/Common/AppButton/AppButton";
import AppInput from "src/components/Common/AppInput/AppInput";
import Notification from "src/components/Common/Notification/Notification";
import { ForgotPassword, LoginUser } from "src/redux";
import { validateEmail } from "src/util/validation";

function LoginView(props) {
    const { values, touched, errors, handleChange, handleBlur } = props;
    const { Text } = Typography;
    const { loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const scrumMaster = {
        email: "pestonimble@gmail.com",
        password: "pestonimble",
    };
    const developer = {
        email: "vipan16116@gmail.com",
        password: "pestonimble",
    };
    const login = () => {
        if (Object.keys(errors).length === 0) dispatch(LoginUser(values.email, values.password));
    };
    const resendPassword = () => {
        if (!validateEmail(values.email)) return Notification("info", "Validation Failed", "invalid email");
        dispatch(ForgotPassword(values.email));
    };
    const loginFix = (isScrumMaster) => {
        if (isScrumMaster) dispatch(LoginUser(scrumMaster.email, scrumMaster.password));
        else dispatch(LoginUser(developer.email, developer.password));
    };
    return (
        <>
            <div align="middle">
                <img src={assetMap("roundlogo")} alt="Nimble" />
                <h3>Log In to Nimble</h3>
                <Form
                    name="basic"
                    layout="vertical"
                    align="middle"
                    labelCol={{
                        span: 8,
                    }}
                    autoComplete="off"
                >
                    <Form.Item label="Email" id="email" type="email">
                        <AppInput onChange={handleChange} onBlur={handleBlur} value={values.email} name="email" />
                        {errors.email && touched.email && <div>{errors.email}</div>}
                    </Form.Item>

                    <Form.Item label="Password" id="password" type="password">
                        <AppInput
                            name="password"
                            isPassword={true}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />
                        {errors.password && touched.password && <div>{errors.password}</div>}
                    </Form.Item>
                    <Form.Item>
                        <AppButton
                            type="primary"
                            size="large"
                            disabled={loading}
                            htmlType="submit"
                            onClick={login}
                            block
                        >
                            Log in
                        </AppButton>
                    </Form.Item>
                    <Form.Item>
                        <AppButton
                            type="primary"
                            size="large"
                            disabled={loading}
                            htmlType="submit"
                            onClick={() => loginFix(true)}
                            block
                        >
                            Scrummaster Dummy Login
                        </AppButton>
                    </Form.Item>
                    <Form.Item>
                        <AppButton
                            type="primary"
                            size="large"
                            disabled={loading}
                            htmlType="submit"
                            onClick={() => loginFix(false)}
                            block
                        >
                            Developer Dummy Login
                        </AppButton>
                    </Form.Item>
                    <Form.Item>
                        <Text type="secondary">
                            forgot password?
                            <Text className={styles.link} onClick={resendPassword}>
                                &nbsp;Resend password
                            </Text>
                        </Text>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

const SignIn = withFormik({
    mapPropsToValues: () => ({ email: "", password: "" }),
    validate: (values) => {
        const errors = {};
        if (!validateEmail(values.email)) errors.email = "invalid email";
        if (!values.email) errors.email = "Required";
        if (!values.password) errors.password = "Required";
        return errors;
    },
})(LoginView);

LoginView.propTypes = {
    values: PropTypes.object,
    touched: PropTypes.object,
    errors: PropTypes.object,
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
};

export default SignIn;
