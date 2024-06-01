import { Outlet } from "react-router-dom";
import UserSideBar from "../components/UserSideBar";
import STYLES from "./ProfilePage.module.css";

function ProfilePage() {
  return (
    <div className={STYLES.profilePage}>
      <UserSideBar />
      <Outlet className={STYLES.outlet} />
    </div>
  );
}

export default ProfilePage;
