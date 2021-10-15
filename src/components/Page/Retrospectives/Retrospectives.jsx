import { CheckCircleFilled, PhoneFilled, PlusCircleFilled } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import AppButton from "src/components/Common/AppButton/AppButton";
import Retrocard from "src/components/Page/Retrospectives/Retrocard/Retrocard";
import RetrospectiveModal from "src/components/Page/Retrospectives/RetrospectiveModal";
import styles from "src/components/Page/Retrospectives/Retrospectives.module.less";
import { Link } from "react-router-dom";
import { useRouting } from "src/util/hooks";
import { fetchRetrospectives } from "src/redux";
import { fireStoreKeys } from "src/config/constants";
import { OperationEnum } from "src/config/Enums.ts";

function Retrospectives() {
    const [openModal, setOpenModal] = useState(false);
    const [operation, setOperation] = useState();
    const [clickedRetro, setClickedRetro] = useState();
    const { selectedSprint } = useSelector((state) => state.project.sprint);

    const { user } = useSelector((state) => state.user);
    const { retroLoading, retros } = useSelector((state) => state.project.retrospectives);

    const dispatch = useDispatch();

    const handleAdd = () => {
        setOperation(OperationEnum.ADD);
        setOpenModal(true);
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    const handleClick = (retro) => {
        setOperation(OperationEnum.UPDATE);
        setClickedRetro(retro);
        setOpenModal(true);
    };

    const { url } = useRouting();
    let splits = url.split("/");
    splits = splits.slice(0, -1);
    const meetUrl = `${splits.join("/")}/meet`;

    useEffect(() => {
        dispatch(fetchRetrospectives(selectedSprint._id));
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.actions}>
                    <AppButton onClick={handleAdd} size={"middle"} style={{ marginRight: "8px" }}>
                        <>
                            <PlusCircleFilled /> Add Retrospective
                        </>
                    </AppButton>
                    <Link to={meetUrl}>
                        <AppButton disabled={false} size={"middle"} style={{ marginRight: "8px" }}>
                            <>
                                <PhoneFilled /> Join Call
                            </>
                        </AppButton>
                    </Link>
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
                        {retros[fireStoreKeys.positive]?.map((retro, index) => {
                            return (
                                <Retrocard
                                    onClick={handleClick}
                                    sprint={selectedSprint?._id??""}
                                    type={fireStoreKeys.positive}
                                    text={retro.text}
                                    id={retro.id}
                                    key={index}
                                    index={index}
                                />
                            );
                        })}
                    </div>
                    <div className={styles.retroCardContainer}>
                        {retros[fireStoreKeys.negative]?.map((retro, index) => {
                            return (
                                <Retrocard
                                    onClick={handleClick}
                                    sprint={selectedSprint?._id??""}
                                    type={fireStoreKeys.negative}
                                    text={retro.text}
                                    id={retro.id}
                                    key={index}
                                    index={index}
                                />
                            );
                        })}
                    </div>
                    <div className={styles.retroCardContainer}>
                        {retros[fireStoreKeys.neutral]?.map((retro, index) => {
                            return (
                                <Retrocard
                                    onClick={handleClick}
                                    sprint={selectedSprint?._id??""}
                                    type={fireStoreKeys.neutral}
                                    text={retro.text}
                                    id={retro.id}
                                    key={index}
                                    index={index}
                                />
                            );
                        })}
                    </div>
                    <div className={styles.retroCardContainer}>
                        {retros[fireStoreKeys.actions]?.map((retro, index) => {
                            return (
                                <Retrocard
                                    onClick={handleClick}
                                    sprint={selectedSprint?._id??""}
                                    type={fireStoreKeys.actions}
                                    text={retro.text}
                                    id={retro.id}
                                    key={index}
                                    index={index}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {openModal && (
                <RetrospectiveModal
                    cancelButtonProps={{ style: { display: "none" } }}
                    onCancel={handleCancel}
                    visible={openModal}
                    width="400px"
                    operation={operation}
                    retroType={clickedRetro?.type ?? ""}
                    retroText={clickedRetro?.text ?? ""}
                    sprintId={selectedSprint?._id??""??""}
                    id={clickedRetro?.id ?? ""}
                    index={clickedRetro?.index ?? ""}
                />
            )}
        </>
    );
}

export default Retrospectives;
