import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  const supabase = createClient().schema("todo")

  const { data, error } = await supabase.from('todo').select('*').is("deleted", null)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const supabase = createClient().schema("todo")

  const { name } = await request.json()
  if (!name) return NextResponse.json({ error: 'Name is required' }, { status: 400 })

  const { data, error } = await supabase.from('todo').insert({ name }).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data[0])
}

export async function PUT(request: Request) {
  const supabase = createClient().schema("todo")

  const { id, name, completed, priority }: { id: number, name: string, completed?: boolean, priority?: number } = await request.json()
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

  const updateData = {}
  if (name !== undefined) updateData.name = name
  if (completed !== undefined) updateData.completed = completed
  if (priority !== undefined) updateData.priority = priority

  const { data, error } = await supabase.from('todo').update(updateData).eq('id', id).select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data[0])
}

export async function DELETE(request: Request) {
  const supabase = createClient().schema("todo")

  const { id } = await request.json()
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 })

  const { data, error } = await supabase.from('todo').delete().eq('id', id).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data[0])
}
