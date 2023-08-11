import Header from "../components/dashboard/Header";
import DashboardLayout from "../components/layouts/MainLayout";
import AddNoteModal from "../components/dashboard/AddNoteModal";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Header />

      <div className="flex justify-end">
        <AddNoteModal />
      </div>
    </DashboardLayout>
  );
}
