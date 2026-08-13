"use client";

import { useState } from "react";
import { Draw } from "./draw";
import { Hover } from "./hover";
import { Login } from "./login";
import { Topbar } from "./topbar";

type Props = { admin: boolean; children: React.ReactNode };

export function Frame({ admin, children }: Props) {
  const [draw, setDraw] = useState(false);
  const [login, setLogin] = useState(false);

  function onLogin() {
    setDraw(false);
    setLogin(true);
  }

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <Hover admin={admin} onLogin={onLogin} />
      <div className="md:pl-16">
        <Topbar
          admin={admin}
          onMenu={() => setDraw(true)}
          onLogin={onLogin}
        />
        <main className="px-4 py-6 md:px-8">{children}</main>
      </div>
      <Draw
        admin={admin}
        show={draw}
        onClose={() => setDraw(false)}
        onLogin={onLogin}
      />
      {login ? <Login onClose={() => setLogin(false)} /> : null}
    </div>
  );
}
