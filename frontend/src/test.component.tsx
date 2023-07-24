import { trpc } from "./lib/trpc";

export function Test() {
  const test = trpc.user.check.useQuery();
  return (
    <>
      {" "}
      Tests
      {JSON.stringify(test)}
    </>
  );
}
