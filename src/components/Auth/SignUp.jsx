import { Form } from "antd";
import { withFormik } from "formik";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import assetMap from "src/assets";
import AppButton from "src/components/Common/AppButton/AppButton";
import AppInput from "src/components/Common/AppInput/AppInput";
import AppSelect from "src/components/Common/AppSelect/AppSelect";
import Notification from "src/components/Common/Notification/Notification";
import { RegisterUser } from "src/redux";
import Axios from "src/service/Axios";
import { validateEmail } from "src/util/validation";

function RegisterView(props) {
    const [allroles, setAllRoles] = useState([]);
    const { loading } = useSelector((state) => state.user);

    const { values, touched, errors, handleChange, handleBlur, setFieldValue } = props;
    const dispatch = useDispatch();

    useEffect(() => {
        if (allroles.length === 0)
            Axios.get("/allroles")
                .then((res) => {
                    res.data[0]["disabled"] = true;
                    setAllRoles(res.data);
                })
                .catch((err) => {
                    return Notification("warning", "Something went wrong", err);
                });
    }, [dispatch]);
    const register = () => {
        if (Object.keys(errors).length === 0) {
            dispatch(RegisterUser(values.name, values.email, values.password, JSON.parse(values.role)));
        }
    };
    return (
        <>
            <div align="middle">
                <img src={assetMap("roundlogo")} alt="Nimble" />
                <h3>Register with Nimble</h3>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    layout="vertical"
                    align="middle"
                    autoComplete="off"
                >
                    <Form.Item label="Name" name="name">
                        <AppInput onChange={handleChange} onBlur={handleBlur} value={values.name} name="name" />
                        {errors.name && touched.name && <div>{errors.name}</div>}
                    </Form.Item>

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
                    <Form.Item label="Confirm Password" id="confirmpassword" type="password">
                        <AppInput
                            name="confirmpassword"
                            isPassword={true}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmpassword}
                        />
                        {errors.confirmpassword && touched.confirmpassword && <div>{errors.confirmpassword}</div>}
                    </Form.Item>
                    <Form.Item label="Role" id="role">
                        <AppSelect
                            placeholder="Select role"
                            options={allroles}
                            onChange={(value) => {
                                setFieldValue("role", value);
                            }}
                            onSelect={handleChange}
                            name="role"
                            onBlur={handleBlur}
                            value={values.role}
                        />
                        {errors.role && touched.role && <div>{errors.role}</div>}
                    </Form.Item>

                    <Form.Item>
                        <AppButton type="primary" htmlType="submit" onClick={register} disabled={loading} block>
                            Register
                        </AppButton>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

RegisterView.propTypes = {
    values: PropTypes.object,
    touched: PropTypes.object,
    errors: PropTypes.object,
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
    setFieldValue: PropTypes.func,
};

const SignUp = withFormik({
    mapPropsToValues: () => ({ name: "", email: "", password: "", confirmpassword: "", role: null }),
    validate: (values) => {
        const errors = {};
        if (!values.name) errors.name = "Required";
        if (!validateEmail(values.email)) errors.email = "invalid email";
        if (!values.email) errors.email = "Required";
        if (!values.password) errors.password = "Required";
        if (!values.confirmpassword) errors.confirmpassword = "Required";
        if (values.password !== values.confirmpassword) errors.confirmpassword = "Passwords mismatch";
        if (!values.role) errors.role = "Required";
        return errors;
    },
})(RegisterView);

export default SignUp;
