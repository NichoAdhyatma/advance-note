import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState, useRef } from "react";
import ReactQuill from "react-quill";
import { NoteData } from "../../interfaces/note/note-data.model";
import useNote from "../../hooks/note-hooks";
import "react-quill/dist/quill.snow.css";

export default function AddNoteModal() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const { addNote, data, handleEditorChange, handleTitleChange } = useNote();
  const props = { openModal, setOpenModal };
  const quillRef: any = useRef();

  const handleOnSave = () => {
    addNote(data as NoteData);
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];


  return (
    <>
      <Button onClick={() => props.setOpenModal("new-note")}>
        Create New Note
      </Button>
      <Modal
        show={props.openModal === "new-note"}
        size="6xl"
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>Create New Note</Modal.Header>
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
                placeholder="Ur note title here..."
                onChange={handleTitleChange}
                required
              />
            </div>
            <div>
              <ReactQuill
                theme="snow"
                value={data?.body}
                onChange={handleEditorChange}
                ref={(el) => {
                  quillRef.current = el;
                }}
                modules={modules}
                formats={formats}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleOnSave}>Create</Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
