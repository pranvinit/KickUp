import "./contact.scss";

const Contact = () => {
  return (
    <div className="contact">
      <div className="box">
        <h1>Reach us at</h1>
        <div className="link">
          <a
            href="mailto:support@kicksup.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            support@kicksup.com
          </a>
          <span>for any technical support</span>
        </div>
        <div className="link">
          <a
            href="mailto:info@kicksup.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            info@kicksup.com
          </a>
          <span>for more information</span>
        </div>
        <div className="link">
          <a
            href="mailto:feedback@kicksup.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            feedback@kicksup.com
          </a>
          <span>to send your feedback</span>
        </div>
        <div className="link">
          <a
            href="mailto:jobs@kicksup.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            jobs@kicksup.com
          </a>
          <span>to work with us</span>
        </div>
      </div>
      <div className="connect">
        <span>stay in touch</span>
        <div className="socials">
          <a
            href="https://twitter.com/ringoverapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/socials/twitter.png" alt="twitter" />
          </a>
          <a
            href="https://www.instagram.com/ringovergroup"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/socials/instagram.png" alt="instagram" />
          </a>
          <a
            href="https://www.facebook.com/RingoverApp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/socials/facebook.png" alt="facebook" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
