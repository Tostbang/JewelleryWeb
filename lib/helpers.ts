import Cookies from "js-cookie"

export function getToken() {
  return Cookies.get('token');
}
export function updateToken(token: string) {
  Cookies.set('token', token, { expires: 10 });
}
export function deleteToken() {
  Cookies.remove('token');
}