function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  const links = [
    { label: "email", href: "mailto:aaryanmori@gmail.com" },
    {
      label: "resume",
      href: "https://drive.google.com/file/d/1Sqy7fmfdszvX7LpNp3-MiYLMSSLIXsSW/view",
    },
    {
      label: "portfolio",
      href: "https://drive.google.com/file/d/1xFkb6uapphlO282XGa5yWxxl1GCVDuV8/view",
    },
    { label: "github", href: "https://github.com/Moriyan1307" },
    {
      label: "linkedIn",
      href: "https://www.linkedin.com/in/aaryan-mori-334098192/",
    },
    { label: "company", href: "https://privilon.tech/" },

    { label: "rss", href: "/rss" },
  ];

  return (
    <footer className="mb-16">
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
        {links.map((link) => (
          <li key={link.label}>
            <a
              className="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href={link.href}
            >
              <ArrowIcon />
              <p className="ml-2 h-7">{link.label}</p>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-neutral-600 dark:text-neutral-300">
        © {new Date().getFullYear()} MIT Licensed
      </p>
    </footer>
  );
}
