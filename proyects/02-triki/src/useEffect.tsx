/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react"

export const Component = () => {
    const [value,  setValue] = useState(false);
    
    // 
    useEffect(() => {
        // codeToExecute
        // como minimo esto se ejecutara una vez si o si
        console.log("El codigo a ejecutar");
        
    }, 
    // si se envia un objeto, es para que cuando cambie ese obj, ejecute el codigo del efecto
    // listOfDependecies [] "opcional"
    );

    // En caso de no pasar la listaOfDependecies 
    useEffect(() => {
        // codeToExecute
        // el codigo a ejecutar se renderizara cada vez que se renderice el componente o la pag
        console.log("UseEffect");
    }, 
    
    );

}   