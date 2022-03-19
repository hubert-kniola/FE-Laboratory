import { ChangeEventHandler, FC } from "react";

type InputProps = {
  type: string;
  text: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
};

export const Input: FC<InputProps> = ({ type, text, onChange }) => {
  return (
    <div className="Input">
      <label>{text}</label>
      <br />
      <input type={type} onChange={onChange}></input>
    </div>
  );
};
