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
