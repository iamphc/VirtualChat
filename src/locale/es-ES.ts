export default {
  app: {
    title: "Electron React App",
  },
  chat: {
    title: "Asistente de Chat",
    placeholder: "Escribe un mensaje...",
    send: "Enviar",
    sending: "Enviando...",
    copy: "Copiar",
    copied: "Copiado",
    regenerate: "Regenerar",
    regenerating: "Regenerando...",
    welcomeMessages: {
      assistant:
        "¡Hola! Soy tu asistente de IA local. Estoy aquí para ayudarte con cualquier pregunta o problema que puedas tener. ¿En qué puedo ayudarte hoy?",
      math: "¡Hola! Soy tu tutor de matemáticas, especializado en explicar conceptos matemáticos y ayudar a resolver problemas matemáticos. ¿Necesitas ayuda con matemáticas?",
      fitness:
        "¡Hola! Soy tu entrenador de fitness, ofreciendo consejos sobre alimentación saludable y rutinas de ejercicio. ¿Quieres comenzar un plan de fitness o tienes preguntas sobre salud?",
      travel:
        "¡Hola! Soy tu asesor de viajes, especializado en recomendar destinos, planificar itinerarios y proporcionar consejos de viaje. ¿Planeas viajar a algún lado?",
    },
  },
  settings: {
    title: "Configuración de Usuario",
    backToChat: "← Volver al Chat",
    saved: "¡Configuración guardada con éxito!",
    userName: "Nombre de Usuario",
    userNamePlaceholder: "Ingresa tu nombre de usuario",
    avatar: "Foto de Perfil",
    changeAvatar: "Cambiar Avatar",
    language: "Idioma",
    languageHint:
      "Establece el idioma de visualización para la aplicación. Se requiere reiniciar para efecto completo.",
    theme: {
      title: "Tema de Interfaz",
      light: "Claro",
      dark: "Oscuro",
      system: "Sistema",
    },
    notifications: {
      title: "Configuración de Notificaciones",
      desktop: "Notificaciones de Escritorio",
      sound: "Sonido de Mensaje",
    },
    ai: {
      title: "Configuración del Modelo de IA",
      selectModel: "Seleccionar Modelo",
      localModelSettings: "Configuración del Modelo Local",
      localModelDirectory: "Directorio del Modelo Local",
      browse: "Explorar...",
      directoryHint:
        "Selecciona el directorio que contiene tus archivos de modelo LLM local",
      selectLocalModel: "Seleccionar Modelo Local",
      refresh: "Actualizar",
      temperature: "Temperatura",
      temperatureHint:
        "Valores más bajos hacen que las respuestas sean más enfocadas y deterministas, valores más altos hacen que las respuestas sean más creativas y variadas.",
      maxTokens: "Tokens Máximos",
      maxTokensHint:
        "Número máximo de tokens (piezas de palabras) para respuestas generadas.",
      streaming: "Habilitar Respuesta en Streaming",
      streamingHint:
        "Muestra el proceso de generación de respuesta de IA (efecto de escritura).",
    },
    buttons: {
      save: "Guardar Configuración",
      reset: "Restablecer a Predeterminados",
      start: "Iniciar Modelo",
      stop: "Detener Modelo",
    },
    errors: {
      modelStartFailed: "Error al iniciar el modelo: ",
    },
  },
  characters: {
    assistant: "Asistente",
    mathTutor: "Tutor de Matemáticas",
    fitnessCoach: "Entrenador de Fitness",
    travelAdvisor: "Asesor de Viajes",
  },
};
