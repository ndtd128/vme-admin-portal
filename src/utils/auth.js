export default function isLoggedIn() {
  return localStorage.getItem('userRole') !== null;
}
