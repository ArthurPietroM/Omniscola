import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Omniscola | Dashboard',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-full bg-[#F8FAFC] p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}