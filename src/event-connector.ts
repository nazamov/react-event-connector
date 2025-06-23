import { Subscriber } from "./model";

export class EventConnector {
  private subscribers: Map<
    string,
    { subscriber: (value?: any) => void; id: string }[]
  > = new Map();
  private static instance: EventConnector = new EventConnector();

  private constructor() {}

  static getInstance() {
    return EventConnector.instance;
  }

  subscribe<T>(signalName: string, id: string, subscriber: Subscriber<T>) {
    if (!this.subscribers.has(signalName)) this.subscribers.set(signalName, []);
    const subscribers = this.subscribers.get(signalName);

    subscribers!.push({ subscriber, id });
  }

  emit<T>(signalName: string) {
    return (value?: T) => {
      const subscribers = this.subscribers.get(signalName);
      if (!subscribers) {
        console.warn("No subscribers found for signal: " + signalName);
        return;
      }

      subscribers.forEach((s) => s.subscriber(value));
    };
  }

  findSubscriber(signalName: string, id: string) {
    const subscribers = this.subscribers.get(signalName);
    if (!subscribers) return null;
    return subscribers.find((s) => s.id === id);
  }

  removeSubscriber(signalName: string, id: string) {
    const subscribers = this.subscribers.get(signalName);
    if (!subscribers) return;
    this.subscribers.set(
      signalName,
      subscribers.filter((s) => s.id !== id)
    );
  }
}
