import React from "react";
import { createRoot } from "react-dom/client";
import "./options.css";
const options = (
  <div>
    <h1>HELLO WORLD</h1>
  </div>
);

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(options);
