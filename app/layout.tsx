import type { Metadata } from "next";
import { SiteContentProvider } from "@/components/providers/SiteContentProvider";
import InternalLinkNavigationFix from "@/components/layout/InternalLinkNavigationFix";
import CompetitionModal from "@/components/layout/CompetitionModal";
import WhatsAppWidget from "@/components/chatbot/WhatsAppWidget";
import { getSiteContent } from "@/lib/siteContent";

// bootstrap five
import "bootstrap/dist/css/bootstrap.min.css";
// font awesome 6
import "@/public/icons/css/all.min.css";
// modal video
import "yet-another-react-lightbox/styles.css";
// main styles
import "@/public/scss/main.scss";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  const siteUrl = content.global.siteUrl;
  const companyName = content.global.companyName;
  const title = `${companyName} | Gas, Boiler & Plumbing Experts`;
  const description =
    `${companyName} provides gas, boiler, plumbing, drainage, building works and carpentry support, landlord gas safety checks, and emergency response.`;

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: [
      "Geo Gas Services",
      "Gas engineer London and Sussex",
      "Boiler repair",
      "Landlord gas safety certificate",
      "Emergency plumbing",
      "Drain services",
      "Building works",
      "Carpentry services",
    ],
    authors: [
      {
        name: companyName,
        url: siteUrl,
      },
    ],
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: siteUrl,
      type: "website",
      siteName: companyName,
    },
    twitter: {
      card: "summary",
      title,
      description:
        "Gas, boiler, plumbing, drainage, building works and carpentry support across London and Sussex.",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getSiteContent();

  return (
    <html lang="en">
      <body>
        <SiteContentProvider initialContent={content}>
          <InternalLinkNavigationFix />
          {children}
          <CompetitionModal />
          <WhatsAppWidget />
        </SiteContentProvider>
      </body>
    </html>
  );
}
