import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Obtener la API key de cualquiera de las variables disponibles
const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: apiKey
    })
  ],
  model: 'googleai/gemini-2.0-flash',
});
