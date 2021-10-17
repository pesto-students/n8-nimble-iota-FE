import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "src/components/Page/Retrospectives/Retrocard/Retrocard.module.less";
import { Input } from "antd";
import PropTypes from "prop-types";
import classNames from "classnames";
import { DeleteFilled } from "@ant-design/icons";
import CardCustom from "src/components/Common/Card/Card";
import { fireStoreKeys } from "src/config/constants";
import { deleteRetro } from "src/redux";
import { equalsIgnoreCase } from "src/util/helperFunctions";

function Retrocard({ type, text, id, sprint, onClick, index }) {
    const { TextArea } = Input;
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const handleDelete = (e) => {
        e.stopPropagation();
        dispatch(deleteRetro(sprint, id, type));
    };
    const handleOnClick = () => {
        onClick({ id, text, index, type });
    };
    return (
        <div className={styles.container}>
            <CardCustom
                className={classNames({
                    [styles.positive]: type == fireStoreKeys.positive,
                    [styles.negitive]: type == fireStoreKeys.negative,
                    [styles.neutral]: type == fireStoreKeys.neutral,
                    [styles.actionItem]: type == fireStoreKeys.actions,
                    [styles.retroCard]: true,
                })}
                bodyStyle={{ height: "100%", padding: "8px" }}
                onClick={handleOnClick}
            >
                <>
                    <TextArea
                        placeholder="Text here ..."
                        size="large"
                        style={{
                            width: "100%",
                            height: "90%",
                            border: "none",
                            outline: "none",
                        }}
                        className={classNames({
                            [styles.positive]: type == fireStoreKeys.positive,
                            [styles.negitive]: type == fireStoreKeys.negative,
                            [styles.neutral]: type == fireStoreKeys.neutral,
                            [styles.actionItem]: type == fireStoreKeys.actions,
                        })}
                        value={text}
                    />
                    {/*/* TODO Add check that render delete only for those retros which belong to user */}
                    {equalsIgnoreCase(id, user?.id) && (
                        <div className={styles.actionCont}>
                            <DeleteFilled onClick={handleDelete} />
                        </div>
                    )}
                </>
            </CardCustom>
        </div>
    );
}

Retrocard.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string,
    id: PropTypes.string,
    sprint: PropTypes.string,
    onClick: PropTypes.func,
    index: PropTypes.number,
};

export default Retrocard;
