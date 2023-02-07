import { redirect } from "react-router";

import { KIND, ROUTES } from "../../utilities/enum";

import type { LoaderFunctionArgs } from "react-router";

export const mediaKindParamGuard = ({
  params: { kind },
}: LoaderFunctionArgs) => {
  // Redirects to homepage if params doesn't contain any `KIND` values.
  if (!kind || !(Object.values(KIND) as string[]).includes(kind))
    return redirect(ROUTES.TV_SHOWS);

  return null;
};
