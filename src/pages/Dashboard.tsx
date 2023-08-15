import Header from "../components/dashboard/Header";
import DashboardLayout from "../components/layouts/MainLayout";
import AddNoteModal from "../components/dashboard/AddNoteModal";
import useNote from "../hooks/note-hooks";
import { NoteData } from "../interfaces/note/note-data.model";
import NoteCard from "../components/dashboard/NoteCard";
import useAuth from "../hooks/auth-hooks";
import { useEffect } from "react";
import EditNoteModal from "../components/dashboard/EditNoteModal";
import useModal from "../hooks/modal-hooks";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import PDFDownloadButton from "../components/PDFDownloadButton";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default function Dashboard() {
  const { notes, fetchNote, setData, data } = useNote();
  const { openModal, setOpenModal } = useModal();

  const { user } = useAuth();

  useEffect(() => {
    fetchNote();
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
            <NoteCard
              setData={setData}
              setOpenModal={setOpenModal}
              noteData={note}
            />
          </div>
        ))}
      </div>

      <EditNoteModal
        openModal={openModal}
        id={data!.id}
        title={data!.title}
        setOpenModal={setOpenModal}
        body={data!.body}
      />

      <PDFDownloadButton />
    </DashboardLayout>
  );
}
