import axios from "axios";

const isUserLogged = async () => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const res = await axios.get(
        `${process.env.BASE_API_URL}/users/is-logged`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return !res.data.error;
    } catch (error) {
      throw new Error(error);
    }
  }
  return false;
};

export { isUserLogged };
