import STYLES from "./../pages/PricingPage.module.css";
import PlanCard from "../components/PlanCard";

const PricingPage = () => {
  return (
    <>
      <div className={STYLES.slogan}>
        <br />
        <h2>Join Us With The Best Plan</h2>
        <h2>That Suits You</h2>
      </div>
      <br />
      <br />
      <div className={STYLES.plansWrapper}>
        <PlanCard
          name="Free"
          detail="For the artists and singers"
          price="0"
          paymentDetail="No credit card needed"
          content={["Can buy beats"]}
        ></PlanCard>
        <PlanCard
          name="Standard"
          detail="For the artists and producers"
          price="20"
          paymentDetail="Billed annually"
          content={["Can buy beats", "Can upload to pro tier up to 30 tracks"]}
        ></PlanCard>
        <PlanCard
          name="Premium"
          detail="For the artists and producers"
          price="50"
          paymentDetail="Billed annually"
          content={["Can buy beats", "Can upload to pro tier up to 100 tracks"]}
        ></PlanCard>
      </div>
    </>
  );
};

export default PricingPage;
