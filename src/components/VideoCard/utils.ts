import type { Author, Video } from './types'

const recommendTagPatterns = [
  /高[赞讚]/,
  /高互[动動]/,
  /百[万萬]播放/,
  /(?:\d+(?:\.\d+)?|[一二三四五六七八九十百千万萬亿億]+)[万萬亿億]?(?:播放|观看|觀看|点赞|點[讚赞]|点讚|[赞讚]|likes?|弹幕|彈幕|danmakus?|人[气氣])/i,
]

export function isVideoCardRecommendTag(tag: string) {
  const normalizedTag = tag.replace(/\s+/g, '')
  return recommendTagPatterns.some(pattern => pattern.test(normalizedTag))
}

export function getAuthorJumpUrl(author?: Author) {
  if (!author)
    return ''

  return author.authorUrl || (author.mid ? `//space.bilibili.com/${author.mid}` : '')
}

export function getCurrentTime(videoElement: Ref<HTMLVideoElement | null>) {
  if (videoElement.value) {
    return videoElement.value.currentTime
  }
  return null
}

export function getCurrentVideoUrl(video: Video, videoCurrentTime: Ref<number | null>) {
  const baseUrl = `https://www.bilibili.com/video/${video.bvid ?? `av${video.aid}`}`
  const currentTime = videoCurrentTime.value
  return currentTime && currentTime > 5 ? `${baseUrl}/?t=${currentTime}` : `${baseUrl}`
}
