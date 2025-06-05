import { EventConnector } from "./event-connector";

export const useEmitter = <T = any>(signalName: string) => {
  const eventConnector = EventConnector.getInstance();
  return eventConnector.emit<T>(signalName);
};
