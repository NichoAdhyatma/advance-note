import { useState } from "react";
import { Document, Page, Text, PDFViewer } from "@react-pdf/renderer";
import ContentToConvert from "./ContentToConvert";
import { Button, Modal } from "flowbite-react";

const PDFDocument = () => (
  <Document>
    <Page>
      <Text>Hello, this is a PDF document generated from React!</Text>
      <ContentToConvert />
    </Page>
  </Document>
);

const PDFDownloadButton = () => {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  return (
    <div>
      <Button onClick={() => props.setOpenModal("dismissible")}>
        View PDF
      </Button>
      <Modal
        dismissible
        show={props.openModal === "dismissible"}
        size="7xl"
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header>View PDF ur Note</Modal.Header>
        <Modal.Body>
          <PDFViewer className="w-full h-[600px]">
            <PDFDocument />
          </PDFViewer>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => props.setOpenModal(undefined)}>
            Download
          </Button>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PDFDownloadButton;