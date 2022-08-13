export async function getOperaList() {
  const { Operas } = await import('@ckirby/opera-info');

  const skipComposers = [
    'André Previn',
    'Bernd Alois Zimmermann',
    'Birtwistle',
    'Blow',
    'Bohuslav Martinů',
    'Caccini',
    'Davies',
    'Einem',
    'Francesco Araja',
    'Hans Werner Henze',
    'Harrison Birtwistle',
    'Heinrich Schütz',
    'Henze',
    'Juan Hidalgo',
    'Judith Weir',
    'Krzysztof Penderecki',
    'Luigi Dallapiccola',
    'Ligeti',
    'Luciano Berio',
    'Manuel de Zumaya',
    'Peter Maxwell Davies',
    'Robert Cambert',
    'Ullmann',
  ];

  return new Operas(skipComposers);
}
