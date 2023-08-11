import AuthModal from "../components/auth/AuthModal";
import MainLayout from "../components/layouts/MainLayout";

export default function Welcome() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center gap-4 h-full">
        <h1 className="text-4xl font-medium">Advance Note</h1>
        <p className="text-xl text-center">Simplyfy ur note taking 🚀 ...</p>
        <AuthModal />
      </div>
    </MainLayout>
  );
}
