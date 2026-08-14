"use client";

import { useState } from "react";
import { tiny } from "../box";
import { btn } from "./labs";
import { PackNum } from "./packnum";

type Draft = { name: string; pay: number; hours: number; meal: number; fuel: number };

export function PackAdd({ onAdd }: { onAdd: (row: Draft) => void }) {
  const [name, setName] = useState("");
  const [pay, setPay] = useState("0");
  const [hours, setHours] = useState("0");
  const [meal, setMeal] = useState("0");
  const [fuel, setFuel] = useState("0");
  return (
    <div className="mt-2 grid gap-2">
      <input className={tiny} placeholder="패키지 이름" value={name} onChange={(e) => setName(e.target.value)} />
      <div className="flex flex-wrap gap-2">
        <PackNum text="기본급" value={pay} onVal={setPay} />
        <PackNum text="월시간" value={hours} onVal={setHours} />
        <PackNum text="식대" value={meal} onVal={setMeal} />
        <PackNum text="유류비" value={fuel} onVal={setFuel} />
      </div>
      <button
        className={btn}
        type="button"
        onClick={() => {
          onAdd({ name, pay: Number(pay), hours: Number(hours), meal: Number(meal), fuel: Number(fuel) });
          setName("");
          setPay("0"); setHours("0"); setMeal("0"); setFuel("0");
        }}
      >
        추가
      </button>
    </div>
  );
}
