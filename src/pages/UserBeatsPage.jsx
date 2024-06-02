import STYLES from "./UserBeatsPage.module.css";

import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Beats from "../components/Beats";

function UserBeatsPage() {
  const navigate = useNavigate();
  return (
    <div className={`${STYLES.userBeatsPageRow}`}>
      <div className={`${STYLES.userBeatsPageColumn}`}>
        <div className={`${STYLES.header}`}>
          <h1 className="beats-page-title">My Beats:</h1>
          <Button type="normal-button" submit={() => navigate(`/create-beat`)}>
            Create New Beat
          </Button>
        </div>
        <Beats page="user-beats" />
      </div>
    </div>
  );
}

export default UserBeatsPage;
