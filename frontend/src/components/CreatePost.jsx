import { useContext, useState } from "react";
import { Fetch } from "../utils/fetch.js"
import css from "../styles/index.module.css"
import gcss from "../styles/group.module.css";
import { useHistory } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

export const CreatePost = ({ group }) => {
  const { currentUser } = useContext(UserContext);
  const history = useHistory();
  const [isHidden, setIsHidden] = useState(true)
  
  const handleClick = async () => {
    if (isHidden) {
      setIsHidden(false)
      return
    }
    let title = document.getElementById("createPost-postTitle")
    let cont = document.getElementById("createPost-postCont")

    const obj = {
      title: title?.value,
      content: cont?.value,
      groupId: group.group.id,
      userId: currentUser.id
    }

    let res = (await Fetch("rest/post", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    })).response
    if (!res) {
      title.placeholder = "Please add a title to your post"
      cont.placeholder = "Please add some content to your post"
      return
    }else{

    }
    
    console.log("res from gorup",res);

    
    setIsHidden(true)
    history.push(`/g/${group.group.name}/p/${res}`)

  }


  return (
    <>
      {currentUser && (
        <div className={gcss.bottom}>
          <div className={`${isHidden ? css.hide : css.createGroup} ${css.w100}`}>
          {/* <div> */}
            <input className={css.w100}  id="createPost-postTitle" placeholder="Post Title" />
            <textarea className={css.w100} id="createPost-postCont" placeholder="Post Content" />
          </div>
          <div className={css.center}>
          <button onClick={handleClick}>
            + Create Post
            </button>
          </div>
        </div>
      )}
    </>
  )
}