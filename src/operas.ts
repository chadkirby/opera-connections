export interface OperaData {
    title: string;
    normalized: string;
    composer: string;
    date: string;
    language: string;
}

interface RawOpera {
    title: string;
    composer: string;
    date: string;
    Premiere?: string;
    Librettist?: string;
    language?: string;
    'Based on'?: string;
    Website?: string;
    'Other title'?: string;
    'Native title'?: string;
    Translation?: string;
    Scoring?: string;
}

let rawOperas: RawOpera[] = [
    {
        title: "1000 Airplanes on the Roof",
        composer: "Glass, Philip",
        date: "1988",
        Premiere: "July 15, 1988"
    },
    {
        title: "1492 epopea lirica d'America",
        composer: "Braga, Antonio",
        date: "1992"
    },
    {
        title: "1984",
        composer: "Maazel, Lorin",
        date: "2005",
        Librettist: "\n",
        language: "English",
        "Based on": "Nineteen Eighty-Four",
        Premiere: "3 May 2005",
        "Website": "www.1984theopera.com"
    },
    {
        title: "Le 66",
        composer: "Offenbach, Jacques",
        date: "1856"
    },
    {
        title: "L'abandon d'Ariane",
        composer: "Milhaud, Darius",
        date: "1928",
        Librettist: "Henri Hoppenot",
        language: "French",
        "Based on": "Ariadne",
        Premiere: "20 April 1928"
    },
    {
        title: "Abu Hassan",
        composer: "von Weber, Carl Maria",
        date: "1811",
        Librettist: "Franz Carl Hiemer",
        language: "German",
        "Based on": "One Thousand and One Nights",
        Premiere: "4 June 1811"
    },
    {
        title: "Acante et Céphise",
        composer: "Rameau, Jean-Philippe",
        date: "1751"
    },
    {
        title: "Achille et Polyxène",
        composer: "Lully, Jean-Baptiste",
        date: "1687",
        Librettist: "Jean Galbert de Campistron",
        language: "French",
        "Based on": "Aeneid",
        Premiere: "7 November 1687"
    },
    {
        title: "Acis and Galatea",
        composer: "Handel, George Frideric",
        date: "1718"
    },
    {
        title: "Acis et Galatée",
        composer: "Lully, Jean-Baptiste",
        date: "1686"
    },
    {
        title: "Actéon",
        composer: "Charpentier, Marc-Antoine",
        date: "1683–1685",
        language: "French",
        "Based on": "Ovid"
    },
    {
        title: "Adelaide",
        composer: "Sartorio, Antonio",
        date: "1672"
    },
    {
        title: "Adelaide di Borgogna",
        composer: "Rossini, Gioachino",
        date: "1817",
        Librettist: "Giovanni Schmidt",
        language: "Italian",
        Premiere: "27 December 1817"
    },
    {
        title: "Adelia",
        composer: "Donizetti, Gaetano",
        date: "1841",
        "Other title": "La figlia dell'arciere",
        Librettist: "\n",
        language: "Italian",
        Premiere: "11 February 1841"
    },
    {
        title: "Adelson e Salvini",
        composer: "Bellini, Vincenzo",
        date: "1825",
        Librettist: "Andrea Leone Tottola",
        language: "Italian",
        "Based on": "Baculard d'Arnaud",
        Premiere: "12 February 1825"
    },
    {
        title: "Admeto",
        composer: "Handel",
        date: "1727"
    },
    {
        title: "Adriana Lecouvreur",
        composer: "Cilea, Francesco",
        date: "1902",
        Librettist: "Arturo Colautti",
        language: "Italian",
        "Based on": "Adrienne Lecouvreur",
        Premiere: "6 November 1902"
    },
    {
        title: "Adriana Mater",
        composer: "Saariaho, Kaija",
        date: "2008",
        Librettist: "Amin Maalouf",
        language: "French",
        Premiere: "3 April 2006"
    },
    {
        title: "The Adventures of Pinocchio",
        composer: "Dove, Jonathan",
        date: "2007",
        Librettist: "Alasdair Middleton",
        language: "English",
        "Based on": "The Adventures of Pinocchio",
        Premiere: "21 December 2007"
    },
    {
        title: "L'Africaine(Vasco de Gama)",
        composer: "Meyerbeer, Giacomo",
        date: "1865",
        Librettist: "Eugène Scribe",
        language: "French",
        Premiere: "28 April 1865"
    },
    {
        title: "After All!",
        composer: "Cellier, Alfred",
        date: "1878"
    },
    {
        title: "Ages Ago",
        composer: "Clay, Frederic",
        date: "1869"
    },
    {
        title: "Agrippina",
        composer: "Handel",
        date: "1709"
    },
    {
        title: "Die ägyptische Helena",
        composer: "Strauss, Richard",
        date: "1928",
        Librettist: "Hugo von Hofmannsthal",
        language: "German",
        "Based on": "Helen",
        Premiere: "6 June 1928"
    },
    {
        title: "Aida",
        composer: "Verdi, Giuseppe",
        date: "1871",
        Librettist: "Antonio Ghislanzoni",
        language: "Italian",
        Premiere: "24 December 1871"
    },
    {
        title: "Ainadamar",
        composer: "Golijov, Osvaldo",
        date: "2003",
        Translation: "Fountain of Tears",
        Librettist: "David Henry Hwang",
        language: "Spanish",
        "Based on": "Federico García Lorca",
        Premiere: "August 10, 2003"
    },
    {
        title: "Akhnaten",
        composer: "Glass, Philip",
        date: "1984",
        Premiere: "March 24, 1984"
    },
    {
        title: "Alahor in Granata",
        composer: "Donizetti, Gaetano",
        date: "1826",
        Librettist: "M.A.",
        language: "Italian",
        "Based on": "Jean-Pierre Claris de Florian",
        Premiere: "7 January 1826"
    },
    {
        title: "Albert Herring",
        composer: "Britten",
        date: "1947",
        Librettist: "Eric Crozier",
        language: "English",
        "Based on": "Le Rosier de Madame Husson",
        Premiere: "20 June 1947"
    },
    {
        title: "Alceste",
        composer: "Gluck",
        date: "1767"
    },
    {
        title: "Alceste",
        composer: "Handel",
        date: "1750"
    },
    {
        title: "Alceste",
        composer: "Lully",
        date: "1674"
    },
    {
        title: "Alcina",
        composer: "Handel",
        date: "1735",
        language: "Italian",
        "Based on": "L'isola di Alcina",
        Premiere: "16 April 1735"
    },
    {
        title: "Alessandro",
        composer: "Handel",
        date: "1726"
    },
    {
        title: "Alessandro nelle Indie",
        composer: "Pacini",
        date: "1824",
        Librettist: "\n",
        language: "Italian",
        "Based on": "Alessandro nell'Indie",
        Premiere: "29 September 1824"
    },
    {
        title: "Alexandre bis",
        composer: "Martinů",
        date: "1964",
        Librettist: "André Wurmser",
        language: "French",
        Premiere: "18 February 1964"
    },
    {
        title: "Alzira",
        composer: "Verdi, Giuseppe",
        date: "1845",
        Librettist: "Salvatore Cammarano",
        language: "Italian",
        "Based on": "Voltaire",
        Premiere: "12 August 1845"
    },
    {
        title: "Amadis",
        composer: "Lully",
        date: "1684"
    },
    {
        title: "Amadis",
        composer: "Massenet",
        date: "1922",
        Librettist: "Jules Claretie",
        language: "French",
        "Based on": "Amadis de Gaula",
        Premiere: "1 April 1922"
    },
    {
        title: "Amahl and the Night Visitors",
        composer: "Menotti",
        date: "1951",
        Librettist: "Menotti",
        language: "English",
        "Based on": "Hieronymus Bosch",
        Premiere: "December 24, 1951"
    },
    {
        title: "An American Tragedy",
        composer: "Picker",
        date: "2005",
        Librettist: "Gene Scheer",
        language: "English",
        "Based on": "An American Tragedy",
        Premiere: "December 2, 2005"
    },
    {
        title: "Amelia",
        composer: "Hagen",
        date: "2010",
        Librettist: "Gardner McFall",
        language: "English",
        Premiere: "May 8, 2010"
    },
    {
        title: "L'amico Fritz",
        composer: "Mascagni, Pietro",
        date: "Pietro Mascagni",
        Librettist: "P. Suardon",
        language: "Italian",
        "Based on": "L'Ami Fritz",
        Premiere: "31 October 1891"
    },
    {
        title: "L'Amour de loin",
        composer: "Saariaho, Kaija",
        date: "2000",
        Translation: "Love from Afar",
        Librettist: "Amin Maalouf",
        language: "French",
        Premiere: "15 August 2000"
    },
    {
        title: "Andrea Chénier",
        composer: "Giordano",
        date: "1896",
        Librettist: "Luigi Illica",
        Premiere: "28 March 1896 (1896-03-28)La Scala, Milan, Kingdom of Italy"
    },
    {
        title: "L'Ange de Nisida",
        composer: "Donizetti, Gaetano",
        date: "1839",
        Translation: "The Angel of Nisida",
        Librettist: "\n",
        language: "French"
    },
    {
        title: "Angelo",
        composer: "Cui",
        date: "1876"
    },
    {
        title: "Aniara",
        composer: "Blomdahl",
        date: "1959",
        Librettist: "Erik Lindegren",
        language: "Swedish",
        "Based on": "Aniara",
        Premiere: "31 May 1959"
    },
    {
        title: "Anna Bolena",
        composer: "Donizetti, Gaetano",
        date: "1830",
        Librettist: "Felice Romani",
        language: "Italian",
        Premiere: "26 December 1830"
    },
    {
        title: "Anna Nicole",
        composer: "Turnage, Mark-Anthony",
        date: "2011",
        Librettist: "Richard Thomas",
        "Based on": "Anna Nicole Smith",
        Premiere: "17 February 2011"
    },
    {
        title: "Antigonae",
        composer: "Orff",
        date: "1949",
        language: "German",
        "Based on": "Friedrich Hölderlin",
        Premiere: "9 August 1949"
    },
    {
        title: "Apollo et Hyacinthus",
        composer: "Mozart",
        date: "1767",
        Librettist: "Rufinus Widl",
        language: "Latin",
        "Based on": "Ovid",
        Premiere: "1767"
    },
    {
        title: "Aquarius",
        composer: "Goeyvaerts, Karel",
        date: "2009"
    },
    {
        title: "Arabella",
        composer: "Strauss, Richard",
        date: "1933",
        Librettist: "Hugo von Hofmannsthal",
        language: "German",
        Premiere: "1 July 1933"
    },
    {
        title: "Ariadne auf Naxos",
        composer: "Strauss, Richard",
        date: "1912",
        Librettist: "Hugo von Hofmannsthal",
        language: "German",
        Premiere: "25 October 1912"
    },
    {
        title: "Ariodante",
        composer: "Handel",
        date: "1734"
    },
    {
        title: "Arizona Lady",
        composer: "Kálmán, Emmerich",
        date: "1954"
    },
    {
        title: "L'arlesiana",
        composer: "Cilea, Francesco",
        date: "Cilea",
        Librettist: "Leopoldo Marenco",
        language: "Italian",
        "Based on": "Alphonse Daudet",
        Premiere: "27 November 1897"
    },
    {
        title: "Armida",
        composer: "Dvořák",
        date: "1904",
        Librettist: "Jaroslav Vrchlický",
        language: "Czech",
        "Based on": "Torquato Tasso",
        Premiere: "25 March 1904"
    },
    {
        title: "Armida",
        composer: "Rossini, Gioachino",
        date: "1817",
        Librettist: "Giovanni Schmidt",
        language: "Italian",
        "Based on": "Gerusalemme liberata",
        Premiere: "11 November 1817"
    },
    {
        title: "Armide",
        composer: "Gluck",
        date: "1777"
    },
    {
        title: "Armide",
        composer: "Lully",
        date: "1686"
    },
    {
        title: "Aroldo",
        composer: "Verdi, Giuseppe",
        date: "1857",
        Librettist: "Francesco Maria Piave",
        language: "Italian",
        "Based on": "Edward Bulwer-Lytton",
        Premiere: "16 August 1857"
    },
    {
        title: "Artamene",
        composer: "Albinoni, Tomaso",
        date: "1741"
    },
    {
        title: "Les arts florissants",
        composer: "Charpentier, Marc-Antoine",
        date: "1685",
        language: "French",
        Premiere: "1685"
    },
    {
        title: "Ascanio in Alba",
        composer: "Mozart",
        date: "1771",
        Librettist: "Giuseppe Parini",
        language: "Italian",
        Premiere: "17 October 1771"
    },
    {
        title: "Atmen gibt das Leben",
        composer: "Stockhausen",
        date: "1977",
        Translation: "Breathing Gives Life",
        "Scoring": "choir a cappella with solo parts, in Part II also orchestra (playback)"
    },
    {
        title: "Attila",
        composer: "Verdi, Giuseppe",
        date: "1846",
        Librettist: "Temistocle Solera",
        language: "Italian",
        "Based on": "Zacharias Werner",
        Premiere: "17 March 1846"
    },
    {
        title: "Atys",
        composer: "Lully",
        date: "1676"
    },
    {
        title: "Aufstieg und Fall der Stadt Mahagonny",
        composer: "Weill",
        date: "1930",
        Translation: "Rise and Fall of the City of Mahagonny",
        Librettist: "Bertolt Brecht",
        language: "German",
        Premiere: "9 March 1930"
    },
    {
        title: "Babes in Toyland",
        composer: "Herbert",
        date: "1903"
    },
    {
        title: "Babylon",
        composer: "Widmann",
        date: "2012",
        Librettist: "Peter Sloterdijk",
        language: "German",
        Premiere: "27 October 2012"
    },
    {
        title: "Die Bajadere",
        composer: "Kálmán",
        date: "1921"
    },
    {
        title: "Un ballo in maschera",
        composer: "Verdi, Giuseppe",
        date: "1859",
        Translation: "A Masked Ball",
        Librettist: "Antonio Somma",
        language: "Italian",
        "Based on": "Eugène Scribe",
        Premiere: "17 February 1859"
    },
    {
        title: "Bandanna",
        composer: "Hagen",
        date: "1998",
        Librettist: "Paul Muldoon",
        language: "English",
        Premiere: "February 25, 1999"
    },
    {
        title: "Bang!",
        composer: "Rutter",
        date: "1975"
    },
    {
        title: "Der Barbier von Bagdad",
        composer: "Cornelius",
        date: "1858",
        Translation: "The Barber of Baghdad",
        Librettist: "Cornelius",
        language: "German",
        "Based on": "One Thousand and One Nights",
        Premiere: "15 December 1858"
    },
    {
        title: "Il barbiere di SivigliaThe Barber of Seville",
        composer: "Rossini, Gioachino",
        date: "1816",
        "Native title": "Il barbiere di Siviglia, ossia L'inutile precauzione",
        Librettist: "Cesare Sterbini",
        language: "Italian",
        "Based on": "Pierre Beaumarchais",
        Premiere: "20 February 1816"
    },
    {
        title: "The Bartered Bride",
        composer: "Smetana",
        date: "1866",
        "Native title": "Prodaná nevěsta",
        Librettist: "Karel Sabina",
        language: "Czech",
        Premiere: "30 May 1866"
    },
    {
        title: "Beatrix Cenci",
        composer: "Ginastera",
        date: "1971",
        Librettist: "\n",
        language: "Spanish",
        "Based on": "Beatrice Cenci",
        Premiere: "10 September 1971"
    },
    {
        title: "Béatrice et Bénédict",
        composer: "Berlioz",
        date: "1862",
        Librettist: "Hector Berlioz",
        language: "French",
        "Based on": "Much Ado About Nothing",
        Premiere: "9 August 1862"
    },
    {
        title: "The Beggar's Opera",
        composer: "Gay",
        date: "1728",
        Librettist: "John Gay",
        Premiere: "29 January 1728"
    },
    {
        title: "Belisario",
        composer: "Donizetti, Gaetano",
        date: "1836",
        Librettist: "Salvadore Cammarano",
        language: "Italian",
        "Based on": "Belisarius",
        Premiere: "18 March 1836"
    },
    {
        title: "La belle au bois dormant",
        composer: "Carafa",
        date: "1825"
    },
    {
        title: "La belle au bois dormant",
        composer: "Lecocq",
        date: "1900"
    },
    {
        title: "La belle Hélène",
        composer: "Offenbach",
        date: "1864"
    },
    {
        title: "Il Bellerofonte",
        composer: "Mysliveček",
        date: "1767"
    },
    {
        title: "Benvenuto Cellini",
        composer: "Berlioz",
        date: "1838",
        Librettist: "\n",
        language: "French",
        "Based on": "Benvenuto Cellini",
        Premiere: "10 September 1838"
    },
    {
        title: "Bertha",
        composer: "Rorem",
        date: "1973"
    },
    {
        title: "Betrothal in a Monastery",
        composer: "Prokofiev",
        date: "1946",
        "Native title": "Обручение в монастыре",
        Librettist: "\n",
        language: "Russian",
        "Based on": "Richard Brinsley Sheridan",
        Premiere: "3 November 1946"
    },
    {
        title: "Billy Budd",
        composer: "Britten",
        date: "1951",
        Librettist: "\n",
        language: "English",
        "Based on": "Billy Budd",
        Premiere: "1 December 1951"
    },
    {
        title: "Bitter Sweet",
        composer: "Coward",
        date: "1929"
    },
    {
        title: "Blue Monday",
        composer: "Gershwin",
        date: "1929",
        Librettist: "Buddy DeSylva",
    },
    {
        title: "Bluebeard's Castle",
        composer: "Bartók",
        date: "1918",
        "Native title": "Hungarian: A kékszakállú herceg vára",
        Librettist: "Béla Balázs",
        language: "Hungarian",
        "Based on": "La Barbe bleue",
        Premiere: "24 May 1918"
    },
    {
        title: "La bohème",
        composer: "Puccini",
        date: "1896",
        Librettist: "\n",
        language: "Italian",
        "Based on": "Henri Murger",
        Premiere: "1 February 1896"
    },
    {
        title: "La bohème",
        composer: "Leoncavallo",
        date: "1897",
        Librettist: "Leoncavallo",
        language: "Italian",
        "Based on": "La Vie de Bohème",
        Premiere: "6 May 1897 (1897-05-06)La Fenice, Venice"
    },
    {
        title: "Bomarzo",
        composer: "Ginastera",
        date: "1967",
        Librettist: "Manuel Mujica Laínez",
        language: "Spanish",
        "Based on": "Novel",
        Premiere: "19 May 1967"
    },
    {
        title: "Les Boréades",
        composer: "Rameau",
        date: "1770"
    },
    {
        title: "Boris Godunov",
        composer: "Mussorgsky, Modest",
        date: "1874",
        "Native title": "Russian",
        Librettist: "Mussorgsky",
        language: "Russian",
        "Based on": "Boris Godunov",
        Premiere: "27 January 1874"
    },
    {
        title: "The Brandenburgers in Bohemia",
        composer: "Smetana",
        date: "1866",
        "Native title": "Braniboři v Čechách",
        Librettist: "Karel Sabina",
        language: "Czech",
        Premiere: "5 January 1866"
    },
    {
        title: "The Bravest Hussar",
        composer: "Jacobi",
        date: "1905"
    },
    {
        title: "Brundibár",
        composer: "Krása",
        date: "1943"
    },
    {
        title: "Candide",
        composer: "Bernstein",
        date: "1956",
    },
    {
        title: "La canterina",
        composer: "Haydn",
        date: "1766",
        language: "Italian",
        Premiere: "1766"
    },
    {
        title: "Capriccio",
        composer: "Strauss, Richard",
        date: "1942",
        Librettist: "\n",
        language: "German",
        Premiere: "28 October 1942"
    },
    {
        title: "The Captain's Daughter",
        composer: "Cui",
        date: "1911"
    },
    {
        title: "Cardillac",
        composer: "Hindemith, Paul",
        date: "1926",
        Librettist: "Ferdinand Lion",
        language: "German",
        "Based on": "Das Fräulein von Scuderi",
        Premiere: "9 November 1926"
    },
    {
        title: "Carmen",
        composer: "Bizet",
        date: "1875",
        Librettist: "\n",
        language: "French",
        "Based on": "Carmen",
        Premiere: "3 March 1875"
    },
    {
        title: "Casanova's Homecoming",
        composer: "Argento",
        date: "1985"
    },
    {
        title: "Cavalleria rusticana",
        composer: "Mascagni, Pietro",
        date: "1890",
        Librettist: "Giovanni Targioni-Tozzetti",
        language: "Italian",
        "Based on": "Cavalleria rusticana",
        Premiere: "17 May 1890"
    },
    {
        title: "The Cave",
        composer: "Reich",
        date: "1994",
        language: "English",
        "Based on": "The Cave of the Patriarchs",
        Premiere: "October 22, 1993"
    },
    {
        title: "Cendrillon",
        composer: "Massenet",
        date: "1899",
        Librettist: "Henri Caïn",
        language: "French",
        "Based on": "Perrault",
        Premiere: "24 May 1899"
    },
    {
        title: "La Cenerentola",
        composer: "Rossini, Gioachino",
        date: "1817",
        "Other title": "La Cenerentola, ossia La bontà in trionfo",
        Librettist: "Jacopo Ferretti",
        language: "Italian",
        "Based on": "Cendrillon",
        Premiere: "25 January 1817"
    },
    {
        title: "La Cenicienta",
        composer: "Hen",
        date: "1966"
    },
    {
        title: "Champion",
        composer: "Blanchard, Terence",
        date: "2013",
        Librettist: "Michael Cristofer",
        language: "English",
        Premiere: "15 June 2013"
    },
    {
        title: "Charles VI",
        composer: "Halévy",
        date: "1843"
    },
    {
        title: "Charlotte Corday",
        composer: "Ferrero, Lorenzo",
        date: "1989",
        Librettist: "Giuseppe Di Leva",
        language: "Italian",
        Premiere: "21 February 1989"
    },
    {
        title: "Chopin",
        composer: "Orefice, Giacomo",
        date: "1901"
    },
    {
        title: "Le Cid",
        composer: "Massenet",
        date: "1885",
        Librettist: "\n",
        language: "French",
        "Based on": "Le Cid",
        Premiere: "30 November 1885"
    },
    {
        title: "La clemenza di Tito",
        composer: "Mozart",
        date: "1791",
        Translation: "The Clemency of Titus",
        Librettist: "Caterino Mazzolà",
        language: "Italian",
        "Based on": "Pietro Metastasio",
        Premiere: "6 September 1791"
    },
    {
        title: "Cold Mountain",
        composer: "Higdon, Jennifer",
        date: "2015"
    },
    {
        title: "Comedy on the Bridge",
        composer: "Martinů",
        date: "1937"
    },
    {
        title: "Le comte Ory",
        composer: "Rossini, Gioachino",
        date: "1828",
        Librettist: "\n",
        language: "French",
        Premiere: "20 August 1828"
    },
    {
        title: "Les contes d'Hoffmann",
        composer: "Offenbach",
        date: "1881",
        language: "French",
    },
    {
        title: "Der Corregidor",
        composer: "Wolf",
        date: "1896",
        Librettist: "Rosa Mayreder",
        language: "German",
        "Based on": "El sombrero de tres picos",
        Premiere: "7 June 1896"
    },
    {
        title: "Così fan tutte ossia La scuola degli amanti",
        composer: "Mozart",
        date: "1790",
        Translation: "Thus Do They All, or The School for Lovers",
        Librettist: "Lorenzo Da Ponte",
        language: "Italian",
        Premiere: "26 January 1790"
    },
    {
        title: "The Countess",
        composer: "Moniuszko",
        date: "1860",
        "Native title": "Hrabina",
        Librettist: "Włodzimierz Wolski",
        language: "Polish",
        Premiere: "7 February 1860"
    },
    {
        title: "Covid fan tutte",
        composer: "Mozart",
        date: "2020"
    },
    {
        title: "The Crucible",
        composer: "Ward",
        date: "1961",
        Librettist: "Bernard Stambler",
        language: "English",
        "Based on": "The Crucible",
        Premiere: "October 26, 1961"
    },
    {
        title: "Die Csárdásfürstin",
        composer: "Kálmán",
        date: "1915"
    },
    {
        title: "The Cunning Little Vixen",
        composer: "Janáček, Leoš",
        date: "1924",
        "Native title": "Czech: ",
        Librettist: "Leoš Janáček",
        language: "Czech",
        "Based on": "Rudolf Těsnohlídek",
        Premiere: "6 November 1924"
    },
    {
        title: "La Curandera",
        composer: "Rodriguez, Robert Xavier",
        date: "2006"
    },
    {
        title: "Curlew River",
        composer: "Britten",
        date: "1964",
        Librettist: "William Plomer",
        "Based on": "Sumidagawa",
        Premiere: "13 June 1964"
    },
    {
        title: "Cyrano de Bergerac",
        composer: "Alfano",
        date: "1936",
        Librettist: "Henri Caïn",
        language: "French",
        "Based on": "Edmond Rostand",
        Premiere: "22 January 1936"
    },
    {
        title: "Dafne",
        composer: "Peri",
        date: "1597",
        Librettist: "Ottavio Rinuccini",
        language: "Italian",
        "Based on": "Daphne",
        Premiere: "1598"
    },
    {
        title: "Dalibor",
        composer: "Smetana",
        date: "1868",
        Librettist: "Josef Wenzig",
        language: "Czech",
        Premiere: "16 May 1868"
    },
    {
        title: "La damnation de Faust",
        composer: "Berlioz",
        date: "1893",
        Translation: "The Damnation of Faust",
        language: "French",
        "Based on": "Goethe's ",
        "Scoring": "four soloists children's chorus seven-part choir orchestra"
    },
    {
        title: "The Dangerous Liaisons",
        composer: "Susa",
        date: "1994"
    },
    {
        title: "Dantons Tod",
        composer: "Einem",
        date: "1947",
        Translation: "Dantons Death",
        Librettist: "\n",
        language: "German",
        "Based on": "Danton's Death",
        Premiere: "6 August 1947"
    },
    {
        title: "Daphne",
        composer: "Strauss, Richard",
        date: "1938",
        Librettist: "Joseph Gregor",
        language: "German",
        Premiere: "2 October 1938"
    },
    {
        title: "Dardanus",
        composer: "Rameau",
        date: "1739",
        Librettist: "Charles-Antoine Leclerc de La Bruère",
        language: "French",
        "Based on": "Greek myth of Dardanus",
        Premiere: "19 November 1739"
    },
    {
        title: "Dardanus",
        composer: "Sacchini",
        date: "1784",
        Librettist: "Nicolas-François Guillard",
        language: "French",
        "Based on": "Charles-Antoine Leclerc de La Bruère",
        Premiere: "18 September 1784"
    },
    {
        title: "Dead Man Walking",
        composer: "Heggie",
        date: "2000",
        Librettist: "Terrence McNally",
        "Based on": "Dead Man Walking",
        Premiere: "October 7, 2000"
    },
    {
        title: "Death in Venice",
        composer: "Britten",
        date: "1973",
        Librettist: "Myfanwy Piper",
        language: "English",
        "Based on": "Tod in Venedig",
        Premiere: "16 June 1973"
    },
    {
        title: "The Death of Klinghoffer",
        composer: "Adams, John",
        date: "1991",
        Librettist: "Alice Goodman",
        language: "English",
        Premiere: "19 March 1991"
    },
    {
        title: "Destiny",
        composer: "Janáček, Leoš",
        date: "1934",
        "Native title": "Osud",
        Librettist: "\n",
        language: "Czech",
        Premiere: "1958"
    },
    {
        title: "The Devil and Kate",
        composer: "Dvořák",
        date: "1899",
        Librettist: "Adolf Wenig",
        language: "Czech",
        "Based on": "Josef Kajetán Tyl",
        Premiere: "18 November 1899"
    },
    {
        title: "The Devil Take Her",
        composer: "Benjamin",
        date: "1931"
    },
    {
        title: "Dialogues des Carmélites",
        composer: "Poulenc",
        date: "1957",
        Translation: "Dialogues of the Carmelites",
        Librettist: "Poulenc",
        language: "French",
        "Based on": "Dialogues des Carmélites",
        Premiere: "26 January 1957"
    },
    {
        title: "Dido and Aeneas",
        composer: "Purcell",
        date: "1689",
        Librettist: "Nahum Tate",
        "Based on": "Aeneid",
        Premiere: "1689"
    },
    {
        title: "Dienstag aus Licht",
        composer: "Stockhausen",
        date: "1993",
        Librettist: "Stockhausen",
        language: "German",
        Premiere: "May 28, 1993"
    },
    {
        title: "Djamileh",
        composer: "Bizet",
        date: "1872",
        Librettist: "Louis Gallet",
        language: "French",
        "Based on": "Namouna",
        Premiere: "22 May 1872"
    },
    {
        title: "Doctor Atomic",
        composer: "Adams, John",
        date: "2005",
        Librettist: "Peter Sellars",
        language: "English",
        Premiere: "1 October 2005"
    },
    {
        title: "Dolores Claiborne",
        composer: "Picker",
        date: "2013",
        Librettist: "J. D. McClatchy",
        language: "English",
        "Based on": "Dolores Claiborne",
        Premiere: "September 18, 2013"
    },
    {
        title: "Don Carlos",
        composer: "Verdi, Giuseppe",
        date: "1867",
        Librettist: "\n",
        language: "French",
        "Based on": "Don Carlos",
        Premiere: "11 March 1867"
    },
    {
        title: "Don Giovanni",
        composer: "Mozart",
        date: "1787",
        "Other title": "Il dissoluto punito, ossia il Don Giovanni",
        Librettist: "Lorenzo Da Ponte",
        language: "Italian",
        "Based on": "Don Juan",
        Premiere: "29 October 1787"
    },
    {
        title: "Don Pasquale",
        composer: "Donizetti, Gaetano",
        date: "1843",
        Librettist: "\n",
        language: "Italian",
        Premiere: "3 January 1843"
    },
    {
        title: "Don Rodrigo",
        composer: "Ginastera",
        date: "1964",
        Librettist: "Alejandro Casona",
        language: "Spanish",
        Premiere: "24 July 1964"
    },
    {
        title: "Don Sanche",
        composer: "Liszt",
        date: "1825",
        Librettist: "\n",
        language: "French",
        "Based on": "Jean-Pierre Claris de Florian",
        Premiere: "17 October 1825"
    },
    {
        title: "La donna del lago",
        composer: "Rossini, Gioachino",
        date: "1819",
        Translation: "The Lady of the Lake",
        Librettist: "Andrea Leone Tottola",
        language: "Italian",
        "Based on": "The Lady of the Lake",
        Premiere: "24 September 1819"
    },
    {
        title: "Le donne curiose",
        composer: "Wolf-Ferrari",
        date: "1903",
        Translation: "The Inquisitive Women",
        Librettist: "Luigi Sugana",
        language: "Italian",
        "Based on": "Le donne curiose",
        Premiere: "27 November 1903"
    },
    {
        title: "Donnerstag aus Licht",
        composer: "Stockhausen",
        date: "1981",
        Librettist: "Stockhausen",
        language: "German",
        Premiere: "March 15, 1981"
    },
    {
        title: "Dr. Sun Yat-sen",
        composer: "Ruo, Huang",
        date: "2014"
    },
    {
        title: "I due Foscari",
        composer: "Verdi, Giuseppe",
        date: "1844",
        Librettist: "Francesco Maria Piave",
        language: "Italian",
        "Based on": "Lord Byron",
        Premiere: "3 November 1844"
    },
    {
        title: "Edgar",
        composer: "Puccini",
        date: "1899",
        Librettist: "Ferdinando Fontana",
        language: "Italian",
        "Based on": "Alfred de Musset",
        Premiere: "21 April 1889"
    },
    {
        title: "The Eighth Wonder",
        composer: "John",
        date: "1995",
        Librettist: "Dennis Watkins",
        language: "English",
        "Based on": "Building of the Sydney Opera House",
        Premiere: "14 October 1995"
    },
    {
        title: "Einstein on the Beach",
        composer: "Glass",
        date: "1976",
        Librettist: "\n",
        Premiere: "July 25, 1976"
    },
    {
        title: "Elektra",
        composer: "Strauss, Richard",
        date: "1909",
        Librettist: "Hugo von Hofmannsthal",
        language: "German",
        "Based on": "Sophocles",
        Premiere: "25 January 1909"
    },
    {
        title: "L'elisir d'amore",
        composer: "Donizetti, Gaetano",
        date: "1832",
        Librettist: "Felice Romani",
        language: "Italian",
        "Based on": "Eugène Scribe",
        Premiere: "12 May 1832"
    },
    {
        title: "Emmeline",
        composer: "Picker",
        date: "1996",
        Librettist: "J. D. McClatchy",
        language: "English",
        "Based on": "Judith Rossner",
        Premiere: "1996"
    },
    {
        title: "L'enfant et les sortilèges",
        composer: "Ravel",
        date: "1925",
        Librettist: "Colette",
        language: "French",
        Premiere: "21 March 1925"
    },
    {
        title: "The English Cat Die englische Katze",
        composer: "Henze",
        date: "1983",
        Librettist: "Edward Bond",
        "Based on": "Les peines de coeur d'une chatte anglaise",
        Premiere: "2 June 1983"
    },
    {
        title: "Die Entführung aus dem Serail",
        composer: "Mozart",
        date: "1782",
        Librettist: "Gottlieb Stephanie",
        language: "German",
        "Based on": "Christoph Friedrich Bretzner",
        Premiere: "16 July 1782"
    },
    {
        title: "Ernani",
        composer: "Verdi, Giuseppe",
        date: "1844",
        Librettist: "Francesco Maria Piave",
        language: "Italian",
        "Based on": "Hernani",
        Premiere: "9 March 1844"
    },
    {
        title: "Esclarmonde",
        composer: "Massenet",
        date: "1888",
        Librettist: "\n",
        language: "French",
        "Based on": "Parthénopéus de Blois",
        Premiere: "15 May 1889"
    },
    {
        title: "L'étoile",
        composer: "Chabrier",
        date: "1877",
        Librettist: "\n",
        language: "French",
        Premiere: "28 November 1877"
    },
    {
        title: "Eugene Onegin",
        composer: "Tchaikovsky",
        date: "1879",
        "Native title": "Russian",
        Librettist: "\n",
        language: "Russian",
        "Based on": "Eugene Onegin",
        Premiere: "29 March 1879"
    },
    {
        title: "Euridice",
        composer: "Peri",
        date: "1600",
        Librettist: "Ottavio Rinuccini",
        language: "Italian",
        "Based on": "Ovid",
        Premiere: "6 October 1600"
    },
    {
        title: "Euryanthe",
        composer: "Weber",
        date: "1823",
        Librettist: "Helmina von Chézy",
        language: "German",
        "Based on": "13th-century French romance",
        Premiere: "25 October 1823"
    },
    {
        title: "Evangeline",
        composer: "Luening",
        date: "1986"
    },
    {
        title: "Everest",
        composer: "Talbot",
        date: "2015",
        Librettist: "Gene Scheer",
        language: "English",
        Premiere: "January 30, 2015"
    },
    {
        title: "The Excursions of Mr. Brouček",
        composer: "Janáček, Leoš",
        date: "1920",
        "Native title": "Výlety páně Broučkovy",
        "Other title": "The Excursions of Mr. Brouček to the Moon and to the 15th Century",
        language: "Czech",
        "Based on": "Svatopluk Čech",
        Premiere: "23 April 1920"
    },
    {
        title: "Facing Goya",
        composer: "Nyman",
        date: "2000"
    },
    {
        title: "The Fair at Sorochyntsi",
        composer: "Mussorgsky, Modest",
        date: "1913",
        "Native title": "Russian",
        Librettist: "Mussorgsky",
        language: "Russian",
        "Based on": "The Fair at Sorochyntsi",
        Premiere: "13 October 1917"
    },
    {
        title: "Falstaff",
        composer: "Verdi, Giuseppe",
        date: "1893",
        Librettist: "Arrigo Boito",
        language: "Italian",
        "Based on": "The Merry Wives of Windsor",
        Premiere: "9 February 1893"
    },
    {
        title: "La fanciulla del West",
        composer: "Puccini",
        date: "1910",
        Translation: "The Girl of the West",
        Librettist: "\n",
        language: "Italian",
        "Based on": "David Belasco",
        Premiere: "10 December 1910"
    },
    {
        title: "Fantastic Mr. Fox",
        composer: "Picker",
        date: "1998",
        Librettist: "Donald Sturrock",
        language: "English",
        "Based on": "children's novel",
        Premiere: "December 9, 1998"
    },
    {
        title: "Die Faschingsfee",
        composer: "Kálmán",
        date: "1917"
    },
    {
        title: "Faust",
        composer: "Gounod",
        date: "1859",
        Librettist: "\n",
        language: "French",
        "Based on": "Faust et Marguerite",
        Premiere: "19 March 1859"
    },
    {
        title: "La favorite",
        composer: "Donizetti, Gaetano",
        date: "1840",
        Librettist: "\n",
        language: "French",
        "Based on": "Le comte de Comminges",
        Premiere: "2 December 1840"
    },
    {
        title: "A Feast in Time of Plague",
        composer: "Cui",
        date: "1901"
    },
    {
        title: "A Feast in the Time of Plague",
        composer: "2020",
        date: "2020"
    },
    {
        title: "Fedora",
        composer: "Giordano",
        date: "1898",
        Librettist: "Arturo Colautti",
        language: "Italian",
        "Based on": "Fédora",
        Premiere: "17 November 1898"
    },
    {
        title: "Die Feen",
        composer: "Wagner",
        date: "1833",
        Translation: "The Fairies",
        Librettist: "Richard Wagner (1833)",
        language: "German",
        "Based on": "Carlo Gozzi",
        Premiere: "29 June 1888"
    },
    {
        title: "Feuersnot",
        composer: "Strauss, Richard",
        date: "1901",
        Librettist: "Ernst von Wolzogen",
        language: "German",
        "Based on": "J. Ketel's \"Das erloschene Feuer zu Audenaerde\"",
        Premiere: "21 November 1901"
    },
    {
        title: "Fidelio",
        composer: "Beethoven",
        date: "1805",
        Librettist: "Joseph Sonnleithner",
        language: "German",
        Premiere: "Original premiere 20 November 1805"
    },
    {
        title: "The Fiery Angel",
        composer: "Prokofiev",
        date: "1955",
        "Native title": "Огненный ангел",
        Librettist: "Prokofiev",
        language: "Russian",
        "Based on": "The Fiery Angel",
        Premiere: "25 November 1955"
    },
    {
        title: "La fille du régiment",
        composer: "Donizetti, Gaetano",
        date: "1840",
        Librettist: "\n",
        language: "French",
        Premiere: "11 February 1840"
    },
    {
        title: "The Finnish Prisoner",
        composer: "Gough, Orlando",
        date: "2007",
        Librettist: "Stephen Plaice",
        language: "English",
        Premiere: "11 July 2007"
    },
    {
        title: "Fire Shut Up in My Bones",
        composer: "Blanchard, Terence",
        date: "2019",
        Librettist: "Kasi Lemmons",
        language: "English",
        "Based on": "Charles M. Blow",
        Premiere: "June 15, 2019"
    },
    {
        title: "Die Fledermaus",
        composer: "Strauss, Johann",
        date: "1874",
        language: "German",
    },
    {
        title: "Le Flibustier",
        composer: "Cui",
        date: "1894"
    },
    {
        title: "Der fliegende HolländerThe Flying Dutchman",
        composer: "Wagner",
        date: "1843",
        Librettist: "Richard Wagner",
        language: "German",
        "Based on": "Der fliegende Holländer",
        Premiere: "2 January 1843"
    },
    {
        title: "Florencia en el Amazonas",
        composer: "Catán",
        date: "1996",
        Librettist: "Marcela Fuentes-Berain",
        language: "Spanish",
        "Based on": "Love in the Time of Cholera",
        Premiere: "25 October 1996"
    },
    {
        title: "La forza del destino",
        composer: "Verdi, Giuseppe",
        date: "1862",
        Librettist: "Francesco Maria Piave",
        language: "Italian",
        "Based on": "Ángel de Saavedra",
        Premiere: "10 November 1862"
    },
    {
        title: "Four Saints in Three Acts",
        composer: "Thomson",
        date: "1934"
    },
    {
        title: "Francesca da Rimini",
        composer: "Zandonai",
        date: "1914",
        Librettist: "Tito Ricordi",
        language: "Italian",
        "Based on": "Francesca da Rimini",
        Premiere: "19 February 1914"
    },
    {
        title: "Francesca da Rimini",
        composer: "Rachmaninoff",
        date: "1906",
        "Native title": "Russian",
        Librettist: "Modest Ilyich Tchaikovsky",
        language: "Russian",
        "Based on": "Francesca da Rimini",
        Premiere: "24 January 1906"
    },
    {
        title: "Der Freischütz",
        composer: "Weber",
        date: "1821",
        Translation: "The Marksman",
        Librettist: "Friedrich Kind",
        language: "German",
        Premiere: "18 June 1821"
    },
    {
        title: "Freitag aus Licht",
        composer: "Stockhausen",
        date: "1996",
        Librettist: "Stockhausen",
        language: "German",
        Premiere: "12 September 1996"
    },
    {
        title: "From the House of the Dead",
        composer: "Janáček, Leoš",
        date: "1930",
        "Native title": "Z mrtvého domu",
        Librettist: "Leoš Janáček",
        language: "Czech",
        "Based on": "The House of the Dead",
        Premiere: "12 April 1930"
    },
    {
        title: "Galileo Galilei",
        composer: "Glass",
        date: "2002",
        Librettist: "Mary Zimmerman",
        "Based on": "Galileo Galilei",
        Premiere: "2002"
    },
    {
        title: "The Gambler",
        composer: "Prokofiev",
        date: "1929",
        "Native title": "Игрок",
        Librettist: "Prokofiev",
        language: "Russian",
        "Based on": "The Gambler",
        Premiere: "1929"
    },
    {
        title: "La gazza ladra",
        composer: "Rossini, Gioachino",
        date: "1817",
        Translation: "The Thieving Magpie",
        Librettist: "Giovanni Gherardini",
        language: "Italian",
        "Based on": "La pie voleuse",
        Premiere: "31 May 1817"
    },
    {
        title: "Geneviève de Brabant",
        composer: "Offenbach",
        date: "1859",
        Librettist: "\n",
        language: "French",
        "Based on": "Genevieve of Brabant",
        Premiere: "19 November 1859"
    },
    {
        title: "Genoveva",
        composer: "Schumann",
        date: "1850",
        Librettist: "\n",
        language: "German",
        "Based on": "Genevieve of Brabant",
        Premiere: "25 June 1850"
    },
    {
        title: "Das Gesicht im Spiegel",
        composer: "Widmann",
        date: "2003",
        Translation: "The Face in the Mirror",
        Librettist: "Roland Schimmelpfennig",
        language: "German",
        Premiere: "17 July 2003"
    },
    {
        title: "The Ghosts of Versailles",
        composer: "Corigliano",
        date: "1991",
        Librettist: "William M. Hoffman",
        language: "English",
        "Based on": "La Mère coupable",
        Premiere: "19 December 1991"
    },
    {
        title: "Gianni Schicchi",
        composer: "Puccini",
        date: "1918",
        Librettist: "Giovacchino Forzano",
        language: "Italian",
        "Based on": "Dante",
        Premiere: "14 December 1918"
    },
    {
        title: "Gilgamesh",
        composer: "Brucci",
        date: "1986"
    },
    {
        title: "La Gioconda",
        composer: "Ponchielli",
        date: "1876",
        Librettist: "Arrigo Boito",
        language: "Italian",
        "Based on": "Angelo, Tyrant of Padua",
        Premiere: "8 April 1876"
    },
    {
        title: "Un giorno di regno",
        composer: "Verdi, Giuseppe",
        date: "1840",
        "Other title": "Il finto Stanislao",
        Librettist: "Felice Romani",
        language: "Italian",
        "Based on": "Alexandre-Vincent Pineux Duval",
        Premiere: "5 September 1840"
    },
    {
        title: "Giovanna d'Arco",
        composer: "Verdi, Giuseppe",
        date: "1845",
        Librettist: "Temistocle Solera",
        language: "Italian",
        "Based on": "Schiller",
        Premiere: "15 February 1845"
    },
    {
        title: "Giulio Cesare",
        composer: "Handel",
        date: "1724"
    },
    {
        title: "Gloriana",
        composer: "Britten",
        date: "1953",
        Librettist: "William Plomer",
        language: "English",
        "Based on": "Elizabeth and Essex: A Tragic History",
        Premiere: "8 June 1953"
    },
    {
        title: "The Golden Cockerel",
        composer: "Rimsky-Korsakov",
        date: "1907",
        Librettist: "Vladimir Belsky",
        language: "Russian",
        "Based on": "Pushkin",
        Premiere: "7 October 1909"
    },
    {
        title: "Le coq d'or",
        composer: "Rimsky-Korsakov",
        date: "1907",
        Librettist: "Vladimir Belsky",
        language: "French",
        "Based on": "Pushkin",
        Premiere: "7 October 1909"
    },
    {
        title: "Götterdämmerung",
        composer: "Wagner",
        date: "1876",
        Translation: "Twilight of the Gods",
        Librettist: "Richard Wagner",
        language: "German",
        "Based on": "Nordic and German legends",
        Premiere: "17 August 1876"
    },
    {
        title: "Goyescas",
        composer: "Granados",
        date: "1916"
    },
    {
        title: "Le Grand Macabre",
        composer: "Ligeti",
        date: "1978",
        Librettist: "\n",
        language: "German",
        "Based on": "La balade du grand macabre",
        Premiere: "12 April 1978"
    },
    {
        title: "The Greater Good, or the Passion of Boule de Suif",
        composer: "Hartke",
        date: "2006"
    },
    {
        title: "The Great Friendship",
        composer: "Muradeli",
        date: "1947"
    },
    {
        title: "The Greek Passion",
        composer: "Martinů",
        date: "1961",
        Librettist: "Martinů",
        language: "English",
        "Based on": "The Greek Passion",
        Premiere: "19 June 1961"
    },
    {
        title: "Il Guarany",
        composer: "Gomes, Carlos",
        date: "Carlos Gomes",
        Librettist: "\n",
        language: "Italian",
        "Based on": "O Guarani",
        Premiere: "19 March 1870"
    },
    {
        title: "Guillaume TellWilliam Tell",
        composer: "Rossini, Gioachino",
        date: "1829",
        Librettist: "\n",
        language: "French",
        "Based on": "Wilhelm Tell",
        Premiere: "3 August 1829"
    },
    {
        title: "Hagith",
        composer: "Szymanowski, Karol",
        date: "1922",
        Librettist: "Felix Dörmann",
        language: "German",
        Premiere: "13 May 1922"
    },
    {
        title: "Halka",
        composer: "Moniuszko",
        date: "1854",
        Librettist: "Włodzimierz Wolski",
        language: "Polish",
        Premiere: "28 February 1854"
    },
    {
        title: "The Handmaid's Tale",
        composer: "Ruders, Poul",
        date: "2000"
    },
    {
        title: "Hänsel und Gretel",
        composer: "Humperdinck",
        date: "1893",
        Librettist: "Adelheid Wette",
        language: "German",
        Premiere: "23 December 1893"
    },
    {
        title: "Háry János",
        composer: "Kodály",
        date: "1926",
        Librettist: "\n",
        language: "Hungarian",
        "Based on": "The Veteran",
        Premiere: "1926"
    },
    {
        title: "The Haughty Princess",
        composer: "Jacobi",
        date: "1904"
    },
    {
        title: "The Haunted Manor",
        composer: "Moniuszko",
        date: "1865",
        "Native title": "Straszny dwór",
        Librettist: "Jan Chęciński",
        language: "Polish",
        Premiere: "28 September 1865"
    },
    {
        title: "Die heilige Ente",
        composer: "Gál",
        date: "1923"
    },
    {
        title: "Die Herzogin von Chicago",
        composer: "Kálmán",
        date: "1928"
    },
    {
        title: "L'heure espagnole",
        composer: "Ravel",
        date: "1911",
        Librettist: "Franc-Nohain",
        language: "French",
        "Based on": "Franc-Nohain's play",
        Premiere: "19 May 1911"
    },
    {
        title: "Die Hochzeit",
        composer: "Wagner",
        date: "Wagner",
        Librettist: "Richard Wagner",
        language: "German"
    },
    {
        title: "Hugh the Drover",
        composer: "Williams, Vaughan",
        date: "1958",
        Librettist: "Harold Child",
        language: "English",
        Premiere: "14 July 1924"
    },
    {
        title: "Les Huguenots",
        composer: "Meyerbeer, Giacomo",
        date: "1836",
        Librettist: "\n",
        language: "French",
        Premiere: "29 February 1836"
    },
    {
        title: "The Ice Break",
        composer: "Tippett, Michael",
        date: "1977",
        Librettist: "Michael Tippett",
        language: "English",
        Premiere: "7 July 1977"
    },
    {
        title: "Idomeneo",
        composer: "Mozart",
        date: "1781",
        Librettist: "Giambattista Varesco",
        language: "Italian",
        "Based on": "Antoine Danchet",
        Premiere: "29 January 1781"
    },
    {
        title: "L'incoronazione di Poppea",
        composer: "Monteverdi",
        date: "1642"
    },
    {
        title: "Les Indes galantes",
        composer: "Rameau",
        date: "1735",
        Librettist: "Louis Fuzelier",
        language: "French",
        Premiere: "23 August 1735"
    },
    {
        title: "Iolanta",
        composer: "Tchaikovsky",
        date: "1892",
        "Native title": "Russian: ",
        Librettist: "Modest Tchaikovsky",
        language: "Russian",
        "Based on": "Kong Renés Datter",
        Premiere: "18 December 1892"
    },
    {
        title: "Iphigénie en Tauride",
        composer: "Gluck",
        date: "1779"
    },
    {
        title: "Iris",
        composer: "Mascagni, Pietro",
        date: "1899",
        Librettist: "Luigi Illica",
        language: "Italian",
        Premiere: "22 November 1898"
    },
    {
        title: "L'île de Tulipatan",
        composer: "Offenbach",
        date: "1868",
        Librettist: "\n",
        language: "French",
        Premiere: "30 September 1868"
    },
    {
        title: "L'italiana in Algeri",
        composer: "Rossini, Gioachino",
        date: "1813",
        Translation: "The Italian Girl in Algiers",
        Librettist: "Angelo Anelli",
        language: "Italian",
        Premiere: "22 May 1813"
    },
    {
        title: "Ivan the Fool",
        composer: "Cui",
        date: "Cui"
    },
    {
        title: "The Jacobin",
        composer: "Dvořák",
        date: "1889",
        Librettist: "Marie Červinková-Riegrová",
        language: "Czech",
        Premiere: "12 February 1889"
    },
    {
        title: "Jenůfa",
        composer: "Janáček, Leoš",
        date: "1904",
        "Native title": "Její pastorkyňa ",
        Librettist: "Janáček",
        language: "Czech",
        "Based on": "Její pastorkyňa",
        Premiere: "21 January 1904"
    },
    {
        title: "Jérusalem",
        composer: "Verdi, Giuseppe",
        date: "1847",
        Librettist: "\n",
        language: "French",
        "Based on": "I Lombardi alla prima crociata",
        Premiere: "26 November 1847"
    },
    {
        title: "I gioielli della Madonna",
        composer: "Wolf-Ferrari",
        date: "1911",
        Translation: "The Jewels of the Madonna",
        Librettist: "\n",
        language: "Italian",
        Premiere: "23 December 1911"
    },
    {
        title: "Judith",
        composer: "Serov",
        date: "1863",
        "Native title": "Russian",
        Librettist: "\n",
        language: "Russian",
        "Based on": "Book of Judith",
        Premiere: "16 May 1863"
    },
    {
        title: "Juha",
        composer: "Merikanto, Aarre",
        date: "Aarre Merikanto"
    },
    {
        title: "La Juive",
        composer: "Halévy",
        date: "1835",
        Translation: "The Jewess",
        Librettist: "Eugène Scribe",
        language: "French",
        Premiere: "23 February 1835"
    },
    {
        title: "Julie",
        composer: "Boesmans",
        date: "2005",
        Librettist: "\n",
        language: "German",
        "Based on": "August Strindberg",
        Premiere: "2005"
    },
    {
        title: "Der Kaiser von Atlantis",
        composer: "Ullmann",
        date: "1975",
        Translation: "The Emperor of Atlantis",
        Librettist: "Peter Kien",
        language: "German",
        Premiere: "16 December 1975"
    },
    {
        title: "Kaiserin Josephine",
        composer: "Kálmán",
        date: "1936"
    },
    {
        title: "Die Kalewainen in Pochjola",
        composer: "Müller-Berghaus, K.",
        date: "2017",
        Translation: "The men of Kaleva in the Northland",
        "Other title": "Kalevalaiset Pohjolassa",
        Librettist: "Fritz W. O. Spengler",
        language: "German",
        "Based on": "Kalevala",
        Premiere: "28 February 2017",
        "Website": "http://www.kalewainen.fi/"
    },
    {
        title: "Káťa Kabanová",
        composer: "Janáček, Leoš",
        date: "1921",
        Librettist: "Vincenc Červinka",
        language: "Czech",
        "Based on": "The Storm",
        Premiere: "23 November 1921"
    },
    {
        title: "Khovanshchina",
        composer: "Mussorgsky, Modest",
        date: "1886",
        "Native title": "Хованщина",
        language: "Russian",
        Premiere: "9 February 1886"
    },
    {
        title: "King RogerKról Roger",
        composer: "Szymanowski, Karol",
        date: "1926",
        Librettist: "Karol Szymanowski",
        language: "Polish",
        Premiere: "19 June 1926"
    },
    {
        title: "King Priam",
        composer: "Tippett, Michael",
        date: "Michael Tippett",
        Librettist: "Tippett",
        language: "English",
        "Based on": "Iliad",
        Premiere: "29 May 1962"
    },
    {
        title: "Koanga",
        composer: "Delius, Frederick",
        date: "Frederick Delius",
        Librettist: "Charles F. Keary",
        language: "English",
        "Based on": "The Grandissimes: A Story of Creole Life",
        Premiere: "13 June 1904"
    },
    {
        title: "The Knot Garden",
        composer: "Tippett, Michael",
        date: "1970",
        Librettist: "Tippett",
        language: "English",
        Premiere: "2 December 1970"
    },
    {
        title: "Krútňava",
        composer: "Suchoň, Eugen",
        date: "1949"
    },
    {
        title: "Lady Macbeth of Mtsensk",
        composer: "Shostakovich",
        date: "1934",
        "Native title": "Russian: ",
        Librettist: "\n",
        language: "Russian",
        "Based on": "Lady Macbeth of the Mtsensk District",
        Premiere: "22 January 1934"
    },
    {
        title: "Lakmé",
        composer: "Delibes",
        date: "1883",
        Librettist: "\n",
        language: "French",
        "Based on": "Théodore Pavie's story \"Les babouches du Brahamane\"",
        Premiere: "14 April 1883"
    },
    {
        title: "Das Land des LächelnsThe Land of Smiles",
        composer: "Lehár",
        date: "1929",
        Librettist: "\n",
        language: "German",
        Premiere: "10 October 1929"
    },
    {
        title: "The Legend of the Invisible City of Kitezh and the Maiden Fevroniya",
        composer: "Rimsky-Korsakov",
        date: "1912",
        "Native title": "Russian",
        Librettist: "Vladimir Belsky",
        language: "Russian",
        "Based on": "Russian legends",
        Premiere: "20. February 1907"
    },
    {
        title: "Leo, the Royal Cadet",
        composer: "Telgmann, Oscar Ferdinand",
        date: "1889",
        Librettist: "George Frederick Cameron",
    },
    {
        title: "The Letter",
        composer: "Moravec, Paul",
        date: "2009"
    },
    {
        title: "La liberazione di Ruggiero dall'isola d'Alcina",
        composer: "Caccini",
        date: "1625",
        Librettist: "Ferdinando Saracinelli",
        language: "Italian",
        "Based on": "Orlando Furioso",
        Premiere: "3 February 1625"
    },
    {
        title: "Das Liebesverbot",
        composer: "Wagner",
        date: "1836",
        Librettist: "Richard Wagner",
        language: "German",
        "Based on": "Shakespeare's",
        Premiere: "29 March 1836"
    },
    {
        title: "Life is a Dream",
        composer: "Spratlan, Lewis",
        date: "2010"
    },
    {
        title: "The Little Prince",
        composer: "Portman",
        date: "2003",
        Librettist: "Nicholas Wright",
        language: "English",
        "Based on": "The Little Prince",
        Premiere: "31 May 2003"
    },
    {
        title: "Little Red Riding Hood",
        composer: "Cui",
        date: "1921?"
    },
    {
        title: "Little Women",
        composer: "Adamo, Mark",
        date: "1999",
        Librettist: "Mark Adamo",
        language: "English",
        "Based on": "Little Women",
        Premiere: "March 13, 1998"
    },
    {
        title: "Lohengrin",
        composer: "Wagner",
        date: "1850",
        Librettist: "Richard Wagner",
        language: "German",
        "Based on": "Medieval German Romance",
        Premiere: "28 August 1850"
    },
    {
        title: "I Lombardi",
        composer: "Verdi, Giuseppe",
        date: "1843",
        Librettist: "Temistocle Solera",
        language: "Italian",
        "Based on": "Tommaso Grossi",
        Premiere: "11 February 1843"
    },
    {
        title: "Lord Byron",
        composer: "Thomson",
        date: "1972"
    },
    {
        title: "Loreley",
        composer: "Catalani",
        date: "1890",
        Librettist: "\n",
        Premiere: "16 February 1890"
    },
    {
        title: "Louise",
        composer: "Charpentier, Gustave",
        date: "1900",
        Librettist: "Gustave Charpentier",
        language: "French",
        Premiere: "2 February 1900 (1900-02-02)"
    },
    {
        title: "The Love for Three Oranges",
        composer: "Prokofiev",
        date: "1921",
        "Native title": "Любовь к трём апельсинам, (Lyubov' k tryom apel'sinam)",
        Librettist: "Prokofiev",
        language: "Russian",
        "Based on": "L'amore delle tre melarance",
        Premiere: "30 December 1921"
    },
    {
        title: "L'amour des trois oranges",
        composer: "Prokofiev",
        date: "1921",
        Librettist: "Prokofiev",
        language: "French",
        "Based on": "L'amore delle tre melarance",
        Premiere: "30 December 1921"
    },
    {
        title: "Lucia di Lammermoor",
        composer: "Donizetti, Gaetano",
        date: "1835",
        Librettist: "Salvadore Cammarano",
        language: "Italian",
        "Based on": "The Bride of Lammermoor",
        Premiere: "26 September 1835"
    },
    {
        title: "Lucio Silla",
        composer: "Mozart",
        date: "1772",
        Librettist: "Giovanni de Gamerra",
        language: "Italian",
        Premiere: "26 December 1772"
    },
    {
        title: "Lucrezia Borgia",
        composer: "Donizetti, Gaetano",
        date: "1834",
        Librettist: "Felice Romani",
        language: "Italian",
        "Based on": "Lucrezia Borgia",
        Premiere: "26 December 1833"
    },
    {
        title: "Luisa Miller",
        composer: "Verdi, Giuseppe",
        date: "1849",
        Librettist: "Salvadore Cammarano",
        language: "Italian",
        "Based on": "Kabale und Liebe",
        Premiere: "8 December 1849"
    },
    {
        title: "Lulu",
        composer: "Berg",
        date: "1937",
        Librettist: "Berg",
        language: "German",
        "Based on": "Erdgeist",
        Premiere: "2 June 1937"
    },
    {
        title: "Die lustige Witwe",
        composer: "Lehár",
        date: "1905"
    },
    {
        title: "Die lustigen Weiber von Windsor",
        composer: "Nicolai",
        date: "1849",
        Translation: "The Merry Wives of Windsor",
        Librettist: "Salomon Hermann Mosenthal",
        language: "German",
        "Based on": "The Merry Wives of Windsor",
        Premiere: "9 March 1849"
    },
    {
        title: "Macbeth",
        composer: "Verdi, Giuseppe",
        date: "1847",
        Librettist: "Francesco Maria Piave",
        language: "Italian",
        "Based on": "Macbeth",
        Premiere: "14 March 1847 (1847-03-14) (Italian)\n21 April 1865 (1865-04-21) (French)"
    },
    {
        title: "Madama Butterfly",
        composer: "Puccini",
        date: "1904",
        Librettist: "\n",
        language: "Italian",
        "Based on": "John Luther Long",
        Premiere: "17 February 1904"
    },
    {
        title: "Mademoiselle Fifi",
        composer: "Cui",
        date: "1903"
    },
    {
        title: "The Maid of Orleans",
        composer: "Tchaikovsky",
        date: "1881",
        "Native title": "Russian: ",
        Librettist: "Tchaikovsky",
        language: "Russian",
        "Based on": "Joan of Arc",
        Premiere: "25 February 1881"
    },
    {
        title: "The Makropulos Affair",
        composer: "Janáček, Leoš",
        date: "1926",
        "Native title": "Věc Makropulos",
        "Other title": "The Makropoulos Case",
        Librettist: "Janáček",
        language: "Czech",
        "Based on": "Věc Makropulos",
        Premiere: "18 December 1926"
    },
    {
        title: "Les Mamelles de Tirésias",
        composer: "Poulenc",
        date: "1947",
        Translation: "The Breasts of Tiresias",
        Librettist: "Poulenc",
        language: "French",
        "Based on": "The Breasts of Tiresias",
        Premiere: "3 June 1947"
    },
    {
        title: "The Man and Men",
        composer: "2010",
        date: "2010"
    },
    {
        title: "The Man Who Mistook His Wife for a Hat",
        composer: "Nyman",
        date: "1986",
    },
    {
        title: "The Mandarin's Son",
        composer: "Cui",
        date: "1878"
    },
    {
        title: "Manon",
        composer: "Massenet",
        date: "1884",
        Librettist: "\n",
        language: "French",
        "Based on": "Manon Lescaut",
        Premiere: "19 January 1884"
    },
    {
        title: "Manon Lescaut",
        composer: "Puccini",
        date: "1893",
        Librettist: "\n",
        language: "Italian",
        "Based on": "Abbé Prévost",
        Premiere: "1 February 1893"
    },
    {
        title: "Mare nostro",
        composer: "Ferrero, Lorenzo",
        date: "1985",
        Librettist: "Marco Ravasini",
        language: "Italian",
        "Based on": "Vittorio Alfieri",
        Premiere: "11 September 1985"
    },
    {
        title: "Margaret Garner",
        composer: "Danielpour",
        date: "2005",
        Librettist: "Toni Morrison",
        language: "English",
        Premiere: "7 May 2005"
    },
    {
        title: "María de Buenos Aires",
        composer: "Piazzolla",
        date: "1968",
        Librettist: "Horacio Ferrer",
        language: "Spanish",
        Premiere: "8 May 1968"
    },
    {
        title: "Maria Golovin",
        composer: "Menotti",
        date: "1958",
        Librettist: "Menotti",
        language: "English",
        Premiere: "August 20, 1958"
    },
    {
        title: "Maria Stuarda",
        composer: "Donizetti, Gaetano",
        date: "1835",
        Librettist: "Giuseppe Bardari",
        language: "Italian",
        "Based on": "Maria Stuart",
        Premiere: "30 December 1835"
    },
    {
        title: "Marilyn",
        composer: "Ferrero, Lorenzo",
        date: "1980",
        Librettist: "\n",
        language: "English",
        "Based on": "Marilyn Monroe",
        Premiere: "23 February 1980"
    },
    {
        title: "The Marriage Market",
        composer: "Jacobi",
        date: "1911"
    },
    {
        title: "Martha",
        composer: "Flotow",
        date: "1847",
        Librettist: "Friedrich Wilhelm Riese",
        language: "German",
        "Based on": "Jules-Henri Vernoy de Saint-Georges",
        Premiere: "25 November 1847"
    },
    {
        title: "Les martyrs",
        composer: "Donizetti, Gaetano",
        date: "1840",
        Librettist: "Eugène Scribe",
        language: "French",
        "Based on": "Polyeucte",
        Premiere: "10 April 1840"
    },
    {
        title: "The Mask of Orpheus",
        composer: "Birtwistle",
        date: "1968",
        Librettist: "Peter Zinovieff",
        language: "English",
        "Based on": "Orpheus",
        Premiere: "21 May 1986"
    },
    {
        title: "I masnadieri",
        composer: "Verdi, Giuseppe",
        date: "1847",
        Librettist: "Andrea Maffei",
        language: "Italian",
        "Based on": "Friedrich von Schiller",
        Premiere: "22 July 1847"
    },
    {
        title: "Maskarade",
        composer: "Nielsen",
        date: "1906",
        Librettist: "Vilhelm Andersen",
        language: "Danish",
        Premiere: "11 November 1906"
    },
    {
        title: "Mateo Falcone",
        composer: "Cui",
        date: "1907"
    },
    {
        title: "Mathis der Maler",
        composer: "Hindemith, Paul",
        date: "1938",
        Translation: "Matthias the Painter",
        Librettist: "Hindemith",
        language: "German",
        "Based on": "Matthias Grünewald",
        Premiere: "28 May 1938"
    },
    {
        title: "Il matrimonio segreto",
        composer: "Cimarosa",
        date: "1792",
        Translation: "The Secret Marriage",
        Librettist: "Giovanni Bertati",
        language: "Italian",
        "Based on": "The Clandestine Marriage",
        Premiere: "7 February 1792"
    },
    {
        title: "Mavra",
        composer: "Stravinsky",
        date: "1922",
        Librettist: "Boris Kochno",
        language: "Russian",
        "Based on": "The Little House in Kolomna",
        Premiere: "18 May 1922"
    },
    {
        title: "May Night",
        composer: "Rimsky-Korsakov",
        date: "1880",
        "Native title": "Russian",
        language: "Russian",
        "Based on": "May Night, or the Drowned Maiden",
        Premiere: "1892"
    },
    {
        title: "Mazeppa",
        composer: "Tchaikovsky",
        date: "1884",
        "Native title": "Russian: ",
        Librettist: "Victor Burenin",
        language: "Russian",
        "Based on": "Poltava",
        Premiere: "15 February 1884"
    },
    {
        title: "Médée",
        composer: "Cherubini",
        date: "1797",
        Librettist: "François-Benoît Hoffmann",
        language: "French",
        "Based on": "Medea",
        Premiere: "13 March 1797"
    },
    {
        title: "Médée",
        composer: "Charpentier, Marc-Antoine",
        date: "1693"
    },
    {
        title: "The Medium",
        composer: "Menotti",
        date: "1946",
        Librettist: "Menotti",
        language: "English",
        Premiere: "May 8, 1946"
    },
    {
        title: "Mefistofele",
        composer: "Boito",
        date: "1868"
    },
    {
        title: "Die Meistersinger von Nürnberg",
        composer: "Wagner",
        date: "1868",
        Translation: "The Mastersingers of Nuremberg",
        Librettist: "Richard Wagner",
        language: "German",
        Premiere: "21 June 1868"
    },
    {
        title: "The Merchant Kalashnikov",
        composer: "Rubinstein, Anton",
        date: "1880"
    },
    {
        title: "La Merope",
        composer: "Giacomelli",
        date: "1734"
    },
    {
        title: "The Midsummer Marriage",
        composer: "Tippett, Michael",
        date: "Michael Tippett",
        Librettist: "Tippett",
        language: "English",
        "Based on": "The Magic Flute",
        Premiere: "27 January 1955"
    },
    {
        title: "A Midsummer Night's Dream",
        composer: "Britten",
        date: "1960",
        Librettist: "\n",
        language: "English",
        "Based on": "A Midsummer Night's Dream",
        Premiere: "11 June 1960"
    },
    {
        title: "Mignon",
        composer: "Thomas",
        date: "1866",
        Librettist: "\n",
        language: "French",
        "Based on": "Wilhelm Meisters Lehrjahre",
        Premiere: "17 November 1866"
    },
    {
        title: "The Mines of Sulphur",
        composer: "Bennett",
        date: "1963"
    },
    {
        title: "The Miserly Knight",
        composer: "Rachmaninoff",
        date: "1906",
        "Native title": "Russian",
        language: "Russian",
        "Based on": "Alexander Pushkin",
        Premiere: "24 January 1906"
    },
    {
        title: "Miss Julie",
        composer: "Rorem",
        date: "1965"
    },
    {
        title: "Mittwoch aus Licht",
        composer: "Stockhausen",
        date: "2012",
        Librettist: "Stockhausen",
        language: "German",
        Premiere: "August 22, 2012"
    },
    {
        title: "Mlada",
        composer: "Cui",
        date: "1872"
    },
    {
        title: "Mlada",
        composer: "Rimsky-Korsakov",
        date: "1890",
        "Native title": "Russian",
        Librettist: "Viktor Krylov",
        language: "Russian",
        Premiere: "1892"
    },
    {
        title: "Montag aus Licht",
        composer: "Stockhausen",
        date: "1988",
        Librettist: "Stockhausen",
        language: "German",
        Premiere: "May 7, 1988"
    },
    {
        title: "Moses und Aron",
        composer: "Schoenberg",
        date: "1957",
        Translation: "Moses and Aaron",
        Librettist: "Schoenberg",
        language: "German",
        "Based on": "Book of Exodus",
        Premiere: "6 June 1957"
    },
    {
        title: "The Most Important Man",
        composer: "Menotti",
        date: "1971",
        Librettist: "Gian Carlo Menotti",
        language: "English",
        Premiere: "March 12, 1971"
    },
    {
        title: "Motezuma",
        composer: "Vivaldi",
        date: "1733",
        Librettist: "Alvise Giusti",
        Premiere: "14 November 1733"
    },
    {
        title: "Mozart and Salieri",
        composer: "Rimsky-Korsakov",
        date: "1898",
        "Native title": "Russian",
        language: "Russian",
        "Based on": "Mozart and Salieri",
        Premiere: "1898"
    },
    {
        title: "Nabucco",
        composer: "Verdi, Giuseppe",
        date: "1842",
        Librettist: "Temistocle Solera",
        language: "Italian",
        "Based on": "Play",
        Premiere: "9 March 1842"
    },
    {
        title: "Eine Nacht in Venedig",
        composer: "Strauss, Johann",
        date: "1883"
    },
    {
        title: "Nędza uszczęśliwiona",
        composer: "Kamieński, Maciej",
        date: "1778"
    },
    {
        title: "The New Moon",
        composer: "Romberg",
        date: "1928"
    },
    {
        title: "The Nightingale",
        composer: "Stravinsky",
        date: "1914",
        "Native title": "Соловей",
        "Other title": "Le rossignol",
        Librettist: "\n",
        "Based on": "The Nightingale",
        Premiere: "26 May 1914"
    },
    {
        title: "Nina",
        composer: "Paisiello",
        date: "1789"
    },
    {
        title: "El Niño",
        composer: "Adams, John",
        date: "2000"
    },
    {
        title: "Nixon in China",
        composer: "Adams, John",
        date: "1987",
        Librettist: "Alice Goodman",
        language: "English",
        Premiere: "October 22, 1987",
        "Website": "www.earbox.com/nixon-in-china/"
    },
    {
        title: "Norma",
        composer: "Bellini, Vincenzo",
        date: "1831",
        Librettist: "Felice Romani",
        language: "Italian",
        "Based on": "Alexandre Soumet",
        Premiere: "26 December 1831"
    },
    {
        title: "The Nose",
        composer: "Shostakovich",
        date: "1930",
        "Native title": "Russian: ",
        Librettist: "\n",
        language: "Russian",
        "Based on": "The Nose",
        Premiere: "18 January 1930"
    },
    {
        title: "The Marriage of Figaro",
        composer: "Mozart",
        date: "1786",
        "Native title": "Le nozze di Figaro",
        Librettist: "Lorenzo Da Ponte",
        language: "Italian",
        "Based on": "La folle journée, ou le Mariage de Figaro",
        Premiere: "1 May 1786"
    },
    {
        title: "Oberto Conte di San Bonifacio",
        composer: "Verdi, Giuseppe",
        date: "1839",
        Librettist: "Temistocle Solera",
        language: "Italian",
        "Based on": "Antonio Piazza",
        Premiere: "17 November 1839"
    },
    {
        title: "L'oca del Cairo",
        composer: "Mozart",
        date: "1783",
        Translation: "The Goose of Cairo",
        Librettist: "Giovanni Battista Varesco",
        language: "Italian"
    },
    {
        title: "Œdipe",
        composer: "Enescu, George",
        date: "1936",
        Librettist: "Edmond Fleg",
        language: "French",
        "Based on": "The Theban plays",
        Premiere: "13 March 1936"
    },
    {
        title: "Oedipus rex",
        composer: "Stravinsky, Igor",
        date: "1927",
        Librettist: "Jean Cocteau",
        "Based on": "Oedipus Rex",
        Premiere: "30 May 1927"
    },
    {
        title: "The Old Maid and the Thief",
        composer: "Menotti",
        date: "1939",
        Librettist: "Menotti",
        language: "English",
        Premiere: "April 22, 1939"
    },
    {
        title: "Operation Orfeo",
        composer: "Holten, Bo",
        date: "Bo Holten"
    },
    {
        title: "Das Opfer",
        composer: "Zillig, Winfried",
        date: "Winfried Zillig",
        Translation: "The Sacrifice",
        Librettist: "Reinhard Goering",
        language: "German",
        "Based on": "Die Südpolexpedition des Kapitäns Scott",
        Premiere: "12 November 1937"
    },
    {
        title: "Oresteia",
        composer: "Taneyev",
        date: "1895"
    },
    {
        title: "L'Orfeo",
        composer: "Monteverdi",
        date: "1607",
        Librettist: "Alessandro Striggio",
        language: "Italian",
        "Based on": "Greek legend",
        Premiere: "1607 "
    },
    {
        title: "Orfeo ed Euridice",
        composer: "Gluck",
        date: "1762"
    },
    {
        title: "Orlando furioso",
        composer: "Vivaldi",
        date: "1727",
        Librettist: "Grazio Braccioli",
        Premiere: "November 1727 (1727-11)Teatro Sant'Angelo, Venice"
    },
    {
        title: "Orphée aux enfers",
        composer: "Offenbach",
        date: "1858"
    },
    {
        title: "Orphée et Eurydice",
        composer: "Gluck",
        date: "1774"
    },
    {
        title: "Oscar",
        composer: "2013",
        date: "2013",
        Librettist: "\n",
        Premiere: "27 July 2013"
    },
    {
        title: "Otello",
        composer: "Verdi, Giuseppe",
        date: "1887",
        Librettist: "Arrigo Boito",
        language: "Italian",
        "Based on": "Othello",
        Premiere: "5 February 1887"
    },
    {
        title: "Otello",
        composer: "Rossini, Gioachino",
        date: "1816",
        Librettist: "Francesco Maria Berio di Salsa",
        language: "Italian",
        Premiere: "4 December 1816"
    },
    {
        title: "Owen Wingrave",
        composer: "Britten",
        date: "1971",
        Librettist: "Myfanwy Piper",
        language: "English",
        "Based on": "Henry James",
        Premiere: "16 May 1971"
    },
    {
        title: "Pagliacci",
        composer: "Leoncavallo",
        date: "1892",
        Librettist: "Ruggero Leoncavallo",
        language: "Italian",
        Premiere: "21 May 1892"
    },
    {
        title: "Paradise Lost",
        composer: "Penderecki",
        date: "1978",
        Librettist: "Christopher Fry",
        language: "English",
        "Based on": "\"Paradise Lost\" by John Milton",
        Premiere: "29 November 1978"
    },
    {
        title: "Parsifal",
        composer: "Wagner",
        date: "1882",
        Librettist: "Richard Wagner",
        language: "German",
        "Based on": "Parzival",
        Premiere: "26 July 1882"
    },
    {
        title: "Patience",
        composer: "Gilbert and Sullivan",
        date: "1881"
    },
    {
        title: "Le Pays",
        composer: "Ropartz",
        date: "1912"
    },
    {
        title: "Les pêcheurs de perles",
        composer: "Bizet",
        date: "1863",
        Librettist: "\n",
        language: "French",
        Premiere: "30 September 1863"
    },
    {
        title: "Pelléas et Mélisande",
        composer: "Debussy",
        date: "1902",
        language: "French",
        "Based on": "Pelléas et Mélisande",
        Premiere: "30 April 1902"
    },
    {
        title: "Peter Grimes",
        composer: "Britten",
        date: "1945",
        Librettist: "Montagu Slater",
        Premiere: "7 June 1945"
    },
    {
        title: "Le piccole storie",
        composer: "Ferrero, Lorenzo",
        date: "2007",
        Librettist: "Giuseppe Di Leva",
        language: "Italian",
        Premiere: "9 December 2007"
    },
    {
        title: "The Pirates of Penzance",
        composer: "Gilbert and Sullivan",
        date: "1879"
    },
    {
        title: "Polyphème",
        composer: "Cras",
        date: "1945"
    },
    {
        title: "Porgy and Bess",
        composer: "Gershwin",
        date: "1935",
        Librettist: "DuBose Heyward",
        language: "English",
        "Based on": "Porgy",
        Premiere: "September 30, 1935"
    },
    {
        title: "Porin",
        composer: "Lisinski",
        date: "1851"
    },
    {
        title: "Powder Her Face",
        composer: "Adès, Thomas",
        date: "1995",
        Librettist: "Philip Hensher",
        "Based on": "Margaret Campbell, Duchess of Argyll",
        Premiere: "1 July 1995"
    },
    {
        title: "The Power of the Fiend",
        composer: "Serov",
        date: "1871",
        "Native title": "Russian",
        Librettist: "\n",
        language: "Russian",
        "Based on": "Live Not as You Would Like To",
        Premiere: "14 April 1871"
    },
    {
        title: "Prince Igor",
        composer: "Borodin",
        date: "1890",
        "Native title": "Russian",
        Librettist: "Borodin",
        language: "Russian",
        "Based on": "The Lay of Igor's Host",
        Premiere: "4 November 1890"
    },
    {
        title: "Prisoner of the Caucasus",
        composer: "Cui",
        date: "1883"
    },
    {
        title: "I puritani",
        composer: "Bellini, Vincenzo",
        date: "1835",
        Librettist: "Carlo Pepoli",
        language: "Italian",
        "Based on": "Têtes Rondes et Cavalieres",
        Premiere: "24 January 1835"
    },
    {
        title: "Puss in Boots",
        composer: "Cui",
        date: "1915"
    },
    {
        title: "The Queen of Spades",
        composer: "Tchaikovsky",
        date: "1890",
        "Native title": "Пиковая дама",
        Librettist: "Modest Tchaikovsky",
        language: "Russian",
        "Based on": "The Queen of Spades",
        Premiere: "29 March 1890"
    },
    {
        title: "A Quiet Place",
        composer: "Bernstein",
        date: "1983",
        Librettist: "Stephen Wadsworth",
        language: "English",
        Premiere: "17 June 1983"
    },
    {
        title: "Radamisto",
        composer: "Handel",
        date: "1720"
    },
    {
        title: "The Rake's Progress",
        composer: "Stravinsky",
        date: "1951",
        Librettist: "\n",
        "Based on": "A Rake's Progress",
        Premiere: "11 September 1951"
    },
    {
        title: "The Rape of Lucretia",
        composer: "Britten",
        date: "1946",
        Librettist: "Ronald Duncan",
        language: "English",
        "Based on": "Le Viol de Lucrèce",
        Premiere: "12 July 1946"
    },
    {
        title: "Il re pastore",
        composer: "Mozart",
        date: "1775",
        Librettist: "Metastasio",
        language: "Italian",
        "Based on": "Aminta",
        Premiere: "23 April 1775"
    },
    {
        title: "El retablo de maese Pedro",
        composer: "Falla, de",
        date: "1923",
        Translation: "Master Peter's Puppet Show",
        language: "Spanish",
        "Based on": "Don Quixote",
        Premiere: "25 June 1923"
    },
    {
        title: "Das Rheingold",
        composer: "Wagner",
        date: "1869",
        Librettist: "Richard Wagner",
        language: "German",
        "Based on": "Nordic and German legends",
        Premiere: "22 September 1869"
    },
    {
        title: "Rienzi",
        composer: "Wagner",
        date: "1842",
        Librettist: "Richard Wagner",
        language: "German",
        "Based on": "Edward Bulwer-Lytton",
        Premiere: "20 October 1842"
    },
    {
        title: "Rigoletto",
        composer: "Verdi, Giuseppe",
        date: "1851",
        Librettist: "Francesco Maria Piave",
        language: "Italian",
        "Based on": "Le roi s'amuse",
        Premiere: "11 March 1851"
    },
    {
        title: "Rinaldo",
        composer: "Handel",
        date: "1711"
    },
    {
        title: "Der Ring des Nibelungen",
        composer: "Wagner",
        date: "1876",
        Translation: "The Ring of the Nibelung",
        Librettist: "Richard Wagner",
        language: "German",
        Premiere: "\nIndividually:\n22 September 1869 (22 September 1869) Das Rheingold\n26 June 1870 (26 June 1870) Die Walküre\nAs a cycle:\n13 August 1876 (1876-08-13) Das Rheingold\n14 August 1876 Die Walküre\n16 August 1876 Siegfried\n17 August 1876 Götterdämmerung\n"
    },
    {
        title: "Río de Sangre",
        composer: "Davis, Don",
        date: "2010",
        Librettist: "Kate Gale",
        language: "Spanish",
        Premiere: "22 October 2010"
    },
    {
        title: "Risorgimento!",
        composer: "Ferrero, Lorenzo",
        date: "2011",
        Librettist: "Dario Oliveri",
        language: "Italian",
        Premiere: "26 March 2011"
    },
    {
        title: "Il ritorno d'Ulisse in patria",
        composer: "Monteverdi",
        date: "1640",
        Librettist: "Giacomo Badoaro",
        language: "Italian",
        "Based on": "Homer",
        Premiere: "1639–1640 "
    },
    {
        title: "Roberto Devereux",
        composer: "Donizetti, Gaetano",
        date: "1837",
        Librettist: "Salvadore Cammarano",
        language: "Italian",
        "Based on": "Elisabeth d'Angleterre",
        Premiere: "28 October 1837"
    },
    {
        title: "Rodelinda",
        composer: "Handel",
        date: "1725"
    },
    {
        title: "Rogneda",
        composer: "Serov",
        date: "1865",
        "Native title": "Russian",
        Librettist: "Dmitry Averkiev",
        language: "Russian",
        "Based on": "Mikhail Zagoskin",
        Premiere: "27 October 1865"
    },
    {
        title: "Le roi de Lahore",
        composer: "Massenet",
        date: "1877",
        Librettist: "Louis Gallet",
        language: "French",
        Premiere: "27 April 1877"
    },
    {
        title: "Roméo et Juliette",
        composer: "Gounod",
        date: "1867",
        Librettist: "\n",
        language: "French",
        "Based on": "Romeo and Juliet",
        Premiere: "27 April 1867"
    },
    {
        title: "La rondine",
        composer: "Puccini",
        date: "1917",
        Librettist: "Giuseppe Adami",
        language: "Italian",
        Premiere: "27 March 1917"
    },
    {
        title: "Der Rosenkavalier",
        composer: "Strauss, Richard",
        date: "1911",
        Librettist: "Hugo von Hofmannsthal",
        language: "German",
        Premiere: "26 January 1911"
    },
    {
        title: "The Rose of Castille",
        composer: "Balfe, Michael",
        date: "1857",
        Librettist: "\n",
        language: "English",
        Premiere: "29 October 1857"
    },
    {
        title: "Rusalka",
        composer: "Dargomyzhsky",
        date: "1856"
    },
    {
        title: "Rusalka",
        composer: "Dvořák",
        date: "1901",
        Librettist: "Jaroslav Kvapil",
        language: "Czech",
        "Based on": "Karel Jaromír Erben",
        Premiere: "31 March 1901"
    },
    {
        title: "Ruslan and Lyudmila",
        composer: "Glinka",
        date: "1842"
    },
    {
        title: "Sadko",
        composer: "Rimsky-Korsakov",
        date: "1898",
        "Native title": "Russian: ",
        Librettist: "Rimsky-Korsakov",
        language: "Russian",
        Premiere: "7 January 1898"
    },
    {
        title: "Saint François d'Assise",
        composer: "Messiaen",
        date: "1983",
        Librettist: "Messiaen",
        language: "French",
        "Based on": "Francis of Assisi",
        Premiere: "28 November 1983"
    },
    {
        title: "The Saint of Bleecker Street",
        composer: "Menotti",
        date: "1954",
        Librettist: "Menotti",
        language: "English",
        Premiere: "December 27, 1954"
    },
    {
        title: "Salammbô",
        composer: "Reyer",
        date: "1890",
        Librettist: "Camille du Locle",
        language: "French",
        "Based on": "Gustave Flaubert",
        Premiere: "10 February 1890"
    },
    {
        title: "Salome",
        composer: "Strauss, Richard",
        date: "1905",
        Librettist: "Oscar Wilde",
        language: "German",
        Premiere: "9 December 1905"
    },
    {
        title: "Salvatore Giuliano",
        composer: "Ferrero, Lorenzo",
        date: "1986",
        Librettist: "Giuseppe Di Leva",
        language: "Italian",
        "Based on": "Salvatore Giuliano",
        Premiere: "25 January 1986"
    },
    {
        title: "Samson",
        composer: "Handel",
        date: "1743"
    },
    {
        title: "Samstag aus Licht",
        composer: "Stockhausen",
        date: "1984",
        Librettist: "Stockhausen",
        language: "German",
        Premiere: "May 25, 1984"
    },
    {
        title: "Samson et Dalila",
        composer: "Saint-Saëns",
        date: "1877",
        Librettist: "Ferdinand Lemaire",
        language: "French",
        "Based on": "Samson and Delilah",
        Premiere: "2 December 1877"
    },
    {
        title: "Il Sant'Alessio",
        composer: "Landi",
        date: "1632"
    },
    {
        title: "The Saracen",
        composer: "Cui",
        date: "1899"
    },
    {
        title: "Šárka",
        composer: "Janáček, Leoš",
        date: "1925",
        Librettist: "Julius Zeyer",
        language: "Czech",
        "Based on": "Bohemian legends of Šárka",
        Premiere: "11 November 1925"
    },
    {
        title: "Satyagraha",
        composer: "Glass",
        date: "1980",
        Librettist: "\n",
        "Based on": "Mahatma Gandhi",
        Premiere: "September 5, 1980"
    },
    {
        title: "The Scarecrow",
        composer: "Turrin",
        date: "2006"
    },
    {
        title: "The Scarlet Letter",
        composer: "Laitman",
        date: "Laitman"
    },
    {
        title: "Der Schauspieldirektor",
        composer: "Mozart",
        date: "1786",
        Translation: "The Impresario",
        Librettist: "Gottlieb Stephanie",
        language: "German",
        Premiere: "7 February 1786"
    },
    {
        title: "Der Schmied von Gent",
        composer: "Schreker",
        date: "1932"
    },
    {
        title: "Die Schuldigkeit des ersten Gebots",
        composer: "Mozart",
        date: "1767",
        language: "German",
        Premiere: "12 March 1767"
    },
    {
        title: "Schwanda the Bagpiper",
        composer: "Weinberger",
        date: "1927"
    },
    {
        title: "Semele",
        composer: "Eccles",
        date: "1707",
        Librettist: "William Congreve",
        "Based on": "Ovid"
    },
    {
        title: "Semele",
        composer: "Handel",
        date: "1744"
    },
    {
        title: "Semiramide",
        composer: "Rossini, Gioachino",
        date: "1823",
        Librettist: "Gaetano Rossi",
        language: "Italian",
        "Based on": "Semiramis",
        Premiere: "3 February 1823"
    },
    {
        title: "Serse",
        composer: "Handel",
        date: "1738"
    },
    {
        title: "Shell Shock",
        composer: "Lens, Nicholas",
        date: "2014",
        Librettist: "\n",
        language: "English",
        Premiere: "24 October 2014"
    },
    {
        title: "Le siège de Corinthe",
        composer: "Rossini, Gioachino",
        date: "1826",
        Translation: "The Siege of Corinth",
        Librettist: "\n",
        language: "French",
        "Based on": "Third Siege of Missolonghi",
        Premiere: "9 October 1826"
    },
    {
        title: "Shining Brow",
        composer: "Hagen",
        date: "1992",
        Librettist: "Paul Muldoon",
        language: "English",
        Premiere: "April 21, 1993"
    },
    {
        title: "Siegfried",
        composer: "Wagner",
        date: "1876",
        Librettist: "Richard Wagner",
        language: "German",
        "Based on": "Nordic and German legends",
        Premiere: "16 August 1876"
    },
    {
        title: "Simon Boccanegra",
        composer: "Verdi, Giuseppe",
        date: "1857",
        Librettist: "\n",
        language: "Italian",
        "Based on": "Antonio García Gutiérrez",
        Premiere: "\n12 March 1857 (1857-03-12) (first version)\n24 March 1881 (1881-03-24) (second version)\n"
    },
    {
        title: "Simplicius",
        composer: "Strauss, Johann",
        date: "1887"
    },
    {
        title: "The Skating Rink",
        composer: "Sawer",
        date: "2018"
    },
    {
        title: "Slow Man",
        composer: "Lens, Nicholas",
        date: "2012",
        Librettist: "\n",
        Premiere: "24 October 2014"
    },
    {
        title: "The Snow Bogatyr",
        composer: "Cui",
        date: "1906"
    },
    {
        title: "The Snow Maiden",
        composer: "Rimsky-Korsakov",
        date: "1882",
        Librettist: "Rimsky-Korsakov",
        language: "Russian",
        "Based on": "The Snow Maiden",
        Premiere: "29 January 1882"
    },
    {
        title: "Il sogno di Scipione",
        composer: "Mozart",
        date: "1772",
        Librettist: "Pietro Metastasio",
        language: "Italian",
        "Based on": "Somnium Scipionis",
        Premiere: "1 May 1772"
    },
    {
        title: "La sonnambula",
        composer: "Bellini, Vincenzo",
        date: "1831",
        Librettist: "Felice Romani",
        language: "Italian",
        "Based on": "La somnambule, ou L'arrivée d'un nouveau seigneur",
        Premiere: "6 March 1831"
    },
    {
        title: "Sonntag aus Licht",
        composer: "Stockhausen",
        date: "2011",
        Librettist: "Stockhausen",
        language: "German",
        Premiere: "April 9, 2011"
    },
    {
        title: "Lo sposo deluso",
        composer: "Mozart",
        date: "1783",
        Translation: "The Deluded Bridegroom",
        Librettist: "unknown poet",
        language: "Italian",
        "Based on": "Cimarosa"
    },
    {
        title: "Stiffelio",
        composer: "Verdi, Giuseppe",
        date: "Giuseppe Verdi",
        Librettist: "Francesco Maria Piave",
        language: "Italian",
        "Based on": "Le pasteur, ou L'évangile et le foyer",
        Premiere: "16 November 1850"
    },
    {
        title: "The Stone Guest",
        composer: "Dargomyzhsky",
        date: "1872"
    },
    {
        title: "Street Scene",
        composer: "Weill",
        date: "1947",
        Librettist: "Langston Hughes",
        language: "English",
        "Based on": "Street Scene",
        Premiere: "9 January 1947"
    },
    {
        title: "Suor Angelica",
        composer: "Puccini",
        date: "1918",
        Librettist: "Giovacchino Forzano",
        language: "Italian",
        Premiere: "14 December 1918"
    },
    {
        title: "Susannah",
        composer: "Floyd",
        date: "1955",
        Librettist: "Floyd",
        language: "English",
        "Based on": "Susannah and the Elders",
        Premiere: "February 24, 1955"
    },
    {
        title: "Svätopluk",
        composer: "Suchoň",
        date: "1960"
    },
    {
        title: "Szibill",
        composer: "Jacobi",
        date: "1914"
    },
    {
        title: "Il tabarro",
        composer: "Puccini",
        date: "1918",
        Librettist: "Giuseppe Adami",
        language: "Italian",
        "Based on": "La houppelande",
        Premiere: "14 December 1918"
    },
    {
        title: "The Tale of Tsar Saltan",
        composer: "Rimsky-Korsakov",
        date: "1900",
        Librettist: "Vladimir Belsky",
        language: "Russian",
        "Based on": "The Tale of Tsar Saltan",
        Premiere: "3 November 1900"
    },
    {
        title: "Tancredi",
        composer: "Rossini, Gioachino",
        date: "1813",
        Librettist: "Gaetano Rossi",
        language: "Italian",
        "Based on": "Tancrède",
        Premiere: "6 February 1813"
    },
    {
        title: "Tannhäuser",
        composer: "Wagner",
        date: "1845",
        "Native title": "Tannhäuser und der Sängerkrieg auf Wartburg",
        Librettist: "Richard Wagner",
        language: "German",
        Premiere: "19 October 1845"
    },
    {
        title: "Tartuffe",
        composer: "Mechem",
        date: "1980"
    },
    {
        title: "Tea: A Mirror of Soul",
        composer: "Dun, Tan",
        date: "2007"
    },
    {
        title: "The Tempest",
        composer: "Adès, Thomas",
        date: "2004"
    },
    {
        title: "The Tender Land",
        composer: "Copland",
        date: "1954",
        Librettist: "Horace Everett",
        language: "English",
        Premiere: "April 1, 1954"
    },
    {
        title: "Thérèse Raquin",
        composer: "Picker",
        date: "2001",
        Librettist: "Gene Scheer",
        language: "English",
        "Based on": "Thérèse Raquin",
        Premiere: "November 30, 2001"
    },
    {
        title: "The Three Feathers",
        composer: "Laitman",
        date: "2014",
        'Other title': "Die drei Federn",
    },
    {
        title: "Thaïs",
        composer: "Massenet",
        date: "1894",
        Librettist: "Louis Gallet",
        language: "French",
        "Based on": "Thaïs",
        Premiere: "16 March 1894"
    },
    {
        title: "Die Dreigroschenoper",
        Translation: "The Threepenny Opera",
        composer: "Weill, Kurt",
        date: "1928",
    },
    {
        title: "Three Tales",
        composer: "Reich",
        date: "2002",
        language: "English",
        Premiere: "May 12, 2002"
    },
    {
        title: "Tiefland",
        composer: "d'Albert, Eugen",
        date: "1911",
        Translation: "The Lowlands",
        Librettist: "Rudolf Lothar",
        language: "German",
        "Based on": "Terra baixa",
        Premiere: "15 November 1903"
    },
    {
        title: "Tosca",
        composer: "Puccini",
        date: "1900",
        Librettist: "\n",
        language: "Italian",
        "Based on": "La Tosca",
        Premiere: "14 January 1900"
    },
    {
        title: "La traviata",
        composer: "Verdi, Giuseppe",
        date: "1853",
        Librettist: "Francesco Maria Piave",
        language: "Italian",
        "Based on": "La Dame aux camélias",
        Premiere: "6 March 1853"
    },
    {
        title: "Treemonisha",
        composer: "Joplin",
        date: "1911"
    },
    {
        title: "Tristan und Isolde",
        composer: "Wagner",
        date: "1865",
        Librettist: "Richard Wagner",
        language: "German",
        "Based on": "Tristan and Iseult",
        Premiere: "10 June 1865"
    },
    {
        title: "Trouble in Tahiti",
        composer: "Bernstein",
        date: "1952",
        Librettist: "Leonard Bernstein",
        language: "English",
        Premiere: "12 June 1952"
    },
    {
        title: "Il trovatore",
        composer: "Verdi, Giuseppe",
        date: "1853",
        Librettist: "Salvadore Cammarano",
        language: "Italian",
        "Based on": "Antonio García Gutiérrez",
        Premiere: "19 January 1853"
    },
    {
        title: "Troy",
        composer: "Hoinic, Bujor",
        date: "2018",
        Librettist: "Artun Hoinic",
        language: "Turkish",
        "Based on": "Iliad",
        Premiere: "9 November 2018"
    },
    {
        title: "Les Troyens",
        composer: "Berlioz",
        date: "1863",
        Librettist: "Berlioz",
        language: "French",
        "Based on": "Aeneid",
        Premiere: "4 November 1863"
    },
    {
        title: "The Tsar's Bride",
        composer: "Rimsky-Korsakov",
        date: "1899",
        "Native title": "Russian",
        Librettist: "Ilia Tyumenev",
        language: "Russian",
        "Based on": "The Tsar's Bride",
        Premiere: "1899"
    },
    {
        title: "Turandot",
        composer: "Puccini",
        date: "1926",
        Librettist: "\n",
        language: "Italian",
        "Based on": "Carlo Gozzi",
        Premiere: "25 April 1926"
    },
    {
        title: "Il turco in Italia",
        composer: "Rossini, Gioachino",
        date: "1814",
        Translation: "The Turk in Italy",
        Librettist: "Felice Romani",
        language: "Italian",
        Premiere: "14 August 1814"
    },
    {
        title: "The Turn of the Screw",
        composer: "Britten",
        date: "1954",
        Librettist: "Myfanwy Piper",
        language: "English",
        "Based on": "The Turn of the Screw",
        Premiere: "14 September 1954"
    },
    {
        title: "Vanessa",
        composer: "Barber",
        date: "1958",
        Librettist: "Gian Carlo Menotti",
        language: "English",
        Premiere: "January 15, 1958"
    },
    {
        title: "Veinticinco de agosto, 1983",
        composer: "Solare",
        date: "1992"
    },
    {
        title: "Verbum nobile",
        composer: "Moniuszko",
        date: "1861",
        "Native title": "Straszny dwór",
        Librettist: "Jan Chęciński",
        language: "Polish",
        Premiere: "1 January 1861"
    },
    {
        title: "La vestale",
        composer: "Spontini",
        date: "1807",
        Librettist: "Étienne de Jouy",
        language: "French",
        Premiere: "15 December 1807"
    },
    {
        title: "Il viaggio a Reims",
        composer: "Rossini, Gioachino",
        date: "1825",
        Librettist: "Luigi Balocchi",
        language: "Italian",
        "Based on": "Corinne ou l'Italie",
        Premiere: "19 June 1825"
    },
    {
        title: "La vida breve",
        composer: "Falla, de",
        date: "1913",
        Translation: "The Brief Life",
        Librettist: "Carlos Fernández-Shaw",
        language: "Spanish",
        Premiere: "1 April 1913"
    },
    {
        title: "Le Villi",
        composer: "Puccini",
        date: "1884",
        Librettist: "Ferdinando Fontana",
        language: "Italian",
        "Based on": "Jean-Baptiste Alphonse Karr",
        Premiere: "31 May 1884"
    },
    {
        title: "Violanta",
        composer: "Korngold",
        date: "1916",
        Librettist: "Hans Müller-Einigen",
        language: "German",
        Premiere: "28 March 1916"
    },
    {
        title: "Violet",
        composer: "Scruton, Roger",
        date: "2005"
    },
    {
        title: "Volo di notte",
        composer: "Dallapiccola",
        date: "1940",
        Translation: "Night Flight",
        Librettist: "Dallapiccola",
        language: "Italian",
        "Based on": "Vol de nuit",
        Premiere: "May 10, 1940"
    },
    {
        title: "Les vêpres siciliennes",
        composer: "Verdi, Giuseppe",
        date: "1855",
        Librettist: "\n",
        language: "French",
        "Based on": "Donizetti",
        Premiere: "13 June 1855"
    },
    {
        title: "Venus and Adonis",
        composer: "Blow",
        date: "1683",
        Librettist: "Aphra Behn",
        "Based on": "Venus"
    },
    {
        title: "Vera of Las Vegas",
        composer: "Hagen",
        date: "1996",
        Librettist: "Paul Muldoon",
        language: "English",
        Premiere: "June 25, 2003"
    },
    {
        title: "Die Walküre",
        composer: "Wagner",
        date: "1870",
        Translation: "The Valkyrie",
        Librettist: "Richard Wagner",
        language: "German",
        "Based on": "Nordic and German legends",
        Premiere: "26 June 1870"
    },
    {
        title: "La Wally",
        composer: "Catalani",
        date: "1892",
        Librettist: "Luigi Illica",
        Premiere: "20 January 1892"
    },
    {
        title: "War and Peace",
        composer: "Prokofiev",
        date: "1946",
        "Native title": "Война и мир",
        Librettist: "\n",
        language: "Russian",
        "Based on": "War and Peace",
        Premiere: "12 June 1946"
    },
    {
        title: "A Wedding",
        composer: "Bolcom",
        date: "2004"
    },
    {
        title: "Weiße Rose",
        'Other title': "Weisse Rose",
        composer: "Zimmermann, Udo",
        date: "Udo Zimmermann",
        Librettist: "Ingo Zimmermann",
        language: "German",
        "Based on": "Die Weiße Rose",
        Premiere: "17 June 1967"
    },
    {
        title: "Werther",
        composer: "Massenet",
        date: "1892",
        Librettist: "\n",
        language: "French",
        "Based on": "Die Leiden des jungen Werther",
        Premiere: "16 February 1892"
    },
    {
        title: "What Men Live By",
        composer: "Martinů",
        date: "1953"
    },
    {
        title: "Written on Skin",
        composer: "Benjamin, George",
        date: "George Benjamin"
    },
    {
        title: "William Ratcliff",
        composer: "Cui",
        date: "1869"
    },
    {
        title: "Wozzeck",
        composer: "Berg",
        date: "1925",
        Librettist: "Berg",
        language: "German",
        "Based on": "Woyzeck",
        Premiere: "14 December 1925"
    },
    {
        title: "Wuthering Heights",
        composer: "Floyd",
        date: "1958",
        Librettist: "Floyd",
        language: "English",
        "Based on": "Wuthering Heights",
        Premiere: "July 16, 1958"
    },
    {
        title: "Wuthering Heights",
        composer: "Herrmann",
        date: "1982",
        Librettist: "Lucille Fletcher",
        language: "English",
        "Based on": "Emily Brontë",
        Premiere: "November 6, 1982"
    },
    {
        title: "X, The Life and Times of Malcolm X",
        composer: "Davis",
        date: "1986"
    },
    {
        title: "Yerma",
        composer: "Villa-Lobos",
        date: "1971"
    },
    {
        title: "Zaide",
        composer: "Mozart",
        date: "1780",
        Librettist: "Johann Andreas Schachtner",
        language: "German"
    },
    {
        title: "The Magic Flute",
        composer: "Mozart",
        date: "1791",
        "Native title": "Die Zauberflöte",
        Librettist: "Emanuel Schikaneder",
        language: "German",
        Premiere: "30 September 1791"
    }
];

let usableOperas = rawOperas.filter(isUsable);

function isUsable(opera: RawOpera): opera is Omit<OperaData, 'normalized'> {
    return 'language' in opera && 'title' in opera && 'composer' in opera && 'date' in opera;
}

export default usableOperas.map<OperaData>(opera => ({
        ...opera,
        normalized: normalize(opera.title)
    }));

export function normalize(str: string): string {
    return str.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, " ")
        .replace(/[^\w\s]/g, "_")
        .trim();
}
