import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Fetch } from "../utils/fetch.js";
import css from "../styles/index.module.css";
import gcss from "../styles/group.module.css";

import { FaUserAlt } from "react-icons/fa";
import { UserContext } from "../contexts/UserContext.jsx";
import { CreatePost } from "../components/CreatePost.jsx";

export const Group = () => {
  const { currentUser } = useContext(UserContext);
  const { groupName } = useParams();
  const [group, setGroup] = useState({});
  const [role, setRole] = useState("");
  const history = useHistory();

  useEffect(async () => {
    let info = (await Fetch(`rest/g/${groupName}`)).response;
    if (!info || info.status == 404) return history.push("/page/404");
    let g = {
      id: info[0]?.id,
      name: info[0]?.name,
      description: info[0]?.description,
      amount: info[0]?.amount,
      posts: [],
    };

    for (let i = 0; i < info.length; i++) {
      if(!info[0].postId) break;
      g.posts.push({
        title: info[i].title,
        postId: info[i].postId,
        isDeleted: info[i].isDeleted,
      });
    }
    setGroup(g);
  }, []);

  useEffect(async () => {
    if (currentUser.id)
      setRole((await Fetch(`rest/isJoined/${groupName}`)).response);
  }, [currentUser]);

  const switchGroup = () => {
    if (role) {
      leaveGroup();
    } else {
      joinGroup();
    }
  };

  const joinGroup = async () => {
    const obj = {
      name: groupName.trim(),
    };
    let res = await Fetch("rest/joinGroup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    });
    if (res.response) {
      setRole("Authorized");
      setGroup((p) => ({ ...p, amount: p.amount + 1 }));
    }

  };

  const leaveGroup = async () => {
    const obj = {
      name: groupName,
    };
    let res = await Fetch("rest/leaveGroup", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    });

    if (res.response) {
      setRole(undefined);
      setGroup((p) => ({ ...p, amount: p.amount - 1 }));
    }
  };

  const partOfDesc = () => {
    return group.description;
  };

  const goToMembers = () => {
    if (role == "GroupAdmin" || role == "Moderator") history.push(`/g/${groupName}/members`)
  }

  async function deletePost(pId,i) {
    const obj = { "postId": pId }
    let res = (await Fetch("rest/delPost", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(obj),
    })).response
    
    if (res == 200) {
      let arr = group.posts.splice(i,1);
      setGroup(p => ({ ...p, comments: arr }))
    }
  }

  return (
    <div className={gcss.container}>
      <div className={gcss.top}>
        <span onClick={goToMembers} className={css.left}>
          <FaUserAlt /> {group.amount}
        </span>
        {currentUser.username ? (<button
          className={`${css.right} ${role ? gcss.leave : gcss.join}`}
          onClick={switchGroup}
        >
          {role ? `Leave group` : `Join group`}
        </button>) :
          (<button onClick={() => history.push("/login")}>Log in to join group</button>)}
      </div>
      <div className={gcss.middle}>
        <h1>{group.name}</h1>
        <div className={gcss.desc}>{partOfDesc()}</div>
        <br />
      </div>
      <div className={gcss.bottom}>
        {group.posts &&
          group.posts.map((p, i) => (
            <div key={`post-${i}`}>{!p.isDeleted &&
              <div  className={css.groupCard}>
                <div className={gcss.postTitle} onClick={() => history.push(`/g/${group.name}/p/${p.postId}`)}>
                  {p.title}
                </div>
                <div className={gcss.delPost}>
                  {(role == "GroupAdmin" || role == "Moderator") && <button onClick={() => deletePost(p.postId, i)}>Delete</button>}
                </div>
              </div>
            }</div>
          ))}
      </div>
      {(role && role != "Unauthorized") && <CreatePost group={{ group }} />}
    </div>
  );
};
