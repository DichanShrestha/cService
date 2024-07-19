import Wrapper from "@/components/Wrapper";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wrapper>
      <Sidebar className="fixed -mt-16"/>
      <div className="ml-64">{children}</div>
    </Wrapper>
  );
}
