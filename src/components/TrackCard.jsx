import STYLES from "./TrackCard.module.css";
import { serverURLs } from "./../util/constans";

import { BsFillTrashFill } from "react-icons/bs";

import { useEffect, useState } from "react";
import LoadingIndicator from "./LoadingIndicator";

function TrackCard({ trackId, beatId }) {
  const [track, setTrack] = useState({
    name: "",
    path: "",
    fileType: "",
  });
  const [isTrackLoading, setIsTrackLoading] = useState(true);

  async function handleTrackDelete() {
    const userConfirmation = window.confirm(
      "Are you sure you want to delete this track?"
    );
    if (userConfirmation) {
      const res = await fetch(
        `${serverURLs.BEATS_DELETETRACK}/${beatId}/${trackId}`,
        {
          method: "PATCH",
        }
      );

      if (res.ok) {
        window.location.reload();
      }
    }
  }

  useEffect(
    function () {
      setIsTrackLoading(true);
      async function fetchTrack() {
        const response = await fetch(`${serverURLs.TRACKS}/${trackId}`);
        const data = await response.json();
        const track = data.data.data.track;
        setTrack({
          name: track.name,
          path: track.path,
          fileType: track.fileType,
        });
        setIsTrackLoading(false);
      }
      fetchTrack();
    },
    [trackId]
  );

  return (
    <div className={STYLES.trackCard}>
      <div className={STYLES.trackCardInfo}>
        {!isTrackLoading ? (
          <span>
            <p>{track.name}</p>
            <BsFillTrashFill
              className={STYLES.deleteIcon}
              onClick={handleTrackDelete}
            ></BsFillTrashFill>
          </span>
        ) : (
          <LoadingIndicator></LoadingIndicator>
        )}
      </div>
    </div>
  );
}

export default TrackCard;
