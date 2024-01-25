export function getMagicEmailFromLocalStorage() {
  const email = window.localStorage.getItem("magicEmailForSignIn") as string;

  return email;
}
