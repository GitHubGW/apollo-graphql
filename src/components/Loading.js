import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
`;

const Loading = () => {
  return (
    <Container>
      <Title>Loading...🔥</Title>
    </Container>
  );
};

export default Loading;
