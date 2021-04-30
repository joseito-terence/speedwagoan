import React from "react";

const Modal = ({ id, buttonText, buttonIcon, className, title, children }) => {
  return (
    <div>
      <button 
        type="button" 
        className={!className ? 'btn btn-primary' : className}
        data-toggle="modal" 
        data-target={`#${id}`}
      >
        <i className={`${buttonIcon} ${buttonIcon && 'mx-1'}`}></i>
        {buttonText}
      </button>

      <div className="modal fade" id={id} /*data-backdrop="static"*/ data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                {title}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body  p-0">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
