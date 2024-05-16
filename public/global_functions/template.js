import axios from "axios";

const createNewTemplate = async (currencyName, network, name, address) => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const res = await axios.post(
        `${process.env.BASE_API_URL}/users/add-new-template`,
        {
          currencyName,
          network,
          name,
          address,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  return null;
};

const getAllTemplates = async () => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const res = await axios.get(
        `${process.env.BASE_API_URL}/users/all-templates-groupped-by-curreney-name-and-network`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  return null;
};

const deleteTemplateByTransferTemplateId = async (
  currencyName,
  network,
  transferTemplateId
) => {
  let token = localStorage.getItem("babel-coins-user-token");
  if (token) {
    try {
      const res = await axios.delete(
        `${process.env.BASE_API_URL}/users/transfer-template?network=${network}&currencyName=${currencyName}&transferTemplateId=${transferTemplateId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
  return null;
};

export {
  createNewTemplate,
  getAllTemplates,
  deleteTemplateByTransferTemplateId,
};
