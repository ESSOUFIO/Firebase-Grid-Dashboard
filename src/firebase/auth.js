import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./config";
import { createUserDocument } from "./user";

export const signup = async ({ userName, email, password }) => {
  await createUserWithEmailAndPassword(auth, email, password);
  const user = auth.currentUser;
  await updateProfile(user, { displayName: userName });
  await createUserDocument(user);
  return user;
};

export const logout = () => {
  return signOut(auth);
};

export const login = async (email, password) => {
  const resp = await signInWithEmailAndPassword(auth, email, password);
  return resp.user;
};
