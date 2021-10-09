import { CheckCircleFilled, PhoneFilled, PlusCircleFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import AppButton from "src/components/Common/AppButton/AppButton";
import Retrocard from "src/components/Page/Retrospectives/Retrocard/Retrocard";
import RetrospectiveModal from "src/components/Page/Retrospectives/RetrospectiveModal";
import styles from "src/components/Page/Retrospectives/Retrospectives.module.less";

function Retrospectives() {
    const [openModal, setOpenModal] = useState(false);
    const [operation, setOperation] = useState();
    const { user } = useSelector((state) => state.user);
    console.log(user);

    const handleAdd = () => {
        setOpenModal(true);
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        console.log("yes");
    }, [openModal]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.actions}>
                    <AppButton onClick={handleAdd} size={"middle"} style={{ marginRight: "8px" }}>
                        <>
                            <PlusCircleFilled /> Add Retrospective
                        </>
                    </AppButton>
                    <AppButton disabled={false} size={"middle"} style={{ marginRight: "8px" }}>
                        <>
                            <PhoneFilled /> Join Call
                        </>
                    </AppButton>
                    <AppButton disabled={false} size={"middle"}>
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

            {openModal && (
                <RetrospectiveModal
                    cancelButtonProps={{ style: { display: "none" } }}
                    onCancel={handleCancel}
                    visible={openModal}
                    width="400px"
                    operation={"ADD"}
                    text={"This is dummy"}
                    projectId={"61546b7864bccbe191f15977"}
                    srpintId=""
                    userId={user["email"]}
                />
            )}
        </>
    );
}

export default Retrospectives;
