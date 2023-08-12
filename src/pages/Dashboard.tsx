import Header from "../components/dashboard/Header";
import DashboardLayout from "../components/layouts/MainLayout";
import AddNoteModal from "../components/dashboard/AddNoteModal";
import useNote from "../hooks/note-hooks";
import { NoteData } from "../interfaces/note/note-data.model";
import NoteCard from "../components/dashboard/NoteCard";
import useAuth from "../hooks/auth-hooks";
import { useEffect } from "react";

export default function Dashboard() {
  const { notes, fetchNote } = useNote();

  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = () => fetchNote();
    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <DashboardLayout>
      <Header />

      <div className="flex justify-end">
        <AddNoteModal />
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
        {notes?.map((note: NoteData, key) => (
          <div className="flex flex-col flex-grow" key={key}>
            <NoteCard id={note.id} title={note.title} body={note.body} />
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
