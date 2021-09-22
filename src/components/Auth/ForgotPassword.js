import React from "react";
import { Form, Input, Button, Card, Row } from "antd";
import { ForgotPassword } from "../../redux";
import { useSelector, useDispatch } from "react-redux";

function ForgotPswd() {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const forgotpassword = ({ email }) => {
    dispatch(ForgotPassword({ email }));
  };
  const forgotpasswordFail = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Row justify="space-around">
        <Card
          title="Forgot Password!"
          style={{ width: 450, marginTop: "25vh" }}
        >
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
            onFinish={forgotpassword}
            onFinishFailed={forgotpasswordFail}
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
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button disabled={loading} type="primary" htmlType="submit">
                ForgotPassword
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </>
  );
}

export default ForgotPswd;
