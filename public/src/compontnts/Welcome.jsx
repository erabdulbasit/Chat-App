import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

const Welcome = ({ currentUser }) => {
  console.log("current user is ", currentUser);

  // Don't render anything if currentUser is not available
  if (!currentUser) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <img src={Robot} alt="robot" />
      <h1>
        Welcome, <span>{currentUser.username}</span>
      </h1>
      <h3>Please select a chat to Start Messaging</h3>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  img {
    height: 20rem;
  }
  span {
    color: blue;
  }
`;

export default Welcome;
