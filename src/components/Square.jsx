export const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `w-28 h-28 border rounded-md grid place-items-center cursor-pointer text-5xl ${
    isSelected ? "bg-sky-400" : ""
  }`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
};
