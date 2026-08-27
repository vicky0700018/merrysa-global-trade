import { useSyncExternalStore } from "react";
import { defaultContent, type SiteContent } from "@/data/mockData";

const CONTENT_KEY = "merrysa_content_v1";
const AUTH_KEY = "merrysa_admin_session";

let content: SiteContent = defaultContent;
let authed = false;

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function hydrateStore() {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(CONTENT_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SiteContent>;
      content = { ...defaultContent, ...parsed };
    }
  } catch {
    content = defaultContent;
  }
  try {
    authed = window.localStorage.getItem(AUTH_KEY) === "true";
  } catch {
    authed = false;
  }
  emit();
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
  } catch {
    /* storage unavailable in demo */
  }
}

export function updateContent(patch: Partial<SiteContent>) {
  content = { ...content, ...patch };
  persist();
  emit();
}

export function resetContent() {
  content = defaultContent;
  persist();
  emit();
}

export function useContent(): SiteContent {
  return useSyncExternalStore(
    subscribe,
    () => content,
    () => defaultContent,
  );
}

export function useIsAdmin(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => authed,
    () => false,
  );
}

export function login(username: string, password: string, expected: { username: string; password: string }) {
  const ok =
    username.trim().toLowerCase() === expected.username && password === expected.password;
  if (ok) {
    authed = true;
    try {
      window.localStorage.setItem(AUTH_KEY, "true");
    } catch {
      /* demo only */
    }
    emit();
  }
  return ok;
}

export function logout() {
  authed = false;
  try {
    window.localStorage.removeItem(AUTH_KEY);
  } catch {
    /* demo only */
  }
  emit();
}

export function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
