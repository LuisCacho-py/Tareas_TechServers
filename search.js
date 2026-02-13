// Búsqueda en arreglos de objetos
const searchComparison = (() => {
  // Datos de prueba
  const users = [
    { id: 1, email: 'juan@mail.com', name: 'Juan' },
    { id: 2, email: 'maria@mail.com', name: 'María' },
    { id: 3, email: 'pedro@mail.com', name: 'Pedro' },
    { id: 4, email: 'ana@mail.com', name: 'Ana' },
    { id: 5, email: 'carlos@mail.com', name: 'Carlos' }
  ];

  // ENFOQUE 1: Ciclo for tradicional
  const searchWithFor = (email) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        return users[i];
      }
    }
    return null;
  };

  // ENFOQUE 2: Método find()
  const searchWithFind = (email) => {
    return users.find(user => user.email === email) || null;
  };

  // ENFOQUE 3: Preprocesamiento/Indexación
  // Crear un índice al principio (mejor para búsquedas frecuentes)
  const createIndex = (arr, key) => {
    const index = {};
    arr.forEach(item => {
      index[item[key]] = item;
    });
    return index;
  };

  const emailIndex = createIndex(users, 'email');

  const searchWithIndex = (email) => {
    return emailIndex[email] || null;
  };

  // Mostrar resultados
  const showResults = () => {
    const emailToFind = 'maria@mail.com';

    console.log(`\n${'='.repeat(70)}`);
    console.log('BÚSQUEDA DE USUARIO POR EMAIL: ' + emailToFind);
    console.log(`${'='.repeat(70)}\n`);

    // Prueba 1: For loop
    console.log('1. enfoque: ciclo for');
    console.log('   Código:', '  for(...) { if(...) return item; }');
    const user1 = searchWithFor(emailToFind);
    console.log('   Resultado:', user1);

    // Prueba 2: Find
    console.log('\n2. enfoque: método find()');
    console.log('   Código:', '  arr.find(item => item.email === email)');
    const user2 = searchWithFind(emailToFind);
    console.log('   Resultado:', user2);

    // Prueba 3: Index
    console.log('\n3. enfoque: indexación/preprocesamiento');
    console.log('   Código:', '  const index = {...}; index[email]');
    const user3 = searchWithIndex(emailToFind);
    console.log('   Resultado:', user3);
  };

  const benchmark = () => {
    const largeArray = Array.from({ length: 100000 }, (_, i) => ({
      id: i,
      email: `user${i}@mail.com`,
      name: `User ${i}`
    }));

    const emailIndex = createIndex(largeArray, 'email');
    const searchEmail = 'user99999@mail.com'; // Último elemento
    const iterations = 1000;

    console.log(`\n${'='.repeat(70)}`);
    console.log('benchmark con 100,000 usuarios (búsqueda 1000 veces)');
    console.log(`${'='.repeat(70)}\n`);

    // Benchmark FOR
    const start1 = performance.now();
    for (let i = 0; i < iterations; i++) {
      for (let j = 0; j < largeArray.length; j++) {
        if (largeArray[j].email === searchEmail) break;
      }
    }
    const time1 = (performance.now() - start1).toFixed(2);

    // Benchmark FIND
    const start2 = performance.now();
    for (let i = 0; i < iterations; i++) {
      largeArray.find(u => u.email === searchEmail);
    }
    const time2 = (performance.now() - start2).toFixed(2);

    // Benchmark INDEX
    const start3 = performance.now();
    for (let i = 0; i < iterations; i++) {
      emailIndex[searchEmail];
    }
    const time3 = (performance.now() - start3).toFixed(2);

    console.log(`Ciclo FOR:     ${time1.padStart(10)} ms`);
    console.log(`find():        ${time2.padStart(10)} ms`);
    console.log(`Indexación:    ${time3.padStart(10)} ms`);
  };

  return { showResults, benchmark };
})();

// Ejecutar demostraciones
searchComparison.showResults();
searchComparison.benchmark();

console.log(`\n${'='.repeat(70)}`);
console.log('análisis y recomendaciones');
console.log(`${'='.repeat(70)}`);

console.log(`${'='.repeat(70)}\n`);