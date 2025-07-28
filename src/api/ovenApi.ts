const API_URL = "https://safebake-backend-production.up.railway.app/api/oven";

export async function fetchOvenStatus() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch oven status");
  const json = await res.json();
  console.log("json", json);
  return json.data;
}

export async function updateOvenStatus(payload: any) {
  const res = await fetch(API_URL, {
    method: "POST", // or "PUT" if backend expects it
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update oven status");
  return await res.json();
}

const API_UPDATE_URL =
  "https://safebake-backend-production.up.railway.app/api/oven";

export async function patchOvenData(partial: Partial<any>) {
  const res = await fetch(API_UPDATE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(partial),
  });
  if (!res.ok) throw new Error("Failed to update oven data");
  return await res.json();
}
