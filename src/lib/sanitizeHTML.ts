export async function sanitizeHtml(html: string): Promise<string> {
  if (typeof window === "undefined") return html;
  const mod = await import("dompurify");
  return mod.default ? mod.default.sanitize(html) : mod.sanitize(html);
}