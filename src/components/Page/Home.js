import React from "react";
import { LogoutUser } from "../../redux";
import { useDispatch } from "react-redux";
import { Button } from "antd";

function Home() {
  const dispatch = useDispatch();
  return (
    <div>
      <Button type="primary" onClick={() => dispatch(LogoutUser())}>
        Sign out
      </Button>
    </div>
  );
}

export default Home;
