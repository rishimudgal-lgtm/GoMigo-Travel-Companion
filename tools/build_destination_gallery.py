"""Publish the checked local Wikimedia catalog into the vanilla HTML/JS gallery."""
import html
import json
import re
import urllib.parse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
catalog = json.loads((ROOT / 'explore_assets/destinations/catalog.json').read_text(encoding='utf-8'))
assert len(catalog) == 100, f'Expected 100 places, got {len(catalog)}'
assert len({p['name'] for p in catalog}) == 100
assert all((ROOT / p['image']).exists() for p in catalog)
esc = lambda value: html.escape(value, quote=True)
page = ROOT / 'destinations.html'
text = page.read_text(encoding='utf-8')
start = text.index('      <div class="destination-grid" id="destination-grid">')
end = text.index('      <p class="empty-state"', start)
old = text[start:end]
# Keep the specifically requested activity photos as additional Adventure choices.
activities = re.findall(r'        <article[^\n]+adventure-(?:rafting|bungee|skydiving)\.png[^\n]+</article>', old)
assert len(activities) == 3
cards = []
for p in catalog:
    name = esc(p['name'])
    target = 'login.html?next=trip-planner.html&amp;destination=' + urllib.parse.quote(p['name'])
    cards.append(f'''        <article class="destination-card" data-tags="{esc(p['tags'])}" data-search="{esc(p['name'] + ' ' + p['country'] + ' ' + p['aliases'])}">
          <img src="{esc(p['image'])}" alt="{esc(p['alt'])}" loading="lazy" decoding="async" width="960" height="640">
          <span class="explore-place-name">{name}<small>{esc(p['country'])}</small></span>
          <a class="destination-hitarea" href="{target}" aria-label="Plan a trip to {name}"></a>
          <button class="save-destination" type="button" data-favorite-toggle data-destination="{name}" aria-label="Save {name}" aria-pressed="false">♡</button>
        </article>''')
replacement = '      <div class="destination-grid" id="destination-grid">\n' + '\n'.join(cards + activities) + '\n      </div>\n'
text = text[:start] + replacement + text[end:]
text = re.sub(r'\n      <details class="destination-photo-credits">[\s\S]*?</details>', '', text)
credits = ['      <details class="destination-photo-credits"><summary>Destination photo credits &amp; sources</summary><ul>']
for p in catalog:
    license_link = f'<a href="{esc(p["licenseUrl"])}" target="_blank" rel="noopener noreferrer">{esc(p["license"])}</a>' if p['licenseUrl'] else esc(p['license'])
    credits.append(f'        <li><a href="{esc(p["photoSource"])}" target="_blank" rel="noopener noreferrer">{esc(p["name"])} photo</a> — {esc(p["author"])} · {license_link}. <a href="{esc(p["source"])}" target="_blank" rel="noopener noreferrer">Place information</a></li>')
credits.append('      </ul></details>')
marker='      <p class="empty-state" id="empty-state" hidden>No destinations match that search. Try a different place or category.</p>'
assert marker in text
text=text.replace(marker, marker+'\n'+'\n'.join(credits), 1)
page.write_text(text, encoding='utf-8')

script=ROOT / 'site.js'
js=script.read_text(encoding='utf-8')
marker='    const memoryStore = new Map();'
assert marker in js
js = re.sub(r'    // Local Wikimedia destination catalog;[\s\S]*?(?=    const memoryStore = new Map\(\);)', '', js)
public_fields=['name','country','image','alt','description','photoSource','author','license','licenseUrl']
data=[{k:p[k] for k in public_fields} for p in catalog]
addition='''    // Local Wikimedia destination catalog; photo credits live in destinations.html.
    const destinationCatalog = %s;
    destinationCatalog.forEach((place) => {
        const existing = destinations.find((item) => item.name === place.name);
        if (existing) Object.assign(existing, place);
        else destinations.push(place);
    });

''' % json.dumps(data,ensure_ascii=False,indent=4)
js=js.replace(marker,addition+marker,1)
old='''                    const matchesText = (card.textContent + " " + imageAlt).toLocaleLowerCase().includes(query);'''
new='''                    const normalize = (value) => value.normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").toLocaleLowerCase();
                    const haystack = normalize(card.textContent + " " + imageAlt + " " + (card.dataset.search || ""));
                    const matchesText = normalize(query).split(/\\s+/).every((term) => haystack.includes(term));'''
assert old in js or new in js
js=js.replace(old,new,1)
script.write_text(js,encoding='utf-8')
print('Built 100 searchable destination cards, three activity cards, source credits, and Saved catalog entries.')
