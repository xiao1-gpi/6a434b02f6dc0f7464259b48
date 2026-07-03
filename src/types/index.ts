export type ProjectCategory = 'character' | 'turnaround' | 'merchandise';

export interface TurnaroundView {
  label: string;
  image: string;
  objectPosition?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  thumbnail: string;
  year: string;
  client?: string;
  tags: string[];
  size?: 'small' | 'medium' | 'large';
  turnaroundViews?: TurnaroundView[];
  merchandiseItems?: {
    name: string;
    image: string;
  }[];
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface Profile {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  avatar: string;
  height: string;
  hobbies: string[];
  signature: string;
  email: string;
  phone: string;
  location: string;
  skills: Skill[];
  services: Service[];
  socialLinks: SocialLink[];
}

export interface NavItem {
  label: string;
  href: string;
}
