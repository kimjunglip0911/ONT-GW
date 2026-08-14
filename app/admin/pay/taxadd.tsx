"use client";

import { useState } from "react";
import { tiny } from "../box";
import { btn } from "./labs";
import { Pct } from "./pct";

export function TaxAdd({ onAdd }: { onAdd: (name: string, rate: number) => void }) {
  const [name, setName] = useState("");
  const [rate, setRate] = useState("0");
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <input
        className={tiny}
        placeholder="공제 이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Pct val={rate} onVal={setRate} />
      <button
        className={btn}
        type="button"
        onClick={() => {
          onAdd(name, Number(rate));
          setName("");
          setRate("0");
        }}
      >
        추가
      </button>
    </div>
  );
}
