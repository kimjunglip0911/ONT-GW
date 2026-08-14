"use client";

import { useState } from "react";
import { tiny } from "../box";
import { btn } from "./labs";

export function PermAdd({ onAdd }: { onAdd: (name: string) => void }) {
  const [name, setName] = useState("");
  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <input
        className={tiny}
        placeholder="역할 이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className={btn}
        type="button"
        onClick={() => {
          onAdd(name);
          setName("");
        }}
      >
        추가
      </button>
    </div>
  );
}
