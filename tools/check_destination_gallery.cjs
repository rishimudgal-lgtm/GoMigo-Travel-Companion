// Exercise the real gallery filtering code with a small DOM adapter.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const html = fs.readFileSync('destinations.html', 'utf8');
const script = fs.readFileSync('site.js', 'utf8');
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'");
const attr = (s, name) => decode(s.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1] || '');
const cards = [...html.matchAll(/<article class="destination-card"([\s\S]*?)<\/article>/g)].map((m) => ({
    dataset: { tags: attr(m[1], 'data-tags'), search: attr(m[1], 'data-search') },
    name: attr(m[1], 'data-destination'), textContent: m[1].replace(/<[^>]+>/g, ''),
    hidden: m[1].includes('data-category-only'),
    hasAttribute(name) { return name === 'data-category-only' && m[1].includes(name); },
    querySelector() { return { alt: attr(m[1], 'alt') }; }
}));
const publicCards = cards.filter((c) => !c.hasAttribute('data-category-only'));
assert.equal(publicCards.length, 100);
assert.equal(new Set(publicCards.map((c) => c.name)).size, 100);
for (const match of html.matchAll(/<img[^>]+src="([^"]+)"/g)) assert(fs.existsSync(match[1]), match[1]);
const search = { value: '', addEventListener(type, fn) { this[type] = fn; } };
const empty = { hidden: true };
const filters = ['all', 'beach', 'mountains', 'culture', 'adventure', 'city'].map((filter) => ({
    dataset: { filter }, classList: { toggle() {} }, addEventListener(type, fn) { this[type] = fn; }
}));
const document = {
    querySelector(selector) { return selector === '#destination-search' ? search : empty; },
    querySelectorAll(selector) {
        if (selector === '.destination-grid .destination-card') return cards;
        if (selector === '.filter[data-filter]') return filters;
        return [];
    }, addEventListener() {}
};
const start = script.indexOf('        const search = document.querySelector("#destination-search");');
const end = script.indexOf('        if (search) {', start);
assert(start > 0 && end > start);
new Function('document', script.slice(start, end))(document);
const visible = () => cards.filter((c) => !c.hidden);
const query = (value) => { search.value = value; search.input(); return visible(); };
assert.equal(visible().length, 100);
assert.equal(query('Bombay')[0].name, 'Mumbai');
assert.equal(query('delhi india')[0].name, 'Delhi');
assert.equal(query('Banaras')[0].name, 'Varanasi');
assert.equal(query('Reykjavík')[0].name, 'Reykjavik');
assert.equal(query('new zealand').length, 2);
assert.equal(query('not-a-real-destination').length, 0);
assert.equal(empty.hidden, false);
query('');
for (const filter of filters.slice(1)) {
    filter.click();
    assert(visible().length >= 3, filter.dataset.filter);
    assert(visible().every((c) => c.dataset.tags.split(' ').includes(filter.dataset.filter)));
}
filters[0].click();
assert.equal(visible().length, 100);
const registryStart = script.indexOf('    const destinations = [');
const registryEnd = script.indexOf('    const memoryStore = new Map();');
const registry = vm.runInNewContext(script.slice(registryStart, registryEnd) + '\ndestinations');
for (const c of publicCards) {
    const place = registry.find((p) => p.name === c.name);
    assert(place && fs.existsSync(place.image), `Saved registry missing ${c.name}`);
}
const guide = fs.readFileSync('travel-guide-preview.html', 'utf8');
assert(!guide.includes('data-signed-in-page'));
assert(!guide.includes('<aside'));
assert(fs.readFileSync('landing_page.html', 'utf8').includes('href="travel-guide-preview.html"'));
console.log('PASS: 100 local photo cards; aliases, accents, multiword/country searches, every filter, empty state, Saved registry, and public Travel Guide route.');
