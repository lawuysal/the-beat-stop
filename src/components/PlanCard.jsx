import "./../components/PlanCard.css";
import Button from "./Button";

const PlanCard = ({ name, detail, price, paymentDetail, content }) => {
  return (
    <>
      <div className="card-wrapper">
        <div className="inner-wrapper">
          <div className="plan-header">
            <h2 className="plan-name">{name}</h2>
            <p className="plan-detail">{detail}</p>
          </div>
          <div className="price-section">
            <p className="plan-price">
              {price == "free" ? "Free" : `${price} $ / month`}
            </p>
            <p className="payment-detail">{paymentDetail}</p>
          </div>

          <ul>
            <div>
              {content.map((el, index) => (
                <li key={index}>
                  {el === "" ? "" : "✅"} {el}
                </li>
              ))}
            </div>
          </ul>
          <Button type="normal-button button">Select Plan</Button>
        </div>
      </div>
    </>
  );
};

export default PlanCard;
