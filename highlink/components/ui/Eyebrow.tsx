type Props = { index?: string; children: React.ReactNode; className?: string };

/** Section label: mono, tracked-out, with an accent index. */
export function Eyebrow({ index, children, className = "" }: Props) {
  return (
    <p className={`t-eyebrow flex items-center gap-3 ${className}`}>
      {index && (
        <>
          <span className="text-accent">{index}</span>
          <span aria-hidden className="h-px w-6 bg-line-2" />
        </>
      )}
      <span>{children}</span>
    </p>
  );
}
