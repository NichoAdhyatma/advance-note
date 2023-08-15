import { useState } from "react";
import {
  Document,
  Page,
  Text,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
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

  console.log(PDFDownloadLink);

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
          <PDFDownloadLink document={<PDFDocument />} fileName="somename.pdf">
            {({ blob, url, loading, error }) =>
              loading ? (
                "Loading document..."
              ) : (
                <a href={url!} download={true}>
                  {" "}
                  <Button>Download</Button>
                </a>
              )
            }
          </PDFDownloadLink>
          <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PDFDownloadButton;
