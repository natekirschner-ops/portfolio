"use client";

import Link from "next/link";

export const ProjectNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[300] flex items-center px-6 py-5">
      <Link
        href="/"
        className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="text-sm font-semibold">Back</span>
      </Link>
    </nav>
  );
};
