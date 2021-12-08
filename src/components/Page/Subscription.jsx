import { Button } from "antd";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import Notification from "src/components/Common/Notification/Notification";
import Axios from "src/service/Axios";

function Subscription() {
    const { email, role } = useSelector((state) => state.user.user);

    const handleSubscription = () => {
        const subsObj = { email: email, amount: 1000, role: role };
        Axios.post("/createOrder", subsObj)
            .then((response) => {
                return Notification("success", "Subscription Updated", response?.data?.message);
            })
            .catch((error) => {
                if (error.response) {
                    //Add scnakbar
                } else {
                    //Add scnakbar
                }
            });
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                }}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                <Form>
                    <label htmlFor="firstName">First Name</label>
                    <Field id="firstName" name="firstName" placeholder="Jane" />

                    <label htmlFor="lastName">Last Name</label>
                    <Field id="lastName" name="lastName" placeholder="Doe" />

                    <label htmlFor="email">Email</label>
                    <Field id="email" name="email" placeholder="jane@acme.com" type="email" />
                    <button type="submit">Submit</button>
                </Form>
            </Formik>

            <Button type="primary" onClick={handleSubscription}>
                Buy Subscription
            </Button>
        </div>
    );
}

export default Subscription;
