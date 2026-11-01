# Destination photo catalog

The public `destinations.html` gallery contains 100 places and three additional
Adventure activity cards. Place, country, and alternate names are searchable;
category filters still apply to search results. Photos load lazily from local
files, so visitors do not need a live Wikipedia/Wikimedia connection.

## Sources and credits

`explore_assets/destinations/catalog.json` records each place's Wikipedia source,
the Commons photo page, photographer/artist, individual license and license URL,
and the downloaded image URL. The gallery's expandable photo credits reproduce
these credits and links. Descriptions in the Saved registry are original short
labels rather than copied article excerpts. Some photos depict a recognizable
landmark or nearby scenic attraction within the destination.

## Maintenance

These are optional local authoring tools, not a backend or runtime dependency:

1. `python tools/import_destinations.py` collects and caches photos and metadata.
   This needs network access. Inspect the resulting photos and sources before
   building; maps and flags should be replaced with a suitable landmark article.
2. `python tools/build_destination_gallery.py` publishes the checked 100-place
   catalog to the static HTML and the existing shared `site.js` Saved registry.
3. `node tools/check_destination_gallery.cjs` checks catalog size, local images,
   the real search/filter code, Saved lookups, and the public Travel Guide route.

The landing-page Travel Guide intentionally stays on `travel-guide-preview.html`
for signed-in and signed-out visitors. It has no sidebar redirect. The separate
sidebar workspace page remains available from app navigation.
