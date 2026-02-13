const fs = require('fs');

const Logger = (() => {
  let settings = {
    output: 'console',  // 'console' o 'file'
    file: 'logs.txt',
    minLevel: 'info'    // 'error', 'warn', 'info'
  };

  const levels = { error: 0, warn: 1, info: 2 };

  const write = (type, msg) => {
    const fecha = new Date().toLocaleTimeString();
    const texto = `[${fecha}] ${type.toUpperCase()}: ${msg}`;

    if (settings.output === 'file') {
      fs.appendFileSync(settings.file, texto + '\n');
    } else {
      console.log(texto);
    }
  };

  return {
    info(msg) {
      if (levels[settings.minLevel] >= levels.info) write('info', msg);
    },
    warn(msg) {
      if (levels[settings.minLevel] >= levels.warn) write('warn', msg);
    },
    error(msg) {
      write('error', msg);
    },
    configure(opts) {
      settings = { ...settings, ...opts };
    }
  };
})();

module.exports = Logger;