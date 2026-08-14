"use client";

import { useState } from "react";
import { Draw } from "./draw";
import { Hover } from "./hover";
import { Topbar } from "./topbar";

type Props = {
  admin: boolean;
  authed: boolean;
  children: React.ReactNode;
};

export function Frame({ admin, authed, children }: Props) {
  const [draw, setDraw] = useState(false);

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <Hover admin={admin} authed={authed} />
      <div className="md:pl-16">
        <Topbar authed={authed} onMenu={() => setDraw(true)} />
        <main className="px-4 py-6 md:px-8">{children}</main>
      </div>
      <Draw
        admin={admin}
        authed={authed}
        show={draw}
        onClose={() => setDraw(false)}
      />
    </div>
  );
}
