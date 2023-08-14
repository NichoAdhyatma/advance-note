import { useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../conf/firebase.config";
import { AuthData } from "../interfaces/auth/auth-data.model";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser({
          uid: authUser.uid,
          email: authUser.email || "",
        });

        navigate("/dashboard");
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (data: AuthData) => {
    try {
      let user: UserCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (user) {
        updateProfile(user.user, {
          displayName: data.name,
        });
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const signIn = async (data: AuthData) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    await signInWithRedirect(auth, provider);
  };

  return { user, signIn, signUp, signOutUser, googleSignIn };
};

export default useAuth;
