import type {
  Anchor,
  CategoryStat,
  KeyProduct,
  ProductItem,
  TrendPoint,
  ViolationRecord
} from '../types'

/** 首页 - 在播主播列表 */
export const liveAnchors: Anchor[] = [
  {
    id: 'A001',
    name: '小鹿爱吃肉',
    avatarColor: 'linear-gradient(135deg,#2f81f7,#8957e5)',
    platform: '抖音',
    category: '美妆护肤',
    status: 'live',
    followers: 86234,
    viewerCount: 12856,
    violationCount: 4,
    lastLiveTime: '2026-09-22 20:00',
    roomTitle: '秋日美妆专场 · 限时秒杀'
  },
  {
    id: 'A002',
    name: '阿杰说数码',
    avatarColor: 'linear-gradient(135deg,#ff7a59,#ff5c5c)',
    platform: '淘宝直播',
    category: '3C 数码',
    status: 'live',
    followers: 53421,
    viewerCount: 6234,
    violationCount: 2,
    lastLiveTime: '2026-09-22 19:30',
    roomTitle: '开学季笔记本抄底'
  },
  {
    id: 'A003',
    name: '果子妈妈',
    avatarColor: 'linear-gradient(135deg,#4dd0a3,#2da37a)',
    platform: '快手',
    category: '母婴用品',
    status: 'live',
    followers: 41203,
    viewerCount: 3987,
    violationCount: 1,
    lastLiveTime: '2026-09-22 18:45',
    roomTitle: '宝宝辅食专场'
  },
  {
    id: 'A004',
    name: '老王食品铺',
    avatarColor: 'linear-gradient(135deg,#ffb454,#e8902a)',
    platform: '抖音',
    category: '食品保健',
    status: 'live',
    followers: 28987,
    viewerCount: 5210,
    violationCount: 3,
    lastLiveTime: '2026-09-22 20:10',
    roomTitle: '中秋礼盒预售'
  },
  {
    id: 'A005',
    name: '静静穿搭',
    avatarColor: 'linear-gradient(135deg,#a78bfa,#ec4899)',
    platform: '小红书',
    category: '服饰穿搭',
    status: 'live',
    followers: 67543,
    viewerCount: 4521,
    violationCount: 0,
    lastLiveTime: '2026-09-22 19:50',
    roomTitle: '秋冬新款上新'
  }
]

/** 首页 - 历史监测主播（已结束） */
export const historyAnchors: Anchor[] = [
  {
    id: 'H001',
    name: '潮品日报',
    avatarColor: 'linear-gradient(135deg,#60a5fa,#3b5bac)',
    platform: '抖音',
    category: '潮玩手办',
    status: 'ended',
    followers: 38211,
    viewerCount: 0,
    violationCount: 5,
    lastLiveTime: '2026-09-21 22:30',
    roomTitle: '限量手办首发'
  },
  {
    id: 'H002',
    name: '美妆测评官',
    avatarColor: 'linear-gradient(135deg,#f472b6,#a855f7)',
    platform: '淘宝直播',
    category: '美妆护肤',
    status: 'ended',
    followers: 92123,
    viewerCount: 0,
    violationCount: 8,
    lastLiveTime: '2026-09-21 21:00',
    roomTitle: '大牌精华液对比评测'
  },
  {
    id: 'H003',
    name: '家电老李',
    avatarColor: 'linear-gradient(135deg,#34d399,#059669)',
    platform: '快手',
    category: '家用电器',
    status: 'ended',
    followers: 51432,
    viewerCount: 0,
    violationCount: 2,
    lastLiveTime: '2026-09-20 23:00',
    roomTitle: '厨房家电专场'
  },
  {
    id: 'H004',
    name: '保健品课堂',
    avatarColor: 'linear-gradient(135deg,#fb7185,#dc2626)',
    platform: '抖音',
    category: '食品保健',
    status: 'ended',
    followers: 19876,
    viewerCount: 0,
    violationCount: 11,
    lastLiveTime: '2026-09-20 19:00',
    roomTitle: '秋季养生科普'
  }
]

/** 首页 - 重点监测产品 */
export const keyProducts: KeyProduct[] = [
  {
    id: 'K001',
    name: '美白祛斑霜',
    category: '美妆护肤',
    riskLevel: 'high',
    reason: '近 7 天 5 位主播提及，存在功效夸大风险',
    mentionCount: 8,
    violationCount: 5
  },
  {
    id: 'K002',
    name: '玻尿酸精华液',
    category: '美妆护肤',
    riskLevel: 'high',
    reason: '频繁使用绝对化用语"七天淡纹"',
    mentionCount: 6,
    violationCount: 3
  },
  {
    id: 'K003',
    name: '家用按摩仪',
    category: '家用电器',
    riskLevel: 'medium',
    reason: '描述涉及医疗术语"治疗颈椎病"',
    mentionCount: 4,
    violationCount: 2
  },
  {
    id: 'K004',
    name: '儿童防晒帽',
    category: '母婴用品',
    riskLevel: 'medium',
    reason: '宣称"0-6个月专用"未提供安全检测',
    mentionCount: 3,
    violationCount: 1
  },
  {
    id: 'K005',
    name: '养生保健品胶囊',
    category: '食品保健',
    riskLevel: 'high',
    reason: '涉及"根治三高"等治疗性表述',
    mentionCount: 5,
    violationCount: 4
  },
  {
    id: 'K006',
    name: '减肥茶',
    category: '食品保健',
    riskLevel: 'high',
    reason: '使用"月瘦十斤"等夸大功效承诺',
    mentionCount: 4,
    violationCount: 3
  }
]

/** 首页 - 近 7 天违规趋势 */
export const violationTrend: TrendPoint[] = [
  { date: '09-16', count: 6 },
  { date: '09-17', count: 9 },
  { date: '09-18', count: 4 },
  { date: '09-19', count: 11 },
  { date: '09-20', count: 7 },
  { date: '09-21', count: 13 },
  { date: '09-22', count: 10 }
]

/** 首页 - 违规类型分布（饼图） */
export const violationCategoryStats: CategoryStat[] = [
  { name: '功效夸大', value: 28 },
  { name: '违禁词', value: 19 },
  { name: '医疗暗示', value: 15 },
  { name: '适用人群', value: 9 },
  { name: '虚假宣传', value: 7 },
  { name: '价格误导', value: 5 }
]

/** 首页 - 主播违规排行（柱状图） */
export const anchorRanking = [
  { name: '保健品课堂', count: 11 },
  { name: '美妆测评官', count: 8 },
  { name: '潮品日报', count: 5 },
  { name: '小鹿爱吃肉', count: 4 },
  { name: '老王食品铺', count: 3 },
  { name: '阿杰说数码', count: 2 }
]

/** 监测页 - 某主播直播间产品 */
export function getProductsByAnchor(_anchorId: string): ProductItem[] {
  return [
    { id: 'P001', name: '玻尿酸精华液', price: 199, link: 'https://shop.example.com/sku/1001', onShelf: true, hasViolation: true },
    { id: 'P002', name: '美白祛斑霜', price: 268, link: 'https://shop.example.com/sku/1002', onShelf: true, hasViolation: true },
    { id: 'P003', name: '儿童防晒帽', price: 89, link: 'https://shop.example.com/sku/1003', onShelf: true, hasViolation: true },
    { id: 'P004', name: '家用按摩仪', price: 359, link: 'https://shop.example.com/sku/1004', onShelf: true, hasViolation: true },
    { id: 'P005', name: '丝绸眼罩', price: 49, link: 'https://shop.example.com/sku/1005', onShelf: true, hasViolation: false },
    { id: 'P006', name: '恒温保温杯', price: 129, link: 'https://shop.example.com/sku/1006', onShelf: false, hasViolation: false }
  ]
}

/** 监测页 - 某主播违规记录 */
export function getViolationsByAnchor(_anchorId: string): ViolationRecord[] {
  return [
    {
      id: 'V001',
      time: '20:12:34',
      product: '玻尿酸精华液',
      riskLevel: 'high',
      category: '功效夸大',
      content: '主播描述为"七天淡纹、永久抗老"，涉嫌对功效作保证性承诺。',
      suggestion: '建议修改为客观描述成分功效，避免使用绝对化用语。',
      link: 'https://shop.example.com/sku/1001'
    },
    {
      id: 'V002',
      time: '20:25:08',
      product: '美白祛斑霜',
      riskLevel: 'high',
      category: '违禁词',
      content: '使用了"最有效""国家级认证"等极限用语及未经核实认证。',
      suggestion: '删除极限词，需出具相关资质证明后再进行宣传。',
      link: 'https://shop.example.com/sku/1002'
    },
    {
      id: 'V003',
      time: '20:41:56',
      product: '儿童防晒帽',
      riskLevel: 'medium',
      category: '适用人群',
      content: '宣称"婴儿可用 0-6 个月专用"，未提供婴幼儿用品安全检测报告。',
      suggestion: '补充 0-3 岁婴幼儿用品相关检测证书后再宣传。',
      link: 'https://shop.example.com/sku/1003'
    },
    {
      id: 'V004',
      time: '21:02:17',
      product: '家用按摩仪',
      riskLevel: 'low',
      category: '医疗暗示',
      content: '描述为"治疗颈椎病、缓解神经痛"，涉及医疗术语。',
      suggestion: '改为"放松肌肉、缓解疲劳"等非医疗表述。',
      link: 'https://shop.example.com/sku/1004'
    }
  ]
}

/** 根据 anchorId 拼装直播监测页所需的 LiveInfo */
export function getLiveInfoByAnchor(anchorId: string): {
  roomTitle: string
  anchor: string
  status: string
  viewerCount: number
  startTime: string
  duration: string
} {
  // 优先匹配在播主播
  const live = liveAnchors.find(a => a.id === anchorId)
  if (live) {
    return {
      roomTitle: live.roomTitle,
      anchor: '@' + live.name,
      status: live.status === 'live' ? '直播中' : '已结束',
      viewerCount: live.viewerCount,
      startTime: live.lastLiveTime,
      duration: '01:23:45'
    }
  }
  const ended = historyAnchors.find(a => a.id === anchorId)
  if (ended) {
    return {
      roomTitle: ended.roomTitle,
      anchor: '@' + ended.name,
      status: '已结束',
      viewerCount: 0,
      startTime: ended.lastLiveTime,
      duration: '02:15:30'
    }
  }
  // 兜底
  return {
    roomTitle: '秋日美妆专场 · 限时秒杀',
    anchor: '@小鹿爱吃肉',
    status: '直播中',
    viewerCount: 12856,
    startTime: '2026-09-22 20:00',
    duration: '01:23:45'
  }
}
