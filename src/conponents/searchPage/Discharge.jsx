import { useState, useEffect, use } from "react";
import "./Discharge.css";

const Discharge = ({ filteredMethod }) => {
  const [description, setDescription] = useState([]);

  useEffect(() => {
    setDescription(filteredMethod[0].description);
  }, [filteredMethod]);

  return (
    <div className="Discharge">
      {description.map((desc, index) => (
        <p key={index}>
          {index + 1}. {desc}
        </p>
      ))}
    </div>
  );
};

export default Discharge;
