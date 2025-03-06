import { writable } from "svelte/store";

export const isSignedIn = writable(false);
export function signOut() {
  isSignedIn.set(false);
}
export function signIn() {
  isSignedIn.set(true);
}