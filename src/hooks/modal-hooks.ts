import { useState } from "react";

const useModal = () => {
  const [openModal, setOpenModal] = useState<string | undefined>();

  return { openModal, setOpenModal };
};

export default useModal;
