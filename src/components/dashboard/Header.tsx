import { Button } from "flowbite-react";
import useAuth from "../../hooks/auth-hooks";
import { auth } from "../../conf/firebase.config";

export default function Header() {
  const { signOutUser } = useAuth();

  const handleOnClick = () => {
    signOutUser();
  };
  return (
    <div className="flex rounded-lg justify-between items-center bg-gray-200 p-4">
      <div>
        <p>Welcome</p>
        <span className="font-semibold text-primary">
          {auth.currentUser?.displayName}
        </span>
      </div>
      <Button color="failure" onClick={handleOnClick}>
        Sign Out
      </Button>
    </div>
  );
}
