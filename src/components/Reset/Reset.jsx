import "./Reset.css";
import React, { useEffect, useState } from "react";

export default function Reset({ onReset }) {
  return (
    <div className="Reset">
      <div type="submit" className="button" onClick={onReset}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        Reset
      </div>
    </div>
  );
}
