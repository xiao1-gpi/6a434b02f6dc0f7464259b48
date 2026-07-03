import { motion } from 'framer-motion';
import { profile, navItems } from '@/data/profile';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="max-w-content mx-auto px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <motion.a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="font-display text-2xl font-semibold tracking-tight text-text-primary inline-block mb-4"
            >
              ZZL<span className="text-accent">.</span>
            </motion.a>
            <p className="text-text-secondary text-sm max-w-md leading-relaxed mb-6">
              {profile.title}
            </p>
            <p className="text-text-tertiary text-sm">
              {profile.email}
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-text-primary mb-4">
              导航
            </h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors hover-underline inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-text-primary mb-4">
              社交媒体
            </h4>
            <ul className="space-y-3">
              {profile.socialLinks.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-secondary hover:text-text-primary transition-colors hover-underline inline-block"
                  >
                    {link.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-tertiary text-sm">
            © {new Date().getFullYear()} {profile.name}. 保留所有权利。
          </p>
          <div className="flex items-center gap-6">
            <p className="text-text-tertiary text-xs font-mono">
              用心设计与开发 ♥
            </p>
            <motion.button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-text-tertiary transition-all"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              aria-label="回到顶部"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
