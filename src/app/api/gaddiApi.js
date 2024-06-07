import axios from "axios";
import { localStorageService } from "../../services/localStorge.service";

const Axios = axios.create({
  baseURL: process.env.REACT_APP_GADDI_API_BASE_URL,
});

console.log(
  "process.env.REACT_APP_GADDI_API_BASE_URL",
  process.env.REACT_APP_GADDI_API_BASE_URL
);

console.log("index alerte in intersepter");
Axios.interceptors.request.use((value) => {
  value.headers = {
    TGToken: "4fd943b6-90bf-4567-9353-4bfffd3742d1",
  };
  return value;
});

export default Axios;
