import STYLES from "./UserSideBar.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserSideBar() {
  const menus = [
    "Profile",
    "My Beats",
    "Sold Beats",
    "Purchased Beats",
    "Edit Profile",
    "Change Profile Photo",
    "Change Password",
    "Settings",
  ];

  const navigate = useNavigate();
  const [selected, setSelected] = useState(() => {
    if (window.location.href.includes("/profile/user")) return 0;
    if (window.location.href.includes("/profile/beats")) return 1;
  });

  function handleMenuNavigate(index) {
    switch (index) {
      case 0:
        setSelected(0);
        navigate(`user`);
        break;
      case 1:
        setSelected(1);
        navigate(`beats`);
        break;
      case 2:
        return `/user/sold-beats`;
      case 3:
        return `/user/purchased-beats`;
      case 4:
        setSelected(4);
        navigate(`edit`);
        break;
      case 5:
        return `/user/change-profile-photo`;
      case 6:
        return `/user/change-password`;
      case 7:
        return `/user/settings`;
      default:
        return `/user`;
    }
  }

  useEffect(() => {
    if (window.location.href.includes("/profile/user")) setSelected(0);
    if (window.location.href.includes("/profile/beats")) setSelected(1);
  }, [window.location.href]);

  return (
    <div className={STYLES.sideBar}>
      <div className={STYLES.buttons}>
        {menus.map((menu, index) => (
          <div
            key={index}
            className={
              selected === index
                ? `${STYLES.button} ${STYLES.selected}`
                : `${STYLES.button}`
            }
            onClick={() => handleMenuNavigate(index)}
          >
            <p>{menu}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSideBar;
