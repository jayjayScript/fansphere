"use client";
import { useEffect } from "react";

const TawkToChat = () => {
  // const [isChatLoaded, setIsChatLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/67900ef8825083258e08baa1/1ii7kv3c7"; // Use your actual Tawk.to embed code
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    script.onload = () => {
      console.log("Tawk.to script loaded successfully!");
      // setIsChatLoaded(true);

      // Maximize the chat widget on load
      // if (window.Tawk_API) {
      //   window.Tawk_API.maximize();
      // }
    };

    script.onerror = () => {
      console.error("Failed to load Tawk.to script!");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // const toggleChat = () => {
  //   if (window.Tawk_API) {
  //     window.Tawk_API.toggle();
  //   }
  // };

  return (
    <div>
      {/* {isChatLoaded && (
        <button onClick={toggleChat} style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}>
          Toggle Chat
        </button>
      )} */}
    </div>
  );
};

export default TawkToChat;