import React from "react";
import styles from "./Features.module.less";
import assetMap from "../../../../assets";
import classNames from "classnames";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

const Features = () => {
    const breakpoints = useBreakpoint();
    const mdSize = !breakpoints.lg;
    const titleClassName = classNames(styles.title, { [styles.small]: mdSize });
    const listTitleClassName = classNames(styles.listTitle, {
        [styles.small]: mdSize,
    });
    const listDescClassName = classNames(styles.listDesc, {
        [styles.small]: mdSize,
    });
    return (
        <>
            <section className={styles.features}>
                <div className={styles.imageContainer}>
                    <img src={assetMap("LandingFeatures")} alt="More Features" />
                </div>
                <div>
                    <h1 className={titleClassName}>Nimble Provides</h1>
                    <dl className={styles.featureList}>
                        <dt className={listTitleClassName}>Sprint planning</dt>
                        <dd className={listDescClassName}>
                            A way for your team to effectively plan and execute a sprint planning session.
                        </dd>
                        <dt className={listTitleClassName}>Open Rooms</dt>
                        <dd className={listDescClassName}>
                            Through lively discussion, your team will create more accurate results for healthier
                            sprints.
                        </dd>
                        <dt className={listTitleClassName}>Scrum boards</dt>
                        <dd className={listDescClassName}>
                            Agile teams can stay focused on delivering iterative and incremental value, as fast as
                            possible using Scrum boards
                        </dd>
                        <dt className={listTitleClassName}>Stand ups</dt>
                        <dd className={listDescClassName}>
                            Track the progress of the task by developer’s standup statements.
                        </dd>
                        <dt className={listTitleClassName}>Retrospectives</dt>
                        <dd className={listDescClassName}>
                            Collect your team’s view on that sprint and decide on actions items to rectify on upcoming
                            sprints.
                        </dd>
                        <dt className={listTitleClassName}>Reports</dt>
                        <dd className={listDescClassName}>
                            Velocity chart and Burn down helps in estimating cost and time of a project.
                        </dd>
                    </dl>
                </div>
            </section>
        </>
    );
};

Features.propTypes = {};

export default Features;
