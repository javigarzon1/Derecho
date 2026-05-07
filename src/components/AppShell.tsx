import { Link, useNavigate } from "@tanstack/react-router";
import { Scale, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold tracking-tight">LexAgent</span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/agents" className="rounded-md px-3 py-1.5 text-muted-foreground hover:bg-accent hover:text-foreground">
              Mis agentes
            </Link>
            {user && (
              <>
                <span className="hidden text-xs text-muted-foreground sm:inline">{user.email}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={async () => {
                    await signOut();
                    navigate({ to: "/auth" });
                  }}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  );
}
