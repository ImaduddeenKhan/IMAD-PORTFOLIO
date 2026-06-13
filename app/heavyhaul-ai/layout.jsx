/**
 * Case study page layout — loads Playfair Display for the editorial design.
 * This layout wraps only the /heavyhaul-ai route and adds the serif font
 * without affecting the rest of the site.
 */
export default function CaseStudyLayout({ children }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Inter:wght@400;500;600;700&display=swap"
      />
      {children}
    </>
  );
}
