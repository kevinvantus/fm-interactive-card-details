import { useState } from "react";
import "./App.css";
import CardBack from "./components/CardBack";
import CardForm from "./components/CardForm";
import CardFront from "./components/CardFront";
import Success from "./components/Success";

type Inputs = {
  cardName: string;
  cardMonth: string;
  cardYear: string;
  cvc: string;
};

function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [card, setCard] = useState<Inputs>({
    cardMonth: "",
    cardName: "",
    cardYear: "",
    cvc: "",
  });

  return (
    <main>
      <div className="card-ctr">
        <div className="cards">
          <CardFront
            cardMonth={card.cardMonth}
            cardName={card.cardName}
            cardNumber={cardNumber}
            cardYear={card.cardYear}
          />
          <CardBack cvc={card.cvc} />
        </div>
      </div>

      <div className="form-ctr">
        {submitted ? (
          <Success onContinue={() => setSubmitted(false)} />
        ) : (
          <CardForm
            setCardValues={setCard}
            setMyCardNumber={setCardNumber}
            setFormSubmitted={status => setSubmitted(status)}
          />
        )}
      </div>
    </main>
  );
}

export default App;
