import { Form } from "antd";
import PropTypes from "prop-types";
import React from "react";
import AppButton from "src/components/Common/AppButton/AppButton";
import AppModal from "src/components/Common/AppModal/AppModal";
import AppSelect from "src/components/Common/AppSelect/AppSelect";

function AddTicketModal({ addTicket, closeAddTicket, ticketList, onChangeTicketid, AddTicketToPoker }) {
    return (
        <AppModal visible={addTicket} handleCancel={closeAddTicket}>
            <Form
                name="basic"
                layout="vertical"
                align="middle"
                labelCol={{
                    span: 8,
                }}
                autoComplete="off"
            >
                <Form.Item
                    label="Ticket No"
                    name="ticketno"
                    type="text"
                    rules={[
                        {
                            required: true,
                            message: "Please input the ticket id",
                        },
                    ]}
                >
                    <AppSelect
                        options={ticketList}
                        placeholder="Ticket No"
                        display="ticketId"
                        onChange={onChangeTicketid}
                    />
                </Form.Item>
                <Form.Item>
                    <AppButton type="primary" size="large" htmlType="submit" onClick={AddTicketToPoker}>
                        Add
                    </AppButton>
                </Form.Item>
            </Form>
        </AppModal>
    );
}
AddTicketModal.propTypes = {
    addTicket: PropTypes.bool,
    ticketList: PropTypes.array,
    closeAddTicket: PropTypes.func,
    onChangeTicketid: PropTypes.func,
    AddTicketToPoker: PropTypes.func,
};
export default AddTicketModal;
