import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Fetch } from "../utils/fetch.js";
import pcss from "../styles/post.module.css";
import { UserContext } from "../contexts/UserContext";
import { CreateComment } from "../components/CreateComment.jsx";

export const Post = () => {
  const { currentUser } = useContext(UserContext);
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const history = useHistory();

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
      if (!res[i].text) return;
      p.comments.push({
        postId: res[i].id,
        text: res[i].text,
        commentUsername: res[i].commentUsername,
      });
    }
    setPost(p);
  }, []);

  return (
    <div className={pcss.container}>
      <div className={`${pcss.title}`}>
        <h1>{post.title}</h1>
        <h3>{post.posterName}</h3>
        <h4>{post.content}</h4>
      </div>

      <div className={pcss.middle}>
        {post?.comments?.length > 0 &&
          post.comments.map((c, i) => (
            <div key={`comment-${i}`}>
              {c.commentUsername} #{i + 1}-{c.text}
            </div>
          ))}
      </div>
      <CreateComment
        postId={parseInt(postId)}
        currentUser={currentUser}
        post={setPost}
        test={post}
      />
    </div>
  );
};
