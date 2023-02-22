<!--  anchor for `back to top` link -->
<a name="readme-top"></a>

<br />

<!-- HEADER -->
<div align="center">
  <a href="https://github.com/jackthta/synopedia">
    <img src="./public/favicon/cinema.svg" alt="audience watching theater screen" width="100px">
  </a>

  <h1>synopedia</h1>
  <p style="margin-top: -10px">Convenient source for film information</p>
</div>

<br />

## **Live Demo** 
- WIP
<!-- [Synopedia live demo 🔗](https://jackthta.github.io/Image-Gallery/) -->

<br />

<!-- TABLE OF CONTENTS -->
## **Table of Contents**
<ol>
  <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
  </li>
  <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
  </li>
  <li><a href="#tests">Tests</a></li>
</ol>

<br />

<!-- ABOUT THE PROJECT -->
## **About The Project**

This web application serves as a convenient source for searching movie and TV show information.

<br />

### **Built With**
- [![HTML5][html-badge]][html-url]
- [![CSS3][css-badge]][css-url]
- [![SASS][sass-badge]][sass-url]
- [![React][react-badge]][react-url]
- [![Redux][redux-badge]][redux-url]
- [![Redux][react-router-badge]][react-router-url]
- [![TypeScript][typescript-badge]][typescript-url]
- [![Vite][vite-badge]][vite-url]
- [![Cypress][cypress-badge]][cypress-url]

<br />

### **Features**
<ul>
  <li>Accessibility ♿️</li>
  <li>Fluidly Responsive Web Design 📱 💻 🖥 </li>
  <li>Light & Dark Mode ☀️ 🌑 (WIP) </li>
</ul>

<br />

<!-- GETTING STARTED -->
## **Getting Started**

Follow these steps to run the web application locally.

### **Prerequisites**

- [NodeJS](https://nodejs.org/en/) (v16.x)
- [npm](https://www.npmjs.com/) (v9.x)
- [The Movie Database API Bearer Token](https://developers.themoviedb.org/3/getting-started/introduction)

### **Installation**

1. Clone the repo

   ```sh
   git clone https://github.com/jackthta/synopedia.git
   ```

2. Change into project directory

   ```sh
   cd synopedia
   ```

3. Install dependencies

   ```sh
   npm i
   ```

4. Make a `.env` file containing The Movie Database API base URL and bearer token

   ```sh
   VITE_TMDB_BASE_URL="https://api.themoviedb.org/3"
   VITE_TMDB_BEARER_TOKEN=
   ```

5. Launch the web application

   ```sh
   npm run dev
   ```

<br />

<!-- TESTS -->
## **Tests**

The testing framework used in this project is Cypress. [The documentation can be found here.](https://docs.cypress.io/)

### **Run tests**

To run the tests located in the `cypress/e2e` directory, run this command:

```
npm run test
```

<br />

<p align="right">(<a href="#readme-top"> 🔺 back to top </a>)</p>

<!-- MARKDOWN BADGES & LINKS -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
<!--
Markdown badges
- https://github.com/Ileriayo/markdown-badges
-->

[html-badge]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[html-url]: https://whatwg.org/
[css-badge]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[css-url]: https://www.w3.org/Style/CSS/members.en.php3
[sass-badge]: https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white
[sass-url]: https://sass-lang.com/
[react-badge]: https://img.shields.io/badge/React-202329?style=for-the-badge&logo=react
[react-url]: https://reactjs.org/
[redux-badge]: https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white
[redux-url]: https://redux.js.org/
[react-router-badge]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[react-router-url]: https://reactrouter.com/en/main
[typescript-badge]: https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[vite-badge]: https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[vite-url]: https://vitejs.dev/
[cypress-badge]: https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e
[cypress-url]: https://www.cypress.io/