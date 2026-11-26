const YOUTUBE_ID = /^[A-Za-z0-9_-]{11}$/
const YOUTUBE_HOSTS = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com'])
const EMBED_HOSTS = new Set(['youtube-nocookie.com', 'www.youtube-nocookie.com'])

export function getYouTubeId(value?: string | null): string | null {
  if (!value) return null

  try {
    const url = new URL(value.trim())
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null

    const path = url.pathname.split('/').filter(Boolean)
    let id: string | null | undefined

    if (url.hostname === 'youtu.be' && path.length === 1) {
      id = path[0]
    } else if (YOUTUBE_HOSTS.has(url.hostname) && url.pathname === '/watch') {
      id = url.searchParams.get('v')
    } else if (path.length === 2) {
      if (
        path[0] === 'embed' &&
        (YOUTUBE_HOSTS.has(url.hostname) || EMBED_HOSTS.has(url.hostname))
      ) {
        id = path[1]
      } else if (YOUTUBE_HOSTS.has(url.hostname) && ['shorts', 'live'].includes(path[0])) {
        id = path[1]
      }
    }

    return id && YOUTUBE_ID.test(id) ? id : null
  } catch {
    return null
  }
}
