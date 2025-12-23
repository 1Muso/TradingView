// Servicio intermedio para convertir alertas de TradingView a embeds de Discord
// Ejecutar con: node discord-webhook-converter.js

const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.text());

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1452795419745587244/7dD2kKN-xEf2TjtDF0mDH9wkxKyqWfi8N2kGBQjumZoFMT3R4drdJLQu3NFSPUIDdO9w';

app.post('/webhook', async (req, res) => {
    try {
        let message = '';
        
        // TradingView puede enviar como JSON o texto plano
        if (typeof req.body === 'object' && req.body.message) {
            message = req.body.message;
        } else if (typeof req.body === 'string') {
            message = req.body;
        } else {
            message = JSON.stringify(req.body);
        }

        // Extraer el texto de la señal
        const signalMatch = message.match(/POSIBLE SEÑAL DETECTADA EN (.+?) (\d+\.?\d*)%/);
        
        if (signalMatch) {
            const symbol = signalMatch[1];
            const percentage = signalMatch[2];
            
            // Determinar color basado en el porcentaje o contenido del mensaje
            let color = 3447003; // Azul por defecto
            if (message.includes('PATRÓN M') || message.includes('🔴')) {
                color = 16711680; // Rojo
            } else if (message.includes('PATRÓN W') || message.includes('🟢')) {
                color = 65280; // Verde
            }

            // Crear embed de Discord
            const embed = {
                embeds: [{
                    title: `POSIBLE SEÑAL DETECTADA EN ${symbol} ${percentage}%`,
                    color: color,
                    timestamp: new Date().toISOString()
                }]
            };

            // Enviar a Discord
            await axios.post(DISCORD_WEBHOOK_URL, embed);
            console.log(`✅ Señal enviada: ${symbol} ${percentage}%`);
        } else {
            // Si no coincide el formato, enviar el mensaje tal cual
            const embed = {
                embeds: [{
                    title: message,
                    color: 3447003,
                    timestamp: new Date().toISOString()
                }]
            };
            await axios.post(DISCORD_WEBHOOK_URL, embed);
            console.log(`✅ Mensaje enviado: ${message}`);
        }

        res.status(200).send('OK');
    } catch (error) {
        console.error('❌ Error:', error.message);
        res.status(500).send('Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
    console.log(`📡 Webhook URL: http://localhost:${PORT}/webhook`);
    console.log(`💡 Configura esta URL en TradingView en lugar del webhook de Discord`);
});

