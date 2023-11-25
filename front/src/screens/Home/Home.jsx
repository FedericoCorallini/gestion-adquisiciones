import React from "react";
import { Rectangle } from "../../component/login/Rectangle";
import "./style.css";

export const Home = () => {
  return (
    <div className="home">
      <div className="overlap-wrapper">
        <div className="overlap-3">
          <Rectangle className="rectangle-1" />
          <div className="text-wrapper-3">GIUCT</div>
        </div>
      </div>
    </div>
  );
};
