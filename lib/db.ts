import { neon } from "@neondatabase/serverless";
import { TEAM_MEMBERS } from "./team";
import type { Member, Status } from "./types";

let sqlClient: ReturnType<typeof neon> | null = null;

function sql(strings: TemplateStringsArray, ...values: unknown[]): Promise<Record<string, any>[]> {
  if (!sqlClient) {
    const connectionString = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
    if (!connectionString) {
      throw new Error("DATABASE_URL belum diset. Lihat README untuk setup database.");
    }
    sqlClient = neon(connectionString);
  }
  return sqlClient(strings, ...values) as Promise<Record<string, any>[]>;
}

let schemaReady: Promise<void> | null = null;

function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = sql`
      CREATE TABLE IF NOT EXISTS members (
        name TEXT PRIMARY KEY,
        status TEXT NOT NULL DEFAULT 'belum_mulai',
        task TEXT NOT NULL DEFAULT '',
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `.then(() => undefined);
  }
  return schemaReady;
}

async function seedMissingMembers(): Promise<void> {
  for (const name of TEAM_MEMBERS) {
    await sql`
      INSERT INTO members (name) VALUES (${name})
      ON CONFLICT (name) DO NOTHING;
    `;
  }
}

export async function getMembers(): Promise<Member[]> {
  await ensureSchema();
  await seedMissingMembers();

  const rows = await sql`SELECT name, status, task, updated_at FROM members;`;
  const byName = new Map(
    rows.map((row) => [
      row.name as string,
      {
        name: row.name as string,
        status: row.status as Status,
        task: row.task as string,
        updatedAt: row.updated_at as string,
      },
    ])
  );

  return TEAM_MEMBERS.filter((name) => byName.has(name)).map((name) => byName.get(name)!);
}

export async function updateMember(name: string, status: Status, task: string): Promise<void> {
  await ensureSchema();
  await sql`
    UPDATE members
    SET status = ${status}, task = ${task}, updated_at = now()
    WHERE name = ${name};
  `;
}
