import React from "react";

import { ReactComponent as MultitudLogo } from "../../assets/multitud.svg";
import Steps from "./Steps";

const Header = () => {
  return (
    <>
      <div className="flex justify-center">
        <MultitudLogo style={{ width: "5%", height: "auto", margin: "1rem" }} />
      </div>
      <Steps />
    </>
  );
};

export default Header;
