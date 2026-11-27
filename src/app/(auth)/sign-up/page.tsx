import { Metadata } from "next";

import { SignUpForm } from "./sign-up-form";

export const metadata: Metadata = {
  title: "Sign up - DevVault",
  description:
    "Create a DevVault account to save your snippets, commands, prompts, notes and links in one place.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
