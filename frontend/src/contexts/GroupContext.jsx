import { createContext, useEffect, useState } from "react";
import { Fetch } from "../utils/fetch";

export const GroupContext = createContext();

export default function GroupProvider(props) {
  const [allGroups, setAllGroups] = useState([]);

  useEffect(async () => {
    setAllGroups((await Fetch("rest/groups")).response)
  }, []);

  const values = {
    allGroups
  };

  return <GroupContext.Provider value={values}>{props.children}</GroupContext.Provider>;
};
