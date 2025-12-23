# Discord Signals Bot

Bot que convierte las alertas de TradingView a embeds de Discord.

## 🚀 Instalación Rápida

### 1. Instalar Node.js
Si no tienes Node.js instalado, descárgalo de: https://nodejs.org/

### 2. Instalar dependencias
Abre una terminal en esta carpeta y ejecuta:
```bash
npm install
```

### 3. Ejecutar el bot
```bash
npm start
```

Verás un mensaje como:
```
🚀 Servidor escuchando en puerto 3000
📡 Webhook URL: http://localhost:3000/webhook
💡 Configura esta URL en TradingView en lugar del webhook de Discord
```

## ⚙️ Configuración en TradingView

⚠️ **IMPORTANTE:** TradingView ejecuta las alertas en sus servidores, por lo que `localhost` NO funcionará. Necesitas exponer tu servidor a internet.

### Opción A: Usar ngrok (Rápido para pruebas)

1. **Descarga ngrok**: https://ngrok.com/download
   - Descomprime y ejecuta `ngrok.exe`
   - O instálalo con: `choco install ngrok`

2. **En otra terminal, ejecuta**:
   ```bash
   ngrok http 3000
   ```

3. **Copia la URL HTTPS** que ngrok te da (ejemplo: `https://abc123.ngrok-free.app`)

4. **En TradingView**, configura el webhook como:
   ```
   https://tu-url-ngrok.ngrok-free.app/webhook
   ```

⚠️ **Limitaciones de ngrok gratuito:**
- La URL cambia cada vez que reinicias ngrok
- Necesitas tener ngrok ejecutándose siempre
- Tiene límites de uso

### Opción B: Desplegar en la Nube (Recomendado - Funciona 24/7)

## 📋 Formato de las Alertas

El bot espera recibir mensajes con el formato:
```
POSIBLE SEÑAL DETECTADA EN XAU/USD 0.8%
```

Y los convierte a embeds de Discord con:
- **Título**: "POSIBLE SEÑAL DETECTADA EN XAU/USD 0.8%"
- **Color**: Verde (patrón W) o Rojo (patrón M)
- **Timestamp**: Automático

## 🌐 Desplegar en la Nube (Recomendado)

Para que el bot funcione 24/7 sin tener tu computadora encendida:

### Railway (Más fácil y recomendado)

1. **Crea cuenta**: https://railway.app/ (con GitHub)

2. **Crea un nuevo proyecto**:
   - Click en "New Project"
   - Selecciona "Deploy from GitHub repo" (necesitas subir estos archivos a GitHub primero)
   - O selecciona "Empty Project" y luego "Add Service" → "GitHub Repo"

3. **Configura el servicio**:
   - Railway detectará automáticamente Node.js
   - El bot se desplegará automáticamente

4. **Obtén la URL**:
   - Railway te dará una URL como: `https://tu-proyecto.up.railway.app`
   - Agrega `/webhook` al final: `https://tu-proyecto.up.railway.app/webhook`

5. **En TradingView**, usa esta URL como webhook

### Render (Alternativa)

1. **Crea cuenta**: https://render.com/
2. **Nuevo servicio** → "Web Service"
3. **Conecta tu repositorio** de GitHub
4. **Configuración**:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. **Obtén la URL** y úsala en TradingView

### Otras opciones:
- **Heroku**: https://www.heroku.com/ (requiere tarjeta de crédito para webhooks)
- **Fly.io**: https://fly.io/ (gratis con límites)

## 🔧 Solución de Problemas

### El bot no recibe alertas
- Verifica que el bot esté ejecutándose (`npm start`)
- Verifica que la URL en TradingView sea correcta
- Revisa la consola del bot para ver errores

### Las alertas no aparecen en Discord
- Verifica que el webhook de Discord sea válido
- Revisa los logs del bot para ver errores

## 📝 Notas

- El bot debe estar ejecutándose para recibir alertas
- Si cierras la terminal, el bot se detiene
- Para ejecutar en segundo plano, usa `pm2` o similar

