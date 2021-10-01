import React, { useState } from "react";
import { Link } from "react-scroll";
import Landing from "../Common/Landing";
import Features from "../Common/Landing/Features/Features";
import LandingMain from "../Common/Landing/Main/LandingMain";
import Pricing from "../Common/Landing/Pricing/Pricing";

function PlayArea() {
    const [page, setPage] = useState(1);
    return (
        <>
            <div>
                <Link to="main">main</Link>
                <Link to="features">features</Link>
                <Link to="pricing">pricing</Link>
            </div>
            <Landing />
        </>
    );
}

export default PlayArea;
