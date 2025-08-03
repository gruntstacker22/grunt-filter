
# 🧹 grunt-filter

A lightweight, no-dependency JS utility for filtering HTML tables — built to be fast, minimal, and drop-in easy. Designed for dashboards, inventory apps, and simple web interfaces.

> Part of the [GruntStack](https://github.com/gruntstacker22) project — handcrafted tools for fast indie builds.

![avatar](https://avatars.githubusercontent.com/u/17316726?v=4)

---

## 🔥 Features

- ✅ Vanilla JS (No jQuery or frontend frameworks)
- 🔍 Multi-column filter: name, category, date range, etc.
- ⏱ Debounced input for smooth filtering
- 🎨 Theme-agnostic — works with any CSS (gruntCSS, Bootstrap, custom)
- 📁 Simple integration — just one file

---


````

### 2. Add your filter form

```html
<input type="text" id="filter-name" placeholder="Search name...">
<select id="filter-category">
  <option value="">All categories</option>
  <option value="food">Food</option>
  <option value="tools">Tools</option>
</select>
```

### 3. Add your table

```html
<table id="data-table">
  <thead>
    <tr><th>Name</th><th>Category</th><th>Date</th></tr>
  </thead>
  <tbody>
    <tr><td>Banana</td><td>Food</td><td>2025-08-01</td></tr>
    ...
  </tbody>
</table>
```

### 4. Initialize the filter

```html
<script>
  attachTableFilter({
    tableId: 'data-table',
    inputs: {
      name: 'filter-name',
      category: 'filter-category',
    }
  });
</script>

## 🔧 Live Demo

* 🧪 **CodePen Demo**: [https://codepen.io/grunt-coder/pen/YPyZLGB](https://codepen.io/grunt-coder/pen/YPyZLGB)


---




## 🪖 License

MIT — Free to use, modify, and build upon.
Please give credit if you fork, remix, or bundle 🙏

---

## ✌️ Created By

**[@gruntstacker22](https://github.com/gruntstacker22)**
Made with ☕, sweat, and a lot of table rage.



All good bro — clean and tight 👌
```
