import { Button, Label, Modal, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import useNote from "../../hooks/note-hooks";
import "react-quill/dist/quill.snow.css";
import { NoteData } from "../../interfaces/note/note-data.model";
import { useEffect } from "react";

export default function EditNoteModal({
  openModal,
  setOpenModal,
  id,
  title,
  body,
}: {
  openModal?: string;
  setOpenModal: React.Dispatch<React.SetStateAction<string | undefined>>;
  id: string;
  title: string;
  body: string;
}) {
  const { handleEditorChange, handleTitleChange, data, setData, editNote } =
    useNote();

  const handleEditNote = () => {
    editNote(id, data as NoteData).finally(() => setOpenModal(undefined));
  };

  useEffect(() => {
    setData({ id: id, title: title, body: body } as NoteData);
    console.log(title);
  }, [title, id, body]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <>
      <Modal
        show={openModal === id}
        size="7xl"
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header>Edit your Note</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title of note" />
              </div>
              <TextInput
                id="title"
                type="text"
                name="title"
                defaultValue={title}
                placeholder="Ur note title here..."
                onChange={handleTitleChange}
                required
              />
            </div>
            <div>
              <ReactQuill
                theme="snow"
                defaultValue={body}
                onChange={handleEditorChange}
                modules={modules}
                formats={formats}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleEditNote}>Edit</Button>
          <Button color="gray" onClick={() => setOpenModal(undefined)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
