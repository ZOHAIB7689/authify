import { SessionWrapper } from "@/components/SessionWrapper";
import AuthComponent from "@/components/login/AuthComponent";
import SignOutPage from "@/components/login/SignOutComponent";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession(authOptions); // Fetch session server-side
  const isAuthenticated = !!session?.user;

  return (
    <div>
      <SessionWrapper>
        {isAuthenticated ? <SignOutPage /> : <AuthComponent />}
      </SessionWrapper>
    </div>
  );
}
