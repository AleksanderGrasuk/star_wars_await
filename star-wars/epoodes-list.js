export function render(data) {
  const container = document.createElement('div');
  const h1 = document.createElement('p');
  const h2 = document.createElement('p');
  const h3 = document.createElement('p');
  const h4 = document.createElement('p');
  const h5 = document.createElement('p');
  const h6 = document.createElement('p');
  const list = document.createElement('div');

  h1.classList.add('h1', 'text-warning', 'text-center');
  h2.classList.add('h2', 'text-warning', 'text-center');
  h3.classList.add('h3', 'text-warning', 'text-center');
  h4.classList.add('h4', 'text-warning', 'text-center');
  h5.classList.add('h5', 'text-warning', 'text-center');
  h6.classList.add('h6', 'text-warning', 'text-center');
  h1.textContent = 'Star Wars All Episods';
  h2.textContent = 'Star Wars All Episods';
  h3.textContent = 'Star Wars All Episods';
  h4.textContent = 'Star Wars All Episods';
  h5.textContent = 'Star Wars All Episods';
  h6.textContent = 'Star Wars All Episods';

  document.body.classList.add('text-bg-dark');

  container.classList.add(
    'container',
    'py-4'
  );
  list.classList.add('list-group');

  for (const episod of data.results) {
    const episodLink = document.createElement('a');
    episodLink.classList.add(
      'list-group-item',
      'list-group-item-action',
      'list-group-item-warning',
      'text-center',
      'text-dark'
    )

    episodLink.href = `?film=${data.results.indexOf(episod) + 1}`;
    episodLink.textContent = `Episod ${episod.episode_id}: ` + episod.title;
    episodLink.setAttribute('id', 'episod-link')
    list.append(episodLink);
  }
  container.append(
    h6, h5, h4, h3, h2, h1, list);

  return container;

}
