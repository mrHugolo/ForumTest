import { useContext, useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import {GroupContext} from '../contexts/GroupContext';
import { CreateGroup } from '../components/CreateGroup';
import css from '../styles/index.module.css';

export const Home = () => {
  const history = useHistory();
  const [groups, setGroups] = useState([])
  const { allGroups } = useContext(GroupContext)

  useEffect(() => {
    if(allGroups?.length) setGroups(allGroups)
  }, [allGroups])

  const createGroup = async () => {
    const obj = {
      name: "Hugos favoritmat",
      description: "En grupp där Hugo delar sin favoritmat."
    }
    let res = await fetch("rest/group", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    })
    res = await res.json()
    if(res.response){
    history.push(`/g/${obj.name}`)
    } 
    else{
      console.log("Group with that name already exists")
    }
  }

  return (
    <div>
      {groups.map(g => (
        <div key={g.name} className={css.groupCard} onClick={() => history.push(`/g/${g.name}`)}>
          {g.name}
        </div>
      ))}
      <CreateGroup groups={{groups, setGroups}}/>
    </div>
  );
};
