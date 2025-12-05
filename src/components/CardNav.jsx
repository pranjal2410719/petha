'use client';
import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import { supabase } from '../lib/supabase';
import { getNavigationItems } from '../utils/navigation';

const CardNav = ({
  className = '',
  ease = 'power3.out',
  baseColor = 'rgba(249, 250, 251, 0.95)',
  menuColor = '#000',
  buttonBgColor = '#111',
  buttonTextColor = '#fff'
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  
  const items = getNavigationItems(!!user);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;
        const buttonHeight = 60; // Add height for mobile button

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + buttonHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    const validCards = cardsRef.current.slice(0, 3).filter(Boolean);
    
    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(validCards, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });

    tl.to(validCards, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    const handleScroll = () => {
      if (isExpanded) {
        const tl = tlRef.current;
        if (tl) {
          setIsHamburgerOpen(false);
          tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
          tl.reverse();
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  const [isDashboard, setIsDashboard] = useState(false);

  useEffect(() => {
    setIsDashboard(window.location.pathname === '/dashboard');
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        setUser(user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    getUser();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      setLoading(false);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div
      className={`card-nav-container fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-[99] top-[1.2em] md:top-[2em] ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height]`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: menuColor || '#000' }}
          >
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line w-[30px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
              } group-hover:opacity-75`}
            />
          </div>

          <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
            <a href="/" className="text-xl font-semibold cursor-pointer">
              <span className="text-blue-600 font-bold">DOPO</span>
            </a>
          </div>

          {loading ? (
            <div className="hidden md:flex items-center px-4 h-full">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : isDashboard && user ? (
            <button
              onClick={handleLogout}
              className="card-nav-cta-button hidden md:inline-flex border-0 rounded-[calc(0.75rem-0.2rem)] px-4 items-center h-full font-medium cursor-pointer transition-colors duration-300"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            >
              Logout
            </button>
          ) : (
            <a
              href={user ? "/dashboard" : "/auth"}
              className="card-nav-cta-button hidden md:inline-flex border-0 rounded-[calc(0.75rem-0.2rem)] px-4 items-center h-full font-medium cursor-pointer transition-colors duration-300"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            >
              {user ? "Dashboard" : "Get Started"}
            </a>
          )}
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          } md:flex-row md:items-end md:gap-[12px]`}
          aria-hidden={!isExpanded}
        >
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%] cursor-pointer"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
              onClick={() => {
                if (item.cardHref) {
                  const isImplemented = [
                    '/about/company',
                    '/projects/discover', 
                    '/projects/new-proposal',
                    '/projects/top-growing',
                    '/contact',
                    '/dashboard',
                    '/auth'
                  ].includes(item.cardHref);
                  
                  if (isImplemented) {
                    window.location.href = item.cardHref;
                  } else {
                    alert('Coming Soon!');
                  }
                }
              }}
            >
              <div className="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-[2px]">
                {item.links?.map((lnk, i) => {
                  return (
                    <a
                      key={`${lnk.label}-${i}`}
                      className="nav-card-link inline-flex items-center gap-[6px] no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"
                      href={lnk.href === '#' ? '#' : lnk.href}
                      onClick={lnk.href === '#' ? (e) => { e.preventDefault(); alert('Coming Soon!'); } : undefined}
                      aria-label={lnk.ariaLabel}
                    >
                      <GoArrowUpRight className="nav-card-link-icon shrink-0" aria-hidden="true" />
                      {lnk.label}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
          
          {/* Mobile CTA Button */}
          <div className="md:hidden mt-2">
            {loading ? (
              <div className="flex items-center justify-center py-3">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : isDashboard && user ? (
              <button
                onClick={handleLogout}
                className="w-full py-3 px-4 rounded-lg font-medium transition-colors duration-300"
                style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
              >
                Logout
              </button>
            ) : (
              <a
                href={user ? "/dashboard" : "/auth"}
                className="block w-full py-3 px-4 rounded-lg font-medium text-center transition-colors duration-300"
                style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
              >
                {user ? "Dashboard" : "Get Started"}
              </a>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CardNav;