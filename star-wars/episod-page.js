export function renderPageList(dataPlanet, dataSpecies) {
  const container = document.querySelector('.block-content');
  const planets = document.createElement('div');
  const planetsList = document.createElement('ul');
  const spicies = document.createElement('div');
  const spiciesList = document.createElement('ul');
  const planetsTitle = document.createElement('h2');
  const spiciesTitle = document.createElement('h2');
  const arrPlanets = dataPlanet;
  const arrSpicies = dataSpecies;

  function createList(arrayObj, place) {
    for (const object of arrayObj) {
      const item = document.createElement('li');
      item.classList.add('list-group');
      item.textContent = object;
      place.append(item);
    }
    return place;
  }
  createList(arrPlanets, planetsList);
  createList(arrSpicies, spiciesList);

  planetsTitle.classList.add('h2', 'text-warning');
  spiciesTitle.classList.add('h2', 'text-warning');

  planetsTitle.textContent = 'Planets';
  spiciesTitle.textContent = 'Spicies';

  planets.append(planetsTitle, planetsList);
  spicies.append(spiciesTitle, spiciesList);
  container.append(planets, spicies);
};

export function renderPage(data) {
  const container = document.createElement('div');
  const title = document.createElement('h1');
  const btnBack = document.createElement('a');
  const crawl = document.createElement('p');
  const blockContent = document.createElement('div');

  document.body.classList.add('text-bg-dark', 'text-warning');
  blockContent.classList.add('block-content');
  container.classList.add('container', 'py-4');
  title.classList.add('h1', 'text-warning', 'text-center');
  btnBack.classList.add('btn', 'btn-warning');
  crawl.classList.add('text-warning');

  title.textContent = data.title;
  btnBack.textContent = 'Back to episodes';
  btnBack.setAttribute('id', 'back-link');
  btnBack.href = '';
  crawl.textContent = data.opening_crawl;

  container.append(btnBack, title, crawl, blockContent);
  return container;
}
