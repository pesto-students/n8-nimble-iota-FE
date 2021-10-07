import React, { useState } from "react";
import { ChangeImage, LogoutUser } from "../../../redux";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import NavBar from "../../Common/NavBar/NavBar";
import { NavLink } from "react-router-dom";
import AppModal from "../../Common/AppModal/AppModal";
import ResetPswd from "../../Auth/ResetPassword";
import styles from "./Home.module.less";
import { Typography } from "antd";
import Sidebar from "../../Common/Sidebar/Sidebar";
import Projects from "../Projects/Projects";
import Retrospectives from "../Retrospectives/Retrospectives";
import Scrumboard from "../Scrumboard/Scrumboard";

function Home() {
    const { Text } = Typography;
    const { email, img } = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);

    const [resetModal, setResetModal] = useState(false);
    const openReset = () => setResetModal(true);
    const closeReset = () => setResetModal(false);
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
            <section className={styles.body}>
                <Sidebar />
                <main className={styles.mainContent}>
                    <AppModal visible={resetModal} handleCancel={closeReset}>
                        <ResetPswd />
                    </AppModal>
                    <Text className={styles.link} onClick={openReset}>
                        Reset password
                    </Text>
                    <input type="file" onChange={handleChange} />
                    <Button type="primary" onClick={handleUpload}>
                        Upload Image
                    </Button>
                    <img src={img} alt="loading..." id="profile-image" />
                    <br></br>
                    <NavLink to="/backlogs">backlogs&nbsp;</NavLink> <NavLink to="/user">user&nbsp;</NavLink>
                    <NavLink to="/subscription">subscription&nbsp;</NavLink>
                    {/* <Projects /> */}
                    <Retrospectives />
                    {/* <Scrumboard/> */}
                </main>
            </section>
        </div>
    );
}

export default Home;
