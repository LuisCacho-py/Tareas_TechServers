const Logger = require('./Logger');

// Mostrar en consola todo
Logger.configure({ output: 'console', minLevel: 'info' });
Logger.info('Mensaje');
Logger.warn('Aviso');
Logger.error('Error');

// Guardar en archivo solo warn y error
Logger.configure({ output: 'file', file: 'app.log', minLevel: 'warn' });
Logger.warn('Se guarda');
Logger.error('Se guarda');
Logger.info('No se guarda');