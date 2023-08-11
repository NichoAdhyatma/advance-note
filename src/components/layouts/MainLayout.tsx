export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 font-sans bg-white text-gray-900 max-w-7xl mx-auto h-[100vh] p-4">
      {children}
    </div>
  );
}
