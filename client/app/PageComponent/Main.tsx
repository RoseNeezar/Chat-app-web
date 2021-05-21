import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Main = () => {
  const [state, setState] = useState(false);
  let history = useHistory();
  function handleClick() {
    history.push("/about");
  }
  return (
    <div>
      {state ? <div>if it ts true</div> : <div>FALSE</div>}this is rendered on
      client
      <button onClick={() => setState(!state)}>click</button>
      <button onClick={() => handleClick()}>tABOUT</button>
    </div>
  );
};

export default Main;
