// Assumes grunt.filter.js already attached attachTableFilterWithSuggest to window
window.attachTableFilterWithSuggest({
  searchInputId: 'searchTask',
  tableBodyId: 'taskTable',
  nameColumnIndex: 1,
  debounceDelay: 300,
});
