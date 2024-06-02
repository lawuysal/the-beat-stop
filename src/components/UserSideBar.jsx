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
  ];

  const navigate = useNavigate();
  const [selected, setSelected] = useState(() => {
    if (window.location.href.includes("/profile/user")) return 0;
    if (window.location.href.includes("/profile/beats")) return 1;
    if (window.location.href.includes("/profile/beats/sold")) return 2;
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
        setSelected(2);
        navigate(`beats/sold`);
        break;
      case 3:
        setSelected(3);
        navigate(`beats/purchased`);
        break;
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
    if (window.location.href.includes("/profile/beats/sold")) setSelected(2);
    if (window.location.href.includes("/profile/beats/purchased"))
      setSelected(3);
  }, [window.location.href]);

  return (
    <div className={STYLES.sideBar}>
      <div className={STYLES.buttons}>
        <h3>Menu:</h3>
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
