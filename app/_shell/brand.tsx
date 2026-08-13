export function Brand({ wide }: { wide?: boolean }) {
  return (
    <div className="flex items-center gap-3 px-3 py-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-chip text-sm font-semibold text-rail-on">
        O
      </div>
      {wide ? (
        <span className="text-sm font-semibold tracking-wide text-rail-on">
          ONT-GW
        </span>
      ) : null}
    </div>
  );
}
