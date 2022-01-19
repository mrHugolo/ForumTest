import { useContext, useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom';
import { CreateGroup } from '../components/CreateGroup';
import css from '../styles/index.module.css';
import { Fetch } from '../utils/fetch';

export const Home = () => {
  const history = useHistory();
  const [groups, setGroups] = useState([])

  useEffect(async() => {
    setGroups((await Fetch("rest/groups")).response)
  }, [])

  return (
    <div className={css.container}>
      <div className={css.createGroup}>
        <CreateGroup groups={{ groups, setGroups }} />
      </div>
      <div className={css.groupContainer}>
      {groups.map(g => (
        <div key={g.name} className={css.groupCard} onClick={() => history.push(`/g/${g.name}`)}>
          {g.name}
        </div>
      ))}
      </div>
    </div>
  );
};
