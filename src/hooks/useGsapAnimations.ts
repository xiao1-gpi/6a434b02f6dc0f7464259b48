import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 全局滚动优化：减少ScrollTrigger的计算频率
ScrollTrigger.config({
  ignoreMobileResize: true,
  limitCallbacks: true,
});

// 使用requestAnimationFrame节流滚动
gsap.ticker.lagSmoothing(500, 33);

const EASE = {
  silk: 'power2.inOut',
  reveal: 'power2.out',
  entrance: 'expo.out',
  smooth: 'power2.out',
  precise: 'power3.out',
  slow: 'power1.inOut',
};

export function useOpeningAnimation(
  containerRef: React.RefObject<HTMLDivElement | null>,
  overlayRef: React.RefObject<HTMLDivElement | null>
) {
  useLayoutEffect(() => {
    if (!containerRef.current || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(overlayRef.current, {
        scaleY: 0,
        transformOrigin: 'center center',
        duration: 1.6,
        ease: EASE.reveal,
        force3D: true,
      });

      tl.from('.gsap-nav', {
        y: -80,
        opacity: 0,
        duration: 1.2,
        ease: EASE.entrance,
        force3D: true,
      }, '-=1.1');

      tl.from('.gsap-hero-title-1', {
        y: 140,
        opacity: 0,
        scaleY: 1.8,
        duration: 1.6,
        ease: EASE.entrance,
        force3D: true,
      }, '-=0.9');

      tl.from('.gsap-hero-title-2', {
        y: 90,
        opacity: 0,
        duration: 1.4,
        ease: EASE.reveal,
        force3D: true,
      }, '-=1.1');

      tl.from('.gsap-hero-profile', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: EASE.smooth,
        force3D: true,
      }, '-=0.7');

      tl.from('.gsap-hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: EASE.smooth,
        force3D: true,
      }, '-=0.6');

      tl.from('.gsap-hero-action', {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: EASE.smooth,
        force3D: true,
        onStart: () => {
          // "03"数字进场时立马触发视频加载
          window.dispatchEvent(new Event('opening-animation-complete'));
        },
      }, '-=0.55');

      tl.from('.gsap-video-control', {
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: EASE.smooth,
        force3D: true,
      }, '-=0.5');

      tl.from('.gsap-scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: EASE.smooth,
        force3D: true,
        onComplete: () => {
          gsap.set('.gsap-scroll-indicator', { clearProps: 'transform' });
        },
      }, '-=0.4');

      // 最后一步：发光条从左扫到右，扫完进入CSS循环
      tl.fromTo('.gsap-nav-light', {
        x: '-100%',
        opacity: 0,
      }, {
        x: '200%',
        opacity: 1,
        duration: 1.2,
        ease: EASE.smooth,
        force3D: true,
        onComplete: () => {
          // 之后交给CSS循环动画
          document.querySelector('.gsap-nav-light')?.classList.add('nav-light-loop');
        },
      }, '-=0.3');
    }, containerRef);

    return () => ctx.revert();
  }, []);
}

export function useSectionTitleAnimation(sectionRef: React.RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const titles = gsap.utils.toArray<HTMLElement>('.gsap-section-title');
      titles.forEach((title) => {
        gsap.from(title, {
          y: 140,
          opacity: 0,
          duration: 1.8,
          ease: EASE.entrance,
          force3D: true,
          scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
      });

      const descs = gsap.utils.toArray<HTMLElement>('.gsap-section-desc');
      descs.forEach((desc) => {
        gsap.from(desc, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: EASE.smooth,
          delay: 0.3,
          force3D: true,
          scrollTrigger: {
            trigger: desc,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
}

export function useCardStaggerAnimation(sectionRef: React.RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>('.gsap-stagger-group');
      groups.forEach((group) => {
        const cards = group.querySelectorAll('.gsap-stagger-item');
        gsap.from(cards, {
          y: 100,
          opacity: 0,
          scale: 0.95,
          duration: 1.5,
          ease: EASE.entrance,
          stagger: 0.2,
          force3D: true,
          scrollTrigger: {
            trigger: group,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
}

export function useImageRevealAnimation(sectionRef: React.RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // 以每个IP条目为触发点：滚动到该条目时才触发其内部图片揭幕
      const items = gsap.utils.toArray<HTMLElement>('.gsap-reveal-item');
      items.forEach((item) => {
        const images = item.querySelectorAll<HTMLElement>('.gsap-reveal-image');
        if (!images.length) return;

        const st = {
          trigger: item,
          start: 'top 78%',
          toggleActions: 'play none none none',
          once: true,
        };

        images.forEach((container) => {
          const img = container.querySelector('img');

          gsap.fromTo(container, {
            clipPath: 'inset(100% 0% 0% 0%)',
          }, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 2.2,
            ease: EASE.reveal,
            delay: 0.5,
            scrollTrigger: st,
          });

          if (img) {
            gsap.fromTo(img, {
              scale: 1.15,
            }, {
              scale: 1,
              duration: 2.6,
              ease: EASE.silk,
              delay: 0.5,
              force3D: true,
              scrollTrigger: st,
            });
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
}

export function useSectionAnimations(sectionRef: React.RefObject<HTMLElement | null>) {
  useSectionTitleAnimation(sectionRef);
  useCardStaggerAnimation(sectionRef);
  useImageRevealAnimation(sectionRef);
}
