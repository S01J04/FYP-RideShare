import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#EDEDED] dark:bg-gray-900 dark:text-white lg:text-left">
      {/* Social Media Section */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-neutral-200 dark:border-neutral-600 p-6">
        <div className="mb-4 md:mb-0">
          <span>Connect with us on social media:</span>
        </div>
        <div className="flex space-x-4">
          {[
            { href: "#", icon: "facebook" },
            { href: "#", icon: "twitter" },
            { href: "#", icon: "instagram" },
            { href: "#", icon: "linkedin" },
          ].map((social, idx) => (
            <a key={idx} href={social.href} className="hover:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Footer Content */}
      <div className="mx-6 py-10 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h6 className="mb-4 text-lg font-semibold uppercase">About RideShare</h6>
            <p>Your trusted intercity rideshare platform, making travel easier and affordable for everyone.</p>
          </div>
          {/* Services Section */}
          <div>
            <h6 className="mb-4 text-lg font-semibold uppercase">Our Services</h6>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Find a Ride</a></li>
              <li><a href="#" className="hover:underline">Offer a Ride</a></li>
              <li><a href="#" className="hover:underline">Safety Guidelines</a></li>
              <li><a href="#" className="hover:underline">Support</a></li>
            </ul>
          </div>
          {/* Useful Links Section */}
          <div>
            <h6 className="mb-4 text-lg font-semibold uppercase">Useful Links</h6>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">How It Works</a></li>
              <li><a href="#" className="hover:underline">Pricing</a></li>
              <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
          {/* Contact Section */}
          <div>
            <h6 className="mb-4 text-lg font-semibold uppercase">Contact Us</h6>
            <ul className="space-y-2">
              <li>RideShare Uet Mardan charsada chowk, Mardan, Pakistan</li>
              <li>Email: support@rideshare.com</li>
              <li>Phone: +92 320 99 34 942</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-800 text-center text-white py-3">
        <p>© {new Date().getFullYear()} RideEase. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
