import Link from "next/link";
import {
  contractPackages,
  packageBenefits,
} from "@/data/contractsContent";

type RateBand = {
  period: string;
  price: string;
};

type HourlyCategory = {
  title: string;
  rates: RateBand[];
};

type Item = {
  label: string;
  value: string;
};

const hourlyCategories: HourlyCategory[] = [
  {
    title: "Gas & Boiler Works",
    rates: [
      { period: "7am - 6pm", price: "£100 + VAT / hour" },
      { period: "6pm - 12am", price: "£155 + VAT / hour" },
      { period: "12am - 7am", price: "£195 + VAT / hour" },
    ],
  },
  {
    title: "Plumbing",
    rates: [
      { period: "7am - 6pm", price: "£100 + VAT / hour" },
      { period: "6pm - 12am", price: "£145 + VAT / hour" },
      { period: "12am - 6am", price: "£185 + VAT / hour" },
    ],
  },
  {
    title: "Drains",
    rates: [
      { period: "7am - 6pm", price: "£135 + VAT / hour" },
      { period: "6pm - 12am", price: "£180 + VAT / hour" },
      { period: "12am - 7am", price: "£200 + VAT / hour" },
    ],
  },
];

const serviceItems: Item[] = [
  { label: "Boiler servicing (7am - 6pm)", value: "£100" },
  { label: "Boiler servicing (6pm - 12am)", value: "£140" },
  {
    label: "Landlord gas inspection (1 boiler + 1 cooker/hob, 7am - 6pm)",
    value: "£80",
  },
  {
    label: "Landlord gas inspection (1 boiler + 1 cooker/hob, 6pm - 12am)",
    value: "£100",
  },
  { label: "Extra appliance", value: "£40 per appliance" },
  { label: "Landlord bundle (7am - 6pm)", value: "£175" },
  { label: "Landlord bundle (6pm - 12am)", value: "£235" },
];

const installationItems: Item[] = [
  { label: "Combination boiler like-for-like swap", value: "From £2300 + VAT" },
  { label: "Boiler conversions", value: "From £2800+" },
  { label: "System & heat-only boiler installs", value: "From £2500" },
];

const salesItems: Item[] = [
  { label: "Carbon monoxide detector", value: "£25 + VAT" },
  {
    label: "Smart controls upgrade (one zone)",
    value: "£340 (+£100 per extra zone)",
  },
  { label: "Thermostatic radiator valve", value: "£40 + VAT per valve" },
  { label: "Radiator upgrade labour", value: "From £80 + VAT per radiator" },
  { label: "New pump upgrade (Grundfos UPS3)", value: "From £320 fitted" },
  { label: "New pump with valves", value: "£350 fitted" },
  { label: "Power flush (up to 10 radiators)", value: "£500 + VAT" },
  { label: "Power flush (10 - 20 radiators)", value: "£700 + VAT" },
  { label: "Power flush (20 - 30 radiators)", value: "£850 + VAT" },
  { label: "Add inhibitor to system", value: "£45 + VAT" },
  { label: "Cylinder upgrades", value: "From £800 + VAT" },
  { label: "Magnetic system filter upgrade", value: "From £200+" },
  { label: "Scale reducer system upgrade", value: "From £80+" },
];

const electricalItems: Item[] = [
  { label: "Domestic EICR certification", value: "From £180+" },
  { label: "Commercial EICR certification", value: "From £240+" },
];

const calloutRules = [
  "Parking, ULEZ and congestion charges are included in listed call-out rates.",
  "Minimum one hour, then charged in 15-minute intervals.",
  "Gas, plumbing and drain hourly rates vary by time band.",
];

interface PricingListingProps {
  compact?: boolean;
}

const PriceGrid = ({ items }: { items: Item[] }) => (
  <div className="pricing__listing-grid">
    {items.map((item) => (
      <div className="pricing__listing-grid-item" key={item.label}>
        <h6>{item.label}</h6>
        <span>{item.value}</span>
      </div>
    ))}
  </div>
);

const PricingListing = ({ compact = false }: PricingListingProps) => {
  return (
    <section
      className={(compact ? "pt-0 " : "") + "pricing__listing section-padding"}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="pricing__listing-title">
              <h2>Geo Gas Current Pricing</h2>
              <p>
                All parking charges, ULEZ and congestion charges are included.
                Minimum one hour, then billed in 15-minute intervals.
              </p>
            </div>
            <div className="pricing__listing-note">
              <i className="fa-solid fa-circle-info"></i>
              <p>
                These rates are kept up to date by the Geo Gas team and may change
                as operating costs, access requirements and parts pricing change.
              </p>
              <Link href="/info/price.txt" target="_blank" rel="noreferrer">
                Open Live Price File
              </Link>
            </div>
          </div>
        </div>

        {!compact && (
          <div className="row mt-30">
            <div className="col-xl-7 lg-mb-30">
              <div className="pricing__listing-summary">
                <h3>Call-Out Pricing Summary</h3>
                <ul>
                  {calloutRules.map((rule) => (
                    <li key={rule}>
                      <i className="fa-solid fa-check"></i>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="pricing__listing-contract">
                <div className="pricing__listing-contract-head">
                  <div>
                    <span>Brochure Contract Pricing</span>
                    <h4>Home Service Contracts From £19 / Month</h4>
                  </div>
                  <strong>{contractPackages[0]?.monthlyFrom ?? "£19 / month"}</strong>
                </div>
                <ul>
                  {packageBenefits.slice(0, 4).map((benefit) => (
                    <li key={benefit}>
                      <i className="fa-solid fa-shield-check"></i>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="pricing__listing-contract-actions">
                  <Link className="button-2" href="/contracts">
                    Compare Contract Cover
                    <i className="fa-regular fa-angle-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="row mt-10">
          {hourlyCategories.map((category) => (
            <div className="col-xl-4 col-md-6 mt-30" key={category.title}>
              <div className="pricing__listing-hourly">
                <h4>{category.title}</h4>
                <ul>
                  {category.rates.map((rate) => (
                    <li key={rate.period}>
                      <span>{rate.period}</span>
                      <strong>{rate.price}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {!compact && (
          <>
            <div className="row mt-70">
              <div className="col-xl-12">
                <div className="pricing__listing-block">
                  <h3>Boiler Servicing & Landlord Checks</h3>
                  <PriceGrid items={serviceItems} />
                </div>
              </div>
            </div>

            <div className="row mt-40">
              <div className="col-xl-12">
                <div className="pricing__listing-block">
                  <h3>Boiler Installation & Replacements</h3>
                  <PriceGrid items={installationItems} />
                </div>
              </div>
            </div>

            <div className="row mt-40">
              <div className="col-xl-12">
                <div className="pricing__listing-block">
                  <h3>Sales & System Upgrades</h3>
                  <PriceGrid items={salesItems} />
                </div>
              </div>
            </div>

            <div className="row mt-40">
              <div className="col-xl-12">
                <div className="pricing__listing-block">
                  <h3>Electrical Works (EICR)</h3>
                  <PriceGrid items={electricalItems} />
                </div>
              </div>
            </div>
          </>
        )}

        <div className="row mt-50">
          <div className="col-xl-12">
            <div className="pricing__listing-cta">
              <p>Pricing may vary by system condition and parts required.</p>
              <div className="pricing__listing-cta-buttons">
                <Link className="button-1" href="/contact">
                  Request A Quote<i className="fa-regular fa-angle-right"></i>
                </Link>
                {compact ? (
                  <Link className="button-2" href="/pricing">
                    View Full Pricing<i className="fa-regular fa-angle-right"></i>
                  </Link>
                ) : (
                  <Link
                    className="button-2"
                    href="/info/price.txt"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open Raw Price File<i className="fa-regular fa-angle-right"></i>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingListing;
