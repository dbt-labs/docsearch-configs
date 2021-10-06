new Crawler({
  appId: "",
  apiKey: "",
  rateLimit: 8,
  startUrls: ["https://doc.cloverdx.com/"],
  renderJavaScript: false,
  sitemaps: ["https://doc.cloverdx.com/latest/sitemap.xml"],
  exclusionPatterns: ["**/**index.html"],
  ignoreCanonicalTo: false,
  discoveryPatterns: ["https://doc.cloverdx.com/**"],
  schedule: "at 11:20 on Tuesday",
  actions: [
    {
      indexName: "cloverdx",
      pathsToMatch: ["https://doc.cloverdx.com**/**"],
      recordExtractor: ({ $, helpers }) => {
        // Removing DOM elements we don't want to crawl
        const toRemove = ".toc, validator-toc-2, .note, .titlepage + table";
        $(toRemove).remove();

        return helpers.docsearch({
          recordProps: {
            lvl1: "#breadcrumbs a:nth-child(2)",
            content: "#body-inner td, #body-inner p, #body-inner pre",
            lvl0: {
              selectors: "",
              defaultValue: "Documentation",
            },
            lvl2: "#body-inner h1",
            lvl3: "#body-inner h2",
            lvl4: "#body-inner h3",
            lvl5: "#body-inner h4, #body-inner td:first-child",
            lvl6: "#body-inner h5",
          },
          indexHeadings: { from: 2, to: 6 },
        });
      },
    },
  ],
  initialIndexSettings: {
    cloverdx: {
      attributesForFaceting: ["type", "lang"],
      attributesToRetrieve: ["hierarchy", "content", "anchor", "url"],
      attributesToHighlight: ["hierarchy", "hierarchy_camel", "content"],
      attributesToSnippet: ["content:10"],
      camelCaseAttributes: ["hierarchy", "hierarchy_radio", "content"],
      searchableAttributes: [
        "unordered(hierarchy_radio_camel.lvl0)",
        "unordered(hierarchy_radio.lvl0)",
        "unordered(hierarchy_radio_camel.lvl1)",
        "unordered(hierarchy_radio.lvl1)",
        "unordered(hierarchy_radio_camel.lvl2)",
        "unordered(hierarchy_radio.lvl2)",
        "unordered(hierarchy_radio_camel.lvl3)",
        "unordered(hierarchy_radio.lvl3)",
        "unordered(hierarchy_radio_camel.lvl4)",
        "unordered(hierarchy_radio.lvl4)",
        "unordered(hierarchy_radio_camel.lvl5)",
        "unordered(hierarchy_radio.lvl5)",
        "unordered(hierarchy_radio_camel.lvl6)",
        "unordered(hierarchy_radio.lvl6)",
        "unordered(hierarchy_camel.lvl0)",
        "unordered(hierarchy.lvl0)",
        "unordered(hierarchy_camel.lvl1)",
        "unordered(hierarchy.lvl1)",
        "unordered(hierarchy_camel.lvl2)",
        "unordered(hierarchy.lvl2)",
        "unordered(hierarchy_camel.lvl3)",
        "unordered(hierarchy.lvl3)",
        "unordered(hierarchy_camel.lvl4)",
        "unordered(hierarchy.lvl4)",
        "unordered(hierarchy_camel.lvl5)",
        "unordered(hierarchy.lvl5)",
        "unordered(hierarchy_camel.lvl6)",
        "unordered(hierarchy.lvl6)",
        "content",
      ],
      distinct: true,
      attributeForDistinct: "url",
      customRanking: [
        "desc(weight.pageRank)",
        "desc(weight.level)",
        "asc(weight.position)",
      ],
      ranking: [
        "words",
        "filters",
        "typo",
        "attribute",
        "proximity",
        "exact",
        "custom",
      ],
      highlightPreTag: '<span class="algolia-docsearch-suggestion--highlight">',
      highlightPostTag: "</span>",
      minWordSizefor1Typo: 3,
      minWordSizefor2Typos: 7,
      allowTyposOnNumericTokens: false,
      minProximity: 1,
      ignorePlurals: true,
      advancedSyntax: true,
      attributeCriteriaComputedByMinProximity: true,
      removeWordsIfNoResults: "allOptional",
      separatorsToIndex: "_",
    },
  },
});