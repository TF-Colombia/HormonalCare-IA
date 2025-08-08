# 🚀 Setup para Equipo - Chat Asistente Gemini

## ⚡ Configuración Rápida (5 minutos)

### 📋 **Pasos OBLIGATORIOS antes de empezar:**

#### 1. 🔑 **Obtener API Key de Google AI**
```
🌐 Ve a: https://ai.google.dev/
📝 Crea cuenta o inicia sesión
🔑 Genera una nueva API key
📋 Copia la API key (algo como: AIzaSy...)
```

#### 2. 📁 **Configurar variables de entorno**
```bash
# En la raíz del proyecto, crea .env.local:
cp .env.example .env.local

# Edita .env.local y reemplaza YOUR_API_KEY_HERE con tu key real:
GOOGLE_AI_API_KEY=tu_api_key_real_aqui
GEMINI_API_KEY=tu_api_key_real_aqui  
GOOGLE_API_KEY=tu_api_key_real_aqui
```

#### 3. 🚀 **Ejecutar la aplicación**
```bash
npm install
npm run dev
```

---

## 🎯 **Chat Asistente - Funcionalidades**

### ✅ **Qué hace:**
- 🤖 Chat flotante con Gemini AI
- 📊 Análisis de historias clínicas específicas
- 🩺 Consultas médicas especializadas en hormonas
- 💬 Historial de conversación persistente

### 📍 **Dónde encontrarlo:**
- **Botón azul flotante** en esquina inferior derecha
- **Páginas:** `/patients` y `/patients/[id]`

### 🔍 **Ejemplos de uso:**

#### Con paciente específico:
```
"Resume el estado hormonal de esta paciente"
"¿Qué medicamentos está tomando para PCOS?"
"¿Hay interacciones entre sus medicamentos?"
"¿Qué exámenes recomiendas para seguimiento?"
```

#### Consultas generales:
```
"¿Cuáles son los criterios para diagnosticar PCOS?"
"¿Qué efectos tiene la metformina en resistencia a insulina?"
"¿Cuándo se recomienda terapia hormonal?"
```

---

## 🚨 **Troubleshooting Común**

### ❌ **Error: "Error al procesar la consulta"**
```bash
# Solución:
1. Verifica que .env.local existe
2. Verifica que tu API key es válida
3. Reinicia el servidor: npm run dev
```

### ❌ **Chat no aparece**
```bash
# Solución:
1. Ve a /patients o /patients/pat_1
2. Busca el botón azul flotante
3. Verifica consola del navegador por errores
```

### ❌ **"API key no configurada"**
```bash
# Solución:
1. Crea .env.local en la raíz del proyecto
2. Agrega las tres variables con tu API key
3. Reinicia npm run dev
```

---

## 📁 **Archivos Importantes**

### 🔧 **Componentes del Chat:**
- `src/components/floating-chat.tsx` - UI del chat
- `src/hooks/use-chat.ts` - Lógica del chat
- `src/app/api/chat/route.ts` - API endpoint
- `src/ai/genkit.ts` - Configuración de Gemini

### ⚙️ **Configuración:**
- `.env.local` - Variables de entorno (CREAR ESTE ARCHIVO)
- `.env.example` - Ejemplo de configuración
- `CHAT-SETUP.md` - Guía detallada

---

## 🌟 **Notas para el Equipo**

### ✅ **Funcionando:**
- ✅ API de Gemini integrada y probada
- ✅ UI responsiva y funcional
- ✅ Scroll optimizado para mensajes largos
- ✅ Análisis contextual de pacientes
- ✅ Manejo de errores robusto

### 🔄 **Por mejorar (futuras iteraciones):**
- [ ] Exportar conversaciones a PDF
- [ ] Integración con base de datos real
- [ ] Personalización de prompts médicos
- [ ] Modo offline con respuestas predefinidas

### 🚀 **Para Deploy:**
- Configurar API key en variables de entorno del hosting
- Verificar que el dominio esté permitido en Google AI
- Todas las dependencias ya están en package.json

---

## ⏰ **Tiempo estimado de setup: 5 minutos** ⏰

¿Problemas? Revisa `CHAT-SETUP.md` para guía detallada.
