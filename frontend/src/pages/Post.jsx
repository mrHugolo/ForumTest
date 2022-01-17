import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Fetch } from "../utils/fetch.js";
import css from "../styles/index.module.css";
import { UserContext } from "../contexts/UserContext"

export const Post = () => {
  const { currentUser } = useContext(UserContext);

  const test = async () => {
    let res = (await Fetch("rest/group")).response
  }





  return (
    <>
      <h1 onClick={() => test}>Post</h1>
    </>
  );
};
