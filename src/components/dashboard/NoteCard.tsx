import { Card, Dropdown } from "flowbite-react";
import { Parser } from "html-to-react";
import useNote from "../../hooks/note-hooks";

export default function NoteCard(props: {
  id: string;
  title: string;
  body: any;
}) {
  const htmlParse = Parser();
  const { deleteNote } = useNote();

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
  };

  return (
    <Card>
      <div className="flex justify-end px-4 pt-4">
        <Dropdown inline label="">
          <Dropdown.Item>
            <a
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              href="#"
            >
              <p>Edit</p>
            </a>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              handleDeleteNote(props.id);
            }}
          >
            <a className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">
              <p>Delete</p>
            </a>
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div className="flex flex-col items-center pb-10">
        <h1 className="text-2xl font-bold">{props.title}</h1>
        <div>{htmlParse.parse(props.body)}</div>
      </div>
    </Card>
  );
}
