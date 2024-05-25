export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="container mx-auto bg-[#070707]">{children}</main>;
}
