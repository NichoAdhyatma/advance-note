import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { auth, db } from "../conf/firebase.config";
import { NoteData } from "../interfaces/note/note-data.model";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const useNote = () => {
  const [data, setData] = useState<NoteData | undefined>();
  const [notes, setNotes] = useState<
    QuerySnapshot<DocumentData, DocumentData> | undefined
  >(undefined);

  const userId: string | undefined = auth.currentUser?.uid;

  useEffect(() => {
    fetchNote();
  }, [userId]);

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
      if (userId) {
        const q = query(
          collection(db, "notes"),
          where("user_id", "==", userId)
        );

        const querySnapshot = await getDocs(q);
        
        setNotes(querySnapshot);
      }
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  const addNote = async (data: NoteData) => {
    try {
      const docRef = await addDoc(collection(db, "notes"), {
        user_id: userId,
        title: data.title,
        body: data.body,
      });
      toast.success(`Note Created SuccessFully with id : ${docRef.id}`);
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  return { addNote, data, handleEditorChange, handleTitleChange, fetchNote, notes };
};

export default useNote;
