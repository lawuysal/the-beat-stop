import { UserContext } from "../context/userContext";
import { useContext } from "react";
import STYLES from "./UserDetailedPage.module.css";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import { useNavigate } from "react-router-dom";

export default function UserDetailedPage() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [isUserLoading, setIsUserLoading] = useState(true);

  function handleNavigateUserEditPage() {
    navigate(`/user/edit`);
  }

  useEffect(() => {
    if (user) {
      setIsUserLoading(false);
    }
  }, [user]);

  if (isUserLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className={STYLES.userPage}>
      <div>
        <h1>User Detailed Page</h1>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user._id}</p>
        <p>{user.username}</p>
        <p>{user.description}</p>
        <p>{user.membership}</p>
        <Button type="normal-button" submit={handleNavigateUserEditPage}>
          Edit Profile
        </Button>
      </div>
    </div>
  );
}
