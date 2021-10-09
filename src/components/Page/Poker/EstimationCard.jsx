import React from "react";
import { Card, Typography } from "antd";
import { CoffeeOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import styles from "src/components/Page/Poker/Poker.module.less";

function EstimationCard(props) {
    const { Text } = Typography;
    const { selected, value, onClick } = props;
    return (
        <Card hoverable className={selected ? styles.selectedcard : styles.card} onClick={onClick} align="middle">
            {parseInt(value) < 1 ? (
                <CoffeeOutlined className={styles.cardtext} />
            ) : (
                <Text className={styles.cardtext}>{value}</Text>
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
