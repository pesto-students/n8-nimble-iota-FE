
import axios from "src/service/Axios";
import Notification from "src/components/Common/Notification/Notification";
import { subscriptionAMount } from "src/config/constants";




const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
};


export const displayRazorpay = async (userProfile,successHandler) => {
    const res = await loadScript(process.env.REACT_APP_RAZORPAY_SCRIPT);
    if (!res) {
        return Notification("error", "Payments failed to load");
    }
    const resp = await axios.post("/createOrder", { email: userProfile?.email ?? "", amount: subscriptionAMount });
    //Rasorpay accepts money in Paisa, so 1 Rs = 100 paisa (*100)
    const options = {
        key: process.env.REACT_APP_PAYMENT_ID,
        currency: resp.data.order.currency,
        amount: resp.data.order.amount*100,
        order_id: resp.data.order.id,
        name: "Subscription",
        description: "Nimble Subscrption.",
        handler: function (response) {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
            const updatePaymentObject = {
                transactionid: razorpay_payment_id,
                amount: resp.data.order.amount/100,
                email: userProfile?.email,
            };
            successHandler(updatePaymentObject);
        },
        prefill: {
            name: userProfile?.name ?? "",
            email: userProfile?.email ?? "",
            phone_number:  userProfile?.phone ?? "",
        },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
};
