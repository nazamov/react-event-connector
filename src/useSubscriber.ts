import { Subscriber } from "./model";
import { useEffect, useId } from "react";
import { EventConnector } from "./event-connector";

export const useSubscriber = <T = any>(
  signalName: string,
  subscriber: Subscriber<T>
) => {
  const id = useId();
  const eventConnector = EventConnector.getInstance();
  const existingSubscriber = eventConnector.findSubscriber(signalName, id);

  function removeSubscriber() {
    if (existingSubscriber) {
      eventConnector.removeSubscriber(signalName, id);
    }
  }

  removeSubscriber();
  useEffect(() => {
    if (!eventConnector.findSubscriber(signalName, id))
      eventConnector.subscribe<T>(signalName, id, subscriber);

    return removeSubscriber;
  }, []);

  return eventConnector.subscribe<T>(signalName, id, subscriber);
};
