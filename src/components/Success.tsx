import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { Button } from "./Button";

const Container = styled.div`
  margin: auto;
  text-align: center;
`;
const Icon = styled.div`
  background-image: linear-gradient(var(--gradient-from), var(--gradient-to));
  height: 80px;
  aspect-ratio: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #fff;
  margin-block-end: 42px;
`;
const TextContent = styled.div`
  color: #000;
  font-size: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin-block-end: 32px;
`;
const Para = styled.p`
  color: var(--dark-grayish-violet);
  margin-block-end: 48px;
`;

export default function Success({ onContinue }: { onContinue: () => void }) {
  return (
    <Container>
      <Icon>
        <FaCheck size={32} />
      </Icon>
      <TextContent>thank you!</TextContent>
      <Para>We've added your card details</Para>
      <Button type="button" onClick={onContinue}>
        Continue
      </Button>
    </Container>
  );
}
