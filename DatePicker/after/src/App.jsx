import { useState } from "react";
import { DatePicker } from "./DatePicker";
import "./styles.css";

export function App() {
  const [value, setValue] = useState(new Date());

  return <DatePicker value={value} onChange={setValue} />;
}
