import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Row, Select } from "antd";
import { Anchor } from "antd";
import Axios from "../../service/Axios";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../../redux";

function SignUp() {
  const dispatch = useDispatch();
  const { Link } = Anchor;
  const [allroles, setAllRoles] = useState([]);
  useEffect(() => {
    Axios.get("/allroles")
      .then((res) => {
        setAllRoles(res.data);
      })
      .catch((error) => {
        alert("error: " + error);
      });
  }, []);
  const onFinish = ({ name, email, password, confirmpassword, role }) => {
    if (password === confirmpassword) {
      dispatch(RegisterUser(name, email, password, { _id: role }));
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Row justify="space-around">
        <Card title="Sign Up!" style={{ width: 450, marginTop: "10vh" }}>
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

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
              label="Confirm Password"
              name="confirmpassword"
              type="password"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
              ]}
            >
              <Input.Password />
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
              <Select>
                {allroles.map((role, index) => (
                  <Select.Option key={index} value={role._id}>
                    {role.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                SignUp
              </Button>
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Anchor>
                <Link href="/signin" title="Signin here" />
              </Anchor>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </>
  );
}

export default SignUp;
