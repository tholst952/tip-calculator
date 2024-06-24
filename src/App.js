import "./index.css";
import { useState } from "react";

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  // derived state
  const tip = bill * ((percentage1 + percentage2) / 2 / 100).toFixed(2);

  function handleReset() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div>
      <BillInput bill={bill} onBillChange={setBill} />

      <SelectPercentage
        percentage={percentage1}
        onSetPercentage={setPercentage1}
      >
        <span>How did you like the service?</span>
      </SelectPercentage>

      <SelectPercentage
        percentage={percentage2}
        onSetPercentage={setPercentage2}
      >
        <span>How did your friend like the service?</span>
      </SelectPercentage>

      {bill > 0 && (
        <>
          <OutputSummary bill={bill} tip={tip} />
          <Reset onHandleReset={handleReset} />
        </>
      )}
    </div>
  );
}

function BillInput({ bill, onBillChange }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => onBillChange(Number(e.target.value))}
      ></input>
    </div>
  );
}

function SelectPercentage({ percentage, onSetPercentage, children }) {
  return (
    <div>
      <label>{children}</label>
      <select
        type="select"
        value={percentage}
        onChange={(e) => onSetPercentage(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function OutputSummary({ bill, tip }) {
  return (
    <h3>
      You pay ${bill + tip} (${bill} + ${tip.toFixed(2)} tip)
    </h3>
  );
}

function Reset({ onHandleReset }) {
  return <button onClick={() => onHandleReset()}>Reset</button>;
}
