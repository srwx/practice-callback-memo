import { useState, useMemo } from "react"

const slowFunction = (num: number) => {
  console.log("Call slowFunction...")
  for (let i = 0; i < 1500000000; i++) {}
  console.log("done!")
  return num * 2
}

/*
 * WithoutMemo
 *   1. ถ้า State ใน Component นี้เปลี่ยน -> Rerender Component
 *   2. โค้ดใน Component นี้จะรันใหม่ทั้งหมด ตั้งแต่บรรทัดแรก ยันบรรทัดสุดท้าย
 *   3. บรรทัดที่ 23 เรียกใช้ slowFunction() -> แปลว่า ถ้า component นี้ rerender -> ฟังก์ชันนี้จะต้องรันใหม่เรื่อยๆด้วย
 *   4. เว็ปจะช้ามาก ถ้า rerender -> เรียกใช้ slowFunction() ทุกครั้ง
 *   5. ถ้าเรากดปุ่ม ChangeTheme -> State เปลี่ยน -> Rerender
 *   6. จะต้องรอซักพัก สีพื้นหลังถึงจะเปลี่ยน ซึ่งมันไม่ควรรอ (ต้องรอเพราะ เปลี่ยน state ของธีม มันทำให้ rerender ซึ่งความจริงไม่จำเป็นต้องเรียก slowFunction() ก็ได้)
 */

export const WithoutMemo = () => {
  const [number, setNumber] = useState(0)
  const [dark, setDark] = useState(false)
  const doubleNumber = slowFunction(number)
  const themeStyle = {
    backgroundColor: dark ? "black" : "white",
    color: dark ? "white" : "black",
  }

  console.log("_________render_________")
  return (
    <>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.valueAsNumber)}
      />
      <button onClick={() => setDark((prev) => !prev)}>Change Theme</button>
      <div style={themeStyle}>{doubleNumber}</div>
    </>
  )
}

// -----------------------------------------------------------------

/*
 * Note: useMemo มาจาก "Memoization" คือการ Caching value ดังนั้น เราไม่ต้อง recomputed ทุกๆรอบ หากไม่จำเป็น
 * WithMemo
 *    1. slowFunction() รับ input เป็น num
 *    2. slowFunction() จะให้ output เหมือนเดิมถ้า input num ไม่เปลี่ยน
 *    3. ดังนั้น เราสามารถ Cache ให้ output ของฟังก์ชัน slowFunction() ไม่ต้อง recaculate ถ้า input ไม่เปลี่ยนจากเดิม (input ไม่เปลี่ยนจากเดิม -> output ก็ไม่เปลี่ยน)
 *    4. ใช้ useMemo() ครอบ output ของ slowFunction() เพื่อ cache ค่า output
 *    5. Dependencies คือสิ่งที่ถ้าเปลี่ยน ต้อง Recalucate ใหม่ ในที่นี้คือ input (number state)
 */

export const WithMemo = () => {
  const [number, setNumber] = useState(0)
  const [dark, setDark] = useState(false)
  const doubleNumber = useMemo(() => {
    return slowFunction(number)
  }, [number])
  const themeStyle = {
    backgroundColor: dark ? "black" : "white",
    color: dark ? "white" : "black",
  }

  console.log("_________render_________")
  return (
    <>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.valueAsNumber)}
      />
      <button onClick={() => setDark((prev) => !prev)}>Change Theme</button>
      <div style={themeStyle}>{doubleNumber}</div>
    </>
  )
}
