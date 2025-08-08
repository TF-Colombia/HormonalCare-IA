// Script de prueba para verificar la API key de Google AI
require('dotenv').config({ path: '.env.local' });

async function testGeminiAPI() {
  console.log('🔑 Verificando API key...');
  
  if (!process.env.GOOGLE_AI_API_KEY) {
    console.error('❌ No se encontró GOOGLE_AI_API_KEY en .env.local');
    return;
  }
  
  console.log('✅ API key encontrada:', process.env.GOOGLE_AI_API_KEY.substring(0, 10) + '...');
  
  try {
    // Importar dinámicamente después de cargar las variables de entorno
    const { ai } = await import('../src/ai/genkit.ts');
    
    console.log('🤖 Probando conexión con Gemini...');
    
    const response = await ai.generate({
      messages: [
        {
          role: 'user',
          content: [{ text: 'Hola, responde solo con "¡Funciona perfectamente!"' }]
        }
      ],
      config: {
        temperature: 0,
        maxOutputTokens: 50,
      }
    });
    
    console.log('🎉 Respuesta de Gemini:', response.text);
    console.log('✅ ¡API configurada correctamente!');
    
  } catch (error) {
    console.error('❌ Error al conectar con Gemini:', error.message);
    
    if (error.message.includes('API_KEY_INVALID')) {
      console.error('🔑 La API key parece ser inválida. Verifica que sea correcta.');
    } else if (error.message.includes('quota')) {
      console.error('📊 Problema de cuota. Verifica tu plan en Google AI.');
    }
  }
}

testGeminiAPI();
