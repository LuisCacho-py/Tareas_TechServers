const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));

//Rutas GET pa los formularios

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/contacto', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contacto.html'))
})

//Rutas POST

app.post('/contacto', async (req, res) => {
    const { nombre, correo, mensaje } = req.body;

    try {
        // Petición al servicio de terceros (Ej: Web3Forms)
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                access_key: '790cabca-7109-4505-91a3-537822fa1b6d',
                name: nombre,
                email: correo,
                message: mensaje
            })
        });

        if (response.ok) {
            // Confirmación visual como pide el requerimiento
            res.sendFile(path.join(__dirname, 'views', 'exito.html'));
        } else {
            res.send('Hubo un error al enviar el mensaje.');
        }
    } catch (error) {
        console.error(error);
        res.send('Error en el servidor.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});