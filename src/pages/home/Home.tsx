import SearchBar from "../../components/search-bar/SearchBar";

import BaseLayout from "../../layouts/base-layout/BaseLayout";

import CSS from "./Home.module.scss";

function Home() {
  return (
    <BaseLayout>
      <main className={CSS.main}>
        <h1 className={CSS.mainHeading}>
          <span>Convenient source for </span>
          <span>film information</span>
        </h1>
        <SearchBar />
      </main>

      {/* TODO: Add light/dark theme switch */}
      <footer className={CSS.footer}></footer>
    </BaseLayout>
  );
}

export default Home;
