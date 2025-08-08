# 🚀 Guía Rápida - Chat Asistente HormonalCare-IA

## ⚡ Configuración Inmediata

### 1. Configura tu API Key de Google AI

```bash
# Crea el archivo .env.local
echo "GOOGLE_AI_API_KEY=tu_api_key_real_aqui" > .env.local
echo "GEMINI_API_KEY=tu_api_key_real_aqui" >> .env.local
echo "GOOGLE_API_KEY=tu_api_key_real_aqui" >> .env.local
```

**📋 Pasos para obtener tu API Key:**
1. Ve a https://ai.google.dev/
2. Crea una cuenta Google o inicia sesión
3. Genera una nueva API key
4. Copia la key y reemplaza `tu_api_key_real_aqui` en los comandos de arriba

### 2. Ejecuta la aplicación

```bash
npm run dev
```

## 🎯 Cómo Usar el Chat

### ✅ **Lo que SÍ puedes hacer:**

#### 📋 **Con un paciente seleccionado:**
- "Resume el estado hormonal de esta paciente"
- "¿Qué medicamentos está tomando para el PCOS?"
- "¿Cuáles son sus síntomas más recientes?"
- "¿Qué exámenes necesita para seguimiento?"
- "¿Hay interacciones entre sus medicamentos?"

#### 🔍 **Consultas generales:**
- "¿Cuáles son los criterios para diagnosticar PCOS?"
- "¿Qué efectos tiene la metformina en resistencia a insulina?"
- "¿Cuándo recomendar espironolactona?"

### 🎨 **Interfaz:**

1. **Botón azul flotante** en esquina inferior derecha
2. **Click para abrir** el chat
3. **Escribe tu pregunta** y presiona Enter o click en enviar
4. **El asistente responde** con información contextual

### 📍 **Ubicaciones del Chat:**

- **`/patients`** - Chat general sobre cuidado hormonal
- **`/patients/[id]`** - Chat específico del paciente seleccionado

## 🚨 Troubleshooting

### ❌ Error: "Error al procesar la consulta" 
**SOLUCIÓN INMEDIATA:**
```bash
# 1. Crea/edita tu archivo .env.local
echo "GOOGLE_AI_API_KEY=tu_api_key_real_aqui" > .env.local

# 2. Reinicia el servidor
npm run dev
```

### ❌ Errores de Next.js 15 en consola
- ✅ **SOLUCIONADO** - Los errores de `params` ya están corregidos
- 🔄 Reinicia el servidor si persisten: `npm run dev`

### ❌ Chat no aparece o no funciona
- ✅ Verifica que estés en página `/patients` o `/patients/[id]`
- ✅ Busca el **botón azul flotante** en esquina inferior derecha
- ✅ Abre herramientas de desarrollador para ver errores

### ❌ "API key no configurada"
- ✅ Crea archivo `.env.local` en la raíz del proyecto
- ✅ Agrega: `GOOGLE_AI_API_KEY=tu_key_real`
- ✅ **NO uses** la key del ejemplo (es solo para demo)

### ❌ Respuestas lentas o timeouts
- ✅ Verifica que tu API key esté en `.env.local`
- ✅ Asegúrate de que la API key sea válida
- ✅ Verifica tu cuota en Google AI

### Chat no aparece
- ✅ Asegúrate de estar en una página de pacientes
- ✅ Verifica que no haya errores en la consola del navegador

### Respuestas lentas
- ⏱️ Normal - Gemini puede tomar unos segundos
- 📶 Verifica tu conexión a internet

## 🔥 Tips Profesionales

1. **Sé específico:** "¿Cómo afecta el hipotiroidismo al PCOS de esta paciente?" vs "Háblame del hipotiroidismo"

2. **Usa contexto:** El chat recuerda la conversación durante la sesión

3. **Pregunta por recomendaciones:** "¿Qué exámenes recomiendas?" o "¿Cuál sería el siguiente paso?"

## 🌟 Ejemplos de Preguntas Efectivas

```
✅ "¿Cuál es la relación entre la resistencia a insulina y los síntomas actuales?"
✅ "¿Qué ajustes podrían mejorar el tratamiento actual?"
✅ "¿Hay signos de progresión en esta condición?"
✅ "¿Qué parámetros debo monitorear en el próximo control?"
```

---

**¿Listo para empezar?** 🚀 
Abre http://localhost:9003 y haz click en el botón azul!
