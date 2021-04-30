import React from "react";

const SelectorCard = ({ name, id, click }) => {
  return (
    <div className="p-5 m-5 rounded-lg shadow-lg flex justify-between bg-white items-center">
      <h3>{name}</h3>
      <button
        className="bg-green-600 text-white rounded-sm shadow-lg py-2 px-5"
        data-id={id}
        onClick={click}
      >
        Continue
      </button>
    </div>
  );
};

export default SelectorCard;
