import { useState, useEffect, useRef } from 'react';
import { navItems } from '@/data/profile';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > window.innerHeight * 0.8);
        tickingRef.current = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(href.substring(1));
    }
  };

  return (
    <>
      <nav
        className={`gsap-nav fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? 'bg-[#0A0A0A]/85 border-b border-white/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-content mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#hero');
              }}
              className="font-display text-xl font-semibold tracking-tight text-text-primary hover:text-white transition-colors"
            >
              ZZL<span className="text-accent">.</span>
            </a>

            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`text-sm font-medium transition-colors hover-underline ${
                    activeSection === item.href.substring(1)
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* 动态光线效果 - 开场动画控制首次扫描，之后CSS循环 */}
      <div className="fixed top-20 left-0 right-0 h-[2px] z-40 overflow-hidden bg-black/20">
        <div
          className="gsap-nav-light nav-light h-full w-1/3"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(220, 20, 20, 0.9), rgba(255, 80, 0, 0.8), rgba(220, 20, 20, 0.9), transparent)',
          }}
        />
      </div>
    </>
  );
}
