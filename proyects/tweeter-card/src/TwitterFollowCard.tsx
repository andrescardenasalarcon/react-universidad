/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
export function TwitterFollowCard({ children, formatUserName, userName = "unknown", name, initialIsFollowing, }: any) {
  // MANEJO DE ESTADO PARA EL SEGUIR Y NO SEGUIR
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  console.log("Se renderizó tambien TwitterFollowCard");

  // const addAt = (userName:string) => `@${userName}`

  function switchNameChildren() {
    if (typeof name !== "undefined") {
      return name;
    } else {
      return children;
    }
  }
  const text = isFollowing ? "Siguiendo" : "Seguir";
  const buttonClassName = isFollowing
    ? "tw-followCard-button is-following"
    : "tw-followCard-button";

  const handleClick = () => {
    setIsFollowing(!isFollowing);
  };
  return (
    <article className="tw-followCard">
      <header className="tw-followCard-header">
        <img
          className="tw-followCard-avatar"
          src={`https://unavatar.io/${userName}`}
          alt="Persona avatar"
        />
        <div className="tw-followCard-info">
          <strong>{switchNameChildren()}</strong>
          <span className="tw-followCard-infoUserName">
            {formatUserName(userName)}
          </span>
        </div>
      </header>

      <aside>
        <button className={buttonClassName} onClick={handleClick}>
          <span className="tw-followCard-text">{text}</span>
          <span className="tw-followCard-stopFollow">Dejar de seguir</span>
        </button>
      </aside>
    </article>
  );
}
