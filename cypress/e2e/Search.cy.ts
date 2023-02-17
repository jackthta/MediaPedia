import { ROUTES } from "../../src/utilities/enum";

const sizes = ["iphone-x", [1280, 720]];

describe("Search", () => {
  sizes.forEach((size: Cypress.ViewportPreset | number[]) => {
    beforeEach(() => {
      if (Cypress._.isArray(size)) {
        const [width, height] = size;
        cy.viewport(width, height);
      } else {
        cy.viewport(size);
      }
    });

    it(`... can search for results successfully on ${size} screen`, () => {
      const searchQuery = "brave";
      const searchQueryLink = `${ROUTES.SEARCH_RESULTS}q=${searchQuery}`;

      cy.visit("/")

        // Grab search bar input
        .get("[data-test='search-bar-input']")

        // Type in a media search query that would have results
        .type(searchQuery)

        // Grab and click submit button
        .get("[data-test='search-button']")
        .click()

        // Check that the navigated url is the search results page
        .url()
        .should("include", searchQueryLink)

        // Grab search results page header; ensure search query is included
        .get("[data-test='results-heading']")
        .should("have.text", `Results found for ${searchQuery}`)

        // Grab results list and ensure there are at least one result
        .get("[data-test='results-list'] > button")
        .should("have.length.at.least", 1);
    });

    it("... can show no results", () => {
      const searchQuery = "ThisShouldNotContainAResult";
      const searchQueryLink = `${ROUTES.SEARCH_RESULTS}q=${searchQuery}`;

      cy.visit("/")

        // Grab search bar input
        .get("[data-test='search-bar-input']")

        // Type in a media search query that would have results
        .type(searchQuery)

        // Grab and click submit button
        .get("[data-test='search-button']")
        .click()

        // Check that the navigated url is the search results page
        .url()
        .should("include", searchQueryLink)

        // Check that it shows proper "results can't be found" text
        .get("[data-test='media-not-found-text']")
        .should(
          "have.text",
          `Sorry, we couldn't find any results for ${searchQuery}`
        );
    });
  });
});
