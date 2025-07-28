import { store } from "../store";
import { setOvenState } from "../store/slices/ovenSlice";

export function handleOvenUpdate(event: any) {
  console.log("handleOvenUpdate called with data:", event);
  if (event?.data?.ovenData) {
    store.dispatch(setOvenState(event.data.ovenData));
  } else if (event?.data) {
    store.dispatch(setOvenState(event.data));
  } else {
    store.dispatch(setOvenState(event));
  }
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
