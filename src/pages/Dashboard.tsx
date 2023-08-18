import Header from "../components/dashboard/Header";
import DashboardLayout from "../components/layouts/MainLayout";
import AddNoteModal from "../components/dashboard/AddNoteModal";
import useNote from "../hooks/note-hooks";
import { NoteData } from "../interfaces/note/note-data.model";
import NoteCard from "../components/dashboard/NoteCard";
import useAuth from "../hooks/auth-hooks";
import { useEffect, useState } from "react";
import EditNoteModal from "../components/dashboard/EditNoteModal";
import useModal from "../hooks/modal-hooks";

import SearchField from "../components/dashboard/SearchField";

export default function Dashboard() {
  const { notes, fetchNote, setData, data } = useNote();
  const { openModal, setOpenModal } = useModal();
  const [search, setSearch] = useState<string>("");
  const { user } = useAuth();

  useEffect(() => {
    fetchNote();
  }, [user]);

  return (
    <DashboardLayout>
      <Header />

      <div className="flex items-start justify-between">
        <SearchField search={search} setSearch={setSearch} />

        <AddNoteModal />
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
        {notes?.map((note: NoteData) => {
          if (
            note.title
              .trim()
              .toLowerCase()
              .includes(search.toLowerCase().trim()) ||
            note.body.trim().toLowerCase().includes(search.toLowerCase().trim())
          )
            return (
              <div className="flex flex-col flex-grow" key={note.id}>
                <NoteCard
                  setData={setData}
                  setOpenModal={setOpenModal}
                  noteData={note}
                />
              </div>
            );
          else {
            return <div></div>;
          }
        })}
      </div>

      <EditNoteModal
        openModal={openModal}
        id={data!.id}
        title={data!.title}
        setOpenModal={setOpenModal}
        body={data!.body}
      />
    </DashboardLayout>
  );
}
