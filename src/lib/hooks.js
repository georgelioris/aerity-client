import { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { ResponsiveContext } from 'grommet';

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  });

  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

export function useNodeSize() {
  const [nodeSize, setNodeSize] = useState({
    width: undefined,
    height: undefined
  });

  const size = useContext(ResponsiveContext);

  return [
    useCallback(
      (node) => {
        if ((node && size) !== null) setNodeSize(node.getBoundingClientRect());
      },
      [size]
    ),
    nodeSize
  ];
}

export function useHideOnScroll() {
  const [hidden, setHidden] = useState(true);
  const scroll = useRef(null);

  const handleScroll = () => {
    const prev = scroll.current;
    const curr = window.pageYOffset;

    if (prev > curr) setHidden(false);
    else setHidden(true);

    scroll.current = curr;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return hidden;
}

export default useHideOnScroll;
