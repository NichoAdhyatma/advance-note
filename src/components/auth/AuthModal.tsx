import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import { AuthData } from "../../interfaces/auth/auth-data.model";
import useAuth from "../../hooks/auth-hooks";
import { ToastContainer } from "react-toastify";

export default function AuthModal() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const [data, setData] = useState<AuthData | undefined>();
  const { signIn } = useAuth();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...(prevData as AuthData),
      [name]: value,
    }));
  };

  const handleOnClick = () => {
    signIn(data as AuthData);
  };

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
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                name="email"
                placeholder="name@company.com"
                onChange={handleOnChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput
                id="password"
                name="password"
                type="password"
                placeholder="Your secret password"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="flex justify-end">
              <a
                href="/modal"
                className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Lost Password?
              </a>
            </div>
            <div className="w-full">
              <Button onClick={handleOnClick}>Log in to your account</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a
                href="/modal"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Create account
              </a>
            </div>
          </div>
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
