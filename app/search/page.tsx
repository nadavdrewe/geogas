import Link from "next/link";
import HeaderTwo from "@/components/layout/header/HeaderTwo";
import BreadCrumb from "@/components/layout/banner/BreadCrumb";
import Contact from "@/components/containers/home/Contact";
import SubscribeArea from "@/components/containers/home/SubscribeArea";
import FooterTwo from "@/components/layout/footer/FooterTwo";
import InitAnimations from "@/components/layout/InitAnimations";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgressButton from "@/components/layout/ScrollProgressButton";
import { getSiteContent } from "@/lib/siteContent";
import { searchSiteContent } from "@/lib/siteSearch";
import type { SearchResult } from "@/lib/siteSearch";

type SearchParams = Promise<{
  q?: string | string[];
  category?: string | string[];
}> | undefined;

const readSearchInputs = async (
  searchParams: SearchParams
): Promise<{ query: string; category: string }> => {
  const resolved = searchParams ? await searchParams : undefined;

  const rawQ = resolved?.q;
  const rawCategory = resolved?.category;
  const query = Array.isArray(rawQ) ? (rawQ[0] ?? "") : (rawQ ?? "");
  const category = Array.isArray(rawCategory)
    ? (rawCategory[0] ?? "")
    : (rawCategory ?? "");

  return { query, category };
};

const escapeRegExp = (value: string): string =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightText = (text: string, query: string) => {
  const terms = Array.from(
    new Set(
      query
        .trim()
        .toLowerCase()
        .split(/\s+/)
        .filter((term) => term.length > 1)
    )
  );

  if (!terms.length) return text;

  const pattern = new RegExp(`(${terms.map(escapeRegExp).join("|")})`, "ig");
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    const isMatch = terms.some((term) => part.toLowerCase() === term);
    return isMatch ? <mark key={`${part}-${index}`}>{part}</mark> : part;
  });
};

const buildCategoryCounts = (results: SearchResult[]) => {
  const counts = new Map<string, number>();
  for (const result of results) {
    counts.set(result.category, (counts.get(result.category) ?? 0) + 1);
  }
  return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
};

const page = async ({ searchParams }: { searchParams?: SearchParams }) => {
  const { query: rawQuery, category: rawCategory } = await readSearchInputs(searchParams);
  const query = rawQuery.trim();
  const siteContent = await getSiteContent();
  const allResults = query ? searchSiteContent(query, siteContent) : [];
  const categoryCounts = buildCategoryCounts(allResults);
  const selectedCategory = rawCategory.trim();
  const results =
    query && selectedCategory
      ? allResults.filter((result) => result.category === selectedCategory)
      : allResults;

  return (
    <>
      <HeaderTwo />
      <BreadCrumb title="Search" />
      <section className="site-search section-padding">
        <div className="container">
          <div className="row jc-center">
            <div className="col-xl-10">
              <div className="site-search__panel">
                <h2>Search The Geo Gas Site</h2>
                <p>
                  Find services, pricing information, contracts, FAQs, help &
                  advice, and contact details.
                </p>
                <form className="site-search__form" action="/search" method="get">
                  <input
                    type="search"
                    name="q"
                    defaultValue={query}
                    placeholder="Search service, topic or keyword..."
                    aria-label="Search the Geo Gas site"
                  />
                  {selectedCategory ? (
                    <input type="hidden" name="category" value={selectedCategory} />
                  ) : null}
                  <button className="button-1" type="submit">
                    Search
                    <i className="fa-regular fa-angle-right"></i>
                  </button>
                </form>
              </div>

              {!query ? (
                <div className="site-search__empty">
                  <h3>Try searching for:</h3>
                  <div className="site-search__chips">
                    <Link href="/search?q=boiler+repair">Boiler repair</Link>
                    <Link href="/search?q=landlord+gas+safety">Landlord gas safety</Link>
                    <Link href="/search?q=opening+hours">Opening hours</Link>
                    <Link href="/search?q=surrey">Surrey coverage</Link>
                    <Link href="/search?q=contract+cover">Contract cover</Link>
                    <Link href="/search?q=cold+radiator">Cold radiator</Link>
                  </div>
                </div>
              ) : (
                <div className="site-search__results">
                  <div className="site-search__results-head">
                    <h3>
                      {results.length} result{results.length === 1 ? "" : "s"} for
                      {" "}
                      <span>{query}</span>
                    </h3>
                    <p>
                      Internal results from Geo Gas pages and key content sections.
                    </p>
                  </div>

                  {allResults.length ? (
                    <div className="site-search__filters" aria-label="Filter results">
                      <Link
                        href={`/search?q=${encodeURIComponent(query)}`}
                        className={!selectedCategory ? "is-active" : ""}
                      >
                        All <span>{allResults.length}</span>
                      </Link>
                      {categoryCounts.map(([category, count]) => (
                        <Link
                          key={category}
                          href={`/search?q=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`}
                          className={selectedCategory === category ? "is-active" : ""}
                        >
                          {category} <span>{count}</span>
                        </Link>
                      ))}
                    </div>
                  ) : null}

                  {results.length ? (
                    <div className="site-search__list">
                      {results.map((result) => (
                        <article key={result.id} className="site-search__item">
                          <div className="site-search__item-meta">
                            <span>{result.category}</span>
                          </div>
                          <h4>
                            <Link href={result.href}>{highlightText(result.title, query)}</Link>
                          </h4>
                          <p>{highlightText(result.snippet, query)}</p>
                          <div className="site-search__item-path">
                            <span>Page:</span>
                            <code>{result.href}</code>
                          </div>
                          <Link className="site-search__item-link" href={result.href}>
                            Open {result.category}
                            <i className="fa-regular fa-angle-right"></i>
                          </Link>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="site-search__no-results">
                      <h4>No matching results found</h4>
                      <p>
                        Try broader terms like <strong>boiler</strong>,{" "}
                        <strong>contract</strong>, <strong>pricing</strong>,{" "}
                        <strong>landlord</strong>, or <strong>contact</strong>.
                      </p>
                      <div className="site-search__chips">
                        <Link href="/search?q=boiler+service">Boiler service</Link>
                        <Link href="/search?q=contact+hours">Contact hours</Link>
                        <Link href="/search?q=sussex">Sussex coverage</Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Contact addClass={true} />
      <SubscribeArea />
      <FooterTwo />
      <InitAnimations />
      <CustomCursor />
      <ScrollProgressButton />
    </>
  );
};

export default page;
