/**
 * Freelancing page layout — loads Outfit (bold display) + Inter (body)
 * for the kristi.digital-inspired design system.
 * This layout wraps only the /freelancing_work route.
 */
export default function CaseStudyLayout({ children }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Mono:wght@500&display=swap"
      />
      {children}
    </>
  );
}
