import { useState, useEffect } from "react";
import {useDebounce} from 'react-use';

export  const useResponsive = () => {
  // screen resolutions
  const [state, setState] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    // update the state on the initial load
    onResizeHandler();

    // assign the event
    Setup();

    return () => {
      // remove the event
      Cleanup();
    };
  }, []);

  // update the state on window resize
  const onResizeHandler = () => {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth <= 990;
    const isDesktop = window.innerWidth > 990;

    setState({ isMobile, isTablet, isDesktop });
  };



  // add event listener
  const Setup = () => {
    window.addEventListener("resize", onResizeHandler, false);
  };

  // remove the listener
  const Cleanup = () => {
    window.removeEventListener("resize", onResizeHandler, false);
  };

  return state;
};