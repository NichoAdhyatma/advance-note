import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
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

        toast.success(`Welcome ${authUser.email}`);
        navigate("/auth");
      } else {
        navigate("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (data: AuthData) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      throw error;
    }
  };

  const signIn = async (data: AuthData) => {
    console.log(data.password);
    console.log(data.email);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  return { user, loading, signIn, signUp, signOutUser };
};

export default useAuth;
