// NOTE: This test is very similar to `MovieDetails` but is separated
// because the media id can not be re-used for `MovieDetails`

import { ROUTES } from "../../../src/utilities/enum";

// Using the "The Last of Us" TV Show for our test case here.
const showId = "100088";

describe("TV Show page", () => {
  it("... shows all the show details", () => {
    cy.visit(`${ROUTES.TV_SHOW.replace(":id", showId)}`)

      // `<MediaOverview`
      // Check that the logo is visible
      .get("[data-test='media-logo']")
      .should("be.visible")

      // Check that the synopsis is visible
      .get("[data-test='media-synopsis']")
      .should("be.visible")

      // `<MediaInformation>`
      // Check that `Information` heading is visible
      .get("[data-test='media-information']")
      .should("contain", "Information")

      // Check that `Rating` is visible
      .should("contain", "Rating")

      // Check that `Genre` is visible
      .should("contain", "Genre")

      // Check that `Release date` is visible
      .should("contain", "Release date")

      // Check that `Language` is visible
      .should("contain", "Language")

      // Check that `Network` is visible
      .should("contain", "Network")

      // Check that `Rating` is visible
      .should("contain", "Rating")

      // `<TvShowSeasonSection>`
      // Check that episodes are visible
      .get("[data-test='show-season-section'] > div")
      .children()
      .should("have.length.at.least", 1)

      // `<MediaSimilarShows>`
      // Check that similar shows are visible
      .get("[data-test='media-similar-shows'] > div")
      .children()
      .should("have.length.at.least", 1);
  });
});
