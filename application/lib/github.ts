export async function getGitHubStars(): Promise<number | null> {
  try {
    const res = await fetch(
      'https://api.github.com/repos/akshadjaiswal/Namaste-Nodejs',
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.stargazers_count ?? null
  } catch {
    return null
  }
}
