import React from "react";
import ScrollItem from "./ScrollItem";

const HorizontalScroll: React.FC = () => {
  const items: JSX.Element[] = [];
  const numberOfItems = 10; // Defina o número de itens que deseja criar

  for (let i = 1; i <= numberOfItems; i++) {
    // items.push(<ScrollItem key={i} content={`Item ${i}`} />);
    items.push(<ScrollItem key={i} content={"Hello World " + i} />);
  }

  return (
    <div className="horizontal-scroll w-full overflow-x-auto whitespace-nowrap">
      <div className="scroll-content inline-block">{items}</div>
    </div>
  );
};

export default HorizontalScroll;
