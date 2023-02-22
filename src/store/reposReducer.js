import axios from "axios";

const GET_REPOS = "GET_REPOS";

export const getRepos = (username) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    dispatch({ type: GET_REPOS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

const initialState = {
  repos: [],
};

const reposReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPOS:
      return { ...state, repos: action.payload };
    default:
      return state;
  }
};

export default reposReducer;
