import { toast } from "react-toastify";
import { localStorageService } from "./localStorge.service";
const defaultErrMsg = "Something went wrong !";

const ThrowErrors = (obj, code) => {
  console.log("ThrowErrors logs ---> ", obj, code);
  switch (code) {
    case 200:
      Ok(obj, code);
      break;
    case 201:
      Ok(obj, code);
      break;
    case 400:
      BadRequest(obj, code);
      break;
    case 403:
      unauthorized(obj, code);
      break;

    case 401:
      unauthorized(obj, code);
      break;

    default:
      break;
  }
};
const Ok = (obj) => {
  console.log("okay test --> ", obj);
  toast.success(obj?.msg || obj);
};

const BadRequest = (obj) => {
  toast.error(obj?.msg || obj);
};

const unauthorized = () => {
  redirectToLogin();
};

const redirectToLogin = () => {
  localStorageService.remove("KE_ADMIN");
  window.location.href = "/login";
};

export default ThrowErrors;
