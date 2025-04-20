export default {
  app: {
    title: "Electron React App",
  },
  chat: {
    title: "Assistant de Discussion",
    placeholder: "Tapez un message...",
    send: "Envoyer",
    sending: "Envoi en cours...",
    copy: "Copier",
    copied: "Copié",
    regenerate: "Régénérer",
    regenerating: "Régénération...",
    welcomeMessages: {
      assistant:
        "Bonjour ! Je suis votre assistant IA local. Je suis là pour vous aider avec toutes vos questions ou problèmes. Comment puis-je vous aider aujourd'hui ?",
      math: "Bonjour ! Je suis votre tuteur de mathématiques, spécialisé dans l'explication des concepts mathématiques et la résolution de problèmes mathématiques. Besoin d'aide en mathématiques ?",
      fitness:
        "Salut ! Je suis votre coach de fitness, proposant des conseils sur l'alimentation saine et les routines d'exercice. Vous souhaitez commencer un programme de fitness ou avez-vous des questions de santé ?",
      travel:
        "Bonjour ! Je suis votre conseiller en voyages, expert en recommandation de destinations, planification d'itinéraires et conseils de voyage. Vous prévoyez de voyager quelque part ?",
    },
  },
  settings: {
    title: "Paramètres Utilisateur",
    backToChat: "← Retour au Chat",
    saved: "Paramètres enregistrés avec succès !",
    userName: "Nom d'utilisateur",
    userNamePlaceholder: "Entrez votre nom d'utilisateur",
    avatar: "Photo de Profil",
    changeAvatar: "Changer d'Avatar",
    language: "Langue",
    languageHint:
      "Définit la langue d'affichage de l'application. Redémarrage nécessaire pour un effet complet.",
    theme: {
      title: "Thème d'Interface",
      light: "Clair",
      dark: "Sombre",
      system: "Système",
    },
    notifications: {
      title: "Paramètres de Notification",
      desktop: "Notifications Bureau",
      sound: "Son des Messages",
    },
    ai: {
      title: "Paramètres du Modèle IA",
      selectModel: "Sélectionner un Modèle",
      localModelSettings: "Paramètres du Modèle Local",
      localModelDirectory: "Répertoire du Modèle Local",
      browse: "Parcourir...",
      directoryHint:
        "Sélectionnez le répertoire contenant vos fichiers de modèle LLM local",
      selectLocalModel: "Sélectionner un Modèle Local",
      refresh: "Actualiser",
      temperature: "Température",
      temperatureHint:
        "Des valeurs plus basses rendent les réponses plus ciblées et déterministes, des valeurs plus élevées les rendent plus créatives et variées.",
      maxTokens: "Jetons Max",
      maxTokensHint:
        "Nombre maximum de jetons (morceaux de mots) pour les réponses générées.",
      streaming: "Activer la Réponse en Streaming",
      streamingHint:
        "Affiche le processus de génération de réponse IA (effet de frappe).",
    },
    buttons: {
      save: "Enregistrer les Paramètres",
      reset: "Réinitialiser par Défaut",
      start: "Démarrer le Modèle",
      stop: "Arrêter le Modèle",
    },
    errors: {
      modelStartFailed: "Échec du démarrage du modèle : ",
    },
  },
  characters: {
    assistant: "Assistant",
    mathTutor: "Tuteur de Maths",
    fitnessCoach: "Coach Fitness",
    travelAdvisor: "Conseiller Voyage",
  },
};
