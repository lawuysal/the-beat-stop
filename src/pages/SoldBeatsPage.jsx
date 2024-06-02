import Beats from "../components/Beats";
import STYLES from "./SoldBeatsPage.module.css";

function SoldBeatsPage() {
  return (
    <div className={STYLES.soldBeatsPage}>
      <Beats page="sold-beats" />
    </div>
  );
}

export default SoldBeatsPage;
