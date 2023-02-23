import SearchBar from "../../components/search-bar/SearchBar";
import ThemeSwitch from "../../components/theme-switch/ThemeSwitch";

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

      <footer className={CSS.footer}>
        <ThemeSwitch />
      </footer>
    </BaseLayout>
  );
}

export default Home;
