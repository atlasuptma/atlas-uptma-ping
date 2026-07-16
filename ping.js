// ============================================================
//  ATLAS UPTMA — Visita automática con navegador real
// ============================================================
//  Este script abre un navegador Chromium de verdad (invisible,
//  sin pantalla) y visita la URL de tareas_automaticas.php.
//  Como es un navegador real que ejecuta JavaScript y acepta
//  cookies, pasa sin problema el filtro anti-bot de InfinityFree
//  (que bloquea peticiones simples tipo cron-job.org o curl).
// ============================================================

const { chromium } = require('playwright');

// ⚠️ Cambia esta URL por la tuya real, con tu token.
const URL = 'https://atlasuptma.rf.gd/atlas_uptma/cron/tareas_automaticas.php?token=atlas2026uptma93&origen=capa3_github';

(async () => {
    console.log('Abriendo navegador...');
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
        console.log('Visitando:', URL);
        const response = await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });
        console.log('Código de respuesta:', response.status());

        const texto = await page.textContent('body');
        console.log('--- Respuesta del servidor ---');
        console.log(texto);
        console.log('-------------------------------');

        if (texto.includes('ERROR')) {
            console.error('⚠️ El script reportó un error.');
            process.exitCode = 1;
        } else {
            console.log('✅ Verificación completada correctamente.');
        }
    } catch (err) {
        console.error('❌ Falló la visita:', err.message);
        process.exitCode = 1;
    } finally {
        await browser.close();
    }
})();
