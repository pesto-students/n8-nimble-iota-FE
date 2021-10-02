import React, { useState } from "react";
import { ChangeImage, LogoutUser } from "../../redux";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

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

    return (
        <div>
            <Button type="primary" onClick={() => dispatch(LogoutUser())}>
                Sign out
            </Button>
            <input type="file" onChange={handleChange} />
            <Button type="primary" onClick={handleUpload}>
                Upload Image
            </Button>
            <img src={img} alt="loading..." id="profile-image" />
            <br></br>
            <NavLink to="/backlogs">
                backlogs
            </NavLink>{" "}
            <NavLink to="/user">
                user
            </NavLink>{" "}
            <NavLink to="/subscription">
                subscription
            </NavLink>{" "}
        </div>
    );
}

export default Home;
