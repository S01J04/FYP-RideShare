import React from "react";

export default function App() {
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-200 lg:text-left">
      {/* Social Media Section */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-neutral-200 dark:border-neutral-600 p-6">
        <div className="mb-4 md:mb-0">
          <span>Get connected with us on social networks:</span>
        </div>
        <div className="flex space-x-4">
          {/* Social Icons */}
          {[
            { href: "#", icon: "facebook" },
            { href: "#", icon: "twitter" },
            { href: "#", icon: "google" },
            { href: "#", icon: "instagram" },
            { href: "#", icon: "linkedin" },
            { href: "#", icon: "github" },
          ].map((social, idx) => (
            <a
              key={idx}
              href={social.href}
              className="text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {/* Replace below paths with respective social media SVG paths */}
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Footer Content */}
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Section 1 */}
          <div>
            <h6 className="mb-4 text-lg font-semibold uppercase">TW Elements</h6>
            <p>
              Organize your footer content. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit.
            </p>
          </div>
          {/* Section 2 */}
          <div>
            <h6 className="mb-4 text-lg font-semibold uppercase">Products</h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Angular
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  React
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Vue
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Laravel
                </a>
              </li>
            </ul>
          </div>
          {/* Section 3 */}
          <div>
            <h6 className="mb-4 text-lg font-semibold uppercase">Useful Links</h6>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Orders
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Help
                </a>
              </li>
            </ul>
          </div>
          {/* Section 4 */}
          <div>
            <h6 className="mb-4 text-lg font-semibold uppercase">Contact</h6>
            <ul className="space-y-2">
              <li>New York, NY 10012, US</li>
              <li>info@example.com</li>
              <li>+ 01 234 567 88</li>
              <li>+ 01 234 567 89</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-neutral-200 dark:bg-neutral-700 text-center py-4">
        <p>
          © 2023 Copyright:{" "}
          <a
            href="https://tw-elements.com/"
            className="text-neutral-800 dark:text-neutral-300 font-semibold hover:underline"
          >
            TW Elements
          </a>
        </p>
      </div>
    </footer>
  );
}
