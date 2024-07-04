import React from "react";
interface ScrollItemProps {
  content?: string;
}

const ScrollItem: React.FC<ScrollItemProps> = ({ content }) => {
  return (
    <div className="scroll-item inline-block mr-2 bg-red-500 text-center">
      {content}
    </div>
  );
};

export default ScrollItem;
