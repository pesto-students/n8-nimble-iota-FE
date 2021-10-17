import React from "react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { DyteMeeting } from "dyte-client";
import axios from "src/service/Axios";
import { useSelector } from "react-redux";
import { useQuery, useRouting } from "src/util/hooks";

const Meeting = () => {
    const query = useQuery();
    const roomName = query.get("roomName");
    const meetingId = query.get("meetingId");
    const referrer = query.get("referrer");
    const { user } = useSelector((state) => state.user);
    const { name, picture, email } = user;
    const [authToken, setAuthToken] = useState();
    const router = useRouting();
    useEffect(() => {
        axios
            .post("/participant", {
                meetingData: {
                    userDetails: { name, picture },
                    clientSpecificId: email,
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
            .catch((_error) => {});
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
                    onInit={(meeting) => {
                        meeting.on(meeting.Events.meetingEnded, () => {
                            router.navigate(referrer, true, true);
                        });
                    }}
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
