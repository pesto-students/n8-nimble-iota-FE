import React from "react";
import { Result, Button } from "antd";
import { useHistory } from "react-router-dom";

function Servererror() {
    const history = useHistory();

    const handleClick = () => {
        history.push("/");
    };
    return (
        <Result
            status="500"
            title="500"
            subTitle="Sorry, something went wrong."
            extra={
                <Button type="primary" onClick={handleClick}>
                    Back Home
                </Button>
            }
        />
    );
}

export default Servererror;
