# React Event Connector 🔌

[![npm version](https://img.shields.io/npm/v/react-event-connector)](https://www.npmjs.com/package/react-event-connector)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-event-connector)](https://bundlephobia.com/package/react-event-connector)
[![license](https://img.shields.io/npm/l/react-event-connector)](https://github.com/nazamov/react-event-connector/blob/main/LICENSE)

A zero-dependency React utility for lightweight component communication using custom events.

## Why?

✔ No config, provider, context - JUST USAGE
✔ Avoid prop drilling  
✔ Decouple components  
✔ Simple pub/sub model  
✔ Full TypeScript support  
✔ Tiny footprint (~1kB)

## Installation

````bash
npm install react-event-connector
# or
yarn add react-event-connector
# or
pnpm add react-event-connector

```tsx
const { useEmitter, useSubscriber } = 'react-event-connector'

// 2. Emit events from any component
const Button = () => {
  const emit = useEmitter('click-event');

  return (
    <button onClick={() => emit({ timestamp: Date.now() })}>
      Click Me
    </button>
  );
};

// 3. Subscribe anywhere in your app
const Logger = () => {
  useSubscriber('click-event', (data) => {
    console.log('Button clicked!', data);
  });

  return null;
};

// 4. Use anywhere (no provider needed!)
const App = () => (
  <>
    <Button />
    <Logger />
  </>
);
````

## Do you need generic?

```tsx
interface YourInterface = {
  firstProp: string;
  secondProp: number;
}

const emitter = useEmmiter<YourInterface>('your-event');

emitter({ firstProp: 'your text', secondProp: 12345});

useSubscriber<YourInterface>('your-event', (data) => {
    console.log('your data', data.firstProp)
});
```
