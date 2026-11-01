// Exercise the actual planner and My Trips handlers with persistent JSON storage.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const source = fs.readFileSync('site.js', 'utf8');
const chunk = (start, end) => source.slice(source.indexOf(start), source.indexOf(end, source.indexOf(start)));
const code = chunk('    function readJSON(', '    function removeStored(')
    + chunk('    function initPlanner(', '    function createDestinationCard(')
    + chunk('    function initTripsPage(', '    function initProfilePage(');
class Element {
    constructor(tag = 'div') { this.tag = tag; this.children = []; this.dataset = {}; this.events = {}; this.textContent = ''; }
    append(...children) { this.children.push(...children); }
    replaceChildren() { this.children = []; }
    addEventListener(type, fn) { this.events[type] = fn; }
    click() { this.clicked = true; }
    remove() {}
}
const text = (node) => typeof node === 'string' ? node : node.textContent + node.children.map(text).join(' ');
const storage = new Map();
function setup(values = {}, failWrites = false) {
    const list = new Element();
    const destination = { value: values.destination || '' };
    const selected = [{ textContent: 'Culture' }, { textContent: 'Food' }];
    const form = new Element('form');
    form.reportValidity = () => true;
    form.querySelector = (selector) => selector === '#destination' ? destination : null;
    form.querySelectorAll = (selector) => selector === '[data-interest].selected' ? selected : [];
    const events = {};
    const toasts = [];
    let exported;
    const document = {
        body: new Element('body'), createElement: (tag) => new Element(tag),
        querySelector: (selector) => ({ '#trip-form': form, '#trip-list': list }[selector] || null)
    };
    document.body.classList = { contains: () => false };
    const window = {
        location: { search: '', href: 'trip-planner.html' },
        localStorage: {
            getItem: (key) => storage.get(key) ?? null,
            setItem: (key, value) => { if (failWrites) throw Error('Storage full'); storage.set(key, value); }
        }, addEventListener: (type, fn) => { events[type] = fn; }, setTimeout: (fn) => fn()
    };
    const context = vm.createContext({ document, window, keys: { trips: 'gomigo.trips', flash: 'gomigo.flash-message' },
        memoryStore: new Map(), showToast: (message) => toasts.push(message), URLSearchParams, Blob,
        URL: { createObjectURL: (blob) => { exported = blob; return 'blob:test'; }, revokeObjectURL() {} },
        FormData: class { get(key) { return values[key] ?? null; } }
    });
    vm.runInContext(code, context);
    return { context, list, form, window, events, toasts, exported: () => exported };
}
(async () => {
    const values = { destination: '  Jaipur  ', dates: '15–18 Dec 2026', duration: '4 Days', travelers: '2 Travelers', style: 'Balanced', budget: '5000', requests: 'Leave time for markets.' };
    let run = setup(values);
    vm.runInContext('initPlanner()', run.context);
    run.form.events.submit({ preventDefault() {} });
    assert.equal(run.window.location.href, 'my-trips.html');
    let trips = JSON.parse(storage.get('gomigo.trips'));
    assert.equal(trips[0].destination, 'Jaipur');
    assert.equal(trips[0].budget, 5000);
    assert.equal(trips[0].schemaVersion, 1);
    assert.deepEqual(trips[0].interests, ['Culture', 'Food']);
    assert(trips[0].createdAtISO);
    // A second independent page context must preserve the first trip.
    run = setup({ ...values, destination: 'Kyoto' });
    vm.runInContext('initPlanner()', run.context);
    run.form.events.submit({ preventDefault() {} });
    assert.equal(JSON.parse(storage.get('gomigo.trips')).length, 2);
    run = setup();
    vm.runInContext('initTripsPage()', run.context);
    assert.equal(run.list.children.length, 2);
    assert(text(run.list).includes('Jaipur') && text(run.list).includes('Kyoto'));
    assert(text(run.list).includes('Leave time for markets.'));
    const remove = run.list.children[0].children.find((child) => child.dataset?.removeTrip);
    run.list.events.click({ target: { closest: () => remove } });
    assert.equal(JSON.parse(storage.get('gomigo.trips')).length, 1);
    run = setup();
    vm.runInContext('initTripsPage()', run.context);
    assert.equal(run.list.children.length, 1);
    assert(text(run.list).includes('Jaipur'));
    // A storage event from another tab refreshes the list and empty state.
    storage.set('gomigo.trips', '[]');
    run.events.storage({ key: 'gomigo.trips' });
    assert(text(run.list).includes('No trips saved yet'));
    storage.set('gomigo.trips', '{invalid-json');
    run.events.pageshow();
    assert(text(run.list).includes('No trips saved yet'));
    run = setup(values, true);
    vm.runInContext('initPlanner()', run.context);
    run.form.events.submit({ preventDefault() {} });
    assert.equal(run.window.location.href, 'trip-planner.html');
    assert(run.toasts.some((message) => message.includes('could not be saved')));
    console.log('PASS: planner → JSON storage → My Trips; reload, multiple trips, requests, removal, cross-tab refresh, corrupt storage, and failed-save handling.');
})().catch((error) => { console.error(error); process.exitCode = 1; });
