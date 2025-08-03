function attachTableFilterWithSuggest({
  searchInputId,
  tableBodyId,
  categorySelectId = null,
  nameColumnIndex = 0,
  categoryColumnIndex = 1,
  dateColumnIndex = null,
  fromDateInputId = null,
  toDateInputId = null,
  caseSensitive = false,
  debounceTime = 0,
  onFilter = null,
  enableSuggest = true,
  maxSuggestions = 5
}) {
  const searchInput = document.getElementById(searchInputId);
  const tableBody = document.getElementById(tableBodyId);
  const categorySelect = categorySelectId ? document.getElementById(categorySelectId) : null;
  const fromDateInput = fromDateInputId ? document.getElementById(fromDateInputId) : null;
  const toDateInput = toDateInputId ? document.getElementById(toDateInputId) : null;

  if (!searchInput || !tableBody) return;

  const normalize = (str) => caseSensitive ? str.trim() : str.toLowerCase().trim();
  const parseDate = (text) => {
    const d = new Date(text);
    return isNaN(d) ? null : d;
  };

  // 🔮 Suggestion dropdown (Lucide-safe)
  const suggestBox = enableSuggest ? document.createElement('ul') : null;
  if (suggestBox) {
    Object.assign(suggestBox.style, {
      position: 'absolute',
      zIndex: '9999',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      border: '1px solid #ccc',
      backgroundColor: '#222',
      color: '#fff',
      fontSize: '0.9rem',
      maxHeight: '200px',
      overflowY: 'auto',
      display: 'none'
    });

    document.body.appendChild(suggestBox);

    searchInput.addEventListener('blur', () => {
      setTimeout(() => (suggestBox.style.display = 'none'), 120);
    });
  }

  const updateSuggestBox = (searchVal) => {
    if (!suggestBox) return;

    const rows = Array.from(tableBody.querySelectorAll('tr'));
    const matches = [];

    for (const row of rows) {
      const cells = row.cells;
      if (!cells || cells.length === 0) continue;

      const name = normalize(cells[nameColumnIndex]?.textContent || '');
      if (name.includes(searchVal) && !matches.includes(name)) {
        matches.push(name);
        if (matches.length >= maxSuggestions) break;
      }
    }

    while (suggestBox.firstChild) suggestBox.removeChild(suggestBox.firstChild);

    matches.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      Object.assign(li.style, {
        padding: '5px 10px',
        cursor: 'pointer'
      });
      li.addEventListener('mousedown', () => {
        searchInput.value = text;
        filterRows();
      });
      suggestBox.appendChild(li);
    });

    const rect = searchInput.getBoundingClientRect();
    suggestBox.style.left = `${rect.left + window.scrollX}px`;
    suggestBox.style.top = `${rect.bottom + window.scrollY}px`;
    suggestBox.style.width = `${rect.width}px`;
    suggestBox.style.display = matches.length ? 'block' : 'none';
  };

  const filterRows = () => {
    const searchVal = normalize(searchInput.value);
    const selectedCat = categorySelect?.value || '';
    const fromDate = fromDateInput?.value ? parseDate(fromDateInput.value) : null;
    const toDate = toDateInput?.value ? parseDate(toDateInput.value) : null;

    let visibleCount = 0;

    Array.from(tableBody.querySelectorAll('tr')).forEach((row) => {
      const cells = row.cells;
      if (!cells || cells.length === 0) return;

      const name = normalize(cells[nameColumnIndex]?.textContent || '');
      const catAttr = cells[categoryColumnIndex]?.getAttribute('data-cat-id') || '';
      const rawDate = dateColumnIndex !== null ? cells[dateColumnIndex]?.textContent.trim() : '';
      const rowDate = dateColumnIndex !== null ? parseDate(rawDate) : null;

      const matchSearch = !searchVal || name.includes(searchVal);
      const matchCategory = !selectedCat || catAttr === selectedCat;
      const matchDate = dateColumnIndex === null || (
        (!fromDate || (rowDate && rowDate >= fromDate)) &&
        (!toDate || (rowDate && rowDate <= toDate))
      );

      const show = matchSearch && matchCategory && matchDate;
      row.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    if (typeof onFilter === 'function') {
      onFilter(visibleCount);
    }
  };

  const debounce = (fn, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), wait);
    };
  };

  const handler = debounceTime > 0
    ? debounce(() => {
        filterRows();
        if (enableSuggest) updateSuggestBox(normalize(searchInput.value));
      }, debounceTime)
    : () => {
        filterRows();
        if (enableSuggest) updateSuggestBox(normalize(searchInput.value));
      };

  searchInput.addEventListener('input', handler);
  if (categorySelect) categorySelect.addEventListener('change', handler);
  if (fromDateInput) fromDateInput.addEventListener('change', handler);
  if (toDateInput) toDateInput.addEventListener('change', handler);
}

// ✅ Expose globally for browser use
window.attachTableFilterWithSuggest = attachTableFilterWithSuggest;
