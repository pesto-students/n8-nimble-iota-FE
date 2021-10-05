import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { NavLink } from "react-router-dom";
import styles from "src/components/Page/Home/Home.module.less";
import { Typography } from "antd";
import { ChangeImage, LogoutUser } from "src/redux";
import NavBar from "src/components/Common/NavBar/NavBar";
import Sidebar from "src/components/Common/Sidebar/Sidebar";
import AppModal from "src/components/Common/AppModal/AppModal";
import ResetPswd from "src/components/Auth/ResetPassword";
import Retrospectives from "src/components/Page/Retrospectives/Retrospectives";

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
                    <NavLink to="/backlogs">backlogs</NavLink> <NavLink to="/user">user</NavLink>{" "}
                    <NavLink to="/subscription">subscription</NavLink> <Retrospectives />
                </main>
            </section>
        </div>
    );
}

export default Home;
