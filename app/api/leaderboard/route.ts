import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const game = searchParams.get('game');

    let query;
    if (game) {
      query = await sql`
        SELECT * FROM leaderboard 
        WHERE game = ${game} 
        ORDER BY score DESC, created_at ASC 
        LIMIT 50
      `;
    } else {
      query = await sql`
        SELECT * FROM leaderboard 
        ORDER BY score DESC, created_at ASC 
        LIMIT 100
      `;
    }

    return NextResponse.json({ scores: query.rows });
  } catch (error: any) {
    // If table doesn't exist, return empty array
    if (error.message.includes('does not exist')) {
      return NextResponse.json({ scores: [] });
    }
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch scores' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, score, game } = await request.json();

    if (!name || score === undefined || !game) {
      return NextResponse.json(
        { error: 'Name, score, and game are required' },
        { status: 400 }
      );
    }

    // Create table if it doesn't exist
    try {
      await sql`
        CREATE TABLE IF NOT EXISTS leaderboard (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          score INTEGER NOT NULL,
          game VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
    } catch (createError) {
      console.log('Table might already exist:', createError);
    }

    // Insert score
    const result = await sql`
      INSERT INTO leaderboard (name, score, game, created_at)
      VALUES (${name}, ${score}, ${game}, NOW())
      RETURNING *
    `;

    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to save score' },
      { status: 500 }
    );
  }
}
