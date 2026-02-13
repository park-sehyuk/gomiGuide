import { useState, useEffect } from "react";
import "./Discharge.css";

const Discharge = ({ item }) => {
  const [description, setDescription] = useState([]);

  useEffect(() => {
    const text = item?.description ?? "";
    const lines = text
      .split(/[\n\r]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    setDescription(lines);
  }, [item]);

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
