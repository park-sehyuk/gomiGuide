import "./DashboardCards.css";

const DashboardCards = ({ card }) => {
  return (
    <div className="Card">
      <p className="CardLabel">{card.label}</p>
      <h2>{card.value}</h2>
    </div>
  );
};

export default DashboardCards;
