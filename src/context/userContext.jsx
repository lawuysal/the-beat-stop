import { createContext, useEffect, useState } from "react";

import { serverURLs } from "../util/constans";
import toast from "react-hot-toast";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(false);

  useEffect(
    function () {
      setIsUserLoading(true);
      if (localStorage.getItem("token") === null) {
        setIsUserLoading(false);
      }
      if (user) {
        setIsUserLoading(false);
        return;
      }
      if (!user && localStorage.getItem("token")) {
        fetch(`${serverURLs.USERS_PROFILE}`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setUser(data.data.user);
            setIsUserLoading(false);
          })
          .catch((error) => {
            setIsUserLoading(false);
            toast.error("Error fetching user data");
            toast.error(error.message);
          });
      }
    },
    [user]
  );

  return (
    <UserContext.Provider value={{ user, setUser, isUserLoading }}>
      {children}
    </UserContext.Provider>
  );
}
