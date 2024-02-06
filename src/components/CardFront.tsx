import styled from "styled-components";
import cardLogo from "../assets/card-logo.svg";

const CardDetails = styled.div`
  margin-block-start: auto;
  color: #fff;
  letter-spacing: 1.5px;
`;
const CardNumbers = styled.div`
  margin-block-end: clamp(1.5rem, 1.0666rem + 1.849vw, 2.25rem);
  font-size: clamp(1.25rem, 0.7444rem + 2.1572vw, 2.125rem);
`;
const CardNameDate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: clamp(1rem, 0.9278rem + 0.3082vw, 1.125rem);
`;

export default function CardFront({
  cardMonth,
  cardName,
  cardNumber,
  cardYear,
}: CardFrontProps) {
  const formatCardMonthYear = (val: string) => {
    // if (val.length > 2) {
    //   val = val.slice(0, 2) + "";
    // }

    if (val.length && val.length < 2) {
      val = `0${val}`;
    }

    return val;
  };

  return (
    <div className="card card-front">
      <img src={cardLogo} alt="" width={84} />
      <CardDetails>
        <CardNumbers>{cardNumber}</CardNumbers>
        <CardNameDate>
          <span>{cardName}</span>
          <span>
            {formatCardMonthYear(cardMonth)}
            {cardMonth.length ? "/" : ""}
            {formatCardMonthYear(cardYear)}
          </span>
        </CardNameDate>
      </CardDetails>
    </div>
  );
}

interface CardFrontProps {
  cardNumber: string;
  cardName: string;
  cardYear: string;
  cardMonth: string;
}
