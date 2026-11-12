"use client";

import dynamic from "next/dynamic";

/** Loads the 3D globe only in the browser, after the page is interactive. */
export const GlobeLazy = dynamic(() => import("./Globe"), { ssr: false, loading: () => null });
