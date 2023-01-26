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

// Image URL formula:
// Source: https://stackoverflow.com/a/2068371
export function generateYoutubeThumbnailImgSrcsetDimensions(key: string) {
  const baseUrl = "https://img.youtube.com/vi/";
  // 320x180, 480x360, 640x480
  const versions = [
    { size: 320, version: "/mqdefault.jpg" },
    { size: 480, version: "/hqdefault.jpg" },
    { size: 640, version: "/sddefault.jpg" },
  ];

  let srcset = ``;
  for (const version of versions) {
    srcset += `${baseUrl}${key}${version.version} ${version.size}w,`;
  }

  return { srcset, defaultSrc: srcset.split(",")[0].split(" ")[0] };
}
