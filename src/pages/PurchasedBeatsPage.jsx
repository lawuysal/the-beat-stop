import Beats from "../components/Beats";
import STYLES from "./PurchasedBeatsPage.module.css";

function PurchasedBeatsPage() {
  return (
    <div className={STYLES.purchasedBeatsPage}>
      <Beats page="purchased-beats" />
    </div>
  );
}

export default PurchasedBeatsPage;
