import { useState, useEffect, useRef } from 'react';
import { characterProjects, turnaroundProjects, merchandiseProjects } from '@/data/projects';
import BorderGlow from '@/components/ui/BorderGlow';
import { Sparkles, Layers, ShoppingBag, Play, Pause } from 'lucide-react';
import { useSectionAnimations } from '@/hooks/useGsapAnimations';

const navItems = [
  { id: 'character', label: '人物IP', icon: Sparkles },
  { id: 'turnaround', label: '三视图', icon: Layers },
  { id: 'merchandise', label: '衍生品', icon: ShoppingBag },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('character');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP 动画
  useSectionAnimations(sectionRef);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const sections = navItems.map((item) => ({
          id: item.id,
          element: document.getElementById(item.id),
        }));

        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section.element) {
            const rect = section.element.getBoundingClientRect();
            if (rect.top <= 200) {
              setActiveSection(section.id);
              break;
            }
          }
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section ref={sectionRef} id="portfolio" className="relative py-32 md:py-40 overflow-hidden bg-[#0a0a0f]">
      {/* 银白星空背景 - 贴合碎星白羊机仆 */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c14] via-[#0a0a0f] to-[#0d0d16]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(180,180,220,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(200,200,240,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,100,140,0.04),transparent_60%)]" />
        {/* 星光点缀 */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='turbulence' baseFrequency='1.5' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-content mx-auto px-8 relative z-10">
        {/* 顶部音乐横幅 + 导航 */}
        <div className="mb-16">
          {/* 音乐播放横图 */}
          <div className="relative w-full h-32 md:h-40 rounded-2xl overflow-hidden border border-white/10 mb-8 group bg-white/[0.02]">
            <div className="absolute inset-0">
              <img
                src="/images/music-banner.jpg"
                alt="音乐播放横图"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/30 to-transparent" />

            {/* 音乐播放控制 */}
            <div className="absolute inset-0 flex items-center px-8 md:px-12">
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? '暂停音乐' : '播放音乐'}
                className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors duration-300 shadow-xl shadow-black/20"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 md:w-7 md:h-7 text-gray-800 fill-gray-800" />
                ) : (
                  <Play className="w-6 h-6 md:w-7 md:h-7 text-gray-800 fill-gray-800 ml-0.5" />
                )}
              </button>

              {/* 音频波形 - CSS动画 */}
              {isPlaying && (
                <div className="ml-6 flex items-end gap-1 h-8">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="wave-bar w-1 bg-white/70 rounded-full"
                      style={{ animationDelay: `${i * 0.05}s` }}
                    />
                  ))}
                </div>
              )}

              {/* 聆听自己的心声 */}
              <div className="ml-auto text-right">
                <p className="font-display text-lg md:text-xl text-white/80">聆听自己的心声</p>
                <p className="text-xs text-white/40 mt-1">Listen to your inner voice</p>
              </div>
            </div>

            {/* 隐藏的音频元素 */}
            <audio ref={audioRef} loop>
              <source src="/audio/bgm.mp3" type="audio/mpeg" />
            </audio>
          </div>

          {/* 横向导航 - 右上角 */}
          <div className="flex justify-end">
            <div className="flex items-center gap-2 p-1.5 rounded-full bg-white/[0.06] border border-white/[0.08]">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-white/[0.12] text-white shadow-lg shadow-white/5'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-display text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 内容区 */}
        <div className="w-full">
          {/* 人物IP */}
          <div id="character" className="mb-28 scroll-mt-32 section-lazy">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center backdrop-blur-none">
                <Sparkles className="w-5 h-5 text-white/80" />
              </div>
              <div>
                <h3 className="gsap-section-title font-display text-2xl md:text-3xl font-bold text-white">人物IP</h3>
                <p className="gsap-section-desc text-white/40 text-sm mt-1">原创角色设计 · 形象设定</p>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
              <span className="text-xs font-mono text-white/30">CHARACTER DESIGN</span>
            </div>

            <div className="gsap-stagger-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {characterProjects.map((project) => (
                <div key={project.id} className="gsap-stagger-item gsap-reveal-item cursor-pointer group">
                  <BorderGlow
                    glowColor="0 0% 90%"
                    backgroundColor="transparent"
                    borderRadius={16}
                    glowRadius={16}
                    glowIntensity={0.9}
                    coneSpread={50}
                    colors={['#e0e0ff', '#c0c0e0', '#8080c0']}
                    fillOpacity={0.3}
                  >
                    <div className="p-3 bg-white/[0.03] backdrop-blur-none border border-white/[0.06] rounded-[16px]">
                      <div className="gsap-reveal-image relative w-full aspect-[4/5] overflow-hidden rounded-[12px]">
                        {project.thumbnail ? (
                          <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-white/[0.02] border border-dashed border-white/10">
                            <span className="text-white/40 text-sm">敬请期待</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 text-xs font-mono rounded-full border border-white/20 bg-white/10 backdrop-blur-none text-white/90">
                            {project.categoryLabel}
                          </span>
                        </div>
                      </div>
                      <div className="pt-4 px-2 pb-1">
                        <h4 className="font-display text-lg font-bold text-white mb-2">
                          {project.title}
                        </h4>
                        <p className="text-white/55 text-xs mb-0 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </BorderGlow>
                </div>
              ))}
            </div>
          </div>

          {/* 三视图 */}
          <div id="turnaround" className="mb-28 scroll-mt-32 section-lazy">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center backdrop-blur-none">
                <Layers className="w-5 h-5 text-white/80" />
              </div>
              <div>
                <h3 className="gsap-section-title font-display text-2xl md:text-3xl font-bold text-white">三视图</h3>
                <p className="gsap-section-desc text-white/40 text-sm mt-1">角色标准设定 · 多视角展示</p>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
              <span className="text-xs font-mono text-white/30">TURNAROUND SHEET</span>
            </div>

            <div className="gsap-stagger-group space-y-10">
              {turnaroundProjects.map((project) => (
                <div key={project.id} className="gsap-stagger-item gsap-reveal-item relative">
                  <div className="flex flex-col lg:flex-row gap-8 items-start">
                    <div className="lg:w-1/4">
                      <h4 className="font-display text-xl font-bold text-text-primary mb-4">
                        {project.title}
                      </h4>
                      <div className="text-text-secondary text-sm leading-[1.9] whitespace-pre-line">
                        {project.description}
                      </div>
                    </div>

                    <div className="lg:w-3/4 grid grid-cols-3 gap-4 md:gap-6">
                      {project.turnaroundViews?.map((view, viewIndex) => (
                        <BorderGlow
                          key={view.label}
                          glowColor="0 0% 85%"
                          backgroundColor="transparent"
                          borderRadius={12}
                          glowRadius={14}
                          glowIntensity={0.85}
                          coneSpread={50}
                          colors={['#d0d0f0', '#b0b0d0', '#9090b0']}
                          fillOpacity={0.25}
                          className="cursor-pointer group"
                        >
                          <div className="p-4 pb-2 bg-white/[0.03] backdrop-blur-none border border-b-0 border-white/[0.06] rounded-t-[12px]">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-[10px] font-mono text-white/70 tracking-widest">MODEL SHEET</span>
                              <span className="text-[10px] text-white/40 font-mono">0{viewIndex + 1}/03</span>
                            </div>
                            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                              <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                              <span className="text-xs font-bold text-white/90">{view.label}视图</span>
                            </div>
                          </div>
                          <div className="gsap-reveal-image relative aspect-[3/5] overflow-hidden bg-white/[0.02] backdrop-blur-none border-x border-white/[0.06] mx-0">
                            {/* 顶部装饰条 */}
                            <div className="absolute top-0 left-0 right-0 z-10">
                              <div className="flex items-center justify-between px-3 py-2">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-1 h-1 rounded-full bg-white/40" />
                                  <div className="w-1 h-1 rounded-full bg-white/60" />
                                  <div className="w-1 h-1 rounded-full bg-white/40" />
                                </div>
                                <span className="text-[9px] font-mono text-white/30">ARIES-07</span>
                                <div className="w-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                              </div>
                              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-2" />
                            </div>

                            {/* 左侧装饰 */}
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
                              <div className="w-2 h-2 border border-white/20 rotate-45" />
                              <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                              <div className="w-2 h-2 border border-white/20 rotate-45" />
                            </div>

                            {/* 右侧装饰 */}
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
                              <div className="w-2 h-2 border border-white/20 rotate-45" />
                              <div className="w-px h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                              <div className="w-2 h-2 border border-white/20 rotate-45" />
                            </div>

                            {/* 主图 */}
                            <img
                              src={view.image}
                              alt={view.label}
                              className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                            style={{ objectFit: (view.objectFit || 'cover') as React.CSSProperties['objectFit'], objectPosition: view.objectPosition || 'center' }}
                            />

                            {/* 扫描线效果 */}
                            <div className="absolute inset-0 pointer-events-none opacity-20">
                              <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]" />
                            </div>

                            {/* 底部装饰条 */}
                            <div className="absolute bottom-0 left-0 right-0 z-10">
                              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mx-2" />
                              <div className="flex items-center justify-between px-3 py-2">
                                <div className="flex items-center gap-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
                                  <span className="text-[9px] font-mono text-white/40">SCAN ACTIVE</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <span className="text-[9px] font-mono text-white/30">98.7%</span>
                                  <div className="w-10 h-1 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full w-[98%] bg-white/40 rounded-full" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 pb-4 bg-white/[0.03] backdrop-blur-none border border-t-0 border-white/[0.06] rounded-b-[12px]">
                            <div className="flex items-center justify-between text-[10px] font-mono text-white/50 border-t border-white/10 pt-3">
                              <span>FRONT VIEW</span>
                              <span className="text-white/70">SCALE 1:1</span>
                            </div>
                          </div>
                        </BorderGlow>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 衍生品 */}
          <div id="merchandise" className="scroll-mt-32 section-lazy">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center backdrop-blur-none">
                <ShoppingBag className="w-5 h-5 text-white/80" />
              </div>
              <div>
                <h3 className="gsap-section-title font-display text-2xl md:text-3xl font-bold text-white">衍生品</h3>
                <p className="gsap-section-desc text-white/40 text-sm mt-1">周边产品开发 · 商业应用</p>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent ml-4" />
              <span className="text-xs font-mono text-white/30">MERCHANDISE</span>
            </div>

            <div className="gsap-stagger-group grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl">
              {merchandiseProjects.map((project, index) => (
                <div key={project.id} className="gsap-stagger-item gsap-reveal-item cursor-pointer">
                  <BorderGlow
                    glowColor="0 0% 85%"
                    backgroundColor="transparent"
                    borderRadius={12}
                    glowRadius={12}
                    glowIntensity={0.8}
                    coneSpread={50}
                    colors={['#c8c8e8', '#a8a8c8', '#8888a8']}
                    fillOpacity={0.25}
                    className="group"
                  >
                    <div className="p-3 pb-2 bg-white/[0.03] backdrop-blur-none border border-b-0 border-white/[0.06] rounded-t-[12px]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-white/70 tracking-widest">MERCHANDISE</span>
                        <span className="text-[10px] text-white/40 font-mono">0{index + 1}</span>
                      </div>
                    </div>
                    <div className="gsap-reveal-image relative aspect-[3/4] overflow-hidden bg-white/[0.02] backdrop-blur-none border-x border-white/[0.06]">
                      {/* 顶部装饰条 */}
                      <div className="absolute top-0 left-0 right-0 z-10 px-3 py-1.5 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-white/30" />
                          <div className="w-1 h-1 rounded-full bg-white/50" />
                        </div>
                        <span className="text-[9px] font-mono text-white/30">PRODUCT</span>
                        <div className="w-6 h-px bg-white/10" />
                      </div>
                      
                      {/* 主图 */}
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* 渐变遮罩 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                      
                      {/* 底部装饰条 */}
                      <div className="absolute bottom-0 left-0 right-0 z-10 px-3 py-1.5 flex items-center justify-between">
                        <span className="text-[9px] font-mono text-white/30">{project.year}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] font-mono text-white/40">PREVIEW</span>
                          <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 pb-4 pt-3 bg-white/[0.03] backdrop-blur-none border border-t-0 border-white/[0.06] rounded-b-[12px]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                        <h4 className="font-display text-base font-bold text-white/90">
                          {project.title}
                        </h4>
                      </div>
                      <p className="text-white/55 text-xs mb-0 line-clamp-2 leading-relaxed">{project.description}</p>
                    </div>
                  </BorderGlow>
                </div>
              ))}
            </div>
          </div>

          {/* 底部 */}
          <div className="mt-20 pt-12 border-t border-white/10 text-center">
            <p className="text-white/30 text-sm font-mono tracking-widest">
              MORE WORKS COMING SOON
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
