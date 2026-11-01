"""Build the local destination photo catalog from Wikimedia (manual maintenance)."""
import concurrent.futures
import html
import json
import re
import time
import urllib.parse
import urllib.request
import urllib.error
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'explore_assets/destinations'
UA = {'User-Agent': 'GoMigoStudentProject/1.0 (educational travel gallery; Wikimedia photo attribution retained)'}
# Display name | country | Wikipedia article | categories | alternate search names
ROWS = '''Paris|France|Paris|city culture|
Agra|India|Agra|culture|Taj Mahal
Rome|Italy|Rome|city culture|Colosseum
Dubai|United Arab Emirates|Dubai Marina|city adventure|UAE Burj Khalifa
Santorini|Greece|Santorini|beach culture|
Colombo|Sri Lanka|Colombo|city beach|
London|United Kingdom|London|city culture|England UK
Barcelona|Spain|Barcelona|city beach culture|
Madrid|Spain|Madrid|city culture|
Lisbon|Portugal|Lisbon|city culture|
Porto|Portugal|Porto|city culture|
Amsterdam|Netherlands|Amsterdam|city culture|Holland
Prague|Czech Republic|Prague|city culture|Czechia
Vienna|Austria|Vienna|city culture|
Budapest|Hungary|Budapest|city culture|
Venice|Italy|Venice|city culture|
Florence|Italy|Florence|city culture|
Athens|Greece|Athens|city culture|Acropolis
Istanbul|Turkey|Istanbul|city culture|Turkiye
Cappadocia|Turkey|Cappadocia|adventure culture|hot air balloon
Reykjavik|Iceland|Reykjavík|city adventure|Reykjavík
Kirkjufell|Iceland|Kirkjufell|mountains adventure|
Zermatt|Switzerland|Zermatt|mountains adventure|Matterhorn Swiss Alps
Interlaken|Switzerland|Interlaken|mountains adventure|Swiss Alps
Lucerne|Switzerland|Lucerne|mountains culture|Luzern
Grindelwald|Switzerland|Grindelwald|mountains adventure|
Chamonix|France|Chamonix|mountains adventure|Mont Blanc
Dolomites|Italy|Dolomites|mountains adventure|
Bergen|Norway|Bergen|city mountains|
Lofoten|Norway|Lofoten|mountains adventure|
Stockholm|Sweden|Stockholm|city culture|
Copenhagen|Denmark|Copenhagen|city culture|
Edinburgh|United Kingdom|Edinburgh|city culture|Scotland
Dublin|Ireland|Dublin|city culture|
Dubrovnik|Croatia|Dubrovnik|beach culture|
Split|Croatia|Split, Croatia|beach city|
Nice|France|Nice|beach city|French Riviera
Amalfi|Italy|Amalfi|beach culture|Amalfi Coast
Mykonos|Greece|Mykonos|beach|
Madeira|Portugal|Madeira|mountains adventure beach|
Tokyo|Japan|Tokyo|city culture|
Kyoto|Japan|Kyoto|city culture|
Osaka|Japan|Osaka|city culture|
Mount Fuji|Japan|Mount Fuji|mountains adventure|Fujisan
Seoul|South Korea|Seoul|city culture|Korea
Busan|South Korea|Busan|beach city|
Beijing|China|Beijing|city culture|Peking
Shanghai|China|Shanghai|city|
Hong Kong|China|Hong Kong|city adventure|
Singapore|Singapore|Singapore|city culture|
Bangkok|Thailand|Bangkok|city culture|
Phuket|Thailand|Phuket province|beach adventure|
Krabi|Thailand|Krabi province|beach adventure|
Chiang Mai|Thailand|Chiang Mai|culture mountains|
Bali|Indonesia|Bali|beach culture adventure|Denpasar
Ubud|Indonesia|Ubud|culture adventure|Bali
Lombok|Indonesia|Lombok|beach adventure|
Hanoi|Vietnam|Hanoi|city culture|
Ha Long Bay|Vietnam|Hạ Long Bay|beach adventure|Halong Ha Long
Hoi An|Vietnam|Hội An|culture city|Hoi An
Siem Reap|Cambodia|Siem Reap|culture|Angkor Wat
Kuala Lumpur|Malaysia|Kuala Lumpur|city culture|KL
Langkawi|Malaysia|Langkawi|beach adventure|
Maldives|Maldives|Maldives|beach|
Kathmandu|Nepal|Kathmandu|culture city|
Pokhara|Nepal|Pokhara|mountains adventure|Himalayas
Paro|Bhutan|Paro, Bhutan|mountains culture|
Jaipur|India|Jaipur|culture city|Pink City Rajasthan
Udaipur|India|Udaipur|culture city|Rajasthan
Delhi|India|Delhi|city culture|New Delhi
Mumbai|India|Mumbai|city culture|Bombay
Goa|India|Goa|beach culture|
Manali|India|Manali, Himachal Pradesh|mountains adventure|Himachal Pradesh
Shimla|India|Shimla|mountains culture|Himachal Pradesh
Leh|India|Leh|mountains adventure|Ladakh
Rishikesh|India|Rishikesh|adventure culture|rafting Ganges Uttarakhand
Munnar|India|Munnar|mountains adventure|Kerala tea gardens
Alappuzha|India|Alappuzha|culture beach|Alleppey Kerala backwaters
Varanasi|India|Varanasi|culture city|Banaras Kashi
Darjeeling|India|Darjeeling|mountains culture|West Bengal
New York City|United States|New York City|city culture|NYC USA America
San Francisco|United States|San Francisco|city culture|California USA
Los Angeles|United States|Los Angeles|city beach|LA California USA
Honolulu|United States|Honolulu|beach adventure|Hawaii USA
Banff|Canada|Banff, Alberta|mountains adventure|Canadian Rockies
Vancouver|Canada|Vancouver|city mountains|
Toronto|Canada|Toronto|city culture|
Quebec City|Canada|Quebec City|city culture|Québec
Cancun|Mexico|Cancún|beach|Cancún
Mexico City|Mexico|Mexico City|city culture|
Rio de Janeiro|Brazil|Rio de Janeiro|beach city adventure|
Cusco|Peru|Cusco|mountains culture|Cuzco
Machu Picchu|Peru|Machu Picchu|mountains culture adventure|
Cape Town|South Africa|Cape Town|mountains beach city|
Marrakech|Morocco|Marrakesh|city culture|Marrakesh
Cairo|Egypt|Cairo|city culture|Giza Pyramids
Sydney|Australia|Sydney|city beach|
Melbourne|Australia|Melbourne|city culture|
Queenstown|New Zealand|Queenstown, New Zealand|mountains adventure|bungee skydiving
Auckland|New Zealand|Auckland|city beach|'''

def get(url, raw=False):
    for attempt in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=45) as r:
                data = r.read()
                return data if raw else json.loads(data)
        except Exception as error:
            if isinstance(error, urllib.error.HTTPError) and error.code in (400, 404): raise
            if attempt == 3: raise
            time.sleep(10 * (attempt + 1))

def fetch(row):
    name, country, article, tags, aliases = row.split('|')
    article = {'Santorini': 'Oia, Greece', 'Dubai': 'Dubai Marina', 'Madeira': 'Funchal',
               'Maldives': 'Malé', 'Lofoten': 'Reine, Norway', 'Goa': 'Palolem Beach',
               'Bali': 'Pura Ulun Danu Bratan', 'Lombok': 'Mount Rinjani',
               'Krabi': 'Railay Beach', 'Phuket': 'Patong', 'Mykonos': 'Mykonos windmills',
               'Hong Kong': 'Victoria Peak', 'Singapore': 'Gardens by the Bay',
               'Lucerne': 'Lake Lucerne', 'Hoi An': 'Hội An Old Town'}.get(name, article)
    slug = re.sub('[^a-z0-9]+', '-', name.lower()).strip('-')
    cache = OUT / (slug + '.json')
    if cache.exists():
        cached = json.loads(cache.read_text(encoding='utf-8'))
        cached_article = cached.get('photoArticle', urllib.parse.unquote(cached['source'].rsplit('/', 1)[-1]).replace('_', ' '))
        if '.svg' not in cached['remoteImage'].lower() and cached_article == article: return cached
    time.sleep(2)
    summary = get('https://en.wikipedia.org/api/rest_v1/page/summary/' + urllib.parse.quote(article.replace(' ', '_'), safe=''))
    image = summary.get('thumbnail', {}).get('source')
    if not image: raise ValueError('No photograph: ' + name)
    image = re.sub(r'/\d+px-', '/960px-', image)
    original_path = urllib.parse.urlsplit(summary['originalimage']['source']).path
    filename = urllib.parse.unquote(original_path.split('/')[-2] if '/thumb/' in original_path else original_path.rsplit('/', 1)[-1])
    params = urllib.parse.urlencode({'action': 'query', 'format': 'json', 'redirects': '1', 'titles': 'File:' + filename, 'prop': 'imageinfo', 'iiprop': 'extmetadata|url'})
    meta = get('https://commons.wikimedia.org/w/api.php?' + params)
    pages = list(meta['query']['pages'].values())
    info = pages[0].get('imageinfo', [{}])[0]
    ext = info.get('extmetadata', {})
    clean = lambda text: html.unescape(re.sub('<[^>]+>', '', text)).strip()
    author = clean(ext.get('Artist', {}).get('value', ''))
    # This older Commons file credits its photographer in the page prose.
    if not author and filename == 'Patong_Beach.jpg': author = 'Thorfinn Stainforth'
    license_name = clean(ext.get('LicenseShortName', {}).get('value', ''))
    if not license_name: raise ValueError('Missing license: ' + name)
    photo = OUT / (slug + '.jpg')
    photo.write_bytes(get(image, raw=True))
    entry = dict(name=name, country=country, tags=tags, aliases=aliases,
                 image='explore_assets/destinations/' + photo.name,
                 alt=name + ', ' + country + ': destination photograph',
                 description='Explore ' + name + ', ' + country + '.',
                 source=summary['content_urls']['desktop']['page'], photoSource=info['descriptionurl'],
                 author=author, license=license_name,
                 licenseUrl=ext.get('LicenseUrl', {}).get('value', ''), remoteImage=image, photoArticle=article)
    cache.write_text(json.dumps(entry, ensure_ascii=False, indent=2), encoding='utf-8')
    return entry

if __name__ == '__main__':
    rows = ROWS.splitlines()
    assert len(rows) == 100, len(rows)
    entries, failures = [], []
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        jobs = {pool.submit(fetch, row): row for row in rows}
        for job in concurrent.futures.as_completed(jobs):
            try:
                result = job.result(); entries.append(result)
                print('OK', result['name'], flush=True)
            except Exception as e:
                failures.append(jobs[job].split('|')[0]); print('FAILED', jobs[job].split('|')[0], str(e), flush=True)
    order = {row.split('|')[0]: i for i, row in enumerate(rows)}
    entries.sort(key=lambda p: order[p['name']])
    (OUT / 'catalog.json').write_text(json.dumps(entries, ensure_ascii=False, indent=2), encoding='utf-8')
    print('COMPLETE', len(entries), 'FAILURES', failures, flush=True)
