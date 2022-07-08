import axios from "axios";

export const search = async (searchTerm, token) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/search/${searchTerm}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const addToSearchHistory = async (searchUser, token) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/addToSearchHistory`,
      { searchUser },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    return error.response.data.message;
  }
};

export const getSearchHistory = async (token) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/getSearchHistory`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const removeHistorySearch = async (searchUser, token) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/removeHistorySearch`,
      { searchUser },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  } catch (error) {
    return error.response.data.message;
  }
};
