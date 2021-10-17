import React from "react";
import { Element } from "react-scroll";
import styles from "src/components/Common/Landing/index.module.less";
import LandingMain from "src/components/Common/Landing/Main/LandingMain";
import Features from "src/components/Common/Landing/Features/Features";
import Pricing from "src/components/Common/Landing/Pricing/Pricing";
import About from "src/components/Common/Landing/About/About";

const Landing = () => {
    return (
        <div className={styles.container}>
            <Element name="main">
                <LandingMain />
            </Element>
            <Element name="features">
                <Features />
            </Element>
            <Element name="pricing">
                <Pricing />
            </Element>
            <About />
        </div>
    );
};

export default Landing;
