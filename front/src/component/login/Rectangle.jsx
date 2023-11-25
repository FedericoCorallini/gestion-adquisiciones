/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import "./style.css";

export const Rectangle = ({ className }) => {
  return (
    <div className={`rectangle ${className}`}>
      <div className="overlap-group">
        <img className="img" alt="Rectangle" src="/img/rectangle-2.svg" />
        <div className="text-wrapper">Log In</div>
      </div>
      <div className="overlap">
        <div className="div">Usuario</div>
      </div>
      <div className="overlap-2">
        <div className="div-2" />
        <div className="text-wrapper-2">Contraseña</div>
      </div>
    </div>
  );
};
