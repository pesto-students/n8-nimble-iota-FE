import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import CardCustom from "src/components/Common/Card/Card";
import styles from "src/components/Common/Landing/About/About.module.less";

const About = () => {
    const data = [
        {
            name: "Vishnu Thiyagarajan",
            linkedIn: "",
            github: "",
            img: "",
        },
        {
            name: "Vipan Kumar",
            linkedIn: "",
            github: "",
            img: "",
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
