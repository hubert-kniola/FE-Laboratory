import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Comm } from "../components/Comm";
import { ChangeEvent, useState } from "react";

export interface FormData {
    FirstName: string;
    LastName: string;
}

export const Form = () => {
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [data, setData] = useState<FormData>({FirstName: "", LastName: ""});

  const handleClick = () => {
    setIsCorrect(true);
  };

  const handleMouseLeave = () => {
    setIsCorrect(false);
  };

  return (
    <form className="Form">
      <Input type="text" text="First Name" onChange={(e: ChangeEvent<HTMLInputElement>) => setData({...data, FirstName: e.target.value})}></Input>
      <Input type="text" text="Last Name"  onChange={(e: ChangeEvent<HTMLInputElement>) => setData({...data, LastName: e.target.value})}></Input>
      <Button text="Hello" onClick={handleClick} onML={handleMouseLeave}></Button>
      <Comm isCorrect={isCorrect} data={data}></Comm>
    </form>
  );
};
