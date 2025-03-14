import Groq from 'groq-sdk'

const GROQ_API_KEY = process.env.GROQ_API_KEY

class GroqService {
    /**
     * Model ID used in the GROQ API
     */
    private modelId = 'mixtral-8x7b-32768'

    /**
     * GROQ Template
     */
    private prompt = `
Eres un sistema automatizado diseñado para analizar información estados de cuenta de nómina bancarios de BANORTE.

Extrae los datos en formato JSON con las siguientes claves:
    - No. de Cuenta.
    - Nombre del titular.
    - Periódo del estado de cuenta. Las fechas vienen en formato "DD/MMMM/YYYY", e.g. 30/Junio/2024
    - Moneda del estado de cuenta.
    - Fecha de corte del estado de cuenta. Viene en formato "DD/MMMM/YYYY", e.g. 30/Junio/2024

Además, los siguientes valores de la sección de "Resumen del periodo":
    - Total de depósitos.
    - Total de retiros.
    - Saldo actual.

Ejemplo de resultado procesado :
{
    "NO_CUENTA": "0807070895",
    "NOMBRE_CLIENTE": "DANIEL PEREZ ATANACIO",
    "PERIODO": {
        "inicio": "01/01/2025",
        "fin": "31/01/2025"
    },
    "FECHA_CORTE": "31/01/2025",
    "MONEDA": "PESOS",
    "DEPOSITOS": $35960.00,
    "RETIROS": $128631.36,
    "SALDO_FINAL": $300287.24
}

Consideraciones:
- La fecha debe estar en formato "DD/MM/YYYY".
- Cambia el nombre del mes que viene es español por su respectivo valor numérico. e.g. "Enero" por "01", "Dicimebre" por "12".
- Las cantidades monetarias deben estar en formato de moneda con dos decimales, pero sin el símbolo de la moneda.
- El concepto de "DEPÓSITOS" tiene acento en la primera "O", pero en el resultado JSON no debe llevar acento.

No incluyas texto adicional, solo el JSON estructurado.`

    /**
     * GROQ API Instance
     */
    private groq: Groq

    constructor() {
        if (!GROQ_API_KEY) {
            console.error('❌ Debes configurar la variable de entorno GROQ_API_KEY.')
            process.exit(1)
        }

        this.groq = new Groq({ apiKey: GROQ_API_KEY })
    }

    /**
     * Extracts information from a text using the GROQ API.
     * @param info
     * @returns
     */
    async completions(info: string) {
        try {
            const response = await this.groq.chat.completions.create({
                model: this.modelId,
                messages: [
                    {
                        role: 'system',
                        content: this.prompt,
                    },
                    {
                        role: 'user',
                        content: `Extrae la información del siguiente estado de cuenta:\n${info}`,
                    },
                ],
                temperature: 0,
            })

            if (!response.choices.length) {
                throw new Error('No se encontraron respuestas.')
            }

            return response.choices[0].message.content
        } catch (error) {
            console.error('❌ Error en la API de Groq:', error)
            throw new Error('Error en la API de Groq')
        }
    }
}


export default GroqService