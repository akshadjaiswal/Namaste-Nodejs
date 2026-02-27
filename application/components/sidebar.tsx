import { getSeasons } from '@/lib/chapters'
import { SidebarClient } from './sidebar-client'

export function Sidebar() {
  const seasons = getSeasons()
  return <SidebarClient seasons={seasons} />
}
