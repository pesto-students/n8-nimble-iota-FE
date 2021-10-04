import React from "react";
import CardCustom from "../../../Common/Card/Card";
import styles from "./Retrocard.module.less";
import { Input } from "antd";
import PropTypes from "prop-types";
import classNames from "classnames";
import { DeleteFilled } from "@ant-design/icons";

function Retrocard({ type }) {
    const { TextArea } = Input;

    return (
        <div className={styles.container}>
            <CardCustom
                className={classNames({
                    [styles.positive]: type == "positive",
                    [styles.negitive]: type == "negitive",
                    [styles.neutral]: type == "neutral",
                    [styles.actionItem]: type == "actionItem",
                    [styles.retroCard]: true,
                })}
                bodyStyle={{ height: "100%", padding: "8px" }}
            >
                <TextArea
                    placeholder="Text here ..."
                    isPassword={false}
                    size="large"
                    style={{
                        width: "100%",
                        // borderRadius: "8px",
                        height: "90%",
                        border: "none",
                        // backgroundColor: "transparent",
                        outline: "none",
                    }}
                    className={classNames({
                        [styles.positive]: type == "positive",
                        [styles.negitive]: type == "negitive",
                        [styles.neutral]: type == "neutral",
                        [styles.actionItem]: type == "actionItem",
                    })}
                    value={"The sprint was well planned and clear on the requirements and effort estimation."}
                    // onChange={handleTextChange}
                />
                <div className={styles.actionCont}>
                    <DeleteFilled />
                </div>
            </CardCustom>
        </div>
    );
}

Retrocard.propTypes = {
    type: PropTypes.string,
};

export default Retrocard;
