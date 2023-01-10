import Header from "../../components/header/Header";

import "./BaseLayout.scss";

type Props = {
  children?: React.ReactNode;
};

function BaseLayout({ children }: Props) {
  return (
    <>
      <Header />

      {children}

      {/* FOOTER — only for desktop dimensions for the light/dark switch */}
    </>
  );
}

export default BaseLayout;
