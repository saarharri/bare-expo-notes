export function getTimeAgo(date: string | Date): string {
  const now = new Date()
  const past = new Date(date)
  const diffMs = now.getTime() - past.getTime()
  const diffSeconds = Math.floor(diffMs / 1000)
  const diffMinutes = Math.floor(diffSeconds / 60)
  const diffHours = Math.floor(diffMinutes / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)

  if (diffSeconds < 60) return 'few seconds ago'
  if (diffMinutes < 60) return `${diffMinutes} minutes ago`
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays < 30) return `${diffDays} days ago`
  if (diffMonths < 12) return `${diffMonths} months ago`
  return `${diffYears} years ago`
}

export const PRIMARY_BLACK_COLOR = '#011501'
export const PRIMARY_GREEN_COLOR = '#b0d943'
export const PRIMARY_TEXT_GRAY = '#666666'
export const PRIMARY_RED_COLOR = '#dc3545'
export const OVERLAY_COLOR = 'rgba(0, 0, 0, 0.8)'
export const WHITE_COLOR = 'white'
export const INPUT_BACKGROUND_COLOR = '#0a1a0a'
export const INPUT_BORDER_COLOR = '#ccc'
export const PLACEHOLDER_COLOR = '#888'
export const CANCEL_BORDER_COLOR = '#666'

export const validateMessageText = (text: string) => {
  const trimmed = text.trim()
  const minLength = 1
  const maxLength = 500

  return {
    isValid: trimmed.length >= minLength && trimmed.length <= maxLength,
    isTooShort: trimmed.length < minLength,
    isTooLong: trimmed.length > maxLength
  }
}

const utils = {
  getTimeAgo,
  validateMessageText,
  PRIMARY_BLACK_COLOR,
  PRIMARY_GREEN_COLOR,
  PRIMARY_TEXT_GRAY,
  OVERLAY_COLOR,
  WHITE_COLOR,
  INPUT_BACKGROUND_COLOR,
  INPUT_BORDER_COLOR,
  PLACEHOLDER_COLOR,
  CANCEL_BORDER_COLOR
}

export default utils
