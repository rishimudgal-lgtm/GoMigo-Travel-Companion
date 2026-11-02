(() => {
    "use strict";

    const keys = {
        user: "gomigo.user",
        profile: "gomigo.profile",
        trips: "gomigo.trips",
        saved: "gomigo.saved-destinations",
        flash: "gomigo.flash-message"
    };

    const destinations = [
        { name: "Rishikesh", image: "explore_assets/adventure-rafting.png", description: "Whitewater rafting on the Ganges beneath green Himalayan foothills.", alt: "Whitewater rafting in Rishikesh" },
        { name: "Greece", image: "main-menu-assets/greece.png", description: "Islands, culture and sunsets" },
        { name: "Switzerland", image: "main-menu-assets/switzerland.png", description: "Mountains, lakes and more" },
        { name: "Japan", image: "main-menu-assets/japan.png", description: "Tradition meets modern" },
        { name: "Jaipur", image: "main-menu-assets/jaipur.png", description: "Royal charm, vibrant streets" },
        { name: "Paris", image: "explore_assets/paris.png", description: "The city of light, art, and endless little cafés.", alt: "Paris and the Eiffel Tower" },
        { name: "Agra", image: "explore_assets/india.png", description: "Timeless architecture and stories carved in stone.", alt: "The Taj Mahal in Agra" },
        { name: "Rome", image: "explore_assets/colosseum.png", description: "Ancient wonders, lively piazzas, and la dolce vita.", alt: "The Colosseum in Rome" },
        { name: "Dubai", image: "explore_assets/burjKhalifa.png", description: "A global city with iconic sights and desert adventures.", alt: "Burj Khalifa in Dubai" },
        { name: "Santorini", image: "explore_assets/santorini.png", description: "Whitewashed villages above a brilliant blue sea.", alt: "Santorini on the Aegean Sea" },
        { name: "Colombo", image: "explore_assets/colombo.png", description: "A lively coastal city with golden beaches and rich history.", alt: "Colombo waterfront in Sri Lanka" },
        { name: "Canada", image: "explore_assets/canada.png", description: "Wide-open landscapes, welcoming cities, and fresh air.", alt: "A Canadian travel destination" },
        { name: "Iceland", image: "explore_assets/iceland.png", description: "Dramatic coastlines, waterfalls, and volcanic landscapes.", alt: "An Icelandic landscape" },
        { name: "Portugal", image: "explore_assets/portugal.png", description: "Coastal towns, tiled streets, and long, relaxed meals.", alt: "A destination in Portugal" },
        { name: "Kyoto", image: "explore_assets/japan.png", description: "Quiet temples, gardens, and lanes rich with history.", alt: "Traditional Japanese streets and mountain scenery" },
        { name: "Lucerne", image: "main-menu-assets/switzerland.png", description: "Lake views, mountain railways, and a charming old town.", alt: "A Swiss alpine lake and mountain village" },
        { name: "Cairo", image: "landing_assets/Pyramids.png", description: "Ancient landmarks, Nile evenings, and bustling markets.", alt: "The pyramids of Egypt" },
        {"name": "Pisa", "image": "explore_assets/destinations/pisa.jpg", "description": "Explore Pisa, Italy.", "alt": "Pisa, Italy: destination photograph", "photoSource": "https://commons.wikimedia.org/wiki/File:Italy_-_Pisa_-_Leaning_Tower.jpg", "author": "Arne Müseler", "license": "CC BY-SA 3.0 de", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0/de/deed.en"},
        { name: "Bali", image: "explore_assets/beach.png", description: "Green rice terraces, coastal sunsets, and a slower island rhythm.", alt: "A tropical beach for a Bali getaway" },
        { name: "Marrakech", image: "explore_assets/culture.png", description: "Garden courtyards, tiled architecture, and the old medina.", alt: "Cultural details for a Marrakech trip" },
        { name: "Bangkok", image: "explore_assets/dining.png", description: "Street food, river temples, and energetic neighborhoods.", alt: "Food and city inspiration for Bangkok" },
        { name: "Queenstown", image: "explore_assets/adventure.png", description: "Alpine lakes, dramatic peaks, and days made for the outdoors.", alt: "Mountain scenery for a Queenstown escape" },
        { name: "Cape Town", image: "explore_assets/colombo.png", description: "Ocean drives, mountain views, and a vibrant waterfront.", alt: "Coastal city scenery for Cape Town inspiration" },
        { name: "Vancouver", image: "explore_assets/canada.png", description: "A lively city framed by forest, water, and mountain trails.", alt: "A Canadian landscape for Vancouver travel inspiration" },
        { name: "Lisbon", image: "explore_assets/portugal.png", description: "Hillside viewpoints, tiled streets, and long, relaxed meals.", alt: "Colorful streets in Portugal" }
    ];
    // Local destination catalog shared by search suggestions and Explore.
    const destinationCatalog = [
    {
        "name": "Paris",
        "country": "France",
        "image": "explore_assets/destinations/paris.jpg",
        "alt": "Paris, France: destination photograph",
        "description": "Explore Paris, France.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques,_Paris_ao%C3%BBt_2014_(2).jpg",
        "author": "Yann Caradec from Paris, France",
        "license": "CC BY-SA 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    },
    {
        "name": "Agra",
        "country": "India",
        "image": "explore_assets/destinations/agra.jpg",
        "alt": "Agra, India: destination photograph",
        "description": "Explore Agra, India.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Taj_Mahal,_Agra,_India.jpg",
        "author": "Yann (talk)",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Rome",
        "country": "Italy",
        "image": "explore_assets/destinations/rome.jpg",
        "alt": "Rome, Italy: destination photograph",
        "description": "Explore Rome, Italy.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Trevi_Fountain,_Rome,_Italy_2_-_May_2007.jpg",
        "author": "Diliff",
        "license": "CC BY 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/3.0"
    },
    {
        "name": "Dubai",
        "country": "United Arab Emirates",
        "image": "explore_assets/destinations/dubai.jpg",
        "alt": "Dubai, United Arab Emirates: destination photograph",
        "description": "Explore Dubai, United Arab Emirates.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Dubai_Marina_Skyline.jpg",
        "author": "Norlando Pobre",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
        "name": "Santorini",
        "country": "Greece",
        "image": "explore_assets/destinations/santorini.jpg",
        "alt": "Santorini, Greece: destination photograph",
        "description": "Explore Santorini, Greece.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Oia_sunset_-_panoramio_(2).jpg",
        "author": "TomasEE",
        "license": "CC BY 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/3.0"
    },
    {
        "name": "Colombo",
        "country": "Sri Lanka",
        "image": "explore_assets/destinations/colombo.jpg",
        "alt": "Colombo, Sri Lanka: destination photograph",
        "description": "Explore Colombo, Sri Lanka.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Colombo_city_skyline_at_night.png",
        "author": "Gihanud2001",
        "license": "CC0",
        "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
    },
    {
        "name": "London",
        "country": "United Kingdom",
        "image": "explore_assets/destinations/london.jpg",
        "alt": "London, United Kingdom: destination photograph",
        "description": "Explore London, United Kingdom.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:London_Skyline_(125508655).jpeg",
        "author": "Ilya Grigorik",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    {
        "name": "Barcelona",
        "country": "Spain",
        "image": "explore_assets/destinations/barcelona.jpg",
        "alt": "Barcelona, Spain: destination photograph",
        "description": "Explore Barcelona, Spain.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Evening_light_over_Barcelona.jpg",
        "author": "M McBey",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
        "name": "Madrid",
        "country": "Spain",
        "image": "explore_assets/destinations/madrid.jpg",
        "alt": "Madrid, Spain: destination photograph",
        "description": "Explore Madrid, Spain.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Madrid_-_Sky_Bar_360%C2%BA_(Hotel_Riu_Plaza_Espa%C3%B1a),_vistas_19.jpg",
        "author": "Zarateman",
        "license": "CC0",
        "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
    },
    {
        "name": "Lisbon",
        "country": "Portugal",
        "image": "explore_assets/destinations/lisbon.jpg",
        "alt": "Lisbon, Portugal: destination photograph",
        "description": "Explore Lisbon, Portugal.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Lisboa_-_Portugal_(52597836992).jpg",
        "author": "Vitor Oliveira from Torres Vedras, PORTUGAL",
        "license": "CC BY-SA 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    },
    {
        "name": "Porto",
        "country": "Portugal",
        "image": "explore_assets/destinations/porto.jpg",
        "alt": "Porto, Portugal: destination photograph",
        "description": "Explore Porto, Portugal.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Puente_Don_Luis_I,_Oporto,_Portugal,_2012-05-09,_DD_13.JPG",
        "author": "Diego Delso",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    {
        "name": "Amsterdam",
        "country": "Netherlands",
        "image": "explore_assets/destinations/amsterdam.jpg",
        "alt": "Amsterdam, Netherlands: destination photograph",
        "description": "Explore Amsterdam, Netherlands.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Amsterdam_Canals_(23585867048).jpg",
        "author": "Billie Grace Ward from New York, USA",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
        "name": "Prague",
        "country": "Czech Republic",
        "image": "explore_assets/destinations/prague.jpg",
        "alt": "Prague, Czech Republic: destination photograph",
        "description": "Explore Prague, Czech Republic.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Prague_(6365119737).jpg",
        "author": "Moyan Brenn from Italy",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
        "name": "Vienna",
        "country": "Austria",
        "image": "explore_assets/destinations/vienna.jpg",
        "alt": "Vienna, Austria: destination photograph",
        "description": "Explore Vienna, Austria.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Schoenbrunn_philharmoniker_2012.jpg",
        "author": "Superbass",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    {
        "name": "Budapest",
        "country": "Hungary",
        "image": "explore_assets/destinations/budapest.jpg",
        "alt": "Budapest, Hungary: destination photograph",
        "description": "Explore Budapest, Hungary.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:View_from_Gell%C3%A9rt_Hill_to_the_Danube,_Hungary_-_Budapest_(28493220635).jpg",
        "author": "Visions of Domino",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
        "name": "Venice",
        "country": "Italy",
        "image": "explore_assets/destinations/venice.jpg",
        "alt": "Venice, Italy: destination photograph",
        "description": "Explore Venice, Italy.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Venezia_aerial_view.jpg",
        "author": "kallerna",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Florence",
        "country": "Italy",
        "image": "explore_assets/destinations/florence.jpg",
        "alt": "Florence, Italy: destination photograph",
        "description": "Explore Florence, Italy.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Firenze_-_Piazzale_Michelangelo,_Firenze,_Italy_-_April_6,_2015_02.jpg",
        "author": "Giorgio Galeotti",
        "license": "CC BY 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/4.0"
    },
    {
        "name": "Athens",
        "country": "Greece",
        "image": "explore_assets/destinations/athens.jpg",
        "alt": "Athens, Greece: destination photograph",
        "description": "Explore Athens, Greece.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Athens_Acropolis_at_Daybreak.jpg",
        "author": "Andrew Parlette",
        "license": "CC BY 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/4.0"
    },
    {
        "name": "Istanbul",
        "country": "Turkey",
        "image": "explore_assets/destinations/istanbul.jpg",
        "alt": "Istanbul, Turkey: destination photograph",
        "description": "Explore Istanbul, Turkey.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Historical_peninsula_and_modern_skyline_of_Istanbul.jpg",
        "author": "Hunanuk",
        "license": "CC0",
        "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
    },
    {
        "name": "Cappadocia",
        "country": "Turkey",
        "image": "explore_assets/destinations/cappadocia.jpg",
        "alt": "Cappadocia, Turkey: destination photograph",
        "description": "Explore Cappadocia, Turkey.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Cappadocia_balloon_trip,_Ortahisar_Castle_(11893715185).jpg",
        "author": "Arian Zwegers from Brussels, Belgium",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
        "name": "Reykjavik",
        "country": "Iceland",
        "image": "explore_assets/destinations/reykjavik.jpg",
        "alt": "Reykjavik, Iceland: destination photograph",
        "description": "Explore Reykjavik, Iceland.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Reykjav%C3%ADk,_view_from_Hallgr%C3%ADmskirkja_(2).jpg",
        "author": "Olga Ernst",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Kirkjufell",
        "country": "Iceland",
        "image": "explore_assets/destinations/kirkjufell.jpg",
        "alt": "Kirkjufell, Iceland: destination photograph",
        "description": "Explore Kirkjufell, Iceland.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Kirkjufell_in_Iceland.jpg",
        "author": "Anjali Kiggal",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Zermatt",
        "country": "Switzerland",
        "image": "explore_assets/destinations/zermatt.jpg",
        "alt": "Zermatt, Switzerland: destination photograph",
        "description": "Explore Zermatt, Switzerland.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:1_zermatt_evening_2022.jpg",
        "author": "Chensiyuan",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Interlaken",
        "country": "Switzerland",
        "image": "explore_assets/destinations/interlaken.jpg",
        "alt": "Interlaken, Switzerland: destination photograph",
        "description": "Explore Interlaken, Switzerland.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Goldswil-Viadukt_Panorama_mit_Interlaken_im_Hintergrund_2.jpg",
        "author": "Rectilinium",
        "license": "CC0",
        "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
    },
    {
        "name": "Lucerne",
        "country": "Switzerland",
        "image": "explore_assets/destinations/lucerne.jpg",
        "alt": "Lucerne, Switzerland: destination photograph",
        "description": "Explore Lucerne, Switzerland.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Vierwaldstaettersee.jpg",
        "author": "Ttrainer",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    {
        "name": "Grindelwald",
        "country": "Switzerland",
        "image": "explore_assets/destinations/grindelwald.jpg",
        "alt": "Grindelwald, Switzerland: destination photograph",
        "description": "Explore Grindelwald, Switzerland.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Grindelwald_View_02.jpg",
        "author": "Cristo Vlahos",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    {
        "name": "Chamonix",
        "country": "France",
        "image": "explore_assets/destinations/chamonix.jpg",
        "alt": "Chamonix, France: destination photograph",
        "description": "Explore Chamonix, France.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Chamonix_valley_from_la_Fl%C3%A9g%C3%A8re,2010_07.JPG",
        "author": "Ximonic, Simo Räsänen",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    {
        "name": "Dolomites",
        "country": "Italy",
        "image": "explore_assets/destinations/dolomites.jpg",
        "alt": "Dolomites, Italy: destination photograph",
        "description": "Explore Dolomites, Italy.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Faloria_Cortina_d%27Ampezzo_10.jpg",
        "author": "kallerna",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Bergen",
        "country": "Norway",
        "image": "explore_assets/destinations/bergen.jpg",
        "alt": "Bergen, Norway: destination photograph",
        "description": "Explore Bergen, Norway.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Bergen_panorama_at_night_-_panoramio_(1).jpg",
        "author": "TomasEE",
        "license": "CC BY 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/3.0"
    },
    {
        "name": "Lofoten",
        "country": "Norway",
        "image": "explore_assets/destinations/lofoten.jpg",
        "alt": "Lofoten, Norway: destination photograph",
        "description": "Explore Lofoten, Norway.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Reine_at_Reinefjorden,_2010_September.jpg",
        "author": "Ximonic (Simo Räsänen)",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    {
        "name": "Stockholm",
        "country": "Sweden",
        "image": "explore_assets/destinations/stockholm.jpg",
        "alt": "Stockholm, Sweden: destination photograph",
        "description": "Explore Stockholm, Sweden.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Munkbroleden_with_Kornhamstorg_at_Gamla_Stan,_Stockholm,_Sweden_01.jpg",
        "author": "OleNeitzel",
        "license": "CC BY 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/4.0"
    },
    {
        "name": "Copenhagen",
        "country": "Denmark",
        "image": "explore_assets/destinations/copenhagen.jpg",
        "alt": "Copenhagen, Denmark: destination photograph",
        "description": "Explore Copenhagen, Denmark.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:2018_-_Christiansborg_from_the_Marble_Bridge.jpg",
        "author": "Moahim",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Edinburgh",
        "country": "United Kingdom",
        "image": "explore_assets/destinations/edinburgh.jpg",
        "alt": "Edinburgh, United Kingdom: destination photograph",
        "description": "Explore Edinburgh, United Kingdom.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Skyline_of_Edinburgh.jpg",
        "author": "Andrew Colin",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
        "name": "Dublin",
        "country": "Ireland",
        "image": "explore_assets/destinations/dublin.jpg",
        "alt": "Dublin, Ireland: destination photograph",
        "description": "Explore Dublin, Ireland.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Dublin_-_aerial_-_2025-07-07_01.jpg",
        "author": "瑞丽江的河水",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Dubrovnik",
        "country": "Croatia",
        "image": "explore_assets/destinations/dubrovnik.jpg",
        "alt": "Dubrovnik, Croatia: destination photograph",
        "description": "Explore Dubrovnik, Croatia.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:The_walls_of_the_fortress_and_View_of_the_old_city._panorama.jpg",
        "author": "Zysko serhii",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Split",
        "country": "Croatia",
        "image": "explore_assets/destinations/split.jpg",
        "alt": "Split, Croatia: destination photograph",
        "description": "Explore Split, Croatia.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Split_080620-133710-IMG_0968x.jpg",
        "author": "Tatyana Peshkova",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Nice",
        "country": "France",
        "image": "explore_assets/destinations/nice.jpg",
        "alt": "Nice, France: destination photograph",
        "description": "Explore Nice, France.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Promenade_des_Anglais_Nice_IMG_1255.jpg",
        "author": "Alexander Migl",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Amalfi",
        "country": "Italy",
        "image": "explore_assets/destinations/amalfi.jpg",
        "alt": "Amalfi, Italy: destination photograph",
        "description": "Explore Amalfi, Italy.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Amalfi_sea_view_Italy.JPG",
        "author": "No machine-readable author provided. Sudodana2048 assumed (based on copyright claims).",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/"
    },
    {
        "name": "Mykonos",
        "country": "Greece",
        "image": "explore_assets/destinations/mykonos.jpg",
        "alt": "Mykonos, Greece: destination photograph",
        "description": "Explore Mykonos, Greece.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Against_Greek_skies,_one_of_the_Mykonos_Island_Windmills,_Chora._Cyclades,_Agean_Sea,_Greece.jpg",
        "author": "Mstyslav Chernov",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    {
        "name": "Madeira",
        "country": "Portugal",
        "image": "explore_assets/destinations/madeira.jpg",
        "alt": "Madeira, Portugal: destination photograph",
        "description": "Explore Madeira, Portugal.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Funchal,_Jardins_da_Quinta_Vigia_(lookout).jpg",
        "author": "Dr. Thomas Liptak",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Tokyo",
        "country": "Japan",
        "image": "explore_assets/destinations/tokyo.jpg",
        "alt": "Tokyo, Japan: destination photograph",
        "description": "Explore Tokyo, Japan.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Skyscrapers_of_Shinjuku_2009_January.jpg",
        "author": "Morio",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/"
    },
    {
        "name": "Kyoto",
        "country": "Japan",
        "image": "explore_assets/destinations/kyoto.jpg",
        "alt": "Kyoto, Japan: destination photograph",
        "description": "Explore Kyoto, Japan.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Kiyomizu-dera,_Kyoto,_November_2016_-02.jpg",
        "author": "Martin Falbisoner",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Osaka",
        "country": "Japan",
        "image": "explore_assets/destinations/osaka.jpg",
        "alt": "Osaka, Japan: destination photograph",
        "description": "Explore Osaka, Japan.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Osaka_Castle_03bs3200.jpg",
        "author": "663highland",
        "license": "CC BY 2.5",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.5"
    },
    {
        "name": "Mount Fuji",
        "country": "Japan",
        "image": "explore_assets/destinations/mount-fuji.jpg",
        "alt": "Mount Fuji, Japan: destination photograph",
        "description": "Explore Mount Fuji, Japan.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:View_of_Mount_Fuji_from_%C5%8Cwakudani_20211202.jpg",
        "author": "Suicasmo",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Seoul",
        "country": "South Korea",
        "image": "explore_assets/destinations/seoul.jpg",
        "alt": "Seoul, South Korea: destination photograph",
        "description": "Explore Seoul, South Korea.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:%EC%A4%91%ED%99%94%EC%A0%84%EC%9D%98_%EB%82%AE.jpg",
        "author": "Eunmi Park",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Busan",
        "country": "South Korea",
        "image": "explore_assets/destinations/busan.jpg",
        "alt": "Busan, South Korea: destination photograph",
        "description": "Explore Busan, South Korea.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Busan_City_Haeundae_District_(01).jpg",
        "author": "부산광역시",
        "license": "KOGL Type 1",
        "licenseUrl": "http://www.kogl.or.kr/info/licenseType1.do"
    },
    {
        "name": "Beijing",
        "country": "China",
        "image": "explore_assets/destinations/beijing.jpg",
        "alt": "Beijing, China: destination photograph",
        "description": "Explore Beijing, China.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Skyline_of_Beijing_CBD_with_B-5906_approaching_(20211016171955)_(1).jpg",
        "author": "N509FZ",
        "license": "CC BY 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/4.0"
    },
    {
        "name": "Shanghai",
        "country": "China",
        "image": "explore_assets/destinations/shanghai.jpg",
        "alt": "Shanghai, China: destination photograph",
        "description": "Explore Shanghai, China.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Huangpu_Park_20124-Shanghai_(32208802494).jpg",
        "author": "xiquinhosilva",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
        "name": "Hong Kong",
        "country": "China",
        "image": "explore_assets/destinations/hong-kong.jpg",
        "alt": "Hong Kong, China: destination photograph",
        "description": "Explore Hong Kong, China.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:High_West_and_Victoria_Peak_from_Victoria_Gap_(crop1).jpg",
        "author": "Daniel Case",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    {
        "name": "Singapore",
        "country": "Singapore",
        "image": "explore_assets/destinations/singapore.jpg",
        "alt": "Singapore, Singapore: destination photograph",
        "description": "Explore Singapore, Singapore.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Supertree_Grove,_Gardens_by_the_Bay,_Singapore_-_20120712-02.jpg",
        "author": "Shiny Things.",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
        "name": "Bangkok",
        "country": "Thailand",
        "image": "explore_assets/destinations/bangkok.jpg",
        "alt": "Bangkok, Thailand: destination photograph",
        "description": "Explore Bangkok, Thailand.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:4Y1A1159_Bangkok_(33536795515).jpg",
        "author": "Ninara from Helsinki, Finland",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
        "name": "Phuket",
        "country": "Thailand",
        "image": "explore_assets/destinations/phuket.jpg",
        "alt": "Phuket, Thailand: destination photograph",
        "description": "Explore Phuket, Thailand.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Patong_Beach.jpg",
        "author": "Thorfinn Stainforth",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/"
    },
    {
        "name": "Krabi",
        "country": "Thailand",
        "image": "explore_assets/destinations/krabi.jpg",
        "alt": "Krabi, Thailand: destination photograph",
        "description": "Explore Krabi, Thailand.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Railay_Beach_5.jpg",
        "author": "kallerna",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    {
        "name": "Chiang Mai",
        "country": "Thailand",
        "image": "explore_assets/destinations/chiang-mai.jpg",
        "alt": "Chiang Mai, Thailand: destination photograph",
        "description": "Explore Chiang Mai, Thailand.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:0020-%E0%B8%A7%E0%B8%B1%E0%B8%94%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%AA%E0%B8%B4%E0%B8%87%E0%B8%AB%E0%B9%8C%E0%B8%A7%E0%B8%A3%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3.jpg",
        "author": "Nawit science",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Bali",
        "country": "Indonesia",
        "image": "explore_assets/destinations/bali.jpg",
        "alt": "Bali, Indonesia: destination photograph",
        "description": "Explore Bali, Indonesia.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Pura_Ulun_Danu_Bratan,_2022.jpg",
        "author": "LukeTriton",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Ubud",
        "country": "Indonesia",
        "image": "explore_assets/destinations/ubud.jpg",
        "alt": "Ubud, Indonesia: destination photograph",
        "description": "Explore Ubud, Indonesia.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Ubud_(49818456887).jpg",
        "author": "Jorge Franganillo",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
        "name": "Lombok",
        "country": "Indonesia",
        "image": "explore_assets/destinations/lombok.jpg",
        "alt": "Lombok, Indonesia: destination photograph",
        "description": "Explore Lombok, Indonesia.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:KAGAGAHAN_RIJANI.jpg",
        "author": "Suryanata budi",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Hanoi",
        "country": "Vietnam",
        "image": "explore_assets/destinations/hanoi.jpg",
        "alt": "Hanoi, Vietnam: destination photograph",
        "description": "Explore Hanoi, Vietnam.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Hanoi_skyline_with_Ba_Vi_Mountain.jpg",
        "author": "Quangnlnhe182394",
        "license": "CC0",
        "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
    },
    {
        "name": "Ha Long Bay",
        "country": "Vietnam",
        "image": "explore_assets/destinations/ha-long-bay.jpg",
        "alt": "Ha Long Bay, Vietnam: destination photograph",
        "description": "Explore Ha Long Bay, Vietnam.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Ha_Long_Bay_in_2019.jpg",
        "author": "Taewangkorea",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Hoi An",
        "country": "Vietnam",
        "image": "explore_assets/destinations/hoi-an.jpg",
        "alt": "Hoi An, Vietnam: destination photograph",
        "description": "Explore Hoi An, Vietnam.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:10549-Hoi-An_(37621348460).jpg",
        "author": "xiquinhosilva",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
        "name": "Siem Reap",
        "country": "Cambodia",
        "image": "explore_assets/destinations/siem-reap.jpg",
        "alt": "Siem Reap, Cambodia: destination photograph",
        "description": "Explore Siem Reap, Cambodia.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Front_porch_of_Wat_Damnak.jpg",
        "author": "Willuconquer",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Kuala Lumpur",
        "country": "Malaysia",
        "image": "explore_assets/destinations/kuala-lumpur.jpg",
        "alt": "Kuala Lumpur, Malaysia: destination photograph",
        "description": "Explore Kuala Lumpur, Malaysia.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Bukit_Bintang_junction_in_2024_2.jpg",
        "author": "Renek78",
        "license": "CC0",
        "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
    },
    {
        "name": "Langkawi",
        "country": "Malaysia",
        "image": "explore_assets/destinations/langkawi.jpg",
        "alt": "Langkawi, Malaysia: destination photograph",
        "description": "Explore Langkawi, Malaysia.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Eagle_square_at_Kuah_Langkawi.jpg",
        "author": "Ttt.Osakanman",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Maldives",
        "country": "Maldives",
        "image": "explore_assets/destinations/maldives.jpg",
        "alt": "Maldives, Maldives: destination photograph",
        "description": "Explore Maldives, Maldives.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Mal%C3%A9.jpg",
        "author": "Shahee Ilyas",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    {
        "name": "Kathmandu",
        "country": "Nepal",
        "image": "explore_assets/destinations/kathmandu.jpg",
        "alt": "Kathmandu, Nepal: destination photograph",
        "description": "Explore Kathmandu, Nepal.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Kathmandu-Durbar_Square-06-Mahavishnu-Kuh-Vishnu-Pratapamalla-Jagannath-2007-gje.jpg",
        "author": "Gerd Eichmann",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Pokhara",
        "country": "Nepal",
        "image": "explore_assets/destinations/pokhara.jpg",
        "alt": "Pokhara, Nepal: destination photograph",
        "description": "Explore Pokhara, Nepal.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Pokhara_Valley.jpg",
        "author": "Utsab Raj Giri",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Paro",
        "country": "Bhutan",
        "image": "explore_assets/destinations/paro.jpg",
        "alt": "Paro, Bhutan: destination photograph",
        "description": "Explore Paro, Bhutan.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Paro,_Paro,_Bhutan_(8026008882).jpg",
        "author": "Christopher Michel",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
        "name": "Jaipur",
        "country": "India",
        "image": "explore_assets/destinations/jaipur.jpg",
        "alt": "Jaipur, India: destination photograph",
        "description": "Explore Jaipur, India.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:East_facade_Hawa_Mahal_Jaipur_from_ground_level_(July_2022)_-_img_01.jpg",
        "author": "Chainwit.",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Udaipur",
        "country": "India",
        "image": "explore_assets/destinations/udaipur.jpg",
        "alt": "Udaipur, India: destination photograph",
        "description": "Explore Udaipur, India.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Evening_view,_City_Palace,_Udaipur.jpg",
        "author": "Geri from Biel/Bienne, Schweiz",
        "license": "CC BY-SA 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    },
    {
        "name": "Delhi",
        "country": "India",
        "image": "explore_assets/destinations/delhi.jpg",
        "alt": "Delhi, India: destination photograph",
        "description": "Explore Delhi, India.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Jama_Masjid_2011.jpg",
        "author": "Marcin Białek",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Mumbai",
        "country": "India",
        "image": "explore_assets/destinations/mumbai.jpg",
        "alt": "Mumbai, India: destination photograph",
        "description": "Explore Mumbai, India.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Mumbai_Bandra-Worli_Sea_Link.jpg",
        "author": "Rutiknatekar",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Goa",
        "country": "India",
        "image": "explore_assets/destinations/goa.jpg",
        "alt": "Goa, India: destination photograph",
        "description": "Explore Goa, India.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Palolem_Beach,_South_Goa.jpg",
        "author": "iMahesh",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Manali",
        "country": "India",
        "image": "explore_assets/destinations/manali.jpg",
        "alt": "Manali, India: destination photograph",
        "description": "Explore Manali, India.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Manali_City.jpg",
        "author": "Neerajsinghazm",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Shimla",
        "country": "India",
        "image": "explore_assets/destinations/shimla.jpg",
        "alt": "Shimla, India: destination photograph",
        "description": "Explore Shimla, India.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Landscape_of_Shimla_,_Himachal_Pradesh.jpg",
        "author": "Navneet Sharma",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Leh",
        "country": "India",
        "image": "explore_assets/destinations/leh.jpg",
        "alt": "Leh, India: destination photograph",
        "description": "Explore Leh, India.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Leh_City_seen_from_Shanti_Stupa.JPG",
        "author": "Anirvan Shukla",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    {
        "name": "Rishikesh",
        "country": "India",
        "image": "explore_assets/destinations/rishikesh.jpg",
        "alt": "Rishikesh, India: destination photograph",
        "description": "Explore Rishikesh, India.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Trayambakeshwar_Temple_VK.jpg",
        "author": "VK1983",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Munnar",
        "country": "India",
        "image": "explore_assets/destinations/munnar.jpg",
        "alt": "Munnar, India: destination photograph",
        "description": "Explore Munnar, India.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Munnar_Overview.jpg",
        "author": "Kondephy",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Alappuzha",
        "country": "India",
        "image": "explore_assets/destinations/alappuzha.jpg",
        "alt": "Alappuzha, India: destination photograph",
        "description": "Explore Alappuzha, India.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Alappuzha_Boat_Beauty_W.jpg",
        "author": "Augustus Binu/ facebook",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    {
        "name": "Varanasi",
        "country": "India",
        "image": "explore_assets/destinations/varanasi.jpg",
        "alt": "Varanasi, India: destination photograph",
        "description": "Explore Varanasi, India.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Varanasi,_India,_Ghats,_Cremation_ceremony_in_progress.jpg",
        "author": "Vyacheslav Argenberg",
        "license": "CC BY 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/4.0"
    },
    {
        "name": "Darjeeling",
        "country": "India",
        "image": "explore_assets/destinations/darjeeling.jpg",
        "alt": "Darjeeling, India: destination photograph",
        "description": "Explore Darjeeling, India.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:DarjeelingTrainFruitshop_(2).jpg",
        "author": "Arne Hückelheim\n\n2010-09-21 12:41:53 This is a cropped in which the glare has been lessened",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "New York City",
        "country": "United States",
        "image": "explore_assets/destinations/new-york-city.jpg",
        "alt": "New York City, United States: destination photograph",
        "description": "Explore New York City, United States.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:View_of_Empire_State_Building_from_Rockefeller_Center_New_York_City_dllu_(cropped).jpg",
        "author": "Dllu",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "San Francisco",
        "country": "United States",
        "image": "explore_assets/destinations/san-francisco.jpg",
        "alt": "San Francisco, United States: destination photograph",
        "description": "Explore San Francisco, United States.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Zeppelin-ride-020100925-195_(5029394846).jpg",
        "author": "Craig Howell from San Carlos, CA, USA",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
        "name": "Los Angeles",
        "country": "United States",
        "image": "explore_assets/destinations/los-angeles.jpg",
        "alt": "Los Angeles, United States: destination photograph",
        "description": "Explore Los Angeles, United States.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Hollywood_sign_(8485145044).jpg",
        "author": "Gnaphron",
        "license": "CC BY-SA 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    },
    {
        "name": "Honolulu",
        "country": "United States",
        "image": "explore_assets/destinations/honolulu.jpg",
        "alt": "Honolulu, United States: destination photograph",
        "description": "Explore Honolulu, United States.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:2022_Views_from_Diamond_Head_02.jpg",
        "author": "Farragutful",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Banff",
        "country": "Canada",
        "image": "explore_assets/destinations/banff.jpg",
        "alt": "Banff, Canada: destination photograph",
        "description": "Explore Banff, Canada.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Town_of_Banff_viewed_from_Sulphur_Mountain.jpg",
        "author": "Ethan Sahagun",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Vancouver",
        "country": "Canada",
        "image": "explore_assets/destinations/vancouver.jpg",
        "alt": "Vancouver, Canada: destination photograph",
        "description": "Explore Vancouver, Canada.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Skyline_of_Vancouver,_Canada.jpg",
        "author": "Quintin Soloviev",
        "license": "CC BY 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/4.0"
    },
    {
        "name": "Toronto",
        "country": "Canada",
        "image": "explore_assets/destinations/toronto.jpg",
        "alt": "Toronto, Canada: destination photograph",
        "description": "Explore Toronto, Canada.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Toronto_Skyline_from_Snake_Island,_September_11_2026_(01).jpg",
        "author": "Dillan Payne",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Quebec City",
        "country": "Canada",
        "image": "explore_assets/destinations/quebec-city.jpg",
        "alt": "Quebec City, Canada: destination photograph",
        "description": "Explore Quebec City, Canada.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Quebec_City_skyline_from_L%C3%A9vis.jpg",
        "author": "Quintin Soloviev",
        "license": "CC BY 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/4.0"
    },
    {
        "name": "Cancun",
        "country": "Mexico",
        "image": "explore_assets/destinations/cancun.jpg",
        "alt": "Cancun, Mexico: destination photograph",
        "description": "Explore Cancun, Mexico.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Cancun_Strand_Luftbild_(22143397586).jpg",
        "author": "dronepicr",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
        "name": "Mexico City",
        "country": "Mexico",
        "image": "explore_assets/destinations/mexico-city.jpg",
        "alt": "Mexico City, Mexico: destination photograph",
        "description": "Explore Mexico City, Mexico.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Sobrevuelos_CDMX_HJ2A4913_(25514321687)_(cropped).jpg",
        "author": "Gobierno CDMX",
        "license": "CC0",
        "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
    },
    {
        "name": "Rio de Janeiro",
        "country": "Brazil",
        "image": "explore_assets/destinations/rio-de-janeiro.jpg",
        "alt": "Rio de Janeiro, Brazil: destination photograph",
        "description": "Explore Rio de Janeiro, Brazil.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Cidade_Maravilhosa.jpg",
        "author": "Rafael Rabello de Barros",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    {
        "name": "Cusco",
        "country": "Peru",
        "image": "explore_assets/destinations/cusco.jpg",
        "alt": "Cusco, Peru: destination photograph",
        "description": "Explore Cusco, Peru.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Vista_Calle_Suecia.jpg",
        "author": "tomscoffin",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
        "name": "Machu Picchu",
        "country": "Peru",
        "image": "explore_assets/destinations/machu-picchu.jpg",
        "alt": "Machu Picchu, Peru: destination photograph",
        "description": "Explore Machu Picchu, Peru.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Machu_Picchu,_2023_(012).jpg",
        "author": "Draceane",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Cape Town",
        "country": "South Africa",
        "image": "explore_assets/destinations/cape-town.jpg",
        "alt": "Cape Town, South Africa: destination photograph",
        "description": "Explore Cape Town, South Africa.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Camps_bay_(53460319478)_(cropped).jpg",
        "author": "Der Berzerker from Washington, DC, USA",
        "license": "CC BY-SA 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    },
    {
        "name": "Marrakech",
        "country": "Morocco",
        "image": "explore_assets/destinations/marrakech.jpg",
        "alt": "Marrakech, Morocco: destination photograph",
        "description": "Explore Marrakech, Morocco.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Marrakech,_Morocco_(5421595453)_(5).jpg",
        "author": "YoTuT from United States",
        "license": "CC BY 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by/2.0"
    },
    {
        "name": "Cairo",
        "country": "Egypt",
        "image": "explore_assets/destinations/cairo.jpg",
        "alt": "Cairo, Egypt: destination photograph",
        "description": "Explore Cairo, Egypt.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Cairo_From_Tower_(cropped).jpg",
        "author": "Wael El Sisi",
        "license": "CC BY-SA 3.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0"
    },
    {
        "name": "Sydney",
        "country": "Australia",
        "image": "explore_assets/destinations/sydney.jpg",
        "alt": "Sydney, Australia: destination photograph",
        "description": "Explore Sydney, Australia.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Sydney_Opera_House_and_Harbour_Bridge_Dusk_(2)_2019-06-21.jpg",
        "author": "Benh LIEU SONG (Flickr)",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Melbourne",
        "country": "Australia",
        "image": "explore_assets/destinations/melbourne.jpg",
        "alt": "Melbourne, Australia: destination photograph",
        "description": "Explore Melbourne, Australia.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Melbourne_skyline_sor.jpg",
        "author": "Melbpal",
        "license": "CC BY-SA 4.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        "name": "Queenstown",
        "country": "New Zealand",
        "image": "explore_assets/destinations/queenstown.jpg",
        "alt": "Queenstown, New Zealand: destination photograph",
        "description": "Explore Queenstown, New Zealand.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Queenstown_1_(8168013172).jpg",
        "author": "Bernard Spragg. NZ from Christchurch, New Zealand",
        "license": "CC0",
        "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en"
    },
    {
        "name": "Auckland",
        "country": "New Zealand",
        "image": "explore_assets/destinations/auckland.jpg",
        "alt": "Auckland, New Zealand: destination photograph",
        "description": "Explore Auckland, New Zealand.",
        "photoSource": "https://commons.wikimedia.org/wiki/File:Auckland_skyline_-_May_2024_(2).jpg",
        "author": "elpinto007",
        "license": "CC BY-SA 2.0",
        "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0"
    }
];
    destinationCatalog.forEach((place) => {
        const existing = destinations.find((item) => item.name === place.name);
        if (existing) Object.assign(existing, place);
        else destinations.push(place);
    });

    // City-specific landmarks and nearby stops for itinerary drafts. Ticket prices
    // are included only where a current official or government source is available.
    const destinationStops = {
        "Paris": ["Eiffel Tower", "Louvre Museum", "Tuileries Garden", "Île de la Cité", "Musée d’Orsay", "Seine riverbanks"],
        "Agra": ["Taj Mahal", "Agra Fort", "Mehtab Bagh", "Itimad-ud-Daulah’s Tomb", "Sadar Bazaar", "Taj Nature Walk"],
        "Rome": ["Colosseum", "Roman Forum", "Trevi Fountain", "Pantheon", "Piazza Navona", "Trastevere"],
        "Dubai": ["Burj Khalifa", "Dubai Mall Fountain", "Al Fahidi Historical Neighbourhood", "Dubai Creek", "Jumeirah Beach", "Souk Madinat Jumeirah"],
        "Santorini": ["Oia Castle viewpoint", "Fira old town", "Three Bells of Fira", "Imerovigli caldera path", "Akrotiri Archaeological Site", "Perissa Beach"],
        "Colombo": ["Gangaramaya Temple", "Galle Face Green", "Colombo National Museum", "Pettah Market", "Independence Square", "Viharamahadevi Park"],
        "London": ["Tower of London", "Westminster and Big Ben", "British Museum", "South Bank", "St James’s Park", "Borough Market"],
        "Barcelona": ["Sagrada Família", "Park Güell", "Gothic Quarter", "La Rambla", "Barceloneta Beach", "Montjuïc"],
        "Madrid": ["Museo del Prado", "Royal Palace of Madrid", "Retiro Park", "Plaza Mayor", "Mercado de San Miguel", "Gran Vía"],
        "Lisbon": ["Belém Tower", "Jerónimos Monastery", "Alfama", "Praça do Comércio", "São Jorge Castle", "Time Out Market"],
        "Porto": ["Dom Luís I Bridge", "Ribeira", "São Bento Station", "Clérigos Tower", "Livraria Lello", "Jardins do Palácio de Cristal"],
        "Amsterdam": ["Rijksmuseum", "Anne Frank House", "Canal Belt", "Vondelpark", "Dam Square", "Jordaan"],
        "Prague": ["Prague Castle", "Charles Bridge", "Old Town Square", "Astronomical Clock", "Lennon Wall", "Petřín Hill"],
        "Vienna": ["Schönbrunn Palace", "St Stephen’s Cathedral", "Hofburg", "Belvedere Palace", "MuseumsQuartier", "Naschmarkt"],
        "Budapest": ["Hungarian Parliament", "Buda Castle", "Fisherman’s Bastion", "Chain Bridge", "St Stephen’s Basilica", "Great Market Hall"],
        "Venice": ["St Mark’s Basilica", "Doge’s Palace", "Rialto Bridge", "Grand Canal", "Rialto Market", "Dorsoduro"],
        "Florence": ["Uffizi Gallery", "Florence Cathedral", "Ponte Vecchio", "Piazza della Signoria", "Piazzale Michelangelo", "Oltrarno"],
        "Athens": ["Acropolis of Athens", "Acropolis Museum", "Plaka", "Ancient Agora", "Monastiraki Square", "National Garden"],
        "Istanbul": ["Hagia Sophia", "Topkapı Palace", "Blue Mosque", "Basilica Cistern", "Grand Bazaar", "Galata Bridge"],
        "Cappadocia": ["Göreme Open-Air Museum", "Uçhisar Castle", "Love Valley", "Paşabağ Valley", "Avanos pottery district", "Sunset Point Göreme"],
        "Reykjavik": ["Hallgrímskirkja", "Harpa Concert Hall", "Sun Voyager", "Reykjavík Old Harbour", "Laugavegur", "Perlan"],
        "Kirkjufell": ["Kirkjufellsfoss", "Grundarfjörður Harbour", "Kirkjufell viewpoint", "Búðir Black Church", "Arnarstapi coastal path", "Djúpalónssandur"],
        "Zermatt": ["Gornergrat Railway viewpoint", "Matterhorn Museum", "Zermatt village centre", "Sunnegga viewpoint", "Findeln hamlet", "Five Lakes Walk"],
        "Interlaken": ["Harder Kulm", "Höhematte Park", "Interlaken Ost riverside", "Unterseen old town", "Lake Thun promenade", "Lake Brienz shoreline"],
        "Lucerne": ["Chapel Bridge", "Lion Monument", "Musegg Wall", "Old Town Lucerne", "Lake Lucerne promenade", "Swiss Museum of Transport"],
        "Grindelwald": ["First Cliff Walk", "Grindelwald village", "Bachalpsee trail", "Gletscherschlucht gorge", "Wengen village", "Lauterbrunnen valley"],
        "Chamonix": ["Aiguille du Midi", "Montenvers and Mer de Glace", "Chamonix town centre", "Les Praz", "Lac des Gaillands", "Argentière village"],
        "Dolomites": ["Tre Cime di Lavaredo", "Lago di Braies", "Ortisei village", "Seceda viewpoint", "Passo Gardena", "Cortina d’Ampezzo"],
        "Bergen": ["Bryggen Wharf", "Fløibanen and Mount Fløyen", "Bergen Fish Market", "Bergenhus Fortress", "Nordnes peninsula", "Ulriken viewpoint"],
        "Lofoten": ["Reine village", "Hamnøy bridge viewpoint", "Å village", "Haukland Beach", "Nusfjord fishing village", "Ramberg Beach"],
        "Stockholm": ["Gamla Stan", "Vasa Museum", "Royal Palace Stockholm", "Skansen", "Djurgården waterfront", "Södermalm"],
        "Copenhagen": ["Nyhavn", "Rosenborg Castle", "Amalienborg Palace", "The Little Mermaid", "Torvehallerne", "Tivoli Gardens"],
        "Edinburgh": ["Edinburgh Castle", "Royal Mile", "Calton Hill", "National Museum of Scotland", "Dean Village", "Holyrood Park"],
        "Dublin": ["Trinity College and Book of Kells", "Dublin Castle", "St Stephen’s Green", "Temple Bar", "Kilmainham Gaol", "Howth harbour"],
        "Dubrovnik": ["Dubrovnik City Walls", "Stradun", "Rector’s Palace", "Old Port", "Fort Lovrijenac", "Banje Beach"],
        "Split": ["Diocletian’s Palace", "Riva promenade", "Marjan Hill", "Green Market", "Bačvice Beach", "Trogir old town"],
        "Nice": ["Promenade des Anglais", "Cours Saleya Market", "Castle Hill viewpoint", "Vieux Nice", "Place Masséna", "Villefranche-sur-Mer"],
        "Amalfi": ["Amalfi Cathedral", "Amalfi waterfront", "Atrani village", "Ravello gardens", "Valle delle Ferriere trail", "Positano viewpoint"],
        "Mykonos": ["Mykonos Windmills", "Little Venice", "Mykonos Old Port", "Ano Mera village", "Ornos Beach", "Agios Ioannis viewpoint"],
        "Madeira": ["Funchal Old Town", "Monte Palace Tropical Garden", "Cabo Girão viewpoint", "Pico do Arieiro", "Câmara de Lobos", "Levada dos Balcões"],
        "Tokyo": ["Senso-ji Temple", "Meiji Shrine", "Shibuya Crossing", "Ueno Park", "Tsukiji Outer Market", "Shinjuku Gyoen"],
        "Kyoto": ["Kiyomizu-dera", "Fushimi Inari Taisha", "Gion district", "Nishiki Market", "Arashiyama Bamboo Grove", "Nijō Castle"],
        "Osaka": ["Osaka Castle", "Dōtonbori", "Kuromon Market", "Shinsekai", "Sumiyoshi Taisha", "Nara Park"],
        "Mount Fuji": ["Lake Kawaguchi", "Chureito Pagoda", "Oshino Hakkai", "Arakurayama Sengen Park", "Fujiyoshida Honcho Street", "Lake Yamanaka"],
        "Seoul": ["Gyeongbokgung Palace", "Bukchon Hanok Village", "Insadong", "N Seoul Tower", "Gwangjang Market", "Cheonggyecheon stream"],
        "Busan": ["Haeundae Beach", "Gamcheon Culture Village", "Jagalchi Fish Market", "Haedong Yonggungsa", "Gwangalli Beach", "BIFF Square"],
        "Beijing": ["Forbidden City", "Temple of Heaven", "Jingshan Park", "Summer Palace", "Tiananmen Square", "Mutianyu Great Wall"],
        "Shanghai": ["The Bund", "Yu Garden", "Nanjing Road", "Shanghai Museum", "Former French Concession", "Pudong riverside"],
        "Hong Kong": ["Victoria Peak", "Star Ferry and Tsim Sha Tsui Promenade", "Man Mo Temple", "Central-Mid-Levels Escalator", "Temple Street Night Market", "Lantau Island"],
        "Singapore": ["Gardens by the Bay", "Merlion Park", "Chinatown", "National Gallery Singapore", "Kampong Glam", "Sentosa Island"],
        "Bangkok": ["Grand Palace", "Wat Pho", "Wat Arun", "Pak Khlong Talat flower market", "Chinatown Yaowarat", "Chao Phraya riverside"],
        "Phuket": ["Big Buddha viewpoint", "Phuket Old Town", "Wat Chalong", "Kata Beach", "Promthep Cape", "Rawai seafood market"],
        "Krabi": ["Railay Beach", "Ao Nang promenade", "Tiger Cave Temple", "Nopparat Thara Beach", "Krabi Town Night Market", "Klong Muang Beach"],
        "Chiang Mai": ["Wat Phra That Doi Suthep", "Wat Chedi Luang", "Tha Phae Gate", "Warorot Market", "Nimman neighbourhood", "Doi Suthep-Pui viewpoints"],
        "Bali": ["Uluwatu Temple", "Tegallalang Rice Terraces", "Ubud Art Market", "Tirta Empul Temple", "Seminyak Beach", "Tanah Lot"],
        "Ubud": ["Ubud Monkey Forest", "Ubud Palace", "Ubud Art Market", "Campuhan Ridge Walk", "Tegallalang Rice Terraces", "Tirta Empul Temple"],
        "Lombok": ["Tanjung Aan Beach", "Sasak village of Sade", "Mawun Beach", "Malimbu viewpoint", "Senggigi waterfront", "Sendang Gile waterfall"],
        "Hanoi": ["Hoàn Kiếm Lake", "Temple of Literature", "Old Quarter", "Ho Chi Minh Mausoleum", "Train Street area", "West Lake and Tran Quoc Pagoda"],
        "Ha Long Bay": ["Bai Chay waterfront", "Sung Sot Cave", "Ti Top Island viewpoint", "Ha Long Night Market", "Cua Van floating village", "Bai Tu Long Bay"],
        "Hoi An": ["Hoi An Ancient Town", "Japanese Covered Bridge", "Central Market", "An Bang Beach", "Tra Que Vegetable Village", "Cam Kim Island"],
        "Siem Reap": ["Angkor Wat", "Bayon Temple", "Ta Prohm", "Pub Street", "Old Market", "Tonlé Sap lake villages"],
        "Kuala Lumpur": ["Petronas Twin Towers", "Batu Caves", "Merdeka Square", "Central Market", "KLCC Park", "Jalan Alor"],
        "Langkawi": ["Langkawi Sky Bridge", "Kilim Karst Geoforest Park", "Eagle Square", "Pantai Cenang", "Tanjung Rhu Beach", "Oriental Village"],
        "Maldives": ["Malé Friday Mosque", "Malé Fish Market", "Republic Square", "Hulhumalé Beach", "Malé waterfront", "Local island harbour"],
        "Kathmandu": ["Swayambhunath Stupa", "Kathmandu Durbar Square", "Boudhanath Stupa", "Pashupatinath Temple", "Thamel", "Patan Durbar Square"],
        "Pokhara": ["Phewa Lake", "World Peace Pagoda", "Davis Falls", "International Mountain Museum", "Lakeside Pokhara", "Sarangkot viewpoint"],
        "Paro": ["Paro Taktsang viewpoint", "Rinpung Dzong", "Paro town", "National Museum of Bhutan", "Kyichu Lhakhang", "Drukgyel Dzong"],
        "Jaipur": ["Hawa Mahal", "City Palace Jaipur", "Jantar Mantar Jaipur", "Amer Fort", "Panna Meena ka Kund", "Jal Mahal viewpoint", "Albert Hall Museum", "Nahargarh Fort"],
        "Udaipur": ["City Palace Museum Udaipur", "Jagdish Temple", "Bagore Ki Haveli", "Gangaur Ghat", "Saheliyon Ki Bari", "Fateh Sagar Lake", "Doodh Talai", "Ambrai Ghat"],
        "Delhi": ["Red Fort", "Humayun’s Tomb", "India Gate", "Qutub Minar", "Jama Masjid", "Chandni Chowk"],
        "Mumbai": ["Gateway of India", "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya", "Marine Drive", "Elephanta Caves", "Colaba Causeway", "Siddhivinayak Temple"],
        "Goa": ["Basilica of Bom Jesus", "Fontainhas, Panaji", "Fort Aguada", "Candolim Beach", "Anjuna Flea Market", "Dona Paula viewpoint"],
        "Manali": ["Hidimba Devi Temple", "Old Manali", "Vashisht hot springs", "Solang Valley", "Naggar Castle", "Mall Road Manali"],
        "Shimla": ["The Ridge", "Christ Church Shimla", "Mall Road", "Jakhu Temple", "Viceregal Lodge", "Kufri"],
        "Leh": ["Leh Palace", "Shanti Stupa", "Leh Market", "Hall of Fame Museum", "Thiksey Monastery", "Shey Palace"],
        "Rishikesh": ["Lakshman Jhula area", "Triveni Ghat", "Parmarth Niketan", "Beatles Ashram", "Ram Jhula", "Neer Garh Waterfall"],
        "Munnar": ["Tea Museum", "Mattupetty Dam", "Echo Point", "Top Station", "Eravikulam National Park", "Kundala Lake"],
        "Alappuzha": ["Alappuzha Beach", "Alappuzha Lighthouse", "Mullakkal Temple", "Punnamada Lake", "Marari Beach", "Pathiramanal Island"],
        "Varanasi": ["Dashashwamedh Ghat", "Kashi Vishwanath Temple", "Assi Ghat", "Sarnath", "Manikarnika Ghat", "Ramnagar Fort"],
        "Darjeeling": ["Batasia Loop", "Ghoom Monastery", "Darjeeling Himalayan Railway", "Chowrasta Mall", "Himalayan Mountaineering Institute", "Tiger Hill"],
        "New York City": ["Central Park", "Metropolitan Museum of Art", "Times Square", "Brooklyn Bridge", "The High Line", "Ferry to Staten Island"],
        "San Francisco": ["Golden Gate Bridge", "Ferry Building", "Chinatown", "Lombard Street", "Fisherman’s Wharf", "Golden Gate Park"],
        "Los Angeles": ["Griffith Observatory", "Hollywood Walk of Fame", "Santa Monica Pier", "The Getty Center", "Venice Beach", "The Original Farmers Market"],
        "Honolulu": ["Waikiki Beach", "Diamond Head lookout", "Iolani Palace", "Hanauma Bay", "Kuhio Beach Park", "Ala Moana Beach Park"],
        "Banff": ["Banff Avenue", "Bow Falls", "Lake Minnewanka", "Cave and Basin National Historic Site", "Johnston Canyon", "Lake Louise"],
        "Vancouver": ["Stanley Park", "Granville Island Public Market", "Gastown", "Canada Place", "English Bay", "Capilano Suspension Bridge Park"],
        "Toronto": ["CN Tower", "St Lawrence Market", "Distillery Historic District", "Harbourfront Centre", "Toronto Islands", "Royal Ontario Museum"],
        "Quebec City": ["Old Québec", "Château Frontenac terrace", "Place Royale", "Petit-Champlain", "Plains of Abraham", "Montmorency Falls"],
        "Cancun": ["Playa Delfines", "El Rey Archaeological Zone", "Cancún Hotel Zone", "Isla Mujeres", "Mercado 28", "Puerto Morelos"],
        "Mexico City": ["Zócalo", "Templo Mayor", "Chapultepec Park", "Palacio de Bellas Artes", "Coyoacán", "National Museum of Anthropology"],
        "Rio de Janeiro": ["Christ the Redeemer", "Sugarloaf Mountain", "Copacabana Beach", "Selarón Steps", "Ipanema Beach", "Santa Teresa"],
        "Cusco": ["Plaza de Armas Cusco", "Qorikancha", "San Pedro Market", "Sacsayhuamán", "San Blas neighbourhood", "Tambomachay"],
        "Machu Picchu": ["Machu Picchu citadel", "Aguas Calientes town", "Machu Picchu Museum", "Mandor Gardens", "Putucusi viewpoint", "Urubamba River walk"],
        "Cape Town": ["Table Mountain Aerial Cableway", "Bo-Kaap", "V&A Waterfront", "Kirstenbosch Botanical Garden", "Camps Bay Beach", "Signal Hill"],
        "Marrakech": ["Jemaa el-Fnaa", "Bahia Palace", "Koutoubia Mosque gardens", "Jardin Majorelle", "Souk Semmarine", "Medina of Marrakech"],
        "Cairo": ["Giza Pyramids", "Egyptian Museum", "Khan el-Khalili", "Sultan Hassan Mosque", "Cairo Citadel", "Al-Azhar Park"],
        "Sydney": ["Sydney Opera House", "Royal Botanic Garden Sydney", "The Rocks", "Bondi Beach", "Circular Quay", "Manly ferry and beach"],
        "Melbourne": ["Federation Square", "Queen Victoria Market", "Royal Botanic Gardens Victoria", "Hosier Lane", "St Kilda foreshore", "National Gallery of Victoria"],
        "Queenstown": ["Queenstown Gardens", "Lake Wakatipu waterfront", "Skyline Queenstown", "Arrowtown", "Glenorchy waterfront", "Kiwi Park"],
        "Auckland": ["Auckland Domain", "Sky Tower", "Viaduct Harbour", "Auckland War Memorial Museum", "Mission Bay", "Mount Eden summit"]
    };

    const attractionTicketInfo = {
        "Hawa Mahal": { price: 100, label: "₹100 Indian adult; ₹50 student", source: "https://www.cityofjaipur.com/news/2025/12/visiting-monuments-and-museums-will-become-more-expensive/" },
        "Amer Fort": { price: 200, label: "₹200 Indian adult; ₹50 student", source: "https://www.cityofjaipur.com/news/2025/12/visiting-monuments-and-museums-will-become-more-expensive/" },
        "Jantar Mantar Jaipur": { price: 100, label: "₹100 Indian adult; ₹50 student", source: "https://www.cityofjaipur.com/news/2025/12/visiting-monuments-and-museums-will-become-more-expensive/" },
        "Albert Hall Museum": { price: 100, label: "₹100 Indian adult", source: "https://www.cityofjaipur.com/news/2025/12/visiting-monuments-and-museums-will-become-more-expensive/" },
        "City Palace Jaipur": { price: 400, label: "₹400 adult; ₹200 student/child", source: "https://citypalace.org/visit" },
        "City Palace Museum Udaipur": { price: 400, label: "₹400 adult; ₹150 student/child; ₹250 eligible concession", source: "https://smartcity.getepay.in/product/the-city-palace/" },
        "Saheliyon Ki Bari": { price: 50, label: "₹50 Indian visitor (reported 2026 rate)", source: "https://traveliac.com/india/rajasthan/udaipur/saheliyon-ki-bari" },
        "Taj Mahal": { price: 50, label: "₹50 Indian entry; optional mausoleum entry +₹200", source: "https://www.tajmahal.gov.in/visiting-hours.aspx" },
        "Agra Fort": { price: 50, label: "₹50 Indian adult", source: "https://agra.nic.in/tourist-place/agra-fort/" }
    };

    const memoryStore = new Map();

    function readJSON(key, fallback) {
        try {
            const value = window.localStorage.getItem(key);
            return value === null ? fallback : JSON.parse(value);
        } catch {
            return memoryStore.has(key) ? memoryStore.get(key) : fallback;
        }
    }

    function readArray(key) {
        const value = readJSON(key, []);
        return Array.isArray(value) ? value : [];
    }

    function writeJSON(key, value) {
        memoryStore.set(key, value);
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            // Keep the value in memory for this page if browser storage is unavailable.
            return false;
        }
    }

    function removeStored(key) {
        memoryStore.delete(key);
        try {
            window.localStorage.removeItem(key);
        } catch {
            // Storage may be disabled for local files.
        }
    }

    function showToast(message) {
        document.querySelector(".site-toast")?.remove();
        const toast = document.createElement("div");
        toast.className = "site-toast";
        toast.setAttribute("role", "status");
        toast.textContent = message;
        document.body.append(toast);
        window.setTimeout(() => toast.remove(), 4200);
    }

    function setUserName(name) {
        const text = name ? "Hey, " + name + "!" : "Hey, Explorer!";
        document.querySelectorAll("[data-user-name]").forEach((element) => {
            element.textContent = text;
        });
    }

    function takeFlashMessage() {
        const message = readJSON(keys.flash, "");
        removeStored(keys.flash);
        if (message) showToast(message);
    }

    function initLandingNavigation() {
        const menuButton = document.querySelector(".menu-button");
        const navigation = document.querySelector("#site-navigation");
        if (!menuButton || !navigation) return;

        menuButton.addEventListener("click", () => {
            const open = navigation.classList.toggle("is-open");
            menuButton.setAttribute("aria-expanded", String(open));
        });
        navigation.addEventListener("click", (event) => {
            if (!event.target.closest("a")) return;
            navigation.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
        });
    }

    function redirectSignedInPublicPage() {
        const appPage = document.body.dataset.signedInPage;
        const user = readJSON(keys.user, null);
        if (!appPage || !user || !user.email) return false;
        window.location.replace(appPage);
        return true;
    }

    function initAuthForms() {
        const loginForm = document.querySelector("#login-form");
        const signupForm = document.querySelector("#signup-form");
        if (!loginForm && !signupForm) return;

        function continueIntoGoMigo(user) {
            writeJSON(keys.user, user);
            writeJSON(keys.profile, Object.assign({}, readJSON(keys.profile, {}), user));
            writeJSON(keys.flash, "Welcome to GoMigo, " + user.name + ".");

            const redirectParams = new URLSearchParams(window.location.search);
            const requestedTarget = redirectParams.get("next") || "";
            const requestedPage = requestedTarget.split("?", 1)[0];
            const safePages = ["main-menu.html", "my-trips.html", "trip-planner.html", "explore-app.html", "destinations.html", "saved.html", "travel-guide.html", "profile.html"];
            let destination = safePages.includes(requestedPage) ? requestedPage : "main-menu.html";
            const targetQuery = new URLSearchParams(requestedTarget.split("?").slice(1).join("?"));
            const requestedDestination = redirectParams.get("destination") || targetQuery.get("destination");
            if (destination === "trip-planner.html" && requestedDestination) {
                destination += "?destination=" + encodeURIComponent(requestedDestination.slice(0, 100));
            }
            window.location.href = destination;
        }

        if (loginForm) {
            loginForm.addEventListener("submit", (event) => {
                event.preventDefault();
                if (!loginForm.reportValidity()) return;
                const data = new FormData(loginForm);
                const email = String(data.get("email") || "").trim();
                const existing = Object.assign({}, readJSON(keys.profile, {}), readJSON(keys.user, {}));
                const fallbackName = email.split("@")[0].replace(/[._-]+/g, " ");
                const name = existing.name || fallbackName || "Explorer";
                continueIntoGoMigo({ name, email });
            });
        }

        if (signupForm) {
            signupForm.addEventListener("submit", (event) => {
                event.preventDefault();
                if (!signupForm.reportValidity()) return;
                const data = new FormData(signupForm);
                const password = String(data.get("password") || "");
                const confirmation = String(data.get("confirm") || "");
                if (password !== confirmation) {
                    showToast("Those passwords don’t match yet.");
                    signupForm.elements.namedItem("confirm").focus();
                    return;
                }
                continueIntoGoMigo({
                    name: String(data.get("name") || "Explorer").trim(),
                    email: String(data.get("email") || "").trim()
                });
            });
        }
    }

    function initAppNavigation() {
        const body = document.body;
        if (!body.classList.contains("app-page")) return;

        const profile = Object.assign({}, readJSON(keys.profile, {}), readJSON(keys.user, {}));
        setUserName(profile.name);

        const pageMap = {
            "main-menu.html": "home",
            "trip-planner.html": "plan",
            "my-trips.html": "trips",
            "itinerary.html": "trips",
            "explore-app.html": "explore",
            "itineraries.html": "trips",
            "saved.html": "saved",
            "travel-guide.html": "guide",
            "profile.html": "profile"
        };
        const currentPage = window.location.pathname.split("/").pop() || "main-menu.html";
        const activePage = pageMap[currentPage] || "home";
        document.querySelectorAll("[data-nav]").forEach((link) => {
            const active = link.dataset.nav === activePage;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "page");
            else link.removeAttribute("aria-current");
        });

        document.querySelectorAll("[data-sign-out]").forEach((button) => {
            button.addEventListener("click", () => {
                removeStored(keys.user);
                window.location.href = "landing_page.html";
            });
        });
        takeFlashMessage();
    }

    function initPlanner() {
        const form = document.querySelector("#trip-form");
        if (!form) return;

        const budget = form.querySelector(".budget-slider");
        const budgetText = form.querySelector(".budget-heading strong");
        const requests = form.querySelector("textarea");
        const counter = form.querySelector(".character-count");
        const destinationField = form.querySelector("#destination");
        const suggestedDestination = new URLSearchParams(window.location.search).get("destination");
        const requestedDate = new URLSearchParams(window.location.search).get("date");

        populateDestinationSuggestions(form.querySelector("#destination-suggestions"));

        if (suggestedDestination && destinationField) destinationField.value = suggestedDestination;
        if (requestedDate) form.querySelector("#travel-dates").value = requestedDate;
        if (budget && budgetText) {
            const updateBudget = () => {
                budgetText.textContent = "₹" + Number(budget.value).toLocaleString("en-IN") + "/day";
            };
            budget.addEventListener("input", updateBudget);
            updateBudget();
        }
        if (requests && counter) {
            const updateCounter = () => {
                counter.textContent = requests.value.length + "/300";
            };
            requests.addEventListener("input", updateCounter);
            updateCounter();
        }

        form.querySelectorAll("[data-interest]").forEach((button) => {
            button.setAttribute("aria-pressed", String(button.classList.contains("selected")));
            button.addEventListener("click", () => {
                const selected = button.classList.toggle("selected");
                button.setAttribute("aria-pressed", String(selected));
            });
        });
        form.querySelector("[data-clear-destination]")?.addEventListener("click", () => {
            destinationField.value = "";
            destinationField.focus();
        });

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!form.reportValidity()) return;
            const data = new FormData(form);
            const trip = {
                schemaVersion: 1,
                id: Date.now() + "-" + Math.random().toString(16).slice(2),
                destination: String(data.get("destination") || "").trim(),
                dates: String(data.get("dates") || "").trim(),
                duration: String(data.get("duration") || ""),
                travelers: String(data.get("travelers") || ""),
                style: String(data.get("style") || ""),
                budget: Number(data.get("budget") || 0),
                interests: Array.from(form.querySelectorAll("[data-interest].selected"), (button) => button.textContent.trim()),
                requests: String(data.get("requests") || "").trim(),
                createdAt: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
                createdAtISO: new Date().toISOString()
            };
            const trips = readArray(keys.trips);
            trips.unshift(trip);
            if (!writeJSON(keys.trips, trips)) {
                showToast("Your trip could not be saved. Allow browser storage or free some space, then try again.");
                return;
            }
            writeJSON(keys.flash, "Your " + trip.destination + " trip is saved in My Trips.");
            window.location.href = "itinerary.html?id=" + encodeURIComponent(trip.id);
        });
    }

    function createDestinationCard(destination, saved) {
        const card = document.createElement("article");
        card.className = "destination-card";
        card.dataset.destinationCard = "";

        const imageWrap = document.createElement("div");
        imageWrap.className = "destination-image";
        const image = document.createElement("img");
        image.src = destination.image;
        image.alt = destination.alt || destination.name;

        const heart = document.createElement("button");
        heart.type = "button";
        heart.className = "heart";
        heart.dataset.favoriteToggle = "";
        heart.dataset.destination = destination.name;
        heart.textContent = saved ? "♥" : "♡";
        heart.setAttribute("aria-pressed", String(saved));
        heart.setAttribute("aria-label", saved ? "Remove " + destination.name + " from saved places" : "Save " + destination.name);
        imageWrap.append(image, heart);

        const info = document.createElement("div");
        info.className = "destination-info";
        const heading = document.createElement("h2");
        heading.textContent = destination.name;
        const description = document.createElement("p");
        description.textContent = destination.description;
        const planLink = document.createElement("a");
        planLink.href = "trip-planner.html?destination=" + encodeURIComponent(destination.name);
        planLink.textContent = "Plan a trip →";
        info.append(heading, description, planLink);
        card.append(imageWrap, info);
        return card;
    }

    function updateFavoriteButtons() {
        const saved = readArray(keys.saved);
        document.querySelectorAll("[data-favorite-toggle]").forEach((button) => {
            const name = button.dataset.destination;
            const isSaved = saved.includes(name);
            button.textContent = isSaved ? "♥" : "♡";
            button.classList.toggle("is-saved", isSaved);
            button.setAttribute("aria-pressed", String(isSaved));
            button.setAttribute("aria-label", isSaved ? "Remove " + name + " from saved places" : "Save " + name);
        });
    }

    function renderSavedPage() {
        const grid = document.querySelector("#saved-grid");
        if (!grid) return;
        grid.replaceChildren();
        const savedNames = readArray(keys.saved);
        if (!savedNames.length) {
            const empty = document.createElement("div");
            empty.className = "empty-state";
            empty.append("No saved places yet. ");
            const link = document.createElement("a");
            link.href = "explore-app.html";
            link.textContent = "Explore destinations";
            empty.append(link, " and tap a heart to keep one here.");
            grid.append(empty);
        } else savedNames.forEach((name) => {
            const destination = destinations.find((item) => item.name === name);
            if (destination) grid.append(createDestinationCard(destination, true));
        });

        const tripList = document.querySelector("#saved-trip-list");
        const tripEmpty = document.querySelector("#saved-trip-empty");
        if (!tripList) return;
        const trips = readArray(keys.trips);
        tripList.replaceChildren(...trips.map((trip) => {
            const card = document.createElement("article");
            card.className = "saved-trip-card";
            const title = document.createElement("h3"); title.textContent = trip.destination;
            const details = document.createElement("p");
            details.textContent = [trip.dates, trip.duration ? `${trip.duration} days` : "", `₹${Number(trip.budget || 0).toLocaleString("en-IN")}/day`].filter(Boolean).join(" · ");
            const link = document.createElement("a"); link.href = "itinerary.html?id=" + encodeURIComponent(trip.id); link.className = "content-primary-link"; link.textContent = "View itinerary →";
            card.append(title, details, link); return card;
        }));
        if (tripEmpty) tripEmpty.hidden = trips.length > 0;
    }

    function initDestinationPages() {
        if (document.body.classList.contains("itineraries-page")) return;

        const appGrid = document.querySelector("#destination-grid.app-destination-grid");
        if (appGrid) {
            const categoryNames = { beach: "Beach escapes", mountains: "Mountain retreats", adventure: "Adventure destinations", culture: "Culture & heritage", city: "City breaks" };
            const categoryOrder = ["beach", "mountains", "adventure", "culture", "city"];
            const categoryHints = {
                beach: new Set(["Santorini", "Dubrovnik", "Split", "Nice", "Amalfi", "Mykonos", "Madeira", "Busan", "Phuket", "Krabi", "Bali", "Lombok", "Ha Long Bay", "Langkawi", "Maldives", "Mumbai", "Goa", "Alappuzha", "Honolulu", "Cancun", "Rio de Janeiro", "Cape Town", "Sydney"]),
                mountains: new Set(["Cappadocia", "Kirkjufell", "Zermatt", "Interlaken", "Lucerne", "Grindelwald", "Chamonix", "Dolomites", "Bergen", "Lofoten", "Reykjavik", "Mount Fuji", "Kathmandu", "Pokhara", "Paro", "Manali", "Shimla", "Leh", "Munnar", "Darjeeling", "Banff", "Queenstown", "Machu Picchu"]),
                adventure: new Set(["Rishikesh", "Queenstown", "Pokhara", "Leh", "Banff", "Interlaken", "Grindelwald", "Chamonix", "Dolomites", "Mount Fuji", "Machu Picchu"]),
                culture: new Set(["Agra", "Rome", "Jaipur", "Udaipur", "Varanasi", "Kyoto", "Osaka", "Beijing", "Hanoi", "Hoi An", "Siem Reap", "Marrakech", "Cairo", "Cusco", "Athens", "Istanbul", "Florence", "Venice", "Prague", "Vienna", "Edinburgh", "Dublin", "Mexico City", "Delhi", "Tokyo", "Seoul"])
            };
            const cardsByCategory = new Map(categoryOrder.map((category) => [category, []]));
            destinationCatalog.forEach((place) => {
                const card = document.createElement("article");
                card.className = "destination-card app-destination-card";
                const searchableDetails = `${place.name} ${place.country} ${place.description || ""}`.toLowerCase();
                const tags = [];
                if (/beach|coast|island|sea|bay|lagoon/.test(searchableDetails)) tags.push("beach");
                if (/mountain|alpine|hill|himalaya|peak|valley|glacier/.test(searchableDetails)) tags.push("mountains");
                if (/culture|historic|history|temple|palace|heritage|architecture|old town/.test(searchableDetails)) tags.push("culture");
                if (/adventure|hiking|trek|rafting|ski|outdoor|climb/.test(searchableDetails)) tags.push("adventure");
                const hintedCategory = categoryOrder.find((item) => categoryHints[item]?.has(place.name));
                const category = hintedCategory || categoryOrder.find((item) => tags.includes(item)) || "city";
                if (!tags.includes(category)) tags.push(category);
                // Every Explore entry is a city or named destination, so it belongs in the City filter too.
                if (!tags.includes("city")) tags.push("city");
                card.dataset.tags = tags.join(" ");
                card.dataset.group = category;
                card.dataset.search = place.name + " " + place.country;
                const imageWrap = document.createElement("div"); imageWrap.className = "app-destination-image";
                const image = document.createElement("img"); image.src = place.image; image.alt = place.alt || `${place.name}, ${place.country}`; image.loading = "lazy"; image.decoding = "async";
                const heart = document.createElement("button"); heart.type = "button"; heart.className = "save-destination"; heart.dataset.favoriteToggle = ""; heart.dataset.destination = place.name; heart.setAttribute("aria-label", "Save " + place.name); heart.setAttribute("aria-pressed", "false"); heart.textContent = "♡";
                imageWrap.append(image, heart);
                const copy = document.createElement("div"); copy.className = "app-destination-copy";
                const country = document.createElement("p"); country.className = "app-destination-country"; country.textContent = place.country;
                const heading = document.createElement("h2"); heading.textContent = place.name;
                const description = document.createElement("p"); description.textContent = place.description || `Explore ${place.name}, ${place.country}.`;
                const link = document.createElement("a"); link.href = "trip-planner.html?destination=" + encodeURIComponent(place.name); link.textContent = "Plan a trip →";
                copy.append(country, heading, description, link); card.append(imageWrap, copy);
                cardsByCategory.get(category).push(card);
            });
            const groupedItems = [];
            categoryOrder.forEach((category) => {
                const cards = cardsByCategory.get(category);
                if (!cards.length) return;
                const heading = document.createElement("h3");
                heading.className = "destination-category-heading";
                heading.dataset.groupHeading = category;
                heading.textContent = categoryNames[category];
                groupedItems.push(heading, ...cards);
            });
            appGrid.replaceChildren(...groupedItems);
            appGrid.classList.add("is-ready");
            const count = document.querySelector(".app-destinations-section h2");
            if (count) count.textContent = `${destinationCatalog.length} places to discover`;
            const intro = document.querySelector(".app-explore-intro");
            if (intro) intro.textContent = `${destinationCatalog.length} places to spark your next GoMigo plan.`;
        }

        const legacySavedItems = readJSON("gomigo-saved-items-v1", []);
        if (Array.isArray(legacySavedItems) && legacySavedItems.length) {
            const migratedNames = legacySavedItems.map((item) => item && (item.title || item.name)).filter(Boolean);
            const mergedNames = Array.from(new Set(readArray(keys.saved).concat(migratedNames)));
            writeJSON(keys.saved, mergedNames);
        }

        updateFavoriteButtons();
        renderSavedPage();

        document.addEventListener("click", (event) => {
            const button = event.target.closest("[data-favorite-toggle]");
            if (!button) return;
            const name = button.dataset.destination;
            const saved = readArray(keys.saved);
            const next = saved.includes(name) ? saved.filter((item) => item !== name) : saved.concat(name);
            writeJSON(keys.saved, next);
            updateFavoriteButtons();
            renderSavedPage();
            showToast(next.includes(name) ? name + " saved to your places." : name + " removed from saved places.");
        });

        const search = document.querySelector("#destination-search");
        const publicCards = Array.from(document.querySelectorAll(".destination-grid .destination-card"));
        if (publicCards.length) {
            const filters = Array.from(document.querySelectorAll(".filter[data-filter]"));
            const empty = document.querySelector("#empty-state");
            const exploreMore = document.querySelector("#explore-more");
            const exploreProgress = document.querySelector("#explore-progress");
            const categoryHeadings = Array.from(document.querySelectorAll(".destination-category-heading"));
            const incrementalExplore = Boolean(exploreMore);
            let visibleLimit = 9;
            let activeFilter = "all";
            const updatePublicCards = () => {
                const query = search ? search.value.trim().toLocaleLowerCase() : "";
                let visibleCount = 0;
                let matchIndex = 0;
                publicCards.forEach((card) => {
                    const imageAlt = card.querySelector("img")?.alt || "";
                    const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
                    const haystack = normalize(card.textContent + " " + imageAlt + " " + (card.dataset.search || ""));
                    const matchesText = normalize(query).split(/\s+/).every((term) => haystack.includes(term));
                    const tags = (card.dataset.tags || "").split(/\s+/);
                    const matchesFilter = activeFilter === "all"
                        ? !card.hasAttribute("data-category-only") || query.length > 0
                        : tags.includes(activeFilter);
                    const isMatch = matchesText && matchesFilter;
                    const withinPage = !incrementalExplore || query.length > 0 || matchIndex < visibleLimit;
                    card.hidden = !(isMatch && withinPage);
                    if (isMatch) matchIndex += 1;
                    if (!card.hidden) visibleCount += 1;
                });
                categoryHeadings.forEach((heading) => {
                    heading.hidden = !publicCards.some((card) => card.dataset.group === heading.dataset.groupHeading && !card.hidden);
                });
                if (empty) empty.hidden = visibleCount > 0;
                if (incrementalExplore) {
                    const totalMatches = matchIndex;
                    exploreProgress.textContent = query ? `Showing ${visibleCount} matching places` : `Showing ${Math.min(visibleLimit, totalMatches)} of ${totalMatches} places`;
                    exploreMore.hidden = query.length > 0 || visibleLimit >= totalMatches;
                    exploreMore.innerHTML = visibleLimit >= totalMatches ? "All places shown" : 'Explore more <span aria-hidden="true">↓</span>';
                }
            };
            const scrollToActiveCategory = () => {
                // City is the broad all-destination view; the other filters jump to their matching themed section.
                if (activeFilter === "all" || activeFilter === "city") return;
                const heading = document.querySelector(`.destination-category-heading[data-group-heading="${activeFilter}"]`);
                if (heading && !heading.hidden) requestAnimationFrame(() => heading.scrollIntoView({ behavior: "smooth", block: "start" }));
            };
            exploreMore?.addEventListener("click", () => {
                visibleLimit = Math.min(visibleLimit + 9, publicCards.length);
                updatePublicCards();
            });
            search?.addEventListener("input", updatePublicCards);
            filters.forEach((button) => button.addEventListener("click", () => {
                activeFilter = button.dataset.filter || "all";
                filters.forEach((item) => item.classList.toggle("active", item === button));
                updatePublicCards();
                scrollToActiveCategory();
            }));
            document.querySelectorAll(".style-card[data-style]").forEach((link) => link.addEventListener("click", () => {
                activeFilter = link.dataset.style || "all";
                filters.forEach((item) => item.classList.toggle("active", item.dataset.filter === activeFilter));
                updatePublicCards();
                scrollToActiveCategory();
            }));
            document.addEventListener("keydown", (event) => {
                if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
                    event.preventDefault();
                    search?.focus();
                }
            });
            updatePublicCards();
            return;
        }

        if (search) {
            search.addEventListener("input", () => {
                const query = search.value.trim().toLocaleLowerCase();
                document.querySelectorAll("[data-destination-card]").forEach((card) => {
                    card.hidden = !card.textContent.toLocaleLowerCase().includes(query);
                });
            });
        }
    }

    function initTripsPage() {
        if (document.body.classList.contains("itineraries-page")) return;

        const list = document.querySelector("#trip-list");
        if (!list) return;

        function render() {
            const trips = readArray(keys.trips);
            list.replaceChildren();

            if (!trips.length) {
                const empty = document.createElement("div");
                empty.className = "empty-state";
                empty.append("No trips saved yet. ");
                const link = document.createElement("a");
                link.href = "trip-planner.html";
                link.textContent = "Plan your first trip";
                empty.append(link, " and your plan will appear here.");
                list.append(empty);
                return;
            }

            trips.forEach((trip) => {
                const card = document.createElement("article");
                card.className = "trip-card";
                const heading = document.createElement("h2");
                heading.textContent = trip.destination;
                card.append(heading);

                const details = [trip.dates, trip.duration, trip.travelers].filter(Boolean).join(" · ");
                if (details) {
                    const detailLine = document.createElement("p");
                    detailLine.textContent = details;
                    card.append(detailLine);
                }

                const budgetLine = document.createElement("p");
                budgetLine.textContent = "₹" + Number(trip.budget).toLocaleString("en-IN") + " per day · " + trip.style;
                card.append(budgetLine);
                if (trip.interests && trip.interests.length) {
                    const interests = document.createElement("p");
                    interests.textContent = "Interests: " + trip.interests.join(", ");
                    card.append(interests);
                }
                if (trip.requests) {
                    const requests = document.createElement("p");
                    requests.textContent = "Special requests: " + trip.requests;
                    card.append(requests);
                }
                if (trip.createdAt) {
                    const created = document.createElement("p");
                    created.className = "trip-created-at";
                    created.textContent = "Saved " + trip.createdAt;
                    card.append(created);
                }

                const itineraryLink = document.createElement("a");
                itineraryLink.href = "itinerary.html?id=" + encodeURIComponent(trip.id);
                itineraryLink.className = "content-primary-link";
                itineraryLink.textContent = "View day itinerary →";
                card.append(itineraryLink);

                const remove = document.createElement("button");
                remove.type = "button";
                remove.dataset.removeTrip = trip.id;
                remove.textContent = "Remove trip";
                card.append(remove);
                list.append(card);
            });
        }

        list.addEventListener("click", (event) => {
            const button = event.target.closest("[data-remove-trip]");
            if (!button) return;
            const remaining = readArray(keys.trips).filter((trip) => trip.id !== button.dataset.removeTrip);
            if (!writeJSON(keys.trips, remaining)) {
                showToast("Your trip could not be removed from browser storage. Please try again.");
                return;
            }
            showToast("Trip removed from My Trips.");
            render();
        });
        window.addEventListener("storage", (event) => {
            if (event.key === keys.trips || event.key === null) render();
        });
        window.addEventListener("pageshow", render);
        render();
    }

    function initProfilePage() {
        const form = document.querySelector("#profile-form");
        if (!form) return;
        const profile = Object.assign({}, readJSON(keys.user, {}), readJSON(keys.profile, {}));
        form.elements.namedItem("name").value = profile.name || "";
        form.elements.namedItem("email").value = profile.email || "";
        form.elements.namedItem("home").value = profile.home || "";
        form.elements.namedItem("style").value = profile.style || "Balanced";

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!form.reportValidity()) return;
            const data = new FormData(form);
            const updated = Object.assign({}, readJSON(keys.profile, {}), {
                name: String(data.get("name") || "").trim(),
                email: String(data.get("email") || "").trim(),
                home: String(data.get("home") || "").trim(),
                style: String(data.get("style") || "Balanced")
            });
            writeJSON(keys.profile, updated);
            writeJSON(keys.user, { name: updated.name, email: updated.email });
            setUserName(updated.name);
            showToast("Your travel preferences are saved.");
        });
    }

    function initItineraryDetail() {
        if (!document.body.classList.contains("itinerary-detail-page")) return;
        const content = document.querySelector("#itinerary-content");
        const tripId = new URLSearchParams(window.location.search).get("id");
        const trip = readArray(keys.trips).find((item) => item.id === tripId);
        if (!trip || !content) {
            document.querySelector("#itinerary-title").textContent = "We couldn’t find that trip plan";
            document.querySelector("#itinerary-summary").textContent = "Create a trip plan and it will be saved in your browser.";
            const link = document.createElement("a"); link.href = "trip-planner.html"; link.className = "primary-button"; link.textContent = "Plan a trip →"; content.append(link);
            return;
        }
        const place = destinationCatalog.find((item) => item.name.toLowerCase() === trip.destination.trim().toLowerCase())
            || destinationCatalog.find((item) => trip.destination.trim().toLowerCase().startsWith(item.name.toLowerCase() + ","));
        const routeName = place?.name || trip.destination;
        const budget = Math.max(0, Number(trip.budget) || 0);
        const dayCount = Math.max(1, Number.parseInt(trip.duration, 10) || 1);
        const money = (amount) => "₹" + Math.round(amount).toLocaleString("en-IN");
        document.title = `${trip.destination} itinerary | GoMigo`;
        document.querySelector("#itinerary-title").textContent = `${dayCount === 1 ? "A day" : `${dayCount} days`} in ${trip.destination}`;
        document.querySelector("#itinerary-summary").textContent = `${trip.dates ? trip.dates + " · " : ""}${dayCount} ${dayCount === 1 ? "day" : "days"} · ${money(budget)} daily budget · ${trip.style || "Your travel style"}`;

        const overview = document.createElement("section"); overview.className = "itinerary-budget-overview";
        const overviewTitle = document.createElement("h2"); overviewTitle.textContent = "Your daily budget";
        const overviewValue = document.createElement("strong"); overviewValue.textContent = money(budget);
        const overviewCopy = document.createElement("p"); overviewCopy.textContent = "The suggested day keeps a portion unassigned for price changes or a spontaneous stop.";
        overview.append(overviewTitle, overviewValue, overviewCopy);

        const hotels = document.createElement("section"); hotels.className = "itinerary-hotels";
        const hotelsTitle = document.createElement("h2"); hotelsTitle.textContent = "Stay choices · nightly budget targets"; hotels.append(hotelsTitle);
        const hotelGrid = document.createElement("div"); hotelGrid.className = "itinerary-hotel-grid";
        const hotelOptions = [
            { name: "Budget guesthouse", share: .18, detail: "A low-cost guesthouse or hostel target." },
            { name: "Comfort hotel", share: .28, detail: "A mid-range nightly budget target; suggested fit for this plan." },
            { name: "Boutique stay", share: .40, detail: "A higher-comfort nightly target." }
        ];
        hotelOptions.forEach((option, index) => {
            const card = document.createElement("article"); card.className = "itinerary-hotel-card" + (index === 1 ? " recommended" : "");
            const name = document.createElement("h3"); name.textContent = option.name;
            const cost = document.createElement("strong"); cost.textContent = money(budget * option.share);
            const detail = document.createElement("p"); detail.textContent = option.detail;
            const destinationText = document.createElement("small"); destinationText.textContent = "Budget target, not a live hotel quote.";
            const searchLink = document.createElement("a"); searchLink.className = "itinerary-stay-search"; searchLink.href = "https://www.google.com/travel/search?q=" + encodeURIComponent("hotels in " + routeName); searchLink.target = "_blank"; searchLink.rel = "noopener noreferrer"; searchLink.textContent = `See current stays in ${routeName} →`;
            card.append(name, cost, detail, destinationText, searchLink); if (index === 1) { const badge = document.createElement("span"); badge.className = "itinerary-recommended-badge"; badge.textContent = "Suggested"; card.append(badge); }
            hotelGrid.append(card);
        });
        hotels.append(hotelGrid);

        const schedules = [];
        const itineraryStops = destinationStops[routeName] || [`${routeName} historic centre`, `${routeName} local market`, `${routeName} waterfront or main viewpoint`];
        const freeStops = new Set(["Tuileries Garden", "Seine riverbanks", "Sadar Bazaar", "Taj Nature Walk", "Mehtab Bagh", "Jal Mahal viewpoint", "Panna Meena ka Kund", "Jagdish Temple", "Gangaur Ghat", "Fateh Sagar Lake", "Doodh Talai", "Ambrai Ghat", "Galle Face Green", "Independence Square", "Viharamahadevi Park", "South Bank", "St James’s Park", "Retiro Park", "Piazza Navona", "Trevi Fountain", "Ribeira", "Charles Bridge", "Old Town Square", "Chain Bridge", "Grand Canal", "Piazzale Michelangelo", "Plaka", "Galata Bridge", "Sun Voyager", "Zermatt village centre", "Höhematte Park", "Interlaken Ost riverside", "Old Town Lucerne", "Lake Lucerne promenade", "Grindelwald village", "Chamonix town centre", "Bryggen Wharf", "Reine village", "Gamla Stan", "Nyhavn", "Calton Hill", "St Stephen’s Green", "Stradun", "Riva promenade", "Promenade des Anglais", "Mykonos Windmills", "Funchal Old Town", "Shibuya Crossing", "Gion district", "Dōtonbori", "Haeundae Beach", "The Bund", "Chinatown", "Merlion Park", "Chao Phraya riverside", "Phuket Old Town", "Railay Beach", "Old Quarter", "Hoi An Ancient Town", "Old Market", "Eagle Square", "Malé waterfront", "Thamel", "Lakeside Pokhara", "Paro town", "India Gate", "Marine Drive", "Fontainhas, Panaji", "Old Manali", "Mall Road Manali", "The Ridge", "Leh Market", "Triveni Ghat", "Alappuzha Beach", "Assi Ghat", "Chandni Chowk", "Central Park", "Times Square", "Brooklyn Bridge", "The High Line", "Golden Gate Bridge", "Fisherman’s Wharf", "Santa Monica Pier", "Waikiki Beach", "Banff Avenue", "Stanley Park", "Old Québec", "Copacabana Beach", "Selarón Steps", "Jemaa el-Fnaa", "Sydney Opera House", "Queenstown Gardens", "Auckland Domain"]);
        const dateParts = /^\d{4}-\d{2}-\d{2}$/.test(trip.dates || "") ? trip.dates.split("-").map(Number) : null;
        const dateForDay = (dayIndex) => {
            if (!dateParts) return "Date not selected";
            const date = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2] + dayIndex));
            return new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(date);
        };
        const extraDayIdeas = ["Local food tasting and café trail", "Artisan workshop and independent craft walk", "Leisurely park and sunset outing", "Guided neighbourhood history walk"];
        let totalTicketSpend = 0;
        for (let dayIndex = 0; dayIndex < dayCount; dayIndex += 1) {
            const daySection = document.createElement("section"); daySection.className = "itinerary-day";
            // Consume each curated place once; extra trip days use distinct local experiences instead of repeating sights.
            const stops = itineraryStops.slice(dayIndex * 2, dayIndex * 2 + 2);
            const dayTicketTotal = stops.reduce((sum, stop) => sum + (attractionTicketInfo[stop]?.price || 0), 0);
            const extraIdea = extraDayIdeas[dayIndex % extraDayIdeas.length] + (dayIndex >= extraDayIdeas.length ? ` · route ${Math.floor(dayIndex / extraDayIdeas.length) + 1}` : "");
            const dayHeading = document.createElement("div"); dayHeading.className = "itinerary-day-heading";
            const dayTitle = document.createElement("h2"); dayTitle.textContent = `Day ${dayIndex + 1} · ${routeName}`;
            const dateLabel = document.createElement("p"); dateLabel.className = "itinerary-day-date"; dateLabel.textContent = dateForDay(dayIndex);
            const titleWrap = document.createElement("div"); titleWrap.className = "itinerary-day-title-wrap"; titleWrap.append(dayTitle, dateLabel);
            const spendBadge = document.createElement("strong"); spendBadge.className = "itinerary-day-spend"; spendBadge.textContent = `Est. ${money(budget * .58 + dayTicketTotal)}`;
            dayHeading.append(titleWrap, spendBadge); daySection.append(dayHeading);
            const timeline = document.createElement("ol"); timeline.className = "itinerary-timeline";
            const timelineItems = [
                { time: "7:30 – 8:30", title: "Breakfast", detail: `Start close to your stay in ${routeName}.`, cost: budget * .05 },
                ...(stops[0] ? [{ time: "9:00 – 11:30", title: stops[0], detail: `Morning visit to ${stops[0]} in ${routeName}. Check opening hours before setting out.`, stop: stops[0] }] : [{ time: "9:00 – 11:30", title: extraIdea, detail: `Choose a free or low-cost version of this new local experience in ${routeName}; it does not repeat a listed landmark.`, cost: 0 }]),
                { time: "12:00 – 13:00", title: "Lunch nearby", detail: `Choose a local café${stops[0] ? ` around ${stops[0]}` : ` in ${routeName}`}.`, cost: budget * .07 },
                ...(stops[1] ? [{ time: "13:30 – 15:30", title: stops[1], detail: `Continue to ${stops[1]} as a separate stop for this day.`, stop: stops[1] }] : [{ time: "13:30 – 15:30", title: "Free time", detail: `Keep this time flexible for rest or a new neighbourhood in ${routeName}.`, cost: 0 }]),
                { time: "16:00 – 18:00", title: stops.length ? "Rest and explore nearby" : "Unplanned time", detail: stops.length ? `Take a break near ${stops[stops.length - 1]}; no previously scheduled attraction is repeated.` : `Use this time for a relaxed, unscheduled part of ${routeName}.`, cost: 0 },
                { time: "18:00 – 19:00", title: "Local transport", detail: "Allow for local rides between today’s stops.", cost: budget * .10 },
                { time: "19:30 – 21:00", title: "Dinner", detail: `Have dinner near ${stops[stops.length - 1] || routeName} or return to your stay.`, cost: budget * .08 }
            ];
            timelineItems.forEach((activity) => {
                const item = document.createElement("li"); item.className = "itinerary-timeline-item";
                const timeLabel = document.createElement("time"); timeLabel.textContent = activity.time;
                const body = document.createElement("div"); body.className = "itinerary-activity-copy";
                const title = document.createElement("h3"); title.textContent = activity.title;
                const detail = document.createElement("p"); detail.textContent = activity.detail; body.append(title, detail);
                const price = document.createElement("strong");
                if (activity.stop && freeStops.has(activity.stop)) { price.textContent = "Free entry"; }
                else if (activity.stop && attractionTicketInfo[activity.stop]) {
                    const ticket = attractionTicketInfo[activity.stop];
                    totalTicketSpend += ticket.price;
                    price.textContent = ticket.label;
                    const source = document.createElement("a"); source.className = "itinerary-ticket-source"; source.href = ticket.source; source.target = "_blank"; source.rel = "noopener noreferrer"; source.textContent = "Ticket source"; body.append(source);
                } else if (activity.stop) { price.textContent = "Ticket fee: check at venue"; }
                else { price.textContent = activity.cost ? money(activity.cost) : "Optional"; }
                item.append(timeLabel, body, price); timeline.append(item);
            });
            daySection.append(timeline);
            const daySpend = document.createElement("p"); daySpend.className = "itinerary-day-budget";
            daySpend.textContent = `Estimated day spend: ${money(budget * .58 + dayTicketTotal)} — stay target ${money(budget * .28)}, meals and local transport ${money(budget * .30)}, listed tickets ${money(dayTicketTotal)}. Unverified fees are not included.`;
            daySection.append(daySpend); schedules.push(daySection);
        }
        const balance = document.createElement("p"); balance.className = "itinerary-budget-balance";
        balance.textContent = `Estimated daily stay, meals and local transport allowance: ${money(budget * .58)}. Listed ticket prices for this itinerary: ${money(totalTicketSpend)} total across ${dayCount} ${dayCount === 1 ? "day" : "days"}. Some attractions require checking current fees at their official ticket page or venue.`;
        content.replaceChildren(overview, hotels, ...schedules, balance);
    }

    function initLegacyItinerariesPage() {
        const panels = {
            plan: document.querySelector("#panel-plan"),
            saved: document.querySelector("#panel-saved"),
            trips: document.querySelector("#panel-trips")
        };
        if (!panels.plan) return;

        const savedKey = "gomigo-saved-items-v1";
        const tripsKey = "gomigo-trips-v1";
        const read = (key) => {
            try {
                const value = JSON.parse(window.localStorage.getItem(key) || "[]");
                return Array.isArray(value) ? value : [];
            } catch {
                return [];
            }
        };
        const write = (key, value) => {
            try {
                window.localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch {
                return false;
            }
        };
        const toast = document.querySelector("#toast");
        let saved = read(savedKey);
        let trips = read(tripsKey);
        let latestPlan = null;
        let toastTimer;

        const announce = (message) => {
            if (!toast) return;
            toast.textContent = message;
            toast.classList.add("visible");
            window.clearTimeout(toastTimer);
            toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2600);
        };
        const escapeText = (text = "") => String(text).replace(/[&<>"']/g, (character) => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        })[character]);
        const formatDate = (value) => {
            if (!value) return "Date flexible";
            return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T12:00:00`));
        };

        function renderSaved() {
            const grid = document.querySelector("#saved-grid");
            if (!grid) return;
            grid.replaceChildren();
            saved.forEach((item) => {
                const card = document.createElement("article");
                card.className = "saved-card";
                card.innerHTML = `<img src="${escapeText(item.image || "explore_assets/explore-hero.png")}" alt="${escapeText(item.title)}"><div class="saved-card-content"><span class="saved-country">${escapeText(item.country || "SAVED DESTINATION")}</span><h3>${escapeText(item.title)}</h3><p>${escapeText(item.description || "A place to keep in mind for your next journey.")}</p><div class="saved-actions"><button class="small-primary" type="button" data-plan-destination="${escapeText(item.title)}">Plan this trip <span>→</span></button><button class="remove-saved" type="button" data-remove-saved="${escapeText(item.id)}" aria-label="Remove ${escapeText(item.title)} from saved">♥</button></div></div>`;
                grid.append(card);
            });
            document.querySelector("#saved-empty").hidden = saved.length > 0;
            document.querySelector("#saved-count").textContent = saved.length;
        }

        function renderTrips() {
            const list = document.querySelector("#trip-list");
            if (!list) return;
            list.replaceChildren();
            trips.forEach((trip) => {
                const article = document.createElement("article");
                article.className = "trip-card";
                article.innerHTML = `<div class="trip-card-top"><span class="trip-mark">✈</span><span class="trip-dates">${escapeText(formatDate(trip.startDate))} — ${escapeText(formatDate(trip.endDate))}</span></div><h3>${escapeText(trip.destination)}</h3><p>${escapeText(trip.travelers)} traveler${trip.travelers === "1" ? "" : "s"} · ${escapeText(trip.style)} · ${escapeText(trip.budget)}</p><div class="trip-days">${(trip.days || []).map((day) => `<div><b>${escapeText(day.title)}</b><span>${escapeText(day.detail)}</span></div>`).join("")}</div><button class="remove-trip" type="button" data-remove-trip="${escapeText(trip.id)}">Remove itinerary</button>`;
                list.append(article);
            });
            document.querySelector("#trips-empty").hidden = trips.length > 0;
            document.querySelector("#trips-count").textContent = trips.length;
        }

        function selectTab(name, updateHash = true) {
            if (!panels[name]) name = "saved";
            Object.entries(panels).forEach(([key, panel]) => {
                const selected = key === name;
                panel.hidden = !selected;
                const button = document.querySelector(`#tab-${key}`);
                button.classList.toggle("active", selected);
                button.setAttribute("aria-selected", String(selected));
                button.tabIndex = selected ? 0 : -1;
            });
            if (updateHash && window.location.hash !== `#${name}`) window.history.replaceState(null, "", `#${name}`);
            if (name === "saved") renderSaved();
            if (name === "trips") renderTrips();
        }

        function makeDays(destination, startDate, endDate, style, notes) {
            const start = new Date(`${startDate}T12:00:00`);
            const end = new Date(`${endDate}T12:00:00`);
            const count = Math.max(1, Math.min(14, Math.ceil((end - start) / 86400000) + 1));
            const normalizedStyle = style.toLowerCase();
            const ideas = normalizedStyle.includes("food")
                ? ["Find a local market and try a regional favorite.", "Take a relaxed food walk through a neighborhood.", "Save room for a memorable local dinner."]
                : normalizedStyle.includes("culture")
                    ? ["Get oriented with a walk through the historic center.", "Spend time with a local museum, landmark, or neighborhood.", "Leave room for an unhurried café and evening stroll."]
                    : normalizedStyle.includes("nature") || normalizedStyle.includes("adventure")
                        ? ["Arrive, get settled, and explore a nearby viewpoint.", "Set aside the day for an outdoor highlight.", "Keep a slower morning for a local trail or hidden spot."]
                        : ["Arrive and explore the neighborhood around your stay.", "Choose one signature sight and leave time to wander.", "Enjoy a relaxed final morning before heading home."];
            return Array.from({ length: count }, (_, index) => ({
                title: `Day ${index + 1}`,
                detail: index === 0 ? `Arrive in ${destination} and settle in. ${notes ? `Keep time for: ${notes}` : ideas[0]}` : ideas[index % ideas.length]
            }));
        }

        function renderGenerated(trip) {
            latestPlan = trip;
            const box = document.querySelector("#generated-plan");
            box.hidden = false;
            box.innerHTML = `<div class="generated-head"><div><p class="eyebrow">YOUR FIRST DRAFT</p><h3>${escapeText(trip.destination)}</h3><p>${escapeText(formatDate(trip.startDate))} — ${escapeText(formatDate(trip.endDate))} · ${escapeText(trip.style)}</p></div><button class="small-primary" type="button" id="save-generated">Save to My Trips <span>→</span></button></div><div class="generated-days">${trip.days.map((day) => `<article><span>${escapeText(day.title)}</span><p>${escapeText(day.detail)}</p></article>`).join("")}</div><p class="local-note">A flexible starter outline made in your browser. Adjust it as your plans take shape.</p>`;
            document.querySelector("#save-generated").addEventListener("click", () => {
                trips.unshift({ ...latestPlan, id: crypto.randomUUID?.() || String(Date.now()) });
                if (!write(tripsKey, trips)) {
                    trips.shift();
                    announce("Could not save. Browser storage may be full.");
                    return;
                }
                renderTrips();
                selectTab("trips");
                announce("Itinerary saved to My Trips.");
            });
        }

        document.querySelectorAll(".tab-button").forEach((button) => button.addEventListener("click", () => selectTab(button.dataset.tab)));
        document.querySelectorAll("[data-tab-link]").forEach((link) => link.addEventListener("click", (event) => {
            event.preventDefault();
            selectTab(link.dataset.tabLink);
        }));
        document.querySelectorAll("[data-switch]").forEach((button) => button.addEventListener("click", () => selectTab(button.dataset.switch)));
        document.querySelector(".workspace-tabs")?.addEventListener("keydown", (event) => {
            if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
            event.preventDefault();
            const names = Object.keys(panels);
            const current = names.findIndex((name) => !panels[name].hidden);
            const next = (current + (event.key === "ArrowRight" ? 1 : -1) + names.length) % names.length;
            selectTab(names[next]);
            document.querySelector(`#tab-${names[next]}`).focus();
        });
        window.addEventListener("hashchange", () => selectTab(window.location.hash.slice(1), false));
        document.querySelector("#plan-form").addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            if (!form.reportValidity()) return;
            const data = Object.fromEntries(new FormData(form));
            if (data.endDate < data.startDate) {
                form.elements.endDate.setCustomValidity("Choose an end date on or after the start date.");
                form.elements.endDate.reportValidity();
                return;
            }
            form.elements.endDate.setCustomValidity("");
            const trip = { ...data, id: crypto.randomUUID?.() || String(Date.now()), days: makeDays(data.destination, data.startDate, data.endDate, data.style, data.notes) };
            renderGenerated(trip);
            document.querySelector("#generated-plan").scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
        document.addEventListener("click", (event) => {
            const planButton = event.target.closest("[data-plan-destination]");
            if (planButton) {
                document.querySelector("#plan-form").elements.destination.value = planButton.dataset.planDestination;
                selectTab("plan");
                document.querySelector("#plan-form").elements.startDate.focus();
                return;
            }
            const removeSaved = event.target.closest("[data-remove-saved]");
            if (removeSaved) {
                saved = saved.filter((item) => item.id !== removeSaved.dataset.removeSaved);
                write(savedKey, saved);
                renderSaved();
                announce("Removed from Saved.");
                return;
            }
            const removeTrip = event.target.closest("[data-remove-trip]");
            if (removeTrip) {
                trips = trips.filter((item) => item.id !== removeTrip.dataset.removeTrip);
                write(tripsKey, trips);
                renderTrips();
                announce("Itinerary removed.");
            }
        });

        renderSaved();
        renderTrips();
        const requestedDestination = new URLSearchParams(window.location.search).get("destination");
        if (requestedDestination) {
            document.querySelector("#plan-form").elements.destination.value = requestedDestination;
            selectTab("plan", false);
        } else {
            selectTab(window.location.hash.slice(1) || "saved", false);
        }
    }

    function initDashboard() {
        populateDestinationSuggestions(document.querySelector("#home-destination-suggestions"));
        document.querySelector("#home-destination")?.addEventListener("change", (event) => {
            const value = event.currentTarget.value.trim();
            if (value) window.location.href = "trip-planner.html?destination=" + encodeURIComponent(value);
        });
        document.querySelector("#home-travel-date")?.addEventListener("change", (event) => {
            const date = event.currentTarget.value;
            if (date) window.location.href = "trip-planner.html?date=" + encodeURIComponent(date);
        });
        document.querySelector("[data-navigate-planner]")?.addEventListener("click", () => {
            window.location.href = "trip-planner.html";
        });

        document.querySelector("[data-surprise]")?.addEventListener("click", () => {
            const destination = destinations[Math.floor(Math.random() * destinations.length)];
            window.location.href = "trip-planner.html?destination=" + encodeURIComponent(destination.name);
        });

    }

    function populateDestinationSuggestions(list) {
        if (!list) return;
        const popular = ["Paris", "London", "Tokyo", "Dubai", "New York City", "Rome", "Bali", "Singapore", "Barcelona", "Jaipur", "Goa", "Delhi"];
        const rank = new Map(popular.map((name, index) => [name.toLowerCase(), index]));
        const places = destinationCatalog.slice().sort((a, b) =>
            (rank.get(a.name.toLowerCase()) ?? 1000) - (rank.get(b.name.toLowerCase()) ?? 1000) || a.name.localeCompare(b.name)
        );
        const countryNames = Array.from(new Set(destinationCatalog.map((place) => place.country)));
        const popularCountries = ["India", "France", "Italy", "Japan", "United States", "United Kingdom", "Spain", "Greece", "Thailand", "Indonesia", "Canada", "Australia"];
        const countryRank = new Map(popularCountries.map((name, index) => [name.toLowerCase(), index]));
        countryNames.sort((a, b) => (countryRank.get(a.toLowerCase()) ?? 1000) - (countryRank.get(b.toLowerCase()) ?? 1000) || a.localeCompare(b));
        const options = places.map((place) => {
            const option = document.createElement("option");
            option.value = place.name;
            option.label = place.country + " · City / place";
            return option;
        }).concat(countryNames.map((country) => {
            const option = document.createElement("option");
            option.value = country;
            option.label = "Country";
            return option;
        }));
        list.replaceChildren(...options);
    }

    if (!redirectSignedInPublicPage()) {
        initLandingNavigation();
        initAuthForms();
        initAppNavigation();
        initPlanner();
        initDestinationPages();
        initTripsPage();
        initProfilePage();
        initDashboard();
        initItineraryDetail();
        if (document.body.classList.contains("itineraries-page")) initLegacyItinerariesPage();
    }
})();
