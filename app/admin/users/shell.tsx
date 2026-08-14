"use client";

import { useState } from "react";
import { addMany, addOne } from "./acts";
import { SEED, type Draft } from "./data";
import { Find } from "./find";
import { Form } from "./form";
import { nextUid } from "./ids";
import { Panel } from "./panel";
import { Tabs, type Tab } from "./tabs";
import { Upload } from "./upload";

export function Shell() {
  const [tab, setTab] = useState<Tab>("reg");
  const [rows, setRows] = useState(SEED);
  const [q, setQ] = useState("");
  const shown = !q.trim() ? rows : rows.filter((r) => r.name.includes(q.trim()));

  function onAdd(row: Draft) {
    setRows((cur) => addOne(cur, row));
  }

  function onMany(list: Draft[]) {
    setRows((cur) => addMany(cur, list));
  }

  return (
    <section>
      <Tabs tab={tab} setTab={setTab} />
      {tab === "reg" ? (
        <>
          <Upload onMany={onMany} />
          <Form uid={nextUid(rows)} onAdd={onAdd} />
        </>
      ) : (
        <>
          <Find q={q} setQ={setQ} />
          <Panel rows={shown} />
        </>
      )}
    </section>
  );
}
