export default {
  app: {
    title: "Electron React App",
  },
  chat: {
    title: "Assistente di Chat",
    placeholder: "Scrivi un messaggio...",
    send: "Invia",
    sending: "Invio in corso...",
    copy: "Copia",
    copied: "Copiato",
    regenerate: "Rigenera",
    regenerating: "Rigenerazione in corso...",
    welcomeMessages: {
      assistant:
        "Ciao! Sono il tuo assistente AI locale. Sono qui per aiutarti con qualsiasi domanda o problema tu possa avere. Come posso aiutarti oggi?",
      math: "Ciao! Sono il tuo tutor di matematica, specializzato nella spiegazione di concetti matematici e nell'aiuto a risolvere problemi matematici. Hai bisogno di aiuto con la matematica?",
      fitness:
        "Ciao! Sono il tuo coach di fitness, che offre consigli su alimentazione sana e routine di esercizio. Vuoi iniziare un piano di fitness o hai domande sulla salute?",
      travel:
        "Ciao! Sono il tuo consulente di viaggio, bravo a consigliare destinazioni, pianificare itinerari e fornire consigli di viaggio. Stai pianificando di viaggiare da qualche parte?",
    },
  },
  settings: {
    title: "Impostazioni Utente",
    backToChat: "← Torna alla Chat",
    saved: "Impostazioni salvate con successo!",
    userName: "Nome Utente",
    userNamePlaceholder: "Inserisci il tuo nome utente",
    avatar: "Immagine del Profilo",
    changeAvatar: "Cambia Avatar",
    language: "Lingua",
    languageHint:
      "Imposta la lingua di visualizzazione per l'applicazione. Riavvio richiesto per effetto completo.",
    theme: {
      title: "Tema dell'Interfaccia",
      light: "Chiaro",
      dark: "Scuro",
      system: "Sistema",
    },
    notifications: {
      title: "Impostazioni Notifiche",
      desktop: "Notifiche Desktop",
      sound: "Suono Messaggi",
    },
    ai: {
      title: "Impostazioni Modello AI",
      selectModel: "Seleziona Modello",
      localModelSettings: "Impostazioni Modello Locale",
      localModelDirectory: "Directory Modello Locale",
      browse: "Sfoglia...",
      directoryHint:
        "Seleziona la directory che contiene i file del modello LLM locale",
      selectLocalModel: "Seleziona Modello Locale",
      refresh: "Aggiorna",
      temperature: "Temperatura",
      temperatureHint:
        "Valori più bassi rendono le risposte più concentrate e deterministiche, valori più alti le rendono più creative e varie.",
      maxTokens: "Token Massimi",
      maxTokensHint:
        "Numero massimo di token (pezzi di parole) per le risposte generate.",
      streaming: "Abilita Risposta in Streaming",
      streamingHint:
        "Mostra il processo di generazione della risposta AI (effetto digitazione).",
    },
    buttons: {
      save: "Salva Impostazioni",
      reset: "Ripristina Predefiniti",
      start: "Avvia Modello",
      stop: "Ferma Modello",
    },
    errors: {
      modelStartFailed: "Avvio del modello fallito: ",
    },
  },
  characters: {
    assistant: "Assistente",
    mathTutor: "Tutor di Matematica",
    fitnessCoach: "Coach di Fitness",
    travelAdvisor: "Consulente di Viaggio",
  },
};
