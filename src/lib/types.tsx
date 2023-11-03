import { DocumentData } from "firebase/firestore";
import * as z from "zod";

export type UserData = {
  firstName: string;
  lastName: string;
  uid: string;
  email: string;
  status: string;
};
export type driverData = {
  behavioralScore: string;
  email: string;
  fullName: string;
  licenseNo: string;
  plateNo: string;
  uid: string;
  behaviorScore: string;
  reportTimes: string;
  violations: string;
  accidents: string;
};

export type Firebase = {
  userData: DocumentData;
  driverData: DocumentData;
  currentDriverUid: string;
  signIn: (email: string, password: string) => void;
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
  signOut: () => void;
  driverRegistration: (
    fullName: string,
    licenseNo: string,
    plateNo: string,
    uid: string
  ) => void;
  getUserData: () => void;
  getDriverData: (uid: string) => void;
  setCurrentDriverUid: (uid: string) => void;
};

export const signUpFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First Name must be at least 5 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last Name must be at least 5 characters.",
  }),
  email: z.string().min(2, {
    message: "Email must be at least 5 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 5 characters.",
  }),
});

export const signInFormSchema = z.object({
  email: z.string().min(5, {
    message: "Email must be at least 5 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export const driverRegFormSchema = z.object({
  licenseNo: z.string().min(5, {
    message: "Text must be at least 5 characters",
  }),
  plateNo: z.string().min(5, {
    message: "Text must be at least 5 characters",
  }),
});

export const reviewFormSchema = z.object({
  textReview: z.string().min(5, {
    message: "Text must be at least 5 characters",
  }),
});
