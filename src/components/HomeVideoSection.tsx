import { getYouTubeId } from '@/lib/youtube'
import type { HomeVideo } from '@/payload-types'

export function HomeVideoSection({ video }: { video: HomeVideo }) {
  const youtubeId = getYouTubeId(video.youtubeUrl)
  const poster = typeof video.poster === 'object' ? video.poster?.url : undefined
  if (!youtubeId && !video.url) return null

  return (
    <section id="video" className="home-video-section page-section" aria-labelledby="video-heading">
      <div className="shell home-video-layout">
        <div>
          <h2 id="video-heading">{video.title}</h2>
          {video.description && <p>{video.description}</p>}
        </div>
        <div className="home-video-player">
          {youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
              title={video.title}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              {...{ loading: 'lazy' }}
              aria-labelledby="video-heading"
              width={1280}
              height={720}
              src={video.url ?? undefined}
              poster={poster ?? undefined}
              preload="none"
              controls
              playsInline
            />
          )}
        </div>
      </div>
    </section>
  )
}
