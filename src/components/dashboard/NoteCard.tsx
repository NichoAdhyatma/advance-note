import { Card, Dropdown } from "flowbite-react";
import { Parser } from "html-to-react";
import useNote from "../../hooks/note-hooks";
import { NoteData } from "../../interfaces/note/note-data.model";

export default function NoteCard(props: {
  data?: NoteData;
  setData: React.Dispatch<React.SetStateAction<NoteData | undefined>>;
  setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>;
  noteData: NoteData;
}) {
  const htmlParse = Parser();
  const { deleteNote } = useNote();

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
  };

  return (
    <Card>
      <div className="flex justify-end">
        <Dropdown inline label="">
          <Dropdown.Item>Download</Dropdown.Item>
          <Dropdown.Divider></Dropdown.Divider>
          <Dropdown.Item
            onClick={() => {
              props.setData(props.noteData);

              props.setOpenModal(props.noteData.id);
            }}
          >
            <a
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              href="#"
            >
              <p>Edit</p>
            </a>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              handleDeleteNote(props.noteData.id);
            }}
          >
            <a className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
              <p>Delete</p>
            </a>
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div className="flex flex-col gap-2 items-center w-full max-h-[200px]">
        <h1 className="text-2xl font-bold">{props.noteData.title}</h1>
        <div className="overflow-x-hidden min-w-full">
          {htmlParse.parse(props.noteData.body)}
        </div>
        <div className="text-sm w-full flex justify-end">
          {props.noteData.timestamp.toDate().toDateString()}
        </div>
      </div>
    </Card>
  );
}
