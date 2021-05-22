import { request } from "./Request";
import { routes } from "../constant/constant.routes";

const {
    GET_USERS,
    ADD_USERS,
    GET_USERS_FROM_MB,
    UPDATE_USER,
    DOWNLOAD_CSV
  } = routes.userDetail;

export default class UserService {
  static getUsers() {
    return request(
        "GET", 
        `${GET_USERS}`, 
        null,
         null,
          null,
          '60f44b1725deadb80fcfcf68931f27a32b6f6c928814264fd8d52f1d9187adae'
          );
  }
  static getUsersFromMB() {
    return request(
        "GET", 
        `${GET_USERS_FROM_MB}`, 
        null,
         null,
          null
          );
  }
  static downloadReport() {
    return request(
        "GET", 
        `${DOWNLOAD_CSV}`, 
        null,
         null,
          null
          );
  }
  static addUsers(obj) {
    return request(
        "POST", 
        `${ADD_USERS}`, 
        null,
         obj,
          null
          );
  }
  static updateUsers(obj) {
    return request(
        "PUT", 
        `${UPDATE_USER}`, 
        null,
         obj,
          null
          );
  }
}