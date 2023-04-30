export async function loadAccount() {
  const res = await fetch("/api/account");
  const data = await res.json();
  return data;
}
