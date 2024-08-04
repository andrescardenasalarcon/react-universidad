import { useEffect, useState } from "react";
const CAT_PREFIXTER_IMAGE_URL = `https://cataas.com/cat/`;

//Custom Hooks NOTA: Siempre comienzan con useXxxxXxx
export function useCatImage({ fact }: any) {
  const [imageUrl, setImageUrl] = useState();

  //para recuperar la imagen cada vez que hay una cita nueva
  useEffect(() => {
    if (!fact) return; // si fact es vasio break

    const firstWord = fact.split(" ", 3).join(",").replace(/,,/g, ","); //--> remueve si encientra doble ",," en el texto
    console.log(firstWord);

    fetch(
      `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Error trayendo el fact");
        return res.json();
      })
      .then((response) => {
        const { _id } = response;
        setImageUrl(_id);
      })
      .catch(() => {
        throw new Error("Error en la petición");
      });

    return () => { };
  }, [fact]);

  return { imageUrl: `${CAT_PREFIXTER_IMAGE_URL}${imageUrl}` };
}