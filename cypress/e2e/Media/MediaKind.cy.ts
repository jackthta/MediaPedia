import { ROUTES } from "../../../src/utilities/enum";

const mediaTypes = ["TV Shows", "Movies"];
const mediaCategories = ["Trending", "Popular", "Top Rated"];

mediaTypes.forEach((mediaType) => {
  describe(`${mediaType}`, () => {
    context("on Mobile", () => {
      beforeEach(() => cy.viewport("iphone-x"));

      describe(`... can navigate to ${mediaType} page to see all categories`, () => {
        beforeEach(() => {
          cy.visit("/")

            // Click on menu button to open menu dialog to reveal navigation links
            .get("[data-test='menu-button']")
            .click();

          // Click on `mediaType` naviation link
          cy.contains("a", `${mediaType}`)
            .click()

            // Check that the heading is `mediaType`
            .get("[data-test='every-media-kind-heading']")
            .should("have.text", mediaType);

          // Wait a little bit for data to fetch
          cy.wait(2000);

          // Ensure url is proper
          const mediaTypeUrl =
            mediaType === "TV Shows" ? ROUTES.TV_SHOWS : ROUTES.MOVIES;
          cy.url().should("include", mediaTypeUrl);
        });

        mediaCategories.forEach((category) => {
          // TODO: remove skip
          it.skip(`${category}`, () => {
            // Check that all categories show and have content
            cy.get("[data-test='media-section']")
              .contains(category)
              .should("have.text", category)

              // Traverse up to this category's media section container
              .parent()
              .parent()
              .parent()

              .find("[data-test='media-section-shows']")
              .children()
              .should("have.length.at.least", 1);
          });

          it(`... can navigate to ${category} page by clicking on \`See all\` link`, () => {
            // Check that all categories show and have content
            cy.get("[data-test='media-section']")
              .contains(category)
              .should("have.text", category)

              // Traverse up to this category's header
              .parent()
              .parent()

              // Click on `See all` link
              .contains("See all")
              .click();

            // Check that the heading is `category`
            cy.get("[data-test='results-heading']")
              .should("have.text", category)

              // Check that there is content
              .get("[data-test='results-list']")
              .children()
              .should("have.length.at.least", 1);
          });
        });
      });
    });

    context("on Desktop", () => {
      beforeEach(() => cy.viewport(1280, 720));

      describe(`... can navigate to ${mediaType} page to see all categories`, () => {
        beforeEach(() => {
          cy.visit("/");

          // Click on `mediaType` naviation link
          cy.contains("a", `${mediaType}`)
            .click()

            // Check that the heading is `mediaType`
            .get("[data-test='every-media-kind-heading']")
            .should("have.text", mediaType);

          // Wait a little bit for data to fetch
          cy.wait(2000);

          // Ensure url is proper
          const mediaTypeUrl =
            mediaType === "TV Shows" ? ROUTES.TV_SHOWS : ROUTES.MOVIES;
          cy.url().should("include", mediaTypeUrl);
        });

        mediaCategories.forEach((category) => {
          it(`${category}`, () => {
            // Check that all categories show and have content
            cy.get("[data-test='media-section']")
              .contains(category)
              .should("have.text", category)

              // Traverse up to this category's media section container
              .parent()
              .parent()
              .parent()

              .find("[data-test='media-section-shows']")
              .children()
              .should("have.length.at.least", 1);
          });

          it(`... can navigate to ${category} page by clicking on \`See all\` link`, () => {
            // Check that all categories show and have content
            cy.get("[data-test='media-section']")
              .contains(category)
              .should("have.text", category)

              // Traverse up to this category's header
              .parent()
              .parent()

              // Click on `See all` link
              .contains("See all")
              .click();

            // Check that the heading is `category`
            cy.get("[data-test='results-heading']")
              .should("have.text", category)

              // Check that there is content
              .get("[data-test='results-list']")
              .children()
              .should("have.length.at.least", 1);
          });
        });
      });
    });
  });
});
