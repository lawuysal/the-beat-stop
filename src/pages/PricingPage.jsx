import NavBar from "../components/NavBar";
import "./../pages/PricingPage.css";
import PlanCard from "../components/PlanCard";

const PricingPage = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="slogan">
        <br />
        <h2>Join Us With The Best Plan</h2>
        <h2>That Suits You</h2>
      </div>
      <br />
      <br />
      <div className="plans-wrapper">
        <PlanCard
          name="Free"
          detail="For the artists and singers"
          price="0"
          paymentDetail="No credit card needed"
          content={["Can buy beats"]}
        ></PlanCard>
        <PlanCard
          name="Standart"
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
