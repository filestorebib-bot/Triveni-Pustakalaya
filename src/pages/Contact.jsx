import {
  Mail,
  MapPin,
  Send
} from "lucide-react";

function Contact() {

  return (
    <section className="page-section">

      <div className="page-header">

        <span className="eyebrow">
          GET IN TOUCH
        </span>

        <h1>
          Contact
        </h1>

        <p>
          Have a question, suggestion or educational
          resource to share? Get in touch.
        </p>

      </div>

      <div className="contact-grid">

        <div className="contact-info">

          <div className="contact-item">

            <div className="contact-icon">
              <Mail />
            </div>

            <div>
              <h3>
                Email
              </h3>

              <p>
                info@trivenipustakalaya.com
              </p>
            </div>

          </div>

          <div className="contact-item">

            <div className="contact-icon">
              <MapPin />
            </div>

            <div>
              <h3>
                Location
              </h3>

              <p>
                Nepal
              </p>
            </div>

          </div>

        </div>

        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for contacting us!");
          }}
        >

          <label>
            Name
            <input
              type="text"
              placeholder="Your name"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              placeholder="Your email"
              required
            />
          </label>

          <label>
            Message
            <textarea
              rows="6"
              placeholder="Write your message..."
              required
            />
          </label>

          <button
            type="submit"
            className="primary-button"
          >
            Send Message
            <Send size={18} />
          </button>

        </form>

      </div>

    </section>
  );
}

export default Contact;
