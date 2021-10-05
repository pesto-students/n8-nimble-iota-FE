import { CheckCircleFilled, PhoneFilled, PlusCircleFilled } from "@ant-design/icons";
import React from "react";
import AppButton from "src/components/Common/AppButton/AppButton";
import Retrocard from "src/components/Page/Retrospectives/Retrocard/Retrocard";
import styles from "src/components/Page/Retrospectives/Retrospectives.module.less";
function Retrospectives() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.actions}>
                    <AppButton loading={false} size={"middle"} style={{ marginRight: "8px" }}>
                        <>
                            <PhoneFilled /> Join Call
                        </>
                    </AppButton>
                    <AppButton loading={false} size={"middle"}>
                        <>
                            <CheckCircleFilled /> Mark as Complete
                        </>
                    </AppButton>
                </div>
                <div className={styles.retroHeadingContainer}>
                    <div className={styles.heading}>
                        <h3>
                            <b>Positive</b>
                        </h3>
                    </div>
                    <div className={styles.heading}>
                        <h3>
                            <b>Negative</b>
                        </h3>
                    </div>
                    <div className={styles.heading}>
                        <h3>
                            <b>Neutral</b>
                        </h3>
                    </div>
                    <div className={styles.heading}>
                        <h3>
                            <b>Action Items</b>
                        </h3>
                    </div>
                </div>
                <div className={styles.retroContainer}>
                    <div className={styles.retroCardContainer}>
                        <Retrocard type={"positive"} />
                    </div>
                    <div className={styles.retroCardContainer}>
                        <Retrocard type={"negitive"} />
                    </div>
                    <div className={styles.retroCardContainer}>
                        <Retrocard type={"neutral"} />
                    </div>
                    <div className={styles.retroCardContainer}>
                        <Retrocard type={"actionItem"} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Retrospectives;
