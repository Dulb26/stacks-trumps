import { getAnalytics, logEvent } from "firebase/analytics";
import * as React from "react";
import { useLocation } from "react-router-dom";
import firebase from "./firebase";

const appName = import.meta.env.VITE_APP_NAME;

export function usePageEffect(
  options?: Options,
  deps: React.DependencyList = [],
) {
  const location = useLocation();

  // Once the page component was rendered, update the HTML document's title
  React.useEffect(() => {
    const previousTitle = document.title;

    document.title =
      location.pathname === "/"
        ? (options?.title ?? appName)
        : options?.title
          ? `${options.title} - ${appName}`
          : appName;

    return function () {
      document.title = previousTitle;
    };
  }, [
    ...deps /* eslint-disable-line react-hooks/exhaustive-deps */,
    location,
    options?.title,
  ]);

  // Send "page view" event to Google Analytics
  React.useEffect(() => {
    if (!(options?.trackPageView === false) && firebase.app) {
      try {
        logEvent(getAnalytics(), "page_view", {
          page_title: options?.title ?? appName,
          page_path: `${location.pathname}${location.search}`,
        });
      } catch (error) {
        console.warn("Failed to log page view:", error);
      }
    }
  }, [location, options?.title, options?.trackPageView]);
}

type Options = {
  title?: string;
  /** @default true */
  trackPageView?: boolean;
};
