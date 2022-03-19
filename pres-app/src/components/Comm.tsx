import { FC } from "react";
import { FormData } from "../forms/Forms";

type CommProps = {
  isCorrect: boolean;
  data: FormData;
};

export const Comm: FC<CommProps> = ({ isCorrect, data }) => {
  if (isCorrect) {
    return (
      <div className="Comm">
        <label>Welcome {data.FirstName} </label>
      </div>
    );
  } else {
    return <></>;
  }
};
