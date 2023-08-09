import { Button, Modal, Tabs } from "flowbite-react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import SingIn from "./SignIn";
import SignUp from "./SignUp";

export default function AuthModal() {
  const [openModal, setOpenModal] = useState<string | undefined>();

  return (
    <>
      <Button onClick={() => setOpenModal("auth-modal")}>Create Now</Button>
      <Modal
        show={openModal === "auth-modal"}
        size="md"
        popup
        onClose={() => setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body>
          <Tabs.Group aria-label="auth-tab" style="underline" className="mt-4 flex justify-evenly">
            <Tabs.Item active title="Sign In">
              <SingIn />
            </Tabs.Item>
            <Tabs.Item title="Sign Up">
              <SignUp />
            </Tabs.Item>
          </Tabs.Group>
        </Modal.Body>
      </Modal>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
