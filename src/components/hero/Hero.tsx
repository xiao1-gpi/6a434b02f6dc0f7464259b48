import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowDown, Play, Pause } from 'lucide-react';
import { profile } from '@/data/profile';

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [startVideoLoad, setStartVideoLoad] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleScroll = () => {
    const element = document.querySelector('#portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  // 监听开场动画完成事件，文字出现完视频立马接上
  useEffect(() => {
    const handleComplete = () => setStartVideoLoad(true);
    window.addEventListener('opening-animation-complete', handleComplete);
    return () => window.removeEventListener('opening-animation-complete', handleComplete);
  }, []);

  useEffect(() => {
    if (!startVideoLoad || !videoRef.current) return;

    const video = videoRef.current;

    const handleLoadedData = () => {
      setVideoLoaded(true);
      setVideoError(false);
    };

    const handleError = () => {
      setVideoError(true);
      setVideoLoaded(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [startVideoLoad]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* 纯黑背景 */}
      <div className="absolute inset-0 z-0 bg-[#0A0A0A]" />

      {/* 视频背景 - 全屏（文字动画结束后才开始加载） */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-1000 ${
          videoLoaded && !videoError ? 'opacity-60' : 'opacity-0'
        }`}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className="w-full h-full object-cover"
        >
          {startVideoLoad && (
            <source src="/videos/ponyo-and-sosuke.mp4" type="video/mp4" />
          )}
        </video>
      </div>

      {/* 渐变遮罩层 - 保证文字可读性 */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* 视频播放控制按钮 - 仅图标 */}
      <div className="gsap-video-control absolute top-24 right-4 z-20 hidden md:block">
        <button
          onClick={toggleVideo}
          className="flex items-center justify-center p-3 rounded-full border border-white/20 bg-black/60 hover:bg-black/80 hover:border-accent/50 transition-all duration-300 cursor-pointer"
          title={isPlaying ? '暂停视频' : '播放视频'}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 text-white/90" />
          ) : (
            <Play className="w-4 h-4 text-white/90" />
          )}
        </button>
      </div>

      {/* 内容层 - 以标题为基准左对齐 */}
      <div className="max-w-content mx-auto px-8 relative z-10 w-full">
        {/* 超级大标题 */}
        <div className="mb-8 overflow-hidden">
          <h1 className="font-display font-black leading-[0.85] tracking-tight hero-text-shadow">
            <span className="gsap-hero-title-1 block text-[clamp(3.5rem,10vw,8rem)] text-accent">
              视觉
            </span>
            <span
              className="gsap-hero-title-2 block text-[clamp(3rem,9vw,7rem)]"
              style={{
                WebkitTextStroke: '2px rgba(255,255,255,0.6)',
                WebkitTextFillColor: 'transparent',
              }}
            >
              设计师
            </span>
          </h1>
        </div>

        {/* 头像个人信息 */}
        <div className="gsap-hero-profile flex flex-wrap items-center gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-accent/50">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover object-center"
                  decoding="async"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent border-2 border-black" />
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-white hero-text-shadow">
                {profile.name}
              </p>
              <p className="text-text-tertiary text-sm">
                {profile.subtitle}
              </p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-12 bg-white/20" />

          <div>
            <p className="text-text-secondary text-sm">设计不止</p>
            <p className="font-display text-xl font-bold text-accent">
              装饰。
            </p>
          </div>
        </div>

        {/* 副标题介绍 */}
        <p className="gsap-hero-subtitle text-text-secondary text-base md:text-lg mb-6 max-w-xl leading-relaxed hero-text-shadow">
          {profile.title}
        </p>

        {/* 数据和按钮 */}
        <div className="gsap-hero-action flex flex-col sm:flex-row items-start sm:items-end gap-8">
          <div>
            <span className="font-display text-6xl md:text-7xl font-bold text-accent leading-none">
              03
            </span>
          </div>
          <button
            onClick={handleScroll}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-semibold hover:bg-accent hover:text-white transition-all duration-300"
          >
            浏览作品
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 滚动指示器 */}
      <div
        className="gsap-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 cursor-pointer"
        onClick={handleScroll}
      >
        <span className="text-[10px] text-text-tertiary font-mono tracking-[0.3em]">
          向下滚动
        </span>
        <ArrowDown className="w-4 h-4 text-text-tertiary animate-bounce" />
      </div>
    </section>
  );
}
