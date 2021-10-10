import React from "react";
import styles from "src/components/Common/Landing/About/About.module.less";

const About = () => {
    return (
        <div className={styles.about}>
            Made with the collaborative efforts of&nbsp;
            <span>Vishnu Thiyagarajan</span>,&nbsp;<span>Vipan Kumar</span> and&nbsp;<span>Jyotrimaya Sahu</span>.
        </div>
    );
};

export default About;
