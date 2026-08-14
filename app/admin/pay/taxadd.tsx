"use client";

import { useState } from "react";
import { tiny } from "../box";
import { btn } from "./labs";

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
      <input
        className={tiny}
        type="number"
        min={0}
        max={100}
        step="0.001"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
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
