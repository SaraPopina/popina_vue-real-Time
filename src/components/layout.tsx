import React, { FC } from "react";
import { User } from "../store/types/AuthTypes";

interface Props {
  user: null;
}

export const Layout: FC = (user) => {
  console.log(user);
  return (
    <div>
      <h1>Layout component</h1>
    </div>
  );
};
