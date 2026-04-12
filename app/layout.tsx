import type { Metadata } from "next";
import { SiteContentProvider } from "@/components/providers/SiteContentProvider";
import WhatsAppWidget from "@/components/chatbot/WhatsAppWidget";

// bootstrap five
import "bootstrap/dist/css/bootstrap.min.css";
// font awesome 6
import "@/public/icons/css/all.min.css";
// modal video
import "yet-another-react-lightbox/styles.css";
// main styles
import "@/public/scss/main.scss";

export const metadata: Metadata = {
  title: "Geo Gas Services London Ltd | Gas, Boiler & Plumbing Experts",
  description:
    "Geo Gas Services London Ltd provides gas, boiler, plumbing and drain call-outs, landlord gas safety checks, and emergency support.",
  keywords: [
    "Geo Gas Services",
    "Gas engineer London",
    "Boiler repair",
    "Landlord gas safety certificate",
    "Emergency plumbing",
    "Drain services",
  ],
  authors: [
    {
      name: "Geo Gas Services London Ltd",
      url: "https://www.geogasservices.uk",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SiteContentProvider>
          {children}
          <WhatsAppWidget />
        </SiteContentProvider>
      </body>
    </html>
  );
}
