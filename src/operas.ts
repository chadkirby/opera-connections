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
        title: "Adriana Lecouvreur",
        composer: "Cilea, Francesco",
        date: "1902",
        Librettist: "Arturo Colautti",
        language: "Italian",
        "Based on": "Adrienne Lecouvreur",
        Premiere: "6 November 1902"
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
        title: "Akhnaten",
        composer: "Glass, Philip",
        date: "1984",
        Premiere: "March 24, 1984"
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
        title: "Alcina",
        composer: "Handel",
        date: "1735",
        language: "Italian",
        "Based on": "L'isola di Alcina",
        Premiere: "16 April 1735"
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
        title: "Andrea Chénier",
        composer: "Giordano",
        date: "1896",
        Librettist: "Luigi Illica",
        Premiere: "28 March 1896 (1896-03-28)La Scala, Milan, Kingdom of Italy"
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
        title: "Aroldo",
        composer: "Verdi, Giuseppe",
        date: "1857",
        Librettist: "Francesco Maria Piave",
        language: "Italian",
        "Based on": "Edward Bulwer-Lytton",
        Premiere: "16 August 1857"
    },
    {
        title: "Les arts florissants",
        composer: "Charpentier, Marc-Antoine",
        date: "1685",
        language: "French",
        Premiere: "1685"
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
        title: "Il barbiere di Siviglia",
        composer: "Rossini, Gioachino",
        Translation: "The Barber of Seville",
        date: "1816",
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
        title: "Billy Budd",
        composer: "Britten",
        date: "1951",
        Librettist: "\n",
        language: "English",
        "Based on": "Billy Budd",
        Premiere: "1 December 1951"
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
        language: "Italian",
        "Based on": "Henri Murger",
        Premiere: "1 February 1896"
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
        title: "Capriccio",
        composer: "Strauss, Richard",
        date: "1942",
        language: "German",
        Premiere: "28 October 1942"
    },
    {
        title: "Carmen",
        composer: "Bizet",
        date: "1875",
        language: "French",
        Premiere: "3 March 1875"
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
        title: "Le Cid",
        composer: "Massenet",
        date: "1885",
        language: "French",
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
        title: "Le comte Ory",
        composer: "Rossini, Gioachino",
        date: "1828",
        language: "French",
        Premiere: "20 August 1828"
    },
    {
        title: "Les contes d'Hoffmann",
        Translation: "The Tales of Hoffmann",
        composer: "Offenbach",
        date: "1881",
        language: "French",
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
        title: "The Crucible",
        composer: "Ward",
        date: "1961",
        Librettist: "Bernard Stambler",
        language: "English",
        "Based on": "The Crucible",
        Premiere: "October 26, 1961"
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
        title: "La damnation de Faust",
        composer: "Berlioz",
        date: "1893",
        Translation: "The Damnation of Faust",
        language: "French",
        Scoring: "four soloists children's chorus seven-part choir orchestra"
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
        title: "Dialogues des Carmélites",
        composer: "Poulenc",
        date: "1957",
        Translation: "Dialogues of the Carmelites",
        Librettist: "Poulenc",
        language: "French",
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
        title: "Doctor Atomic",
        composer: "Adams, John",
        date: "2005",
        Librettist: "Peter Sellars",
        language: "English",
        Premiere: "1 October 2005"
    },
    {
        title: "Don Carlos",
        composer: "Verdi, Giuseppe",
        date: "1867",
        language: "French",
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
        language: "Italian",
        Premiere: "3 January 1843"
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
        title: "Die Entführung aus dem Serail",
        composer: "Mozart",
        Translation: "The Abduction from the Seraglio",
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
        title: "Faust",
        composer: "Gounod",
        date: "1859",
        language: "French",
        Premiere: "19 March 1859"
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
        Premiere: "25 November 1955"
    },
    {
        title: "La fille du régiment",
        composer: "Donizetti, Gaetano",
        date: "1840",
        language: "French",
        Premiere: "11 February 1840"
    },
    {
        title: "Die Fledermaus",
        composer: "Strauss, Johann",
        date: "1874",
        language: "German",
    },

    {
        title: "Der fliegende Holländer",
        Translation: "The Flying Dutchman",
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
        title: "Gianni Schicchi",
        composer: "Puccini",
        date: "1918",
        Librettist: "Giovacchino Forzano",
        language: "Italian",
        "Based on": "Dante",
        Premiere: "14 December 1918"
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
        title: "Guillaume Tell",
        Translation: "William Tell",
        composer: "Rossini, Gioachino",
        date: "1829",
        language: "French",
        "Based on": "Wilhelm Tell",
        Premiere: "3 August 1829"
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
        language: "French",
        Premiere: "29 February 1836"
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
        title: "Iolanta",
        composer: "Tchaikovsky",
        date: "1892",
        Librettist: "Modest Tchaikovsky",
        language: "Russian",
        "Based on": "Kong Renés Datter",
        Premiere: "18 December 1892"
    },
    {
        title: "Iphigénie en Tauride",
        composer: "Gluck",
        date: "1779",
        language: "French",
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
        title: "Jérusalem",
        composer: "Verdi, Giuseppe",
        date: "1847",
        Librettist: "\n",
        language: "French",
        "Based on": "I Lombardi alla prima crociata",
        Premiere: "26 November 1847"
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
        title: "Das Liebesverbot",
        composer: "Wagner",
        date: "1836",
        Librettist: "Richard Wagner",
        language: "German",
        Premiere: "29 March 1836"
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
        date: "1905",
        language: "German",
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
        title: "Manon",
        composer: "Massenet",
        date: "1884",
        language: "French",
        "Based on": "Manon Lescaut",
        Premiere: "19 January 1884"
    },
    {
        title: "Manon Lescaut",
        composer: "Puccini",
        date: "1893",
        language: "Italian",
        "Based on": "Abbé Prévost",
        Premiere: "1 February 1893"
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
        title: "Les martyrs",
        composer: "Donizetti, Gaetano",
        date: "1840",
        Librettist: "Eugène Scribe",
        language: "French",
        "Based on": "Polyeucte",
        Premiere: "10 April 1840"
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
        title: "Die Meistersinger von Nürnberg",
        composer: "Wagner",
        date: "1868",
        Translation: "The Mastersingers of Nuremberg",
        Librettist: "Richard Wagner",
        language: "German",
        Premiere: "21 June 1868"
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
        title: "The Miserly Knight",
        composer: "Rachmaninoff",
        date: "1906",
        "Native title": "Russian",
        language: "Russian",
        "Based on": "Alexander Pushkin",
        Premiere: "24 January 1906"
    },
    {
        title: "Motezuma",
        composer: "Vivaldi",
        date: "1733",
        Librettist: "Alvise Giusti",
        Premiere: "14 November 1733"
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
        title: "L'Orfeo",
        composer: "Monteverdi",
        date: "1607",
        Librettist: "Alessandro Striggio",
        language: "Italian",
        "Based on": "Greek legend",
        Premiere: "1607 "
    },
    {
        title: "Orlando furioso",
        composer: "Vivaldi",
        date: "1727",
        Librettist: "Grazio Braccioli",
        Premiere: "November 1727 (1727-11)Teatro Sant'Angelo, Venice"
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
        title: "Pagliacci",
        composer: "Leoncavallo",
        date: "1892",
        Librettist: "Ruggero Leoncavallo",
        language: "Italian",
        Premiere: "21 May 1892"
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
        language: "English",
        date: "1945",
        Librettist: "Montagu Slater",
        Premiere: "7 June 1945"
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
        title: "I puritani",
        composer: "Bellini, Vincenzo",
        date: "1835",
        Librettist: "Carlo Pepoli",
        language: "Italian",
        "Based on": "Têtes Rondes et Cavalieres",
        Premiere: "24 January 1835"
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
        title: "The Rake's Progress",
        composer: "Stravinsky",
        date: "1951",
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
        date: "1711",
        language: "Italian",
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
        date: "1842",
        language: "Russian",
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
        title: "Salome",
        composer: "Strauss, Richard",
        date: "1905",
        Librettist: "Oscar Wilde",
        language: "German",
        Premiere: "9 December 1905"
    },
    {
        title: "Samson",
        composer: "Handel",
        date: "1743",
        language: "English",
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
        title: "Semiramide",
        composer: "Rossini, Gioachino",
        date: "1823",
        Librettist: "Gaetano Rossi",
        language: "Italian",
        "Based on": "Semiramis",
        Premiere: "3 February 1823"
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
        title: "La sonnambula",
        composer: "Bellini, Vincenzo",
        date: "1831",
        Librettist: "Felice Romani",
        language: "Italian",
        "Based on": "La somnambule, ou L'arrivée d'un nouveau seigneur",
        Premiere: "6 March 1831"
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
        title: "The Tender Land",
        composer: "Copland",
        date: "1954",
        Librettist: "Horace Everett",
        language: "English",
        Premiere: "April 1, 1954"
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
        language: "German",
    },
    {
        title: "Tosca",
        composer: "Puccini",
        date: "1900",
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
        title: "Il viaggio a Reims",
        composer: "Rossini, Gioachino",
        date: "1825",
        Librettist: "Luigi Balocchi",
        language: "Italian",
        "Based on": "Corinne ou l'Italie",
        Premiere: "19 June 1825"
    },
    {
        title: "Les vêpres siciliennes",
        composer: "Verdi, Giuseppe",
        date: "1855",
        language: "French",
        "Based on": "Donizetti",
        Premiere: "13 June 1855"
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
        title: "War and Peace",
        composer: "Prokofiev",
        date: "1946",
        "Native title": "Война и мир",
        language: "Russian",
        "Based on": "War and Peace",
        Premiere: "12 June 1946"
    },
    {
        title: "Werther",
        composer: "Massenet",
        date: "1892",
        language: "French",
        "Based on": "Die Leiden des jungen Werther",
        Premiere: "16 February 1892"
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
