import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useSocket from "../utils/socketConnect";

const Main = () => {
  const [state, setState] = useState(false);
  let history = useHistory();
  function handleClick() {
    history.push("/about");
  }
  useSocket();
  return (
    <div className="container flex m-auto">
      <div className="w-full bg-blue-400">
        container Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Aperiam corporis enim in nesciunt incidunt optio aliquam rem, suscipit
        deserunt voluptate dolor impedit velit vero et a nam ipsum quidem porro?
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non, harum.
        Consequuntur dolor doloribus et consectetur voluptates sapiente debitis
        ex fuga ad, optio atque voluptatem accusamus delectus a temporibus!
        Reiciendis, vel!
      </div>
    </div>
  );
};

export default Main;
