export default function CategoryTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-[60vh]">{children}</div>;
}
