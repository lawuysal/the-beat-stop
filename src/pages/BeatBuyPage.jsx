import STYLES from "./BeatBuyPage.module.css";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useEffect, useState, useContext } from "react";
import { serverURLs } from "./../util/constans";
import LoadingIndicator from "../components/LoadingIndicator";
import Button from "../components/Button";
import toast from "react-hot-toast";

function BeatBuyPage() {
  const { user } = useContext(UserContext);
  const { beatId } = useParams();

  const [isBeatLoading, setIsBeatLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isBeatOwnerLoading, setIsBeatOwnerLoading] = useState(true);
  const [beat, setBeat] = useState(null);
  const [beatOwner, setBeatOwner] = useState(null);

  function handlePrice() {
    switch (beat.license) {
      case "free":
        return 0;
      case "basic":
        return 20;
      case "standard":
        return 50;
      case "pro":
        return 100;
      default:
        return 0;
    }
  }

  function handleBuy() {
    toast.loading("Processing payment...");
    const purchase = {
      seller: beatOwner._id,
      buyer: user._id,
      beatId: beat._id,
    };

    setTimeout(() => {
      fetch(`${serverURLs.PURCHASES}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchase),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            toast.success("Beat bought successfully");
          } else {
            toast.error(data.message);
          }
        })
        .catch((err) => toast.error("Error buying beat", err.message));
    }, 2000);
  }

  useEffect(() => {
    if (user) {
      setIsUserLoading(false);
    }
    async function getOwner() {
      if (beat) {
        const userRes = await fetch(`${serverURLs.USERS}/${beat.owner}`);
        const userData = await userRes.json();
        const user = userData.data.data.user;
        setBeatOwner(user);
        setIsBeatOwnerLoading(false);
      }
    }
    async function fetchBeat() {
      try {
        const res = await fetch(`${serverURLs.BEATS}/${beatId}`);
        const data = await res.json();
        if (data.status !== "success") {
          toast.error(data.message);
        }

        setBeat(data.data.beat);
        setIsBeatLoading(false);
      } catch (error) {
        toast.error("Error fetching beat");
      }
    }
    if (beat === null) {
      fetchBeat();
    }
    if (beatOwner === null) {
      getOwner();
    }
  }, [user, beatId, beat, beatOwner]);

  if (isUserLoading || isBeatLoading || isBeatOwnerLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className={STYLES.buyPageWrapper}>
      <div className={STYLES.buyPage}>
        <div className={STYLES.titleWrapper}>
          <h1 className={STYLES.title}>Beat Purchase</h1>
        </div>
        <div className={STYLES.ownerWrapper}>
          <p className={STYLES.beatName}> {beat.name} </p>
          <p className={STYLES.by}>by</p>
          <p className={STYLES.ownerName}> {beatOwner.name} </p>
        </div>
        <div className={STYLES.priceWrapper}>
          <p className={STYLES.price}> {`$${handlePrice()}`} </p>
          <p className={STYLES.license}>{beat.license} License</p>
        </div>
        <div className={STYLES.buttonWrapper}>
          <Button type="normal-button" submit={handleBuy}>
            Complete Payment
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BeatBuyPage;
