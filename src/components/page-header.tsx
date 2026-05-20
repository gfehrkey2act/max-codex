type PageHeaderProps = {
  title: string;
  description: string;
};

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section className="max-w-3xl">
      <p className="text-sm font-medium text-[var(--acc-strong)]">Route placeholder</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-normal text-[var(--foreground)] sm:text-5xl">
        {title}
      </h1>
      <p className="mt-4 text-base leading-7 text-[var(--muted)]">{description}</p>
    </section>
  );
}
