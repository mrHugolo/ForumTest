export const Post = () => {

  const test = async () => {
    let res = (await Fetch("rest/group")).response
  }
  return (
    <>
      <h1 onClick={() => test}>Post</h1>
    </>
  );
};
