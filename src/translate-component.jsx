import { useEffect, useState } from "react";
import { translateText } from "./translateService";

export default function TranslateComponent(props) {
  const { text } = props;
  const [translatedText, setTranslatedText] = useState("");
  const [language, setlanguage] = useState(localStorage.getItem("language"));

  useEffect(() => {
    if (language != null && language == "sr") {
      (async () => {
        const result = await translateText(text, "sr");
        setTranslatedText(result);
      })();
    } else {
      setTranslatedText(text);
    }
  }, []);
  return <>{translatedText}</>;
}
