import { Checkbox, Radio } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import styles from "src/components/Common/Sidebar/BacklogsControls/BacklogsControls.module.less";
import { filterTickets, sortTickets } from "src/redux";

const BacklogsControls = (props) => {
    const dispatch = useDispatch();
    return (
        <div className={styles.controls}>
            <h6>Filter By</h6>
            <div className={styles.filters}>
                <div>
                    <Checkbox
                        onChange={(e) => {
                            dispatch(filterTickets({ filter: "bug", isAdded: e.target.checked }));
                        }}
                    >
                        Bug
                    </Checkbox>
                </div>
                <div>
                    <Checkbox
                        onChange={(e) => {
                            dispatch(filterTickets({ filter: "userStory", isAdded: e.target.checked }));
                        }}
                    >
                        User Story
                    </Checkbox>
                </div>
            </div>
            <h6>Sort By</h6>
            <div className={styles.sort}>
                <Radio.Group onChange={(e) => dispatch(sortTickets({ sortBy: e.nativeEvent.target.value }))}>
                    <Radio value="" className={styles.radio}>
                        Default
                    </Radio>
                    <Radio value="title" className={styles.radio}>
                        Title
                    </Radio>
                    <Radio value="storyPoints" className={styles.radio}>
                        Story Points
                    </Radio>
                    <Radio value="priority" className={styles.radio}>
                        Priority
                    </Radio>
                </Radio.Group>
            </div>
        </div>
    );
};

BacklogsControls.propTypes = {};

export default BacklogsControls;
