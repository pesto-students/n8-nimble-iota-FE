import React from "react";
import { Card } from "antd";
import { CoffeeOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import styles from "src/components/Page/Poker/Poker.module.less";

function EstimationCard(props) {
    const { selected, value, onClick } = props;
    return (
        <Card hoverable className={selected ? styles.selectedcard : styles.card} onClick={onClick} align="middle">
            {parseInt(value) < 1 ? (
                <div>
                    <CoffeeOutlined className={styles.cardtext} />
                </div>
            ) : (
                <div className={styles.cardtext}>{value}</div>
            )}
        </Card>
    );
}
EstimationCard.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
    selected: PropTypes.bool,
};
export default EstimationCard;
