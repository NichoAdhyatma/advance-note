import Header from "../components/dashboard/Header";
import DashboardLayout from "../components/layouts/MainLayout";
import AddNoteModal from "../components/dashboard/AddNoteModal";
import useNote from "../hooks/note-hooks";
import { NoteData } from "../interfaces/note/note-data.model";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export default function Dashboard() {
  const { notes } = useNote();

  return (
    <DashboardLayout>
      <Header />

      <div className="flex justify-end">
        <AddNoteModal />
      </div>
      {notes?.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData, DocumentData>) => {
          const noteData = doc.data() as NoteData | undefined;

          return <div key={doc.id}>{noteData?.title}</div>;
        }
      )}
    </DashboardLayout>
  );
}
