import { Divider } from "antd";
import PropTypes from "prop-types";
import TextArea from "rc-textarea";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AppButton from "src/components/Common/AppButton/AppButton";
import AppModal from "src/components/Common/AppModal/AppModal";
import AppSelect from "src/components/Common/AppSelect/AppSelect";
import TicketListItem from "src/components/TicketModal/TicketListItem";
import retroConstants from "src/config/Retrospective";
import { addRetrospective } from "src/redux/Project/Retrospectives/retroActions";



function RetrospectiveModal(props) {
    const { projectId, userId, sprintId, text ,retroType,operation } = props;
    const dispatch = useDispatch();

    const [type, setType] = useState("");
    const [retroText, setText] = useState("");
   

    const handleTextChange = (event) => {
        setText(event.target.value);
    };
   
    const handleTypeChange = (value) => {
        setType(retroConstants.retroType.find((rType)=> rType["_id"] == value))
    };


    const handleRetro = ()=>{
        if (operation == "ADD") {
            console.log(type)
            dispatch(addRetrospective(sprintId,userId,type.name,text));
        } else {
            dispatch(addRetrospective(sprintId,userId,type,text));
        }
    }

    useEffect(() => {
        if (operation == "UPDATE") {
            setText(text)
            setType(retroConstants.retroType.find((rtype)=>{
                rtype.name === retroType
            }))
        }else{
            setType(retroConstants.retroType[0])
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
                            value={type?.name ?? ""}
                            options={retroConstants.retroType}
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
              
                <AppButton onClick={handleRetro} style={{ width: "100%" }}>
                    {operation == "UPDATE" ? "Update" : "Add"}
                </AppButton>
            </AppModal>

           
        </>
    );
}

RetrospectiveModal.propTypes = {
    operation: PropTypes.string,
    text: PropTypes.string,
    retroType: PropTypes.string,
    sprintId: PropTypes.array,
    projectId: PropTypes.string,
    userId: PropTypes.string,
    
};

export default RetrospectiveModal;
