import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ADMIN_CREDENTIALS } from "@/data/mockData";
import { login, useIsAdmin } from "@/lib/content-store";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Login — Merrysa Exim LLP Demo Panel" },
      {
        name: "description",
        content: "Demo admin login for managing the Merrysa Exim LLP website content.",
      },
      { property: "og:title", content: "Admin Login — Merrysa Exim LLP" },
      { property: "og:description", content: "Demo admin login for the Merrysa Exim LLP website." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const isAdmin = useIsAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdmin) navigate({ to: "/admin/dashboard" });
  }, [isAdmin, navigate]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!username.trim() || !password) {
      setError("Enter both username and password.");
      return;
    }
    if (login(username, password, ADMIN_CREDENTIALS)) {
      setError("");
      navigate({ to: "/admin/dashboard" });
    } else {
      setError("Invalid demo credentials. Please try again.");
    }
  }

  return (
    <div className="grid min-h-screen place-items-center surface-navy px-4 py-16">
      <div className="w-full max-w-md">
        <Link to="/" className="text-xs tracking-[0.16em] text-gold-soft uppercase">
          ← Back to website
        </Link>
        <div className="mt-4 rounded-3xl bg-card p-7 shadow-lift sm:p-9">
          <p className="eyebrow">Demo Admin Login</p>
          <h1 className="mt-2 font-display text-2xl font-bold">Merrysa Exim Admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Front-end demonstration only — this is not secure authentication and no data leaves
            your browser.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <div>
              <label htmlFor="username" className="text-sm font-medium">
                Email / Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                className="field mt-1.5"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="field mt-1.5"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {error ? (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}
            <button type="submit" className="btn btn-primary w-full">
              Sign In
            </button>
          </form>

          <div className="mt-6 rounded-xl bg-surface p-4 text-xs text-muted-foreground">
            <p className="font-semibold text-foreground">Demo credentials</p>
            <p className="mt-1">Username: {ADMIN_CREDENTIALS.username}</p>
            <p>Password: {ADMIN_CREDENTIALS.password}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
