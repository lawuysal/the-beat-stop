import { createContext, useEffect, useState } from "react";

import { serverURLs } from "../util/constans";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(
    function () {
      if (localStorage.getItem("token") === null) return;
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
          })
          .catch((error) => console.log(error));
      }
    },
    [user]
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
