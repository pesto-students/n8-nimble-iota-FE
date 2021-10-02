import React, { useState } from "react";
import { ChangeImage, LogoutUser, ResetPassword } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import NavBar from "../Common/NavBar/NavBar";

function Home() {
    const { email, img } = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const handleUpload = () => {
        dispatch(ChangeImage(image, email, "profile-image"));
    };

    const handleLogout = () => dispatch(LogoutUser());

    return (
        <div>
            <NavBar onLogout={handleLogout} />
            <Button
                type="primary"
                onClick={() =>
                    dispatch(
                        ResetPassword({
                            oldpassword: "password",
                            newpassword: "password",
                        })
                    )
                }
            >
                Reset Password
            </Button>
            <input type="file" onChange={handleChange} />
            <Button type="primary" onClick={handleUpload}>
                Upload Image
            </Button>
            <img src={img} alt="loading..." id="profile-image" />
        </div>
    );
}

export default Home;
