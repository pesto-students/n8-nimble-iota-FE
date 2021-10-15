import { Divider } from "antd";
import Operation from "antd/lib/transfer/operation";
import PropTypes from "prop-types";
import TextArea from "rc-textarea";
import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import AppButton from "src/components/Common/AppButton/AppButton";
import AppModal from "src/components/Common/AppModal/AppModal";
import AppSelect from "src/components/Common/AppSelect/AppSelect";
import TicketListItem from "src/components/TicketModal/TicketListItem";
import { fireStoreKeys, retroTypes } from "src/config/constants";
import { OperationEnum } from "src/config/Enums.ts";
import { addRetrospective,updateRetroSpective } from "src/redux/Project/Retrospectives/retroActions";
import { equalsIgnoreCase } from "src/util/helperFunctions";



function RetrospectiveModal(props) {
    const {id, sprintId, retroText ,retroType,operation,index } = props;
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const [type, setType] = useState("");
    const [text, setText] = useState("");
   

    const handleTextChange = (event) => {
        setText(event.target.value);
    };
   
    const handleTypeChange = (value) => {
        setType(JSON.parse(value)?.name??"" )
    };


    const handleRetro = ()=>{
        if (operation == OperationEnum.ADD) {
            dispatch(addRetrospective(sprintId,type,user.id,text));
        } else {
            dispatch(updateRetroSpective(sprintId,type,user.id,text,index));
        }
    }

    useEffect(() => {
        if (operation == OperationEnum.UPDATE) {
            setText(retroText)
            setType(retroTypes.find((ele)=>equalsIgnoreCase(ele.name,retroType))?.name??"")
        }else{
            setType(retroTypes[0].name)
        } 
    }, []);

    return (
        <>
            <AppModal {...props}>
                <div className="retroHeading" style={{ textAlign: "center", width: "100%", color: "primary" }}>
                    <b>Add Retrospective</b>
                </div>
                <Divider />
                <TicketListItem
                    label="Type"
                    Component={
                        <AppSelect
                            style={{ width: "60%" }}
                            onChange={handleTypeChange}
                            value={type}
                            options={retroTypes}
                            disabled = {operation == OperationEnum.UPDATE}
                        />
                    }
                />
                <Divider />
                <TicketListItem
                    label="Description"
                    fullWidth={true}
                    Component={
                        <TextArea
                            placeholder="This is retro text."
                            isPassword={false}
                            size="large"
                            style={{ width: "100%", height: "80px" }}
                            value={text}
                            onChange={handleTextChange}
                        />
                    }
                />
                 <Divider />
              
                {/*TODO Check if Retro is complete --> then only add/update*/}
                <AppButton disabled={operation == OperationEnum.UPDATE && id!==user.id} onClick={handleRetro} style={{ width: "100%" }}>
                    {operation == OperationEnum.UPDATE  ? "Update" : "Add" }
                </AppButton>
            </AppModal>

           
        </>
    );
}

RetrospectiveModal.propTypes = {
    operation: PropTypes.string,
    retroText: PropTypes.string,
    retroType: PropTypes.string,
    sprintId: PropTypes.array,
    id: PropTypes.string,
    index : PropTypes.number
    
};

export default RetrospectiveModal;
