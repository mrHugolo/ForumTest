import { useContext, useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Fetch } from "../utils/fetch.js";
import pcss from "../styles/post.module.css";
import { UserContext } from "../contexts/UserContext";
import { CreateComment } from "../components/CreateComment.jsx";
import { FormatText } from "../components/FormatText.jsx";
import { EditText } from "../components/EditText.jsx";


export const Post = () => {
  const { currentUser } = useContext(UserContext);
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const { groupName } = useParams();
  const history = useHistory();
  const [role, setRole] = useState("");

  const [render, setRender] = useState(false)

  useEffect(async () => {
    let res = (await Fetch(`rest/post/${postId}`)).response;
    if (!res?.length) return history.push("/page/404");

    let p = {
      title: res[0]?.title,
      posterName: res[0]?.posterName,
      content: res[0]?.content,
    };

    p.comments = [];
    for (let i = 0; i < res.length; i++) {
      if (!res[i].text) continue;
      p.comments.push({
        postId: res[i].id,
        text: res[i].text,
        commentUsername: res[i].commentUsername,
        commentId: res[i].commentId,
        timestamp: res[i].timestamp
      });
    }
    setPost(p);
  }, [render]);


  useEffect(async () => {
    if (currentUser?.id)
      setRole((await Fetch(`rest/isJoined/${groupName}`)).response);
  }, [currentUser]);


  async function deleteComment(cId) {
    const obj = { "commentId": cId }
    let res = (await Fetch("rest/delComment", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    })).response
    if (res == 200) {
      let arr = post.comments.slice();
      let comment = arr.find(c => c.commentId == cId)
      comment.text = "-- Deleted --"
      comment.commentUsername = ""
      setPost(p => ({ ...p, comments: arr }))
    }

  }

  return (
    <div className={pcss.container}>
      <div className={pcss.postBar}>
        <div>{groupName}{" > "}{post.title}</div>
        <div>{"posted by: @"}{post.posterName}</div>
      </div>
      <div className={pcss.postContainer}>
        <div>
          <div className={pcss.title}>
            <h1>{post.title}</h1>
            <h4>{post.content}</h4>
          </div>
          <CreateComment
            postId={parseInt(postId)}
            currentUser={currentUser}
            post={setPost}
            test={post}
            render={setRender}
          />
          <div className={pcss.middle}>
            {post?.comments?.length > 0 &&
              post.comments.map((c, i) => (
                <div key={`comment-${i}`} className={pcss.commentCard}>
                  <div className={pcss.commenter}>
                    <div onClick={() => history.push(`/${c.commentUsername}`)}>@{c.commentUsername}</div>
                    <div className={pcss.flex}>
                      <div>[{c.timestamp}]</div>
                      {currentUser.username && currentUser.username == c.commentUsername && <EditText setEditText={setPost} editText={c.text} componentType={"comment"} elementId={c.commentId} render={setRender} />}
                    </div>
                  </div>
                  <div className={pcss.commentText}>
                    <FormatText textToFormat={c.text} />

                    {role == "GroupAdmin" && <button onClick={() => deleteComment(c.commentId)}>X</button>}

                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
