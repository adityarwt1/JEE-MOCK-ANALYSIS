import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ yearAndDate: string }> },
) {
  const { yearAndDate } = await params;
  const dateKey = yearAndDate.replaceAll("-", "");

  if (!/^(?:\d{6}|\d{8})$/.test(dateKey)) {
    return Response.json({ error: "Invalid analysis date" }, { status: 400 });
  }

  const year = dateKey.length === 6 ? `20${dateKey.slice(0, 2)}` : dateKey.slice(0, 4);
  const filename = `${dateKey.slice(-6)}.pdf`;
  let file: Buffer;

  try {
    file = await readFile(
      path.join(process.cwd(), "analysisPdf", year, filename),
    );
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      return Response.json({ error: "Analysis PDF not found" }, { status: 404 });
    }

    throw error;
  }

  return new Response(new Uint8Array(file), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
    },
  });
}
