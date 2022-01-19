import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Fetch } from "../utils/fetch.js";
import css from "../styles/index.module.css";
import pcss from "../styles/post.module.css"
import { UserContext } from "../contexts/UserContext"

export const Post = () => {
  const { currentUser } = useContext(UserContext);
  const { postId } = useParams()
  const [post, setPost] = useState({})
  const history = useHistory()

  useEffect(async () => {
    let res = (await Fetch(`rest/post/${postId}`)).response
    if (!res?.length) return history.push("/page/404")
    let p = {
      title: res[0]?.title,
      posterName: res[0]?.posterName,
      comments: [{
        text: res[0]?.content,
        commentUsername: '@' + res[0]?.posterName
      }]
    }
    for (let i = 0; i < res.length; i++) {
      if (!res[i].text) break;
      p.comments.push({
        id: res[i].id,
        text: res[i].text,
        commentUsername: res[i].commentUsername
      })
    }
    setPost(p)
  }, [])

  return (
    <div className={pcss.container}>
      <div className={pcss.post}>
        <div className={`${pcss.title}`}>
          <h3>{post.title}</h3>
        </div>

        <div className={pcss.middle}>
          {post?.comments?.length && post.comments.map((c, i) => (
            <div key={`comment-${c.id}`} className={pcss.poster}>
              {c.commentUsername} #{i + 1}
              <div className={pcss.postContent}>
                {c.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
