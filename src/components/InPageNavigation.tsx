import { useEffect, useRef, useState } from "react";

interface InPageNavigationProps {
  routes: string[];
  defaultHidden?: string[];
  defaultActiveIndex?: number;
  children?: React.ReactNode;
}

export const InPageNavigation: React.FC<InPageNavigationProps> = ({
  routes,
  defaultHidden = [],
  defaultActiveIndex = 0,
  children,
}) => {
  const activeLineRef = useRef<HTMLHRElement | null>(null);
  const activeTabRef = useRef<HTMLButtonElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const [inPageNavIndex, setInPageNavIndex] =
    useState<number>(defaultActiveIndex);

  const changePageState = (btn: HTMLButtonElement, i: number) => {
    if (activeLineRef.current && navContainerRef.current) {
      const btnRect = btn.getBoundingClientRect();
      const containerRect = navContainerRef.current.getBoundingClientRect();

      const relativeLeft = btnRect.left - containerRect.left;
      activeLineRef.current.style.width = `${btnRect.width}px`;
      activeLineRef.current.style.left = `${relativeLeft}px`;
      setInPageNavIndex(i);
    }
  };

  useEffect(() => {
    if (activeTabRef.current) {
      changePageState(activeTabRef.current, defaultActiveIndex);
    }
  }, [defaultActiveIndex]);

  return (
    <>
      <div className="relative mb-8 bg-base-100 border-b border-base-300 flex flex-col overflow-x-auto">
        <div className="relative" ref={navContainerRef}>
          <div className="flex px-4">
            {routes.map((route: string, i: number) => (
              <div key={i} className="relative flex-1 text-center">
                <button
                  ref={i === defaultActiveIndex ? activeTabRef : null}
                  className={`w-full px-8 py-6 capitalize transition-colors text-base-content/80
                    ${defaultHidden.includes(route) ? " md:hidden" : ""}
                    ${
                      inPageNavIndex === i
                        ? "!text-base-content font-semibold"
                        : "hover:text-base-content/100"
                    }`}
                  onClick={(e) => changePageState(e.currentTarget, i)}
                >
                  {route}
                </button>
              </div>
            ))}
          </div>
          <hr
            ref={activeLineRef}
            className="absolute bottom-0 h-1 bg-primary duration-300 ease-in-out"
          />
        </div>
      </div>
      {Array.isArray(children) ? children[inPageNavIndex] : children}
    </>
  );
};
