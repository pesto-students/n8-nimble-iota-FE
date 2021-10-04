import React, { useEffect, useLayoutEffect } from "react";
import PropTypes from "prop-types";
import { Element, scroller } from "react-scroll";
import LandingMain from "./Main/LandingMain";
import Features from "./Features/Features";
import Pricing from "./Pricing/Pricing";
import { scrollTo } from "react-scroll/modules/mixins/scroller";
import styles from "./index.module.less";

const Landing = () => {
    // useEffect(() => {
    //     const pageName =
    //         page === 1 ? "main" : page === 2 ? "features" : "pricing";
    //     console.log(pageName);
    //     scroller.scrollTo(pageName, {});
    // }, []);

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
        </div>
    );
};

export default Landing;
