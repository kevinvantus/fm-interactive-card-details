import styled from "styled-components";

export const Button = styled.button`
  width: 100%;
  background-color: var(--very-dark-violet);
  color: var(--white);
  height: 52px;
  border-radius: 8px;
  cursor: pointer;
  text-transform: capitalize;
  font-size: clamp(1rem, 0.9278rem + 0.3082vw, 1.125rem);
  letter-spacing: 1.5px;
  font-weight: 500;

  &:hover {
    background-color: var(--gradient-to);
  }
  &:focus {
    background-color: var(--gradient-to);
    outline: 1px solid #000;
    outline-offset: 2px;
  }
`;
