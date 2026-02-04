import { useState, useEffect, use } from "react";
import "./Discharge.css";

const Discharge = ({ filteredItem }) => {
  const [description, setDescription] = useState([]);

  useEffect(() => {
    setDescription(filteredItem[0].description);
  }, [filteredItem]);

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
