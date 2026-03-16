import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FOOTER_SECTIONS, SOCIAL_LINKS, SITE_NAME } from "@/lib/app.settings";

const SOCIAL_ICONS: Record<string, LucideIcon> = { Facebook, Instagram, Twitter };

export default function Footer() {
  return (
    <footer className="bg-[#171717] text-[#F5F5F5] pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold tracking-wide mb-4 uppercase">
                {section.title}
              </h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-lg font-semibold tracking-wide mb-4">CONNECT</h3>
            <div className="flex space-x-4 mb-6">
              {SOCIAL_LINKS.map((link) => {
                const Icon = SOCIAL_ICONS[link.label];
                return Icon ? (
                  <a key={link.label} href={link.href}>
                    <span className="sr-only">{link.label}</span>
                    <Icon />
                  </a>
                ) : null;
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-300 text-center text-sm">
          <p>Copyright {new Date().getFullYear()} {SITE_NAME} | All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}