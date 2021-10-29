import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import CardCustom from "src/components/Common/Card/Card";
import styles from "src/components/Common/Landing/About/About.module.less";

const About = () => {
    const data = [
        {
            name: "Vipan Kumar",
            linkedIn: "https://www.linkedin.com/in/vipank/",
            github: "https://github.com/Vipank",
            img: "https://firebasestorage.googleapis.com/v0/b/nim-ble.appspot.com/o/profile-images%2Fabout_vipan.jpeg?alt=media&token=468f67ed-0942-4e54-957e-d4ba39ba03f0",
        },
        {
            name: "Vishnu Thiyagarajan",
            linkedIn: "https://www.linkedin.com/in/vishnu-thiyagarajan-2aa6a6129/",
            github: "https://github.com/vishnu-thiyagarajan",
            img: "https://firebasestorage.googleapis.com/v0/b/nim-ble.appspot.com/o/profile-images%2Fmrtvishnu%40gmail.com?alt=media&token=1527b6eb-6ccf-4fac-b695-12f82ad89b04",
        },
        {
            name: "Jyotirmaya Sahu",
            linkedIn: "",
            github: "",
            img: "",
        },
    ];

    return (
        <div className={styles.about}>
            Made with the collaborative efforts of
            <br />
            <ul>
                {data.map((e, i) => {
                    return (
                        <li key={i}>
                            <CardCustom className={styles.aboutCard}>
                                <Avatar size={52} src={e.img} />
                                <div className={styles.details}>
                                    <span className={styles.name}>{e.name}</span>&nbsp;
                                    <div className={styles.links}>
                                        <a className={styles.icon} href={e.linkedIn} rel="noreferrer" target="_blank">
                                            <LinkedinOutlined />
                                        </a>
                                        &nbsp;
                                        <a className={styles.icon} href={e.github} rel="noreferrer" target="_blank">
                                            <GithubOutlined />
                                        </a>
                                    </div>
                                </div>
                            </CardCustom>
                            {/* {i < data.length - 1 && ", "} */}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default About;
