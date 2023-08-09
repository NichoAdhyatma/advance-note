import { Button, Label, TextInput } from "flowbite-react";
import useAuth from "../../hooks/auth-hooks";
import { AuthData } from "../../interfaces/auth/auth-data.model";
import { useState } from "react";
import Divider from "../utils/Divider";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  const [data, setData] = useState<AuthData | undefined>({
    name: "",
    email: "",
    password: "",
  });
  const { signIn, googleSignIn } = useAuth();
  const [processing, setProcessing] = useState<boolean>(false);

  const handleOnClick = () => {
    setProcessing(true);
    signIn(data as AuthData).finally(() => setProcessing(false));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...(prevData as AuthData),
      [name]: value,
    }));
  };

  const handleGoogleSingIn = () => {
    setProcessing(true);
    googleSignIn().finally(() => setProcessing(false));
  };

  return (
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
          type="email"
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
      <div className="w-full flex flex-col gap-2">
        <Button
          onClick={handleOnClick}
          isProcessing={processing}
          className="w-full"
          disabled={data?.email.length == 0 || data?.password.length == 0}
        >
          Sign In
        </Button>

        <Divider label="Or" />

        <Button
          isProcessing={processing}
          color="gray"
          onClick={handleGoogleSingIn}
        >
          <FcGoogle className="mr-2 h-5 w-5" />
          Sign In with Google
        </Button>
      </div>
    </div>
  );
}
