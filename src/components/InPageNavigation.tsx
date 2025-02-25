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
  const [inPageNavIndex, setInPageNavIndex] =
    useState<number>(defaultActiveIndex);

  const changePageState = (btn: HTMLButtonElement, i: number) => {
    if (activeLineRef.current && btn) {
      const { offsetWidth, offsetLeft } = btn;
      activeLineRef.current.style.width = `${offsetWidth}px`;
      activeLineRef.current.style.left = `${offsetLeft}px`;
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
      <div className="relative mb-8 px-6 bg-white border-b border-gray-50 flex flex-col overflow-x-auto">
        <div className="relative">
          {" "}
          <div className="flex">
            {routes.map((route: string, i: number) => (
              <button
                ref={i === defaultActiveIndex ? activeTabRef : null}
                key={i}
                className={
                  `p-4 px-5 capitalize ` +
                  (inPageNavIndex === i ? "text-black " : "text-gray-500 ") +
                  (defaultHidden.includes(route) ? "md:hidden" : "")
                }
                onClick={(e) => {
                  changePageState(e.currentTarget, i);
                }}
              >
                {route}
              </button>
            ))}
          </div>
          <hr
            ref={activeLineRef}
            className="absolute bottom-0 h-1 bg-blue-500 duration-300"
          />
        </div>
      </div>
      {Array.isArray(children) ? children[inPageNavIndex] : children}
    </>
  );
};
