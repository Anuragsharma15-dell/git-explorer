"use client";

import { signOut, useSession } from "next-auth/react";

import Link from "next/link";
import { LogOut, User } from "lucide-react";

export function LoginBtn() {
  const { data: session } = useSession();
  



  if (session) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              width={32}
              height={32}
              className="rounded-full border border-border"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
          )}
          <span className="text-sm font-medium hidden sm:block">
            {session.user?.name}
          </span>
        </div>
        <button
          onClick={() => signOut()}
          className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          title="Sign out"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="px-5 py-2 rounded-full bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-all text-sm"
    >
      Sign In
    </Link>
  );
}