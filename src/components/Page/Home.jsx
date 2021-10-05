import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { ChangeImage } from "src/redux";
import NavBar from "src/components/Common/NavBar/NavBar";
import Projects from "src/components/Page/Projects/Projects";

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

    const handleLogout = () => dispatch(logout());

    return (
        <div>
            <NavBar onLogout={handleLogout} />
            <input type="file" onChange={handleChange} />
            <Button type="primary" onClick={handleUpload}>
                Upload Image
            </Button>
            <img src={img} alt="loading..." id="profile-image" />
            <Projects />
        </div>
    );
}

export default Home;
