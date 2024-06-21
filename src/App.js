import "./index.css";
import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState(0);
  const [friendTip, setFriendTip] = useState(0);

  return (
    <div>
      <BillInput bill={bill} onBillChange={setBill} />
      <SelectPercentage
        tip={tip}
        onTipChange={setTip}
        friendTip={friendTip}
        onFriendTipChange={setFriendTip}
      />
      <OutputSummary bill={bill} tip={tip} friendTip={friendTip} />
      <Reset
        bill={bill}
        onBillChange={setBill}
        tip={tip}
        onTipChange={setTip}
        friendTip={friendTip}
        onFriendTipChange={setFriendTip}
      />
    </div>
  );
}

function BillInput({ bill, onBillChange }) {
  return (
    <div>
      <span>How much was the bill?</span>
      <input
        type="text"
        value={bill}
        onChange={(e) => onBillChange(Number(e.target.value))}
      ></input>
    </div>
  );
}

function SelectPercentage({ tip, onTipChange, friendTip, onFriendTipChange }) {
  return (
    <div>
      <span>How did you like the service?</span>
      <select
        type="select"
        value={tip}
        onChange={(e) => onTipChange(Number(e.target.value))}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={(5 / 100) * 100}>It was okay (5%)</option>
        <option value={(10 / 100) * 100}>It was good (10%)</option>
        <option value={(20 / 100) * 100}>Absolutely amazing! (20%)</option>
      </select>

      <FriendPercentage
        friendTip={friendTip}
        onFriendTipChange={onFriendTipChange}
      />
    </div>
  );
}

function FriendPercentage({ friendTip, onFriendTipChange }) {
  return (
    <div>
      <span>How did your friend like the service?</span>
      <select
        type="select"
        value={friendTip}
        onChange={(e) => onFriendTipChange(Number(e.target.value))}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={(5 / 100) * 100}>It was okay (5%)</option>
        <option value={(10 / 100) * 100}>It was good (10%)</option>
        <option value={(20 / 100) * 100}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function OutputSummary({ bill, tip, friendTip }) {
  function calcAverage(tip1, tip2) {
    return (tip1 + tip2) / 2;
  }

  return (
    <h3>
      You pay ${bill + calcAverage(tip, friendTip)} (${bill} +{" "}
      {calcAverage(tip, friendTip)}
      %)
    </h3>
  );
}

function Reset({ onBillChange, onTipChange, onFriendTipChange }) {
  function handleReset() {
    onBillChange(0);
    onTipChange(0);
    onFriendTipChange(0);
  }

  return <button onClick={() => handleReset()}>Reset</button>;
}
