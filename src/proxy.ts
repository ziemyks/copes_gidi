import { NextResponse, type NextRequest } from "next/server";
import { latvianPath, localizedPath } from "@/i18n/routing";

export function proxy(request: NextRequest) {
  const url = new URL(request.url);
  // Preserve the incoming host so local IP requests remain internal rewrites.
  url.host = request.headers.get("host") ?? url.host;
  const path = url.pathname;
  if (path === "/lv" || path.startsWith("/lv/")) {
    url.pathname = localizedPath(path, "lv");
    return NextResponse.redirect(url, 308);
  }
  const locale = path === "/en" || path.startsWith("/en/") ? "en" : "lv";
  const canonical = localizedPath(path, locale);
  if (path !== canonical) {
    url.pathname = canonical;
    return NextResponse.redirect(url, 308);
  }
  url.pathname = `/${locale}${latvianPath(path) === "/" ? "" : latvianPath(path)}`;
  return NextResponse.rewrite(url);
}

export const config = { matcher: ["/((?!api|_next|.*\\.[^/]+$).*)"] };
