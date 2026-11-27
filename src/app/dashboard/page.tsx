import { Suspense } from "react";

import Image from "next/image";
import { redirect } from "next/navigation";

import { User } from "lucide-react";

import { LoadingFallback } from "@/components/loading-fallback";
import { getServerSession } from "@/lib/get-server-session";

// The page itself is static: it goes into the prerendered shell.
// Only <UserProfile> reads the session, so it streams in behind <Suspense>.
export default function DashboardPage() {
  return (
    <div className="min-h-screen max-w-5xl w-full mx-auto pt-16 flex flex-col items-center">
      <Suspense fallback={<LoadingFallback />}>
        <UserProfile />
      </Suspense>
    </div>
  );
}

async function UserProfile() {
  const session = await getServerSession();
  const imageUrl = session?.user.image;
  const name = session?.user.name;
  const email = session?.user.email;

  if (!email) redirect("/sign-in");

  return (
    <div className="flex flex-col gap-2 items-center">
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt="profile"
          height={72}
          width={72}
          className="rounded-full object-cover border"
        />
      ) : (
        <div className="h-18 w-18 rounded-full flex items-center justify-center border bg-muted">
          <User size={32} />
        </div>
      )}
      <h3 className="font-bold text-xl">{name}</h3>
      <p>{email}</p>
    </div>
  );
}
