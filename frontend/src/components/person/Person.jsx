import "./person.scss";

const Person = ({ image, name, position, socials }) => {
  return (
    <div className="person">
      <img src={image} alt={name} />
      <div>
        <h2>{name}</h2>
        <h3>{position}</h3>
      </div>
      <div className="socials">
        {socials.map((social, i) => (
          <a
            key={i}
            href={social.link}
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src={social.icon} alt={social.name} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Person;
