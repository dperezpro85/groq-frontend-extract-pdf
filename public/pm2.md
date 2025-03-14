GitHub Copilot: PM2 es una herramienta muy útil para gestionar aplicaciones Node.js en producción. Aquí te muestro cómo puedes usar PM2 para iniciar tu aplicación de Next.js y configurarla para que se ejecute automáticamente al iniciar el sistema.

### Paso 1: Instalar PM2

Primero, instala PM2 globalmente en tu sistema:

```sh
npm install -g pm2
```

### Paso 2: Crear un script de inicio para PM2

Crea un archivo `ecosystem.config.js` en la raíz de tu proyecto. Este archivo define cómo PM2 debe manejar tu aplicación.

```javascript
module.exports = {
  apps: [
    {
      name: 'next-app',
      script: 'npm',
      args: 'start',
      cwd: '/Users/daniel/Projects/groq-frontend-extract-pdf',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
```

### Paso 3: Iniciar la aplicación con PM2

Usa PM2 para iniciar tu aplicación usando el archivo de configuración que acabas de crear:

```sh
pm2 start ecosystem.config.js
```

### Paso 4: Configurar PM2 para que se ejecute al iniciar el sistema

PM2 puede configurarse para que se ejecute automáticamente al iniciar el sistema. Ejecuta el siguiente comando para generar y configurar el script de inicio:

```sh
pm2 startup
```

Este comando generará una línea de comando específica para tu sistema operativo. Ejecuta la línea de comando que te proporciona PM2 para completar la configuración.

### Paso 5: Guardar el estado de PM2

Guarda el estado actual de PM2 para que las aplicaciones se reinicien automáticamente después de un reinicio del sistema:

```sh
pm2 save
```

### Paso 6: Verificar que PM2 está configurado correctamente

Puedes verificar que tu aplicación está siendo gestionada por PM2 y que se reiniciará automáticamente con el siguiente comando:

```sh
pm2 list
```

### Resumen de comandos

1. Instalar PM2:

    ```sh
    npm install -g pm2
    ```

2. Crear `ecosystem.config.js`:

    ```javascript
    // filepath: /Users/daniel/Projects/groq-frontend-extract-pdf/ecosystem.config.js
    module.exports = {
      apps: [
        {
          name: 'next-app',
          script: 'npm',
          args: 'start',
          cwd: '/Users/daniel/Projects/groq-frontend-extract-pdf',
          env: {
            NODE_ENV: 'production',
          },
        },
      ],
    };
    ```

3. Iniciar la aplicación con PM2:

    ```sh
    pm2 start ecosystem.config.js
    ```

4. Configurar PM2 para que se ejecute al iniciar el sistema:

    ```sh
    pm2 startup
    ```

5. Guardar el estado de PM2:

    ```sh
    pm2 save
    ```

6. Verificar el estado de PM2:

    ```sh
    pm2 list
    ```

Con estos pasos, tu aplicación de Next.js se gestionará con PM2 y se reiniciará automáticamente al iniciar el sistema. PM2 también proporciona otras funcionalidades útiles, como monitoreo y manejo de logs, que pueden ser muy útiles en un entorno de producción.

GitHub Copilot: La URL en la que está corriendo tu aplicación depende de la configuración de tu servidor y del puerto en el que Next.js está configurado para escuchar. Por defecto, Next.js escucha en el puerto 3000.

Si no has cambiado la configuración del puerto, tu aplicación debería estar corriendo en:

```
http://localhost:3000
```

Puedes verificar esto revisando la configuración de tu aplicación en el archivo package.json y asegurándote de que no haya configuraciones adicionales que cambien el puerto.

Para confirmar que tu aplicación está corriendo en el puerto 3000, puedes revisar los logs de PM2:

```sh
pm2 logs
```

Esto te mostrará los logs de la aplicación y deberías ver un mensaje indicando que el servidor está escuchando en el puerto 3000.

Si necesitas cambiar el puerto, puedes hacerlo configurando la variable de entorno `PORT` en tu archivo ecosystem.config.js:

```javascript
module.exports = {
    apps: [
        {
            name: 'groq-frontend-extract-pdf',
            script: 'npm',
            args: 'start',
            cwd: '/Users/daniel/Projects/groq-frontend-extract-pdf',
            env: {
                NODE_ENV: 'production',
                PORT: 30002, // Cambia este valor si necesitas usar otro puerto
            },
        },
    ],
}
```

Después de hacer cualquier cambio en la configuración, asegúrate de reiniciar la aplicación con PM2:

```sh
pm2 restart ecosystem.config.js
```

Esto aplicará los cambios y reiniciará tu aplicación en el puerto configurado.