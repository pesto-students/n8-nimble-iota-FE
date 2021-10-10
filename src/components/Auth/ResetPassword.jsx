import React from "react";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword } from "../../redux";
import assetMap from "../../assets";
import AppButton from "../Common/AppButton/AppButton";
import AppInput from "../Common/AppInput/AppInput";
import { withFormik } from "formik";
import PropTypes from "prop-types";

function ResetView(props) {
    const { values, touched, errors, handleChange, handleBlur } = props;
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.user);
    const resetPassword = () => {
        if (Object.keys(errors).length === 0) dispatch(ResetPassword(values.oldpassword, values.newpassword));
    };
    return (
        <>
            <div align="middle">
                <img src={assetMap("roundlogo")} alt="Nimble" />
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
                    <Form.Item label="Old Password" id="oldpassword" type="password">
                        <AppInput
                            isPassword={true}
                            name="oldpassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.oldpassword}
                        />
                        {errors.oldpassword && touched.oldpassword && <div>{errors.oldpassword}</div>}
                    </Form.Item>

                    <Form.Item label="New Password" name="NewPassword" type="password">
                        <AppInput
                            isPassword={true}
                            name="newpassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.newpassword}
                        />
                        {errors.newpassword && touched.newpassword && <div>{errors.newpassword}</div>}
                    </Form.Item>

                    <Form.Item>
                        <AppButton type="primary" htmlType="submit" onClick={resetPassword} disabled={loading} block>
                            Reset
                        </AppButton>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

const ResetPswd = withFormik({
    mapPropsToValues: () => ({ oldpassword: "", newpassword: "" }),
    validate: (values) => {
        const errors = {};
        if (!values.oldpassword) errors.oldpassword = "Required";
        if (!values.newpassword) errors.newpassword = "Required";
        if (values.newpassword === values.oldpassword) errors.newpassword = "Passwords are same";
        return errors;
    },
})(ResetView);

ResetView.propTypes = {
    values: PropTypes.object,
    touched: PropTypes.object,
    errors: PropTypes.object,
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
};
export default ResetPswd;
