// Image URL formula:
// https://developers.themoviedb.org/3/configuration/get-api-configuration
export function generateImgSrcsetDimensions(
  baseUrl: string,
  backdropSizes: { srcset: string[]; url: string[] },
  backdropPath: string
): { srcset: string; defaultSrc: string } {
  let srcset = ``;

  for (let i = 0; i < backdropSizes.srcset.length; i++) {
    const srcsetUrlSize = backdropSizes.url[i];
    const srcsetWidthSize = backdropSizes.srcset[i];

    srcset += `${baseUrl}${srcsetUrlSize}${backdropPath} ${srcsetWidthSize},`;
  }

  return { srcset, defaultSrc: srcset.split(",")[0].split(" ")[0] };
}
