import { Suspense, use } from "react";
import { loadData } from "./loadData.js";

function LoadDataFromProps(props) {
  const data = use(props.dataPromise);
  return <p>{data}</p>;
}

function UseExampleParallel(props) {
  const dataPromise = loadData(props.resource);
  const siblingDataPromise = loadData(props.resource + " - sibling");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h2>Load Data from props (parallel)</h2>
      <LoadDataFromProps dataPromise={dataPromise} />
      <LoadDataFromProps dataPromise={siblingDataPromise} />
    </Suspense>
  );
}

function LoadDataFromExternalSource(props) {
  const data = use(loadData(props.resource));
  return <p>{data}</p>;
}

export function UseExampleSequential(props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h2>Load Data with `use(loadData(props.resource))` (sequential)</h2>
      <LoadDataFromExternalSource resource={props.resource} />
      <LoadDataFromExternalSource resource={props.resource + " - sibling"} />
    </Suspense>
  );
}

function App() {
  return (
    <>
      <UseExampleParallel resource={"1"} />
      <UseExampleParallel resource={"2"} />
      <UseExampleSequential resource={"3"} />
      <UseExampleSequential resource={"4"} />
      <UseExampleSequential resource={"5"} />
      <UseExampleSequential resource={"6"} />
    </>
  );
}

export default App;
