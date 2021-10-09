import React from "react";
import styles from "src/components/Page/Retrospectives/Retrocard/Retrocard.module.less";
import { Input } from "antd";
import PropTypes from "prop-types";
import classNames from "classnames";
import { DeleteFilled } from "@ant-design/icons";
import CardCustom from "src/components/Common/Card/Card";

function Retrocard({ type,text }) {
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
                <>
                    <TextArea
                        placeholder="Text here ..."
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
                        value={text}
                        // onChange={handleTextChange}
                    />
                    <div className={styles.actionCont}>
                        <DeleteFilled />
                    </div>
                </>
            </CardCustom>
        </div>
    );
}

Retrocard.propTypes = {
    type: PropTypes.string,
    text : PropTypes.string
};

export default Retrocard;
