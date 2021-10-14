import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DyteMeeting } from "dyte-client";
import axios from "src/service/Axios";
import Loader from "src/components/Common/Loader/Loader";
import { Loading3QuartersOutlined } from "@ant-design/icons";
// const sdk = require("api")("@dyte/v1.0#4xeg4zkszwz5wi");

const Meeting = ({ roomName, meetingId, user }) => {
    // eslint-disable-next-line no-undef
    const { name, picture, email } = user;
    const [authToken, setAuthToken] = useState();
    // const [error, setError] = useState();
    useEffect(() => {
        // sdk.addParticipant(
        //     {
        //         userDetails: { name, picture },
        //         clientSpecificId: _id,
        //         presetName: "nimble",
        //         roleName: "host",
        //     },
        //     {
        //         organizationId: orgId,
        //         meetingId,
        //     }
        // )

        // eslint-disable-next-line no-undef
        axios
            .post("/participant", {
                meetingData: {
                    userDetails: { name, picture },
                    clientSpecificId: email,
                    // presetName: "nimble",
                    roleName: "host",
                },
                meetingId,
            })
            .then((res) => {
                const { data } = res;
                if (data.success) {
                    setAuthToken(data.authToken);
                } else {
                    // setError("Could not authenticate user!");
                }
            })
            .catch((error) => {});
    }, []);

    const meetingConfig = {
        authToken,
        roomName,
        showSetupScreen: true,
    };
    console.log(meetingConfig);

    return (
        <>
            {authToken && (
                <DyteMeeting
                    onInit={() => {}}
                    clientId={"0ebfa506-b771-4d4a-a469-063bf2844e3d"}
                    meetingConfig={meetingConfig}
                />
            )}
        </>
    );
};

Meeting.propTypes = {
    roomName: PropTypes.string,
    meetingId: PropTypes.string,
    user: PropTypes.shape({
        name: PropTypes.string,
        picture: PropTypes.string,
        email: PropTypes.string,
    }),
};

export default Meeting;
