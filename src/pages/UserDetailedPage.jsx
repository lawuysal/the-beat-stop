import { UserContext } from "../context/userContext";
import { useContext } from "react";
import STYLES from "./UserDetailedPage.module.css";
import { useEffect, useState } from "react";
import { serverURLs } from "../util/constans";
import { convertPath } from "../util/convertPath";
import LoadingIndicator from "../components/LoadingIndicator";

export default function UserDetailedPage() {
  const { user } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  function handleMemberhipText() {
    if (user.membership === "free") return "Free";
    if (user.membership === "premium") return "Premium";
    if (user.membership === "pro") return "Pro";
  }

  useEffect(() => {
    if (user) {
      setIsUserLoading(false);
    }
    if (user && user.photo) {
      setAvatar(
        `${serverURLs.USER_IMAGES}/${convertPath(user.photo, "userPhoto")}`
      );
    }
  }, [user]);

  if (isUserLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className={STYLES.userPage}>
      <div className={STYLES.main}>
        <div className={STYLES.avatarWrapper}>
          <img src={avatar} alt="user-avatar" id={STYLES.avatar} />
        </div>
        <div className={STYLES.nameWrapper}>
          <p className={STYLES.name}>{user.name}</p>
          <p className={STYLES.userName}>@{user.username}</p>
        </div>
      </div>
      <div className={STYLES.detail}>
        <div className={STYLES.descripton}>
          <div className={STYLES.descriptionTitle}>
            <h3>Description:</h3>
          </div>
          <p className={STYLES.descriptionText}>{user.description}</p>
        </div>
        <div className={STYLES.others}>
          <div className={STYLES.descriptionTitle}>
            <h3>Details:</h3>
          </div>
          <div className={STYLES.fields}>
            <div className={STYLES.fieldWrapper}>
              <p className={STYLES.fieldLabel}>Email</p>
              <p>{user.email}</p>
            </div>
            <div className={STYLES.fieldWrapper}>
              <p className={STYLES.fieldLabel}>Membership</p>
              <p>{handleMemberhipText()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
