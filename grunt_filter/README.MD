

# 🧠 grunt-filter

**Smart, theme-friendly, dependency-free table filtering with suggest dropdown.**
Part of the `gruntCSS` ecosystem — plug it in, filter away.

---

## ⚡ Features

* 🔍 Filter rows by **name**, **category**, and **date range**
* 💡 Optional **suggest dropdown** with auto-suggestions
* 🧱 Works with **any CSS framework** (Lucide, Foundation, Tailwind, Bootstrap, etc.)
* 🪶 Lightweight — **no dependencies**, no bundler, no BS
* 🪄 **One-liner setup** with zero config required

---

## 🚀 Quick Usage

```html
<!-- Load the filter script -->
<script src="dist/grunt.filter.js"></script>

<script>
  attachTableFilter({
    tableId: 'my-table',
    suggestBoxId: 'suggest-box', // Optional
    inputs: {
      searchInputId: 'filter-name',
      categorySelectId: 'filter-category',
      fromDateInputId: 'filter-from',
      toDateInputId: 'filter-to'
    }
  });
</script>
```

---

## 📁 Folder Structure

```
📦demo/
 ┣ 📜demo.html         ← Basic usage demo
 ┣ 📜grunt.filter.js   ← Main script
 ┣ 📜grunt.filter.min.js ← Minified version
 ┗ 📜app.js            ← Demo initializer
```

---

## 🧪 Status

* ✅ Stable and tested
* 🎯 Supports classic HTML setups (no framework lock-in)
* 🔧 More filter types coming soon (multi-select, tag-based, fuzzy...)

