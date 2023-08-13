import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import useNote from "../../hooks/note-hooks";
import "react-quill/dist/quill.snow.css";

export default function EditNoteModal({
  id,
  title,
  body,
}: {
  id: string;
  title: string;
  body: string;
}) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const { handleEditorChange, handleTitleChange } = useNote();

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
        show={openModal === "new-note"}
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
                value={title}
                placeholder="Ur note title here..."
                onChange={handleTitleChange}
                required
              />
            </div>
            <div>
              <ReactQuill
                theme="snow"
                value={body}
                onChange={handleEditorChange}
                modules={modules}
                formats={formats}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button>Edit</Button>
          <Button color="gray" onClick={() => setOpenModal(undefined)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
