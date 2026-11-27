import { Suspense } from "react";

import { CustomLink } from "@/components/custom-link";
import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/get-server-session";
import { ROUTES } from "@/lib/navigation-paths";

// The heading is static (in the prerendered shell).
// Only the dashboard button depends on the session, so it streams in.
export default function HomePage() {
  return (
    <div className="min-h-screen max-w-5xl w-full mx-auto pt-16 flex flex-col items-center">
      <p className="text-3xl font-bold">DevVault</p>
      <Suspense fallback={null}>
        <DashboardLink />
      </Suspense>
    </div>
  );
}

async function DashboardLink() {
  const session = await getServerSession();
  if (!session?.user) return null;

  return (
    <Button asChild>
      <CustomLink href={ROUTES.DASHBOARD} className="mt-4">
        Go to Dashboard
      </CustomLink>
    </Button>
  );
}
