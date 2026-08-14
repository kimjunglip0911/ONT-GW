"use client";

import { useState } from "react";
import { addMany, addOne } from "./acts";
import { SEED, type Draft } from "./data";
import { Form } from "./form";
import { nextUid } from "./ids";
import { Panel } from "./panel";
import { Upload } from "./upload";

export function Shell() {
  const [rows, setRows] = useState(SEED);

  function onAdd(row: Draft) {
    setRows((cur) => addOne(cur, row));
  }

  function onMany(list: Draft[]) {
    setRows((cur) => addMany(cur, list));
  }

  return (
    <section>
      <Upload onMany={onMany} />
      <Form uid={nextUid(rows)} onAdd={onAdd} />
      <Panel rows={rows} />
    </section>
  );
}
