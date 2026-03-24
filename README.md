# CRUD - Challenge (Gestión de Alumnos)

Este es un proyecto backend desarrollado con **Node.js**, **Express** y **TypeScript**. La interfaz gráfica está construida utilizando el motor de plantillas **Handlebars** (.hbs) y los datos se almacenan en una base de datos **MongoDB**.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:
- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [MongoDB](https://www.mongodb.com/try/download/community) (funcionando localmente) o una cuenta en MongoDB Atlas.
- [Git](https://git-scm.com/) (Opcional, para clonar en lugar de descargar el ZIP)

## Instalación y Configuración

Sigue los pasos a continuación para levantar el proyecto en tu máquina local:

### 1. Clonar el repositorio
Si aún no estás dentro de la carpeta del proyecto, clónalo desde el repositorio o extrae el archivo comprimido.
```bash
git clone <URL_DEL_REPOSITORIO>
cd "CRUD - Challenge/Crud---Challenge"
```

### 2. Instalar dependencias
Instala todas las librerías necesarias ejecutando:
```bash
npm install
```

### 3. Configurar las Variables de Entorno
Crea un archivo llamado `.env` en la raíz del proyecto (junto a `package.json`) y agrega las siguientes variables de configuración:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/alumnos_db
```
*(Puedes cambiar `PORT` si el 3000 está ocupado, o `MONGO_URI` si tu base de datos MongoDB tiene credenciales o está alojada en la nube).*

### 4. Asegurarse de que MongoDB esté corriendo
Si usas MongoDB de forma local, verifica que el servicio de MongoDB se encuentre activo en tu computadora. Puedes abrir MongoDB Compass y conectarte a `mongodb://127.0.0.1:27017/` para confirmarlo.

### 5. Iniciar el Servidor de Desarrollo
Para correr el proyecto en modo desarrollo (se reiniciará automáticamente al hacer cambios gracias a `tsx watch`), ejecuta:
```bash
npm run dev
```

### 6. Iniciar el Servidor en Producción (Opcional)
Si deseas compilar el código TypeScript a JavaScript puro e iniciar el proyecto de forma estática:
```bash
# Para compilar el proyecto (crea la carpeta dist/)
npm run build 

# Para iniciar la versión compilada
npm start
```

## Uso de la Aplicación
Una vez que el servidor esté corriendo (dirá algo como *Server is running on port 3000*), abre tu navegador web y ve a:

👉 **http://localhost:3000**

Allí serás redirigido a la ruta `/alumnos` donde podrás:
- Ver la lista de alumnos.
- Crear nuevos alumnos (Nuevo alumno).
- Editar alumnos existentes.
- Eliminar de la lista a cualquier alumno (Implementado mediante el paquete `method-override`).
