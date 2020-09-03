const baseUrl = 'https://pixabay.com/api/';

export default {
  page: 1,
  query: '',
  searchImages() {
    const parametrsUrl = `?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=`;
    const keyKode = '18129096-e3f2e48d02076305a8e645261';
    return fetch(baseUrl + parametrsUrl + keyKode)
      .then(res => res.json())
      .then(parsRespons => {
        this.incrementPage();
        return parsRespons.hits;
      });
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};
