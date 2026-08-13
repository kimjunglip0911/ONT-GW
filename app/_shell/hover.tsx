"use client";

import { useState } from "react";
import { Rail } from "./rail";
import { Sider } from "./sider";

type Props = { admin: boolean; onLogin: () => void };

export function Hover({ admin, onLogin }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={
        open
          ? "fixed inset-y-0 left-0 z-30 hidden w-60 md:block"
          : "fixed inset-y-0 left-0 z-30 hidden w-16 md:block"
      }
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {open ? (
        <Sider admin={admin} onLogin={onLogin} />
      ) : (
        <Rail admin={admin} onLogin={onLogin} />
      )}
    </div>
  );
}
