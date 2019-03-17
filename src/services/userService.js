import http from "./httpService";

const apiEndPoint = "http://localhost:3900/api/users";

export function register(user) {
  return http.post(apiEndPoint, user);
}
