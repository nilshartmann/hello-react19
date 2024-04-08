/// <reference types="react/experimental" />
//     ^----- make TS aware of React 19
import { Suspense, use, useActionState, useState } from "react";
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
  return (
    <>
      <div>
        <h1>Hallo Welt.</h1>
        <Suspense fallback={<Waiting />}>
          <Data />
        </Suspense>
        <Register />
      </div>
    </>
  );
}

type InitialFormState = {
  lifecycle: "initial";
};

type SubmittedFormState = {
  lifecycle: "submitted";
  message: string;
};

type MyFormState = InitialFormState | SubmittedFormState;

function handleForm(
  prevState: MyFormState,
  form: FormData
): Promise<MyFormState> {
  console.log("prevState", prevState);
  console.log("form", form);

  return new Promise((res) => {
    setTimeout(
      () => res({ lifecycle: "submitted", message: "Jo dat löppt" }),
      2000
    );
  });
}

const initialState: MyFormState = {
  lifecycle: "initial",
};

function Register() {
  const [state, action, isPending] = useActionState(handleForm, initialState);

  console.log("Current State", state);
  console.log("Pending", isPending);

  return (
    <form action={action}>
      <label>firstname:</label>
      <input type="text" name="firstname" />
      <button type="submit">Save</button>
      {state.lifecycle === "submitted" && <p>{state.message}</p>}
    </form>
  );
}

export default App;
