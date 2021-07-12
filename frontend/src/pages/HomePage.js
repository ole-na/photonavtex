import React from "react";
import styled from "styled-components/macro";

export default function HomePage() {
    return (
        <Wrapper style={{position: "relative"}} />
    );
}

const Wrapper = styled.div`
    background-image: url("../../images/anchor_sailing_web.jpeg");
    background-position: center;
    background-attachment: fixed;
    background-size: 100% auto;
    height: 80%;
    background-repeat: no-repeat;
`;