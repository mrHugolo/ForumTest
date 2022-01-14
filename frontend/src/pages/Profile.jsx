import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import pcss from "../styles/profile.module.css"
import css from "../styles/index.module.css"
import { Fetch } from "../utils/fetch";
import { BsFillPencilFill } from "react-icons/bs"

export const Profile = () => {
  const {currentUser} = useContext(UserContext)
  const {userName} = useParams()
  const [user, setUser] = useState({})
  const [updater, setUpdater] = useState('')
  const [isEdit, setIsEdit] = useState(false)

  useEffect( async () => {
    let info = (await Fetch(`rest/profile/${userName}`)).response
    let u = {
      name: info[0].username,
      description: info[0].description,
      groups: info[0].names.split('ᴥ'),
      isMyProfile: currentUser?.username == userName,
      comments: []
    }
    for(let i = 0; i < info.length; i++) {
      u.comments.push({
        text: info[i].text,
        postId: info[i].postId
        //time: info[i].time    //Then sort by time
      })
    }
    setUser(u)
  }, [updater])

  useEffect(() => {
    if(currentUser?.id) setUpdater('update')
  }, [currentUser])

  const handleEdit = async (e) => {
    if(e.key != 'Enter' || e.shiftKey) return
    setIsEdit(false)
    let res = (await Fetch(`rest/editDescription`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({description: e.target.value}),
    })).response
    if(res.status == 200) {
      setUser(p => ({ ...p, description: e.target.value }))
    } 
  }

  return (
    <div className={pcss.container}>
      <h1>{user.name}</h1>
      <div className={`${css.borderBottom} ${css.w100}`}>
        {user.isMyProfile && (
          <div onClick={() => setIsEdit(p => !p)}><BsFillPencilFill /></div>
        )}
        {isEdit ? (
          <textarea onKeyPress={handleEdit} defaultValue={user.description}></textarea>
        ) : (
          <div className={pcss.left}> {user.description}</div>
        )}
      </div>

      <h2>Groups:</h2>
      {user.groups ? user.groups.map(g => (
        <div key={`profileGroup-${g}`} className={css.groupCard}>
          {g}
        </div>
      )) : (<div>No groups yet!</div>)}
    </div>
  );
};
