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
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    });

    return () => unsubscribe();
  }, [loading]);

  const signUp = async (data: AuthData) => {
    try {
      setLoading(true);
      let user: UserCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).finally(() => setLoading(false));

      if (user) {
        updateProfile(user.user, {
          displayName: data.name,
        });
        setLoading(false);
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const signIn = async (data: AuthData) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password).finally(
        () => setLoading(false)
      );
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
    setLoading(true);

    const provider = new GoogleAuthProvider();

    await signInWithRedirect(auth, provider).finally(() => setLoading(false));
  };

  return { user, loading, signIn, signUp, signOutUser, googleSignIn };
};

export default useAuth;
