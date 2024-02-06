import styled from "styled-components";

const Container = styled.div`
  color: #fff;
  height: 100%;
  position: relative;
`;
const CardCVC = styled.div`
  position: absolute;
  right: 13.5%;
  top: 44%;
  font-size: clamp(1rem, 0.9278rem + 0.3082vw, 1.125rem);
`;

export default function CardBack({ cvc }: { cvc: string }) {
  return (
    <div className="card card-back">
      <Container>
        <CardCVC>{cvc}</CardCVC>
      </Container>
    </div>
  );
}
