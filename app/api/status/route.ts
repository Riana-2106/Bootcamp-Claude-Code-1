import { NextRequest, NextResponse } from "next/server";
import { getMembers, updateMember } from "@/lib/db";
import { TEAM_MEMBERS } from "@/lib/team";
import { STATUS_OPTIONS, type Status } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const members = await getMembers();
  return NextResponse.json({ members });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name : "";
  const status = body?.status as Status;
  const task = typeof body?.task === "string" ? body.task.trim().slice(0, 60) : "";

  if (!TEAM_MEMBERS.includes(name)) {
    return NextResponse.json({ error: "Nama tidak dikenali." }, { status: 400 });
  }
  if (!STATUS_OPTIONS.includes(status)) {
    return NextResponse.json({ error: "Status tidak valid." }, { status: 400 });
  }

  await updateMember(name, status, task);
  const members = await getMembers();
  return NextResponse.json({ members });
}
