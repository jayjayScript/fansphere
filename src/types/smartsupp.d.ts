interface SmartsuppFunction {
    // Core function commands
    (command: `chat:${'open'|'close'|'show'|'hide'|'destroy'}`): void;
    (command: 'chat:message', data: { text: string }): void;
    
    // Other possible commands
    (command: string, ...args: unknown[]): void;
  }
  
  interface SmartsuppObject {
    // Initialization method
    init?: (options: {
      key: string;
      [option: string]: unknown;
    }) => void;
    
    // Direct API methods
    chat?: {
      open: () => void;
      close: () => void;
      send: (message: string) => void;
    };
    
    // Events API
    on?: (event: string, callback: (...args: unknown[]) => void) => void;
    
    // Other dynamic properties
    [key: string]: unknown;
  }
  
  type Smartsupp = SmartsuppFunction & SmartsuppObject;
  
  declare global {
    interface Window {
      smartsupp?: Smartsupp;
    }
  }