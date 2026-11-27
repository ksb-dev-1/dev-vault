import type { Metadata } from "next";

import { VerifyEmailContent } from "./verify-email-content";

export const metadata: Metadata = {
  title: "Verify Email - DevVault",
  description:
    "Verify your email address to activate your DevVault account.",
};

export default async function VerifyEmailPage() {
  return <VerifyEmailContent />;
}
