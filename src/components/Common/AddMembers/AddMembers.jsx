import { Space } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import assetMap from "src/assets";
import styles from "src/components/Common/AddMembers/AddMembers.module.less";
import AppButton from "src/components/Common/AppButton/AppButton";
import AppSelect from "src/components/Common/AppSelect/AppSelect";
import { addMember, searchMembers } from "src/redux/memberSearch/memberSearchActions";
import { debounce } from "src/util/helperFunctions";

const AddMembers = ({ projectId, onAdd }) => {
    const dispatch = useDispatch();
    const handleSearch = (val) => dispatch(searchMembers(val));
    const handleSearchDebounced = debounce(handleSearch);
    const searchReuslt = useSelector((state) => state.memberSearch.members);
    const [selectedMember, setSelectedMember] = useState("");
    const handleAdd = () => {
        const user = JSON.parse(selectedMember);
        dispatch(addMember({ memberId: user._id, projectId }));
        onAdd && onAdd();
    };
    const handleChange = (e) => {
        setSelectedMember(e);
    };
    useEffect(() => {
        dispatch(searchMembers(""));
    }, []);
    return (
        <div align="middle" className={styles.middle}>
            <Space size="middle" direction="vertical">
                <img src={assetMap("roundlogo")} alt="Nimble" />
                <h3>Add Members</h3>
                <div>
                    <AppSelect
                        showSearch
                        onSearch={(val) => {
                            handleSearchDebounced(val);
                        }}
                        placeholder="Search members..."
                        value={selectedMember}
                        onChange={handleChange}
                        options={searchReuslt}
                    />
                </div>
                <div>
                    <AppButton onClick={handleAdd}>Add</AppButton>
                </div>
            </Space>
        </div>
    );
};

AddMembers.propTypes = {
    projectId: PropTypes.string,
    onAdd: PropTypes.func,
};

export default AddMembers;
