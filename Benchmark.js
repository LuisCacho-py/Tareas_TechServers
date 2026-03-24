const benchmark = (() => {
  const createArray = (size) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
      arr.push({
        id: i,
        value: Math.floor(Math.random() * 1000),
        name: `item-${i}`
      });
    }
    return arr;
  };

  const withFilterMap = (arr) => {
    return arr
      .filter(item => item.value > 500)
      .map(item => ({ ...item, value: item.value * 2 }));
  };

  const withReduce = (arr) => {
    return arr.reduce((result, item) => {
      if (item.value > 500) {
        result.push({ ...item, value: item.value * 2 });
      }
      return result;
    }, []);
  };

  const withForLoop = (arr) => {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].value > 500) {
        result.push({ ...arr[i], value: arr[i].value * 2 });
      }
    }
    return result;
  };

  const measure = (fn, label, arr) => {
    const start = Date.now();
    fn(arr);
    const end = Date.now();
    const time = end - start;
    return { label, time };
  };

  const run = (arraySize) => {
    const arr = createArray(arraySize);
    console.log('\n' + '='.repeat(60));
    console.log('benchmark con ' + arraySize.toLocaleString() + ' elementos');
    console.log('='.repeat(60));

    const results = [
      measure(withFilterMap, 'Filter + Map', arr),
      measure(withReduce, 'Reduce', arr),
      measure(withForLoop, 'Ciclo For', arr)
    ];

    results.forEach(({ label, time }) => {
      console.log(label.padEnd(20) + ': ' + time + ' ms');
    });

    const fastest = results.reduce((min, r) => 
      r.time < min.time ? r : min
    );
    console.log('\nMas rápido: ' + fastest.label);
  };

  return { run };
})();

const sizes = [1000, 10000, 100000];
sizes.forEach(size => benchmark.run(size));