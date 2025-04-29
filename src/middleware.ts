import type { NextRequest } from "next/server";
import { updateSession } from "./lib/middleware";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

export async function middleware(request: NextRequest) {
  return updateSession(request);
}
