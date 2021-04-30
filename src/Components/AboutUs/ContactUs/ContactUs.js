import React, { useState } from "react";
import "./ContactUs.css";
import emailjs from "emailjs-com";

function ContactUs() {
  const [error, setError] = useState();

  const sendEmail = (event) => {
    event.preventDefault();

    emailjs.sendForm(
      "bcaproject", 								// Service id (gmail)
      "template_8omwup7", 					// Template id of the email.
      event.target, 								// input
      "user_gNtKuwdgegE9KyZs4NguC" 	// API key
    )
    .then(
      (result) => console.log(result.text),
      (error) => setError(error.text)
    );

    event.target.reset();
  };

  return (
    <div>
      <form onSubmit={sendEmail}>
        <input
          className="form-control mb-2"
          type="text"
          name="fullName"
          placeholder="Full Name"
          pattern="[A-Za-z ]{1,32}"
          required
        />
        <input
          className="form-control mb-2"
          type="text"
          name="email"
          placeholder="Email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          required
        />
        <textarea
          className="form-control mb-2"
          name="message"
          cols="30"
          rows="4"
          placeholder="Message"
          maxLength="100"
          required
        ></textarea>
        <input className="btn btn-dark" type="submit" value="Submit" />

        {error && (
          <div
            className="alert alert-danger alert-dismissible fade show m-3"
            role="alert"
          >
            {error}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
export default ContactUs;
