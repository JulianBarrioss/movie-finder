import { API_KEY } from "../secrets";
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: API_KEY,
  },
});

export const useGetData = async (API, setState, response) => {
  const { data } = await api.get(API);
  response ? setState(data[response]) : setState(data);
};

export const useGetServices = async (API, setState) => {
  const { data } = await api.get(API);
  const { results } = await data;
  console.log(data);

  if (Object.entries(results).length === 0 || !results.hasOwnProperty("GT"))
    return;

  setState({
    flatrate: results.GT.flatrate,
  });
};
