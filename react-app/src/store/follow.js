const GET_FOLLOWINGS = "follows/GET_FOLLOWINGS";
const REMOVE_FOLLOW = "follows/REMOVE_FOLLOWS";
const ADD_FOLLOW = "follows/ADD_FOLLOWS";

const showFollowings = (data, userarray) => {
  return {
    type: GET_FOLLOWINGS,
    data,
    userarray,
  };
};

const removeFollow = (data) => {
  return {
    type: REMOVE_FOLLOW,
    data,
  };
};

const addFollow = (data) => {
  return {
    type: ADD_FOLLOW,
    data,
  };
};
//pass in array of all users
export const showFollowing = (userarray) => async (dispatch) => {
  // console.log("THISISTHEID------------------>", id);
  console.log('userarray in the before thunk', userarray)
  const res = await fetch(`/api/users/yolo/dashboard`);
  console.log("----------->", res);
  if (res.ok) {
    const data = await res.json();
    // console.log("THISBEDADADADADATA------------------>", data);
    console.log('data in the showfollowing back in thunk', data)
    dispatch(showFollowings(data, userarray));
  }
};

export const unfollowUser = (follower_id, followee_id) => async (dispatch) => {
  // console.log("*****----------> follower_id", follower_id);
  // console.log("*****----------> followee_id", followee_id);
  const res = await fetch("/api/follow/delete", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ follower_id, followee_id }),
  });
  // console.log("****************res*******************", res);
  // console.log("****************res.body*******************", res.body);
  if (res.ok) {
    // console.log("****************res.ok*******************", res);
    const data = await res.json();
    console.log("************DATA**************", data);
    dispatch(removeFollow(data));
  }
};

export const followUser = (follower_id, followee_id) => async (dispatch) => {
  const res = await fetch("/api/follow/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ follower_id, followee_id }),
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(addFollow(data));
  }
};

export default function reducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case GET_FOLLOWINGS:
      console.log("action.data", action.data)
      console.log("action.id", action.id)
      newState = { ...state };
      newState[action.id] = action.data;
      console.log("newState", newState)
      return newState;
    case ADD_FOLLOW:
      newState = { ...state };
      if (!(action.data["follower_id"] in newState)) {
        newState[action.data["follower_id"]] = [];
      }
      newState[action.data["follower_id"]].push(action.data["followee_id"]);
      return newState;
    case REMOVE_FOLLOW:
      newState = { ...state };
      let index = newState[action.data["follower_id"]].indexOf(
        action.data["followee_id"]
      );
      newState[action.data["follower_id"]].splice(index, 1);
      return newState;
    // newState = { ...state };
    // delete newState[action.data];
    // return newState;
    default:
      return state;
  }
}
