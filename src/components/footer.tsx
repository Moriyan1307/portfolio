import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-surface/20 mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="Aaryan Mori Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-semibold text-lg text-foreground">
                Aaryan Mori
              </span>
            </div>
            <p className="text-body max-w-md">
              Building the future, one line of code at a time.
            </p>
          </div>
        </div>

        <div className="border-t border-border/40 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-secondary text-sm">
            © {new Date().getFullYear()} Aaryan Mori. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm text-secondary">
            <Link
              href="/privacy"
              className="hover:text-foreground transition-apple"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-foreground transition-apple"
            >
              Terms
            </Link>
            <span>MIT Licensed</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
