import { store } from "../store";
import { setOvenState } from "../store/slices/ovenSlice";

export function handleOvenUpdate(data: any) {
  store.dispatch(setOvenState(data));
}

export const connectToOvenUpdates = () => {
  const eventSource = new EventSource(
    "https://safebake-backend-production.up.railway.app/api/oven/events"
  );
  eventSource.onmessage = (event) => {
    const update = JSON.parse(event.data);
    handleOvenUpdate(update);
  };
  eventSource.onerror = (error) => {
    console.error("SSE connection error:", error);
    // Optionally implement reconnection logic here
  };
  return eventSource;
};
