import type { Profile } from '@/types';

export const profile: Profile = {
  name: '朱忠林',
  title: '视觉设计师',
  subtitle: '平面设计 / 广告设计',
  bio: '数字媒体技术专业在读，系统掌握平面视觉设计、动态广告制作核心专业知识。拥有扎实的广告设计相关理论与实践基础，精通广告创意全流程运作逻辑，能够高效对接需求方、运营方等多方诉求，输出与品牌定位、传播目标高度契合的广告设计方案。',
  avatar: '/avatars/avatar.jpg',
  height: '174cm',
  hobbies: ['设计', '摄影', '音乐', '旅行'],
  signature: '以创意为核心，以技术为媒介',
  email: '2577993845@qq.com',
  phone: '13714204280',
  location: '广东茂名',
  skills: [
    { name: 'Photoshop', level: 90, category: '设计软件' },
    { name: 'Illustrator', level: 85, category: '设计软件' },
    { name: 'C4D', level: 70, category: '设计软件' },
    { name: '平面广告创意', level: 88, category: '设计能力' },
    { name: '品牌视觉识别', level: 85, category: '设计能力' },
    { name: '海报设计', level: 90, category: '设计能力' },
    { name: '包装设计', level: 80, category: '设计能力' },
    { name: 'H5视觉设计', level: 75, category: '设计能力' },
    { name: 'Premiere', level: 65, category: '专业工具' },
    { name: '三维建模', level: 70, category: '专业工具' },
    { name: '动效设计', level: 75, category: '专业工具' },
    { name: 'AI 生成设计', level: 85, category: '专业工具' },
  ],
  services: [
    {
      icon: 'palette',
      title: '视觉设计',
      description: '平面广告、海报、包装、H5等多类型视觉设计，从创意策划到最终交付全流程把控。',
    },
    {
      icon: 'sparkles',
      title: 'AI 生成设计',
      description: '运用AI工具拓展创意边界，生成独特的视觉概念与设计方案，提升创作效率与品质。',
    },
    {
      icon: 'layers',
      title: '品牌视觉设计',
      description: '品牌视觉识别系统构建，Logo设计、VI规范、品牌物料延展，塑造独特品牌形象。',
    },
  ],
  socialLinks: [
    { platform: '邮箱', url: 'mailto:2577993845@qq.com' },
    { platform: '电话', url: 'tel:13714204280' },
  ],
};

export const navItems = [
  { label: '首页', href: '#hero' },
  { label: '作品', href: '#portfolio' },
];
