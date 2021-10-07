import React from "react";
import { Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { LoginUser, ForgotPassword } from "../../redux";
import assetMap from "../../assets";
import AppButton from "../Common/AppButton/AppButton";
import AppInput from "../Common/AppInput/AppInput";
import { Typography } from "antd";
import { validateEmail } from "../../util/validation";
import styles from "./Auth.module.less";
import Notification from "../Common/Notification/Notification";
import { withFormik } from "formik";
import PropTypes from "prop-types";

function LoginView(props) {
    const { values, touched, errors, handleChange, handleBlur } = props;
    const { Text } = Typography;
    const { loading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const login = () => {
        if (Object.keys(errors).length === 0) dispatch(LoginUser(values.email, values.password));
    };
    const resendPassword = () => {
        if (!validateEmail(values.email)) return Notification("Validation Failed", "invalid email");
        dispatch(ForgotPassword(values.email));
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
