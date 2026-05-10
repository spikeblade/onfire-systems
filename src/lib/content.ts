import { supabase } from './supabase'

type ContentMap = Record<string, Record<string, string>>

export async function getPageContent(page: string): Promise<ContentMap> {
  const { data } = await supabase
    .from('page_content')
    .select('section, key, value')
    .eq('page', page)

  const result: ContentMap = {}
  for (const row of data ?? []) {
    if (!result[row.section]) result[row.section] = {}
    result[row.section][row.key] = row.value
  }
  return result
}

export function get(map: ContentMap, section: string, key: string, fallback = ''): string {
  return map[section]?.[key] ?? fallback
}
