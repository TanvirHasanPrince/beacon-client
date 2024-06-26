"use client";
import { authKey } from "@/constants/storageKey";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { role } = getUserInfo() as any;
  const router = useRouter();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (event.target && (event.target as HTMLElement).closest("nav")) {
        return;
      }
      setIsOpen(false);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-pink-100 to-blue-100 dark:bg-gray-800">
      <div className="container px-6 py-4 mx-auto bg-gradient-to-r from-pink-100 to-blue-100">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <Link href="/">
              <h1 className="text-red-900">Beacon</h1>
            </Link>

            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {!isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div
            className={`mt-2 overflow-hidden absolute inset-x-0 z-20 w-72 px-6 py-4 transition-all duration-300 ease-in-out bg-gradient-to-r from-pink-100 to-blue-100 dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
              isOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-full"
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:space-x-4">
              {role === "admin" && (
                <>
                  <Link
                    href="/admin/myProfile"
                    className="px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My profile
                  </Link>
                  <Link
                    href="/admin/addAdmin"
                    className="px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Add Admin
                  </Link>
                </>
              )}
              {role === "doctor" && (
                <>
                  <Link
                    href="/doctor/myProfile"
                    className="px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My profile
                  </Link>
                  <Link
                    href="/doctor/myConsultations"
                    className="px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My consultations
                  </Link>
                  <button
                    onClick={logOut}
                    className="px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-md bg-gradient-to-r from-violet-300 to-fuchsia-300 dark:text-gray-200 hover:bg-fuchsia-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </>
              )}
              {role === "member" && (
                <>
                  <Link
                    href="/member/myProfile"
                    className="px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/member/events/myEvents"
                    className="px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Events
                  </Link>
                  <Link
                    href="/member/events/subscribedEvents"
                    className="px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Subscribed Events
                  </Link>
                  <Link
                    href="/member/events/allEvents"
                    className="px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Browse Events
                  </Link>
                  <Link
                    href="/member/journals/myJournals"
                    className="px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    My Journals
                  </Link>
                  <Link
                    href="/member/journals/addJournal"
                    className="px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Add Journal
                  </Link>
                  <Link
                    href="/member/specialists"
                    className="px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Specialists
                  </Link>
                  <Link
                    href="/member/consultations/myConsultations"
                    className="px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Consultations
                  </Link>
                  <Link
                    href="/member/selfCare"
                    className="px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Self-care
                  </Link>
                  <Link
                    href="/member/kindnessChallenge"
                    className="px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-md dark:text-gray-200 hover:bg-pink-100 dark:hover:bg-gray-700"
                  >
                    Kindness Challenge
                  </Link>
                  <button
                    onClick={logOut}
                    className="px-3 py-2 mt-8 text-gray-700 transition-colors duration-300 transform rounded-md bg-gradient-to-r from-violet-300 to-fuchsia-300 dark:text-gray-200 hover:bg-fuchsia-100 dark:hover:bg-gray-700 lg:mt-0"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {!role && (
              <div className="flex items-center mt-4 lg:mt-0">
                <Link href="/login">
                  <button className="px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-md bg-gradient-to-r from-violet-300 to-fuchsia-300 dark:text-gray-200 hover:bg-fuchsia-100 dark:hover:bg-gray-700">
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
