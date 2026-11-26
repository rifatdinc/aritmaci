import { sql } from '@payloadcms/db-sqlite'
import type { DatabaseAdapter } from 'payload'

export async function ensureHomeVideos(db: DatabaseAdapter) {
  // Existing installations were initialized with schema push, so apply this additive change without migration history.
  await db.drizzle.transaction(async (transaction) => {
    await transaction.run(sql`CREATE TABLE IF NOT EXISTS home_videos (
        id integer PRIMARY KEY NOT NULL,
        title text NOT NULL,
        description text,
        youtube_url text,
        poster_id integer REFERENCES media(id) ON DELETE SET NULL,
        published integer DEFAULT false,
        updated_at text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
        created_at text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
        url text,
        thumbnail_u_r_l text,
        filename text,
        mime_type text,
        filesize numeric,
        width numeric,
        height numeric,
        focal_x numeric,
        focal_y numeric
      )`)
    await transaction.run(
      sql`CREATE INDEX IF NOT EXISTS home_videos_poster_idx ON home_videos (poster_id)`,
    )
    await transaction.run(
      sql`CREATE INDEX IF NOT EXISTS home_videos_updated_at_idx ON home_videos (updated_at)`,
    )
    await transaction.run(
      sql`CREATE INDEX IF NOT EXISTS home_videos_created_at_idx ON home_videos (created_at)`,
    )
    await transaction.run(
      sql`CREATE UNIQUE INDEX IF NOT EXISTS home_videos_filename_idx ON home_videos (filename)`,
    )
  })
}
