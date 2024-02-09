import { renderPageList } from "./episod-page.js";

const cssPromises = {};

function preloader(container) {
  const spinner = document.createElement('div');
  const span = document.createElement('span');

  spinner.classList.add('spinner-border', 'text-danger', 'zindex-1000');
  span.classList.add('visually-hidden');

  container.append(spinner);
};

// Получение данных js,
function loadResourses(src) {
  // js module
  if (src.endsWith('.js')) {
    return import(src);
  }
  // css file
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  return fetch(src).then(res => res.json());
}

// Получение данных планет и расс
async function apiObj(arrayObj) {
  let arrItems = [];
  for (const object of arrayObj) {
    await fetch(object)
      .then(res => res.json())
      .then(json => {
        arrItems.push(json.name);
      })
  }
  return await arrItems;
}

const starWars = document.getElementById('star-wars');
starWars.classList.add('position-relative');

function handleEpisodListLinkClick(starWars, apiUrl, modulePage, css, data, pageModule, e) {
  e.preventDefault();
  starWars.innerHTML = '';
  starWars.append(pageModule.render(data));
  const links = document.querySelectorAll("[id^='episod-link']");
  links.forEach(link => {
    link.addEventListener('click', hadleEpisodLinkClick.bind(null, starWars, apiUrl, modulePage, link, css, data, pageModule))
  });
}

function hadleEpisodLinkClick(starWars, apiUrl, modulePage, link, css, data, pageModule, e) {
  e.preventDefault();
  const searchPar = new URLSearchParams(link.search);
  const filmNumberU = searchPar.get('film');
  const api = apiUrl + filmNumberU;
  history.pushState(null, '', link.href);
  Promise.all([modulePage, api, css].map(src => loadResourses(src)))
    .then(([page, dat]) => {
      starWars.innerHTML = '';
      starWars.append(page.renderPage(dat));
      const container = document.querySelector('.block-content');
      const linkBack = document.getElementById('back-link');
      linkBack.addEventListener('click', handleEpisodListLinkClick.bind(null, starWars, apiUrl, modulePage, css, data, pageModule));
      preloader(container);
      Promise.all([apiObj(dat.planets), apiObj(dat.species)])
        .then(([planets, species]) => {
          renderPageList(planets, species);
        })
        .finally(() => {
          document.querySelector('.spinner-border').style.display = 'none';
        })
    }
    );
}

function renderPageEpisod(moduleName, apiUrl, css, modulePage) {
  Promise.all([moduleName, apiUrl, css].map(src => loadResourses(src)))
    .then(([pageModule, data]) => {
      starWars.innerHTML = '';
      starWars.append(pageModule.render(data));
      const links = document.querySelectorAll("[id^='episod-link']");
      links.forEach(link => {
        link.addEventListener('click', hadleEpisodLinkClick.bind(null, starWars, apiUrl, modulePage, link, css, data, pageModule))
      });
    });
}

renderPageEpisod(
  './epoodes-list.js',
  `https://swapi.dev/api/films/`,
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
  './episod-page.js'
);







