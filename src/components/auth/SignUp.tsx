import { Button, Label, TextInput } from "flowbite-react";
import useAuth from "../../hooks/auth-hooks";
import { AuthData } from "../../interfaces/auth/auth-data.model";
import { useState } from "react";

export default function SignUp() {
  const [data, setData] = useState<AuthData | undefined>({
    name: "",
    email: "",
    password: "",
  });
  const { signUp, loading } = useAuth();

  const handleOnClick = () => {
    
    signUp(data as AuthData);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...(prevData as AuthData),
      [name]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Sign up to our platform
      </h3>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Your Name" />
        </div>
        <TextInput
          id="name"
          type="text"
          name="name"
          placeholder="Your Name"
          onChange={handleOnChange}
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput
          id="email-singup"
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
          id="password-singup"
          name="password"
          type="password"
          placeholder="Your secret password"
          onChange={handleOnChange}
          required
        />
      </div>

      <div className="w-full">
        <Button
          onClick={handleOnClick}
          isProcessing={loading}
          className="w-full mt-12"
          disabled={
            data?.name.length == 0 ||
            data?.email.length == 0 ||
            data?.password.length == 0
          }
        >
          Sign Up{" "}
        </Button>
      </div>
    </div>
  );
}
