import { useState } from "react";
import "./App.css";
import { TwitterFollowCard } from "./TwitterFollowCard";
export function App() {

  const [name, isName] = useState('midudev');
  console.log('render app: ' + name);
  
  const format = (userName:string) => `@${userName}`;

  //Al usarlo asi: pilas con el orden de los atributos ya que si es dependiente de otro como la fun 'format' de 'userName' se totea "no es buena practica"
  const afca = { userName:'afca', initialIsFollowing: false, formatUserName:format};

  //Renderizado de listas
  const users = [
    {
      userName: 'juanpa',
      name: 'Juan P',
      isFollowing: false
    },
    {
      userName: 'luisfelipe',
      name: 'LuisP',
      isFollowing: true
    }
  ];
  return (
    // Que es lo mismo quer verlo de <> --> React.Frafment
    // <>
    //   <TwitterFollowCard userName="midudev" name="Migel Angel" />
    //   <TwitterFollowCard userName="pherakb" name="Pablo Hernandes" />
    //   <TwitterFollowCard userName="vxnder" name="Vanderhard" />
    // </>

    //Enviamos funciones como parametros para que en TwitterCard las ejecute
    //Si colocamos el format() asi, ejecutando y enviando el resultado de la funcion , pero la idea es que se ejecute al otro lado
    <section className="App">
      <TwitterFollowCard formatUserName={format} initialIsFollowing={true} userName={name} name="Migel Angel" />
      <TwitterFollowCard formatUserName={format} initialIsFollowing userName="pherakb" name="Pablo Hernandes" />
      <TwitterFollowCard formatUserName={format} initialIsFollowing={false} userName="vxnder" name="Vanderhard" />
      {/* En especial para este vamos a usar el prop 'childen' en el componente TwitterFollowCard para traer el nombre que esta envuelto de manera implicita */}
      <TwitterFollowCard formatUserName={format} initialIsFollowing={false} userName="vxnder"><i>Andres Cardenas</i></TwitterFollowCard>
      <TwitterFollowCard formatUserName={format} initialIsFollowing={false} userName="vxnder"></TwitterFollowCard>
      <TwitterFollowCard {...afca}>AFCA</TwitterFollowCard>
      
      <button onClick={()=>isName('Cardenitass')}>Cambio nombre</button>

      {
        users.map(({userName, name, isFollowing}) => (
            <TwitterFollowCard 
            key={userName}
            formatUserName={format}
            userName={userName} 
            initialIsFollowing={isFollowing}
            >
              {name}
            </TwitterFollowCard>
        ))
      }
    </section>
  );
}
