import React, {useState, useEffect} from "react";
import "../styles/main.scss";

const Popup = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    chrome.storage.sync.set({name: name}, () => {
      console.log("Name is set to: ", name);
    });
  };
  useEffect(() => {
    chrome.storage.sync.get(["name"], (res) => {
      console.log(res.name);
    });
  }, []);
  return (
    <div>
      <h1>Hello World</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Enter a name" />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Popup;
