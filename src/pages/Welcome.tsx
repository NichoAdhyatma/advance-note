import AuthModal from "../components/auth/AuthModal";

export default function Welcome() {
  return (
    <>
      <h1 className="text-4xl font-medium">Note Taker</h1>
      <p className="text-xl text-center">Simplyfy ur note taking 🚀 ...</p>
      <AuthModal />
    </>
  );
}
