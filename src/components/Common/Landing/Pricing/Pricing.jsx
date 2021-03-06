import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import classNames from "classnames";
import React from "react";
import assetMap from "src/assets";
import styles from "src/components/Common/Landing/Pricing/Pricing.module.less";

const Pricing = () => {
    const breakpoints = useBreakpoint();
    const smSize = !breakpoints.md;
    const priceCardClassName = classNames(styles.priceCards, {
        [styles.small]: smSize,
    });
    return (
        <section className={styles.pricing}>
            <div>
                <h1 className={styles.title}>Pricing</h1>
                <div className={styles.pricingContainer}>
                    <div className={priceCardClassName}>
                        <div className={styles.header}>3 Members per team</div>
                        <div className={styles.planName}>BASIC</div>
                        <div className={styles.type}>Free</div>
                        <div className={styles.desc}>
                            <p className={`${styles.price} ${styles.none}`}>INR 0/project</p>
                            The Nimble platform allows scrum master to use only one project and include only 3
                            developers in the particular project
                        </div>
                    </div>
                    <div className={priceCardClassName}>
                        <div className={styles.header}>Unlimited Members per team</div>
                        <div className={styles.planName}>RECOMMENDED</div>
                        <div className={styles.type}>Premium</div>
                        <div className={styles.desc}>
                            <p className={styles.price}>INR 1000/project</p>
                            The Nimble platform allows scrum master to add one more project and include unlimited
                            developers in the particular project
                        </div>
                    </div>
                </div>
            </div>
            <img className={smSize ? styles.image : ""} src={assetMap("LandingPricing")} alt="Flexible Pricing" />
        </section>
    );
};

Pricing.propTypes = {};

export default Pricing;
