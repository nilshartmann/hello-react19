/// <reference types="react/experimental" />
import { Suspense, use, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function Waiting() {
  return <h1>Waiting...</h1>;
}

const myDataPromise = new Promise<string>((res) => {
  setTimeout(() => res("Hallo"), 3000);
});

function Data() {
  const x = use(myDataPromise);

  return <h2>Data: {x}</h2>;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <h1>Hallo Welt.</h1>
        <Suspense fallback={<Waiting />}>
          <Data />
        </Suspense>
      </div>
    </>
  );
}

export default App;
