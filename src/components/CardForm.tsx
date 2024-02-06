import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import { Button } from "./Button";

const ErrorMessage = styled.div`
  margin-block-start: 8px;
  font-size: 0.75rem;
  color: hsl(0, 100%, 66%);
`;
const DateCVCError = styled.div`
  display: flex;
  gap: 1rem;

  & > div {
    flex-basis: 50%;
  }
`;

export default function CardForm({
  setMyCardNumber,
  setCardValues,
  setFormSubmitted,
}: CardFormProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [form, setForm] = useState<Omit<Inputs, "cardNumber">>({
    cardMonth: "",
    cardName: "",
    cardYear: "",
    cvc: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
    setFormSubmitted(true);
  };

  const handleCardNumberChange = (e: InputEvent) => {
    let { value } = e.target as HTMLInputElement;

    value = value.replace(/\D/g, "");
    let maskedValue = "";

    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) {
        maskedValue += " ";
      }
      maskedValue += value[i];
    }
    setCardNumber(maskedValue);
    setMyCardNumber(maskedValue);
  };

  const handleCardValueChange = (e: InputEvent, field: keyof Inputs) => {
    let { value } = e.target as HTMLInputElement;

    if (field === "cardMonth" && value.length < 2) {
      if (value.length > 2) {
        value = value.slice(0, 2);
      }

      if (value.length < 2) {
        value = `0${value}`;
        console.log(value);
      }
    }

    if (field === "cardYear" && value.length < 2) {
      value = `0${value}`;
      console.log(value);
    }

    setForm({
      ...form,
      [field]: value,
    });
    setCardValues({ ...form, [field]: value });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label htmlFor="name">cardholder name</label>
        <input
          type="text"
          id="name"
          placeholder="e.g Jane Appleseed"
          defaultValue=""
          className={errors.cardName && "invalid"}
          aria-invalid={errors.cardName ? "true" : "false"}
          {...register("cardName", {
            required: true,
            pattern: /[A-Z]{1}[a-z]+[\s]{1}[A-Z]{1}[a-z]+/,
            onChange: (e: InputEvent) => handleCardValueChange(e, "cardName"),
          })}
        />
        {errors.cardName && (
          <>
            {errors.cardName.type === "required" && (
              <ErrorMessage role="alert">Name is required.</ErrorMessage>
            )}
            {errors.cardName.type === "pattern" && (
              <ErrorMessage role="alert">
                Name must be entered as [First] [Last].
              </ErrorMessage>
            )}
          </>
        )}
      </div>

      <div className="field">
        <label htmlFor="card-number">card number</label>
        <input
          type="text"
          id="card-number"
          placeholder="e.g 1234 5678 9123 0000"
          className={errors.cardNumber && "invalid"}
          aria-invalid={errors.cardNumber ? "true" : "false"}
          {...register("cardNumber", {
            required: true,
            minLength: 19,
            maxLength: 19,
            onChange: handleCardNumberChange,
          })}
          value={cardNumber}
        />
        {errors.cardNumber && (
          <>
            {errors.cardNumber.type === "required" && (
              <ErrorMessage role="alert">Card number is required.</ErrorMessage>
            )}
            {(errors.cardNumber?.type === "maxLength" ||
              errors.cardNumber?.type === "minLength") && (
              <ErrorMessage role="alert">
                Wrong format, numbers only.
              </ErrorMessage>
            )}
          </>
        )}
      </div>

      <div className="field">
        <div className="date-cvc">
          <div className="exp-ctr">
            <label htmlFor="exp">exp. date (mm/yy)</label>

            <div className="date">
              <input
                type="number"
                id="exp"
                placeholder="MM"
                defaultValue=""
                className={errors.cardMonth && "invalid"}
                aria-invalid={errors.cardMonth ? "true" : "false"}
                {...register("cardMonth", {
                  required: true,
                  minLength: 1,
                  maxLength: 2,
                  min: 0,
                  max: 12,
                  onChange: (e: InputEvent) =>
                    handleCardValueChange(e, "cardMonth"),
                })}
              />

              <input
                type="number"
                id="exp"
                placeholder="YY"
                defaultValue=""
                className={errors.cardYear && "invalid"}
                {...register("cardYear", {
                  required: true,
                  minLength: 1,
                  maxLength: 2,
                  min: 0,
                  max: 99,
                  onChange: (e: InputEvent) =>
                    handleCardValueChange(e, "cardYear"),
                })}
              />
            </div>
          </div>

          <div className="cvc">
            <label htmlFor="cvc">cvc</label>
            <input
              type="number"
              id="cvc"
              placeholder="e.g 123"
              defaultValue=""
              className={errors.cvc && "invalid"}
              {...register("cvc", {
                required: true,
                minLength: 3,
                maxLength: 3,
                onChange: (e: InputEvent) => handleCardValueChange(e, "cvc"),
              })}
            />
          </div>
        </div>
        <DateCVCError>
          <div>
            {(errors.cardMonth || errors.cardYear) && (
              <ErrorMessage role="alert">Can't be blank.</ErrorMessage>
            )}
          </div>
          <div>
            {errors.cvc && (
              <>
                {errors.cvc.type === "required" && (
                  <ErrorMessage role="alert">CVC is required.</ErrorMessage>
                )}
                {errors.cvc.type !== "required" && (
                  <ErrorMessage role="alert">Invalid CVC.</ErrorMessage>
                )}
              </>
            )}
          </div>
        </DateCVCError>
      </div>

      <div className="btn-ctr">
        <Button type="submit">confirm</Button>
      </div>
    </form>
  );
}

type Inputs = {
  cardName: string;
  cardNumber: string;
  cardMonth: string;
  cardYear: string;
  cvc: string;
};

interface CardFormProps {
  setCardValues: (data: Omit<Inputs, "cardNumber">) => void;
  setMyCardNumber: (value: string) => void;
  setFormSubmitted: (status: boolean) => void;
}
