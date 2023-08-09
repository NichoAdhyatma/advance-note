import useAuth from "../hooks/auth-hooks";
import { Button } from "flowbite-react";

export default function Dashboard() {
  const { signOutUser } = useAuth();

  const handleOnClick = () => {
    signOutUser();
  };
  return (
    <div>
      <Button color="failure" onClick={handleOnClick}>
        Sign Out
      </Button>
    </div>
  );
}
