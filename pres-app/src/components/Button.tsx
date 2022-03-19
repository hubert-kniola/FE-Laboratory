import React from 'react';
import { FC, MouseEventHandler } from "react";

type ButtonProps = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  onML: MouseEventHandler<HTMLButtonElement> | undefined;
};

export const Button: FC<ButtonProps> = ({ text, onClick, onML}) => {
  return (
    <button className="Button" onClick={onClick} type="button" onMouseLeave={onML}>
      <p>{text}</p>
    </button>
  );
};
