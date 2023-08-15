import { Timestamp } from "firebase/firestore";

export interface NoteData {
  id: string;
  user_id: string;
  title: string;
  body: string;
  timestamp: Timestamp
}
