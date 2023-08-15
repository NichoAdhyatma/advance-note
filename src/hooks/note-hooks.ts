import {
  doc,
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  serverTimestamp,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../conf/firebase.config";
import { NoteData } from "../interfaces/note/note-data.model";
import { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "./auth-hooks";

const useNote = () => {
  const [data, setData] = useState<NoteData | undefined>({
    id: "",
    title: "",
    body: "",
  } as NoteData);
  const [notes, setNotes] = useState<NoteData[] | undefined>(undefined);

  const { user } = useAuth();
  const handleEditorChange = (value: string) => {
    setData((prevData) => ({
      ...(prevData as NoteData),
      ["body"]: value,
    }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...(prevData as NoteData),
      [name]: value,
    }));
  };

  const fetchNote = async () => {
    try {
      if (user?.uid) {
        const q = query(
          collection(db, "notes"),
          where("user_id", "==", user?.uid),
          orderBy("timestamp", "desc")
        );

        onSnapshot(q, (querySnapshot) => {
          let notesArr: NoteData[] = [];
          querySnapshot.docs.forEach((doc) => {
            let note: NoteData = doc.data() as NoteData;
            note.id = doc.id;
            notesArr.push(note);
          });

          setNotes(notesArr);
        });

        console.log(notes);
      }
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  const addNote = async (data: NoteData) => {
    try {
      await addDoc(collection(db, "notes"), {
        user_id: user?.uid,
        title: data.title,
        body: data.body,
        timestamp: serverTimestamp(),
      });
      toast.success(`Note Created Successfully`);
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  const editNote = async (id: string, data: NoteData) => {
    try {
      let noteRef = doc(db, "notes", id);

      await updateDoc(noteRef, {
        title: data.title,
        body: data.body,
        timestamp: serverTimestamp(),
      });
      toast.success("Note Edited Successfully");
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      toast.success("Note Deleted Successfully");
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  return {
    addNote,
    deleteNote,
    setData,
    editNote,
    data,
    handleEditorChange,
    handleTitleChange,
    fetchNote,
    notes,
  };
};

export default useNote;
