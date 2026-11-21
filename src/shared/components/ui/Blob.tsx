export function Blob({ className }: { className: string }) {
  return (
    <div
      className={`${className} rounded-full blur-3xl opacity-50 pointer-events-none`}
      aria-hidden="true"
    />
  );
}
