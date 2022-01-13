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

  return (
    <div className={css.container}>
      <div className={css.groupContainer}>
      {groups.map(g => (
        <div key={g.name} className={css.groupCard} onClick={() => history.push(`/g/${g.name}`)}>
          {g.name}
        </div>
      ))}
      </div>
      <CreateGroup groups={{groups, setGroups}}/>
    </div>
  );
};
