export default {
  app: {
    title: "Electron React App",
  },
  chat: {
    title: "Chat-Assistent",
    placeholder: "Nachricht eingeben...",
    send: "Senden",
    sending: "Sende...",
    copy: "Kopieren",
    copied: "Kopiert",
    regenerate: "Neu generieren",
    regenerating: "Generiere neu...",
    welcomeMessages: {
      assistant:
        "Hallo! Ich bin Ihr lokaler KI-Assistent. Ich bin hier, um Ihnen bei allen Fragen oder Problemen zu helfen. Wie kann ich Ihnen heute helfen?",
      math: "Hallo! Ich bin Ihr Mathe-Tutor, spezialisiert auf das Erklären mathematischer Konzepte und das Lösen mathematischer Probleme. Brauchen Sie Hilfe bei Mathematik?",
      fitness:
        "Hallo! Ich bin Ihr Fitness-Coach und biete Ratschläge zu gesunder Ernährung und Trainingsroutinen. Möchten Sie einen Fitnessplan beginnen oder haben Sie Fragen zur Gesundheit?",
      travel:
        "Hallo! Ich bin Ihr Reiseberater, gut darin, Reiseziele zu empfehlen, Reiserouten zu planen und Reiseratschläge zu geben. Planen Sie eine Reise?",
    },
  },
  settings: {
    title: "Benutzereinstellungen",
    backToChat: "← Zurück zum Chat",
    saved: "Einstellungen erfolgreich gespeichert!",
    userName: "Benutzername",
    userNamePlaceholder: "Geben Sie Ihren Benutzernamen ein",
    avatar: "Profilbild",
    changeAvatar: "Avatar ändern",
    language: "Sprache",
    languageHint:
      "Legt die Anzeigesprache für die Anwendung fest. Neustart erforderlich für vollständige Wirkung.",
    theme: {
      title: "Oberflächendesign",
      light: "Hell",
      dark: "Dunkel",
      system: "System",
    },
    notifications: {
      title: "Benachrichtigungseinstellungen",
      desktop: "Desktop-Benachrichtigungen",
      sound: "Nachrichtenton",
    },
    ai: {
      title: "KI-Modelleinstellungen",
      selectModel: "Modell auswählen",
      localModelSettings: "Lokale Modelleinstellungen",
      localModelDirectory: "Lokales Modellverzeichnis",
      browse: "Durchsuchen...",
      directoryHint:
        "Wählen Sie das Verzeichnis mit Ihren lokalen LLM-Modelldateien",
      selectLocalModel: "Lokales Modell auswählen",
      refresh: "Aktualisieren",
      temperature: "Temperatur",
      temperatureHint:
        "Niedrigere Werte machen Antworten fokussierter und deterministischer, höhere Werte machen Antworten kreativer und vielfältiger.",
      maxTokens: "Max. Tokens",
      maxTokensHint:
        "Maximale Anzahl von Tokens (Wortteilen) für generierte Antworten.",
      streaming: "Streaming-Antwort aktivieren",
      streamingHint: "Zeigt den KI-Antwortgenerierungsprozess an (Tippeffekt).",
    },
    buttons: {
      save: "Einstellungen speichern",
      reset: "Auf Standard zurücksetzen",
      start: "Modell starten",
      stop: "Modell stoppen",
    },
    errors: {
      modelStartFailed: "Modellstart fehlgeschlagen: ",
    },
  },
  characters: {
    assistant: "Assistent",
    mathTutor: "Mathe-Tutor",
    fitnessCoach: "Fitness-Coach",
    travelAdvisor: "Reiseberater",
  },
};
