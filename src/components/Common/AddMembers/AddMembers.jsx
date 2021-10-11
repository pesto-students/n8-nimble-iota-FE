import React from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import assetMap from "src/assets";
import AppInput from "src/components/Common/AppInput/AppInput";
import AppDropDown from "src/components/Common/AppDropDown/AppDropDown";
import { addMember, searchMembers } from "src/redux/memberSearch/memberSearchActions";
import { debounce } from "src/util/helperFunctions";
import { useSelector } from "react-redux";
import AppSelect from "src/components/Common/AppSelect/AppSelect";
import AppButton from "src/components/Common/AppButton/AppButton";
import { useState } from "react";
import { UserSwitchOutlined } from "@ant-design/icons";

const AddMembers = ({ projectId }) => {
    const dispatch = useDispatch();
    const handleSearch = (val) => dispatch(searchMembers(val));
    const handleSearchDebounced = debounce(handleSearch);
    const searchReuslt = useSelector((state) => state.memberSearch.members);
    const [selectedMember, setSelectedMember] = useState("");
    const handleAdd = () => {
        const user = JSON.parse(selectedMember);
        dispatch(addMember({ memberId: user._id, projectId }));
    };
    return (
        <div align="middle">
            <img src={assetMap("roundlogo")} alt="Nimble" />
            <h3>Add Members</h3>
            <AppSelect
                showSearch
                onSearch={(val) => {
                    handleSearchDebounced(val);
                }}
                placeholder="Search members..."
                value={selectedMember}
                onChnage={(e) => setSelectedMember(e)}
                options={searchReuslt}
            />
            <AppButton>Add</AppButton>
        </div>
    );
};

AddMembers.propTypes = {
    projectId: PropTypes.string,
};

export default AddMembers;
