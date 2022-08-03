import { WithMemo, WithoutMemo } from "./components/Memo/Memo"

export default function App() {
  return (
    <>
      <WithoutMemo />
      <div>----------------</div>
      <WithMemo />
    </>
  )
}
