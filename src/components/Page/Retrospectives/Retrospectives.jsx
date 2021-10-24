import { PhoneFilled, PlusCircleFilled } from "@ant-design/icons";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AppButton from "src/components/Common/AppButton/AppButton";
import Retrocard from "src/components/Page/Retrospectives/Retrocard/Retrocard";
import RetrospectiveModal from "src/components/Page/Retrospectives/RetrospectiveModal";
import styles from "src/components/Page/Retrospectives/Retrospectives.module.less";
import { RetroTypeEnum, SprintStatusEnum } from "src/config/Enums";
import { OperationEnum } from "src/config/Enums.ts";
import { fetchRetrospectives } from "src/redux";
import { useMeeting } from "src/util/hooks";

const Heading = ({ text }) => {
    return (
        <div className={styles.heading}>
            <h3>
                <b>{text}</b>
            </h3>
        </div>
    );
};

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

    const meetUrl = useMeeting();

    useEffect(() => {
        dispatch(fetchRetrospectives(selectedSprint._id));
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.actions}>
                    <AppButton
                        onClick={handleAdd}
                        size={"middle"}
                        style={{ marginRight: "8px" }}
                        disabled={selectedSprint?.status !== SprintStatusEnum.ACTIVE}
                    >
                        <>
                            <PlusCircleFilled /> Add Retrospective
                        </>
                    </AppButton>
                    <Link to={meetUrl} target="_blank">
                        <AppButton
                            disabled={selectedSprint?.status !== SprintStatusEnum.ACTIVE}
                            size={"middle"}
                            style={{ marginRight: "8px" }}
                        >
                            <>
                                <PhoneFilled /> Join Call
                            </>
                        </AppButton>
                    </Link>
                </div>
                <div className={styles.retroHeadingContainer}>
                    <Heading text={"Positive"} />
                    <Heading text={"Negative"} />
                    <Heading text={"Neutral"} />
                    <Heading text={"Action Items"} />
                </div>
                <div className={styles.retroContainer}>
                    <div className={styles.retroCardContainer}>
                        {retros[RetroTypeEnum.POSITIVE]?.map((retro, index) => {
                            return (
                                <Retrocard
                                    onClick={handleClick}
                                    sprint={selectedSprint?._id ?? ""}
                                    type={RetroTypeEnum.POSITIVE}
                                    text={retro.text}
                                    id={retro.id}
                                    key={index}
                                    index={index}
                                />
                            );
                        })}
                    </div>
                    <div className={styles.retroCardContainer}>
                        {retros[RetroTypeEnum.NEGATIVE]?.map((retro, index) => {
                            return (
                                <Retrocard
                                    onClick={handleClick}
                                    sprint={selectedSprint?._id ?? ""}
                                    type={RetroTypeEnum.NEGATIVE}
                                    text={retro.text}
                                    id={retro.id}
                                    key={index}
                                    index={index}
                                />
                            );
                        })}
                    </div>
                    <div className={styles.retroCardContainer}>
                        {retros[RetroTypeEnum.NEUTRAL]?.map((retro, index) => {
                            return (
                                <Retrocard
                                    onClick={handleClick}
                                    sprint={selectedSprint?._id ?? ""}
                                    type={RetroTypeEnum.NEUTRAL}
                                    text={retro.text}
                                    id={retro.id}
                                    key={index}
                                    index={index}
                                />
                            );
                        })}
                    </div>
                    <div className={styles.retroCardContainer}>
                        {retros[RetroTypeEnum.ACTIONS]?.map((retro, index) => {
                            return (
                                <Retrocard
                                    onClick={handleClick}
                                    sprint={selectedSprint?._id ?? ""}
                                    type={RetroTypeEnum.ACTIONS}
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
                    sprintId={selectedSprint?._id ?? "" ?? ""}
                    id={clickedRetro?.id ?? ""}
                    index={clickedRetro?.index ?? ""}
                />
            )}
        </>
    );
}

Heading.propTypes = {
    text: PropTypes.string,
};

export default Retrospectives;
