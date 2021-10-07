import React from "react";
import styles from "./LandingMain.module.less";
import assetMap from "../../../../assets";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import classNames from "classnames";
import AppButton from "../../AppButton/AppButton";

const LandingMain = () => {
    const breakpoints = useBreakpoint();
    const smSize = !breakpoints.md;
    const mdSize = !breakpoints.lg;
    const titleClassName = classNames(styles.title, { [styles.small]: mdSize });
    const descClassName = classNames(styles.desc, { [styles.small]: mdSize });
    const startClassName = classNames(styles.start, { [styles.small]: mdSize });
    return (
        <>
            <section className={styles.main}>
                <div>
                    {!smSize && <img className={styles.image} src={assetMap("LandingMain")} alt="Effortless" />}
                    <h1 className={titleClassName}>Connect your team with Agile Methodology</h1>
                    <p className={descClassName}>
                        Nimble is an Agile Sprint management platform which provides functionality to manage all the
                        three phases of a sprint- Pre,Active and Post and at the same time it is very simple to start
                        with it.
                    </p>
                    {smSize && <img className={styles.smallImage} src={assetMap("LandingMain")} alt="Effortless" />}
                    <div className={startClassName}>
                        <AppButton size="large" onClick={() => {}}>
                            Get Started
                        </AppButton>
                    </div>
                </div>
            </section>
        </>
    );
};

export default LandingMain;
