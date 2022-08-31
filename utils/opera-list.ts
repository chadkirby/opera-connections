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

  return new Operas(
    (o) =>
      !(
        skipComposers.includes(o.composer) ||
        // Verdi's Otello is much more prominent, and we can't currently
        // deal with two operas having the same name, so kill the
        // Rossini version
        o.titleHref === '/wiki/Otello_(Rossini)' ||
        // ditto Barber of Seville
        o.titleHref === '/wiki/Il_barbiere_di_Siviglia_(Paisiello)'
      )
  );
}
