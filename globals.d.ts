interface EventData {
  [key: string]: string | number | boolean; // Example structure
}

interface Window {
  Tawk_API?: {
    maximize: () => void;
    minimize: () => void;
    hideWidget: () => void;
    toggle: () => void;
    popup: () => void;
    setAttributes: (attributes: { name?: string; email?: string }) => void;
    addEvent: (event: string, data: EventData) => void;
    // Add other methods you plan to use
  };
}

declare namespace google {
  namespace accounts {
    namespace id {
      interface CredentialResponse {
        credential: string;
      }
    }
  }
}