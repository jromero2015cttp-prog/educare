import Link from "next/link";
import { GraduationCap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold text-white">Educare</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/courses" className="hover:text-white transition-colors">
              Courses
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
          </nav>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Educare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
