export function StepHeading({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-medium tracking-widest text-violet-400">
        STEP {number}
      </p>
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="mt-3 text-sm text-zinc-500">{description}</p>
    </div>
  );
}
