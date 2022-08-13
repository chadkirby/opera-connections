export async function getOperaList() {
  const { Operas } = await import('@ckirby/opera-info');

  const skipComposers = [
    'Henze',
    'Tippett',
    'Henze',
    'Bernd Alois Zimmermann',
    'Walton',
    'Harrison Birtwistle',
    'Krzysztof Penderecki',
    'Michael Tippett',
    'Peter Maxwell Davies',
    'Ligeti',
    'Aribert Reimann',
    'Davies',
    'Olivier Messiaen',
    'Luciano Berio',
    'Birtwistle',
    'Judith Weir',
    'Birtwistle',
    'André Previn',
    'Caccini',
    'Heinrich Schütz',
    'Juan Hidalgo',
    'Robert Cambert',
    'Blow',
    'Manuel de Zumaya',
    'Francesco Araja',
  ];

  return new Operas(skipComposers);
}
