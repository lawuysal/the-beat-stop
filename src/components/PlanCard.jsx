import STYLES from "./../components/PlanCard.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function PlanCard({ name, detail, price, paymentDetail, content }) {
  const navigate = useNavigate();

  return (
    <div className={STYLES.cardWrapper}>
      <div className={STYLES.innerWrapper}>
        <div className={STYLES.planHeader}>
          <h2 className={STYLES.planName}>{name}</h2>
          <p className={STYLES.planDetail}>{detail}</p>
        </div>
        <div className={STYLES.priceSection}>
          <p className={STYLES.planPrice}>
            {price == "free" ? "Free" : `${price} $ / month`}
          </p>
          <p className={STYLES.paymentDetail}>{paymentDetail}</p>
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
        <Button
          type="normal-button button"
          submit={() => navigate(`/signup/${name.toLowerCase()}`)}
        >
          Select Plan
        </Button>
      </div>
    </div>
  );
}

export default PlanCard;
