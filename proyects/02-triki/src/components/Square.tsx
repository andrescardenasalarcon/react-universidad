/* eslint-disable @typescript-eslint/no-explicit-any */
//Componente
export const Square = ({ children, isSelected, updateBoard, index }: any) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};
