import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import events from './events.json';

export async function GET(req: NextRequest) {
  return NextResponse.json(events);
}
