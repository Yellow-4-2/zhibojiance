export interface LiveInfo {
  roomTitle: string
  anchor: string
  status: string
  viewerCount: number
  startTime: string
  duration: string
}

export type RiskLevel = 'high' | 'medium' | 'low'

export interface ViolationRecord {
  id: string
  time: string
  product: string
  riskLevel: RiskLevel
  category: string
  content: string
  suggestion: string
  link: string
}

export interface ProductItem {
  id: string
  name: string
  price: number
  link: string
  onShelf: boolean
  hasViolation: boolean
}

/** 主播信息 */
export interface Anchor {
  id: string
  name: string
  avatarColor: string
  platform: string
  category: string
  status: 'live' | 'ended'
  followers: number
  viewerCount: number
  violationCount: number
  lastLiveTime: string
  roomTitle: string
}

/** 重点监测产品 */
export interface KeyProduct {
  id: string
  name: string
  category: string
  riskLevel: RiskLevel
  reason: string
  mentionCount: number
  violationCount: number
}

/** 违规趋势数据点 */
export interface TrendPoint {
  date: string
  count: number
}

/** 违规类型分布 */
export interface CategoryStat {
  name: string
  value: number
}

/** 录播视频 */
export interface RecordedVideo {
  id: string
  anchorId: string
  anchorName: string
  avatarColor: string
  platform: string
  roomTitle: string
  date: string
  startTime: string
  duration: string
  fileSize: string
  violationCount: number
  status: 'ready' | 'recording'
  videoUrl: string
}
