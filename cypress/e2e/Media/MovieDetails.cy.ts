// NOTE: This test is very similar to `TvShowDetails` but is separated
// because the media id can not be re-used for `TvShowDetails`

import { ROUTES } from "../../../src/utilities/enum";

// Using the "Brave" movie for our test case here.
const movieId = "62177";

describe("Movie page", () => {
  it("... shows all the movie details", () => {
    cy.visit(`${ROUTES.MOVIE.replace(":id", movieId)}`)

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

      // `<MediaSimilarShows>`
      // Check that similar shows are visible
      .get("[data-test='media-similar-shows'] > div")
      .children()
      .should("have.length.at.least", 1);
  });
});
