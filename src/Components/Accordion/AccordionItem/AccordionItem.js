import React from "react";

function AccordianItem({ id, headerText, children, parentId }) {
  return (
    <div className="card bg-transparent">
      <div className="card-header" id={`heading${id}`}>
        <h2 className="mb-0">
          <button
            className="btn btn-block text-left text-white collapsed"
            type="button"
            data-toggle="collapse"
            data-target={`#collapse${id}`}
            aria-expanded="true"
            aria-controls={`collapse${id}`}
          >
            {headerText}
          </button>
        </h2>
      </div>
      <div
        id={`collapse${id}`}
        className="collapse"
        aria-labelledby={`heading${id}`}
        data-parent={`#accordian${parentId}`}
      >
        <div className="card-body text-white">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AccordianItem;
