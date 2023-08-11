import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AddNoteModal() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [value, setValue] = useState<string>("");
  const props = { openModal, setOpenModal };

  const handleOnChange = (): void => {};

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
                onChange={handleOnChange}
                required
              />
            </div>
            <div>
              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)}>Create</Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
