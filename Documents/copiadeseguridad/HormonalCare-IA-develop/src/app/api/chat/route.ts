import { NextRequest, NextResponse } from 'next/server';
import { ai } from '@/ai/genkit';
import medicalRecords from '@/data/medical-records.json';

export async function POST(request: NextRequest) {
  try {
    // Verificar que existe la API key
    if (!process.env.GOOGLE_AI_API_KEY && !process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: 'API key de Google AI no configurada. Por favor, configura una de estas variables: GOOGLE_AI_API_KEY, GEMINI_API_KEY, o GOOGLE_API_KEY en tu archivo .env.local' },
        { status: 500 }
      );
    }

    const { message, patientId, conversationHistory } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Mensaje requerido' },
        { status: 400 }
      );
    }

    // Obtener los datos del paciente si se proporciona un ID
    let patientData = null;
    if (patientId && medicalRecords[patientId as keyof typeof medicalRecords]) {
      patientData = medicalRecords[patientId as keyof typeof medicalRecords];
    }

    // Construir el contexto para Gemini
    let contextPrompt = `Eres un asistente médico especializado en cuidado hormonal femenino. Tu función es ayudar a los doctores analizando historias clínicas y respondiendo preguntas específicas sobre los pacientes.

INSTRUCCIONES IMPORTANTES:
- Proporciona respuestas precisas y basadas en evidencia
- Si no tienes información suficiente, dilo claramente
- Sugiere exámenes o seguimientos cuando sea apropiado
- Mantén un tono profesional y empático
- No hagas diagnósticos definitivos, solo análisis e insights
- Enfócate en condiciones hormonales femeninas

`;

    if (patientData) {
      contextPrompt += `\n\nDATOS DEL PACIENTE ACTUAL:\n${JSON.stringify(patientData, null, 2)}\n\n`;
    } else {
      contextPrompt += `\n\nNota: No hay un paciente específico seleccionado. Puedes responder preguntas generales sobre cuidado hormonal femenino.\n\n`;
    }

    // Agregar historial de conversación
    if (conversationHistory && conversationHistory.length > 0) {
      contextPrompt += `\nHISTORIAL DE CONVERSACIÓN:\n`;
      conversationHistory.forEach((msg: any) => {
        contextPrompt += `${msg.role === 'user' ? 'Doctor' : 'Asistente'}: ${msg.content}\n`;
      });
    }

    contextPrompt += `\nPREGUNTA ACTUAL DEL DOCTOR: ${message}\n\nRespuesta:`;

    // Si no hay API key válida, devolver respuesta de demo
    if ((!process.env.GOOGLE_AI_API_KEY && !process.env.GEMINI_API_KEY && !process.env.GOOGLE_API_KEY) || 
        process.env.GOOGLE_AI_API_KEY === 'placeholder_api_key') {
      const demoResponse = `🤖 **Modo Demo - API Key no configurada**

Para usar el chat asistente completo, necesitas:

1. Obtener una API key de Google AI: https://ai.google.dev/
2. Agregar la API key a tu archivo .env.local:
   \`\`\`
   GOOGLE_AI_API_KEY=tu_api_key_aqui
   \`\`\`
3. Reiniciar tu servidor de desarrollo

**Pregunta recibida:** ${message}

*En modo demo, el asistente no puede procesar consultas reales sobre las historias clínicas.*`;

      return NextResponse.json({
        response: demoResponse,
        patientId,
      });
    }

    // Generar respuesta con Gemini
    const response = await ai.generate({
      messages: [
        {
          role: 'user',
          content: [{ text: contextPrompt }]
        }
      ],
      config: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      }
    });

    const assistantResponse = response.text;

    return NextResponse.json({
      response: assistantResponse,
      patientId,
    });

  } catch (error) {
    console.error('Error en chat API:', error);
    
    // Respuesta de error más informativa
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    
    return NextResponse.json(
      { 
        error: `Error al procesar la consulta: ${errorMessage}. ${!process.env.GOOGLE_AI_API_KEY ? 'Verifica que tu API key esté configurada.' : ''}` 
      },
      { status: 500 }
    );
  }
}
