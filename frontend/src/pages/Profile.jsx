import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import pcss from "../styles/profile.module.css"
import css from "../styles/index.module.css"
import gcss from "../styles/group.module.css"
import { Fetch } from "../utils/fetch";
import { CreateGroup } from "../components/CreateGroup";
import { FormatText } from "../components/FormatText";
import { EditText } from "../components/EditText";
import {DeleteContent} from "../components/DeleteContent"

export const Profile = () => {
  const {currentUser} = useContext(UserContext)
  const {userName} = useParams()
  const [user, setUser] = useState({})
  const history =useHistory()

  useEffect( async () => {
    if(!currentUser) return
    let info = (await Fetch(`rest/profile/${userName}`)).response
    if (!info.length || userName == "[deleted]") return history.push("page/404")
    let u = {
      name: info[0].username,
      description: info[0].description,
      groups: info[0].names?.split('ᴥ'),
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
  }, [currentUser,userName])

 

  return (
    <div className={pcss.container}>
      <div className={pcss.pContain}>
      <h1>{user.name}</h1>
      <div className={`${css.borderBottom} ${css.w100}`}>
        {user.isMyProfile &&<EditText setEditText={setUser} editText={user.description}/>} 
          <div className={pcss.left}>
            <FormatText textToFormat={user.description} />
          </div>
      </div>
      {user.isMyProfile &&
      <div className={css.w100}>
        <h2>Groups:</h2>
          
        {user.groups ? user.groups.map(g => (
        <div key={`profileGroup-${g}`} onClick={()=>{history.push(`/g/${g}`)}} className={css.groupCard}>
          {g}
        </div>
        )) : (<div>No groups yet!</div>)}
            <div className={pcss.createCont}>
              <CreateGroup groups={{ groups: user.groups }} />
            </div>
      </div>
    }
      <h2> Comments:</h2>
      {user.comments && user.comments.map(((c,i)=>(
        <div className={css.groupCard} onClick={()=>handleGoToPost(c.postId)} key={`profileComment-${i}`}>{c.text}</div>
      )))}
        <div className={css.center}>
      {user.isMyProfile && <DeleteContent content={{ html: <button className={`${css.Cpointer} ${gcss.leave}`}>Delete account</button>, method: "deleteAccount" }} />}
        </div>
      </div>
    </div>
  );
};
