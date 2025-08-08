# Chat Asistente con Gemini AI

## Descripción

El chat asistente es una funcionalidad que permite a los doctores interactuar con Gemini AI para obtener insights y análisis sobre las historias clínicas de los pacientes. El asistente puede:

- Analizar historias clínicas específicas de pacientes
- Responder preguntas sobre condiciones hormonales
- Sugerir exámenes y seguimientos
- Proporcionar información médica basada en evidencia

## Características

### 🎯 **Contextualizado por Paciente**
- Cuando estás viendo un paciente específico, el chat tiene acceso completo a toda su historia clínica
- Puedes hacer preguntas específicas sobre síntomas, medicamentos, y evolución del paciente

### 💬 **Chat Flotante**
- Ventana flotante que aparece con un botón azul en la esquina inferior derecha
- Diseño responsivo y fácil de usar
- Persistencia de conversación durante la sesión

### 🔍 **Consultas Inteligentes**
- El asistente entiende el contexto médico hormonal femenino
- Proporciona respuestas precisas basadas en los datos del paciente
- Mantiene historial de conversación para contexto continuo

## Uso

### Configuración Inicial

1. **Variables de Entorno**
   Crea un archivo `.env.local` con tu API key de Google AI:
   ```
   GOOGLE_AI_API_KEY=tu_api_key_aqui
   ```

2. **Obtener API Key**
   - Ve a [Google AI Studio](https://ai.google.dev/)
   - Crea una cuenta o inicia sesión
   - Genera una nueva API key
   - Agrega la key a tu archivo `.env.local`

### Casos de Uso

#### **En la Vista de Paciente Específico**
Cuando estás viendo los detalles de un paciente, puedes hacer preguntas como:

- "¿Cuál es el resumen del estado hormonal actual de esta paciente?"
- "¿Qué interacciones puede haber entre sus medicamentos actuales?"
- "¿Qué exámenes recomiendas para el seguimiento de su PCOS?"
- "¿Cómo ha evolucionado su resistencia a la insulina?"

#### **En la Vista General de Pacientes**
Para consultas generales sobre cuidado hormonal:

- "¿Cuáles son los criterios diagnósticos para PCOS?"
- "¿Qué efectos secundarios comunes tiene la metformina?"
- "¿Cuándo se recomienda iniciar terapia hormonal?"

## Implementación Técnica

### Componentes Principales

1. **`FloatingChat`** - Componente de interfaz de usuario
2. **`useChat`** - Hook para manejo del estado del chat
3. **`/api/chat`** - Endpoint API que procesa las consultas
4. **Integración con Genkit** - Configuración de Gemini AI

### Flujo de Datos

```
Usuario → FloatingChat → useChat → /api/chat → Genkit/Gemini → Respuesta
```

### Estructura de Datos

El asistente recibe:
- Mensaje del usuario
- ID del paciente (si aplica)
- Historial de conversación
- Datos completos del paciente desde `medical-records.json`

## Despliegue

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tu API key

# Ejecutar en desarrollo
npm run dev
```

### Producción

El chat funcionará perfectamente en producción siempre que:

1. **Variables de entorno** estén configuradas en tu plataforma de hosting
2. **API key de Google AI** sea válida y tenga cuota disponible
3. **Dominio** esté permitido en la configuración de Google AI (si aplica)

### Plataformas Compatibles

- **Vercel**: ✅ Totalmente compatible
- **Netlify**: ✅ Compatible con edge functions
- **Firebase Hosting**: ✅ Compatible con Cloud Functions
- **Railway/Render**: ✅ Compatible

## Seguridad y Privacidad

- Los datos médicos se procesan únicamente durante la consulta
- No se almacenan conversaciones en bases de datos externas
- La API key se mantiene segura en variables de entorno del servidor
- Todas las comunicaciones son HTTPS

## Limitaciones

- Requiere conexión a internet para funcionar
- Dependiente de la disponibilidad de la API de Google AI
- Límites de cuota según tu plan de Google AI
- No debe usarse para diagnósticos definitivos

## Próximas Mejoras

- [ ] Integración con bases de datos en tiempo real
- [ ] Exportación de conversaciones
- [ ] Personalización de prompts por especialidad
- [ ] Integración con sistemas EMR externos
- [ ] Modo offline con respuestas predefinidas
