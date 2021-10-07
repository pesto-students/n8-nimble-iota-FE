import React, { useState, useEffect } from "react";
import { Form } from "antd";
import Axios from "../../service/Axios";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser, setLoadingTrue, setLoadingFalse } from "../../redux";
import assetMap from "../../assets";
import AppButton from "../Common/AppButton/AppButton";
import AppInput from "../Common/AppInput/AppInput";
import AppSelect from "../Common/AppSelect/AppSelect";
import { validateEmail } from "../../util/validation";
import { withFormik } from "formik";
import PropTypes from "prop-types";

function RegisterView(props) {
    const { values, touched, errors, handleChange, handleBlur, setFieldValue } = props;
    const dispatch = useDispatch();
    const [allroles, setAllRoles] = useState([]);
    const { loading } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(setLoadingTrue());
        if (allroles.length === 0)
            Axios.get("/allroles")
                .then((res) => {
                    res.data[0]["disabled"] = true;
                    setAllRoles(res.data);
                    dispatch(setLoadingFalse());
                })
                .catch(() => {
                    dispatch(setLoadingFalse());
                });
    }, [dispatch]);
    const register = () => {
        if (Object.keys(errors).length === 0) {
            dispatch(RegisterUser(values.name, values.email, values.password, { _id: values.role }));
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
