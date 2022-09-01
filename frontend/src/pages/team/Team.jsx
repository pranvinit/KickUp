import "./team.scss";
import Person from "../../components/person/Person";
import { TEAM } from "../../static/data/team";

const Team = () => {
  return (
    <div className="team">
      <h2 className="top">
        Without bonding and coordination, every project is a failure. Look at
        who makes KICKSUP great ; &#41;
      </h2>
      <div className="center">
        {TEAM.map((person) => (
          <Person {...person} />
        ))}
      </div>
      <h1 className="bottom">and You! ; &#41;</h1>
    </div>
  );
};

export default Team;
