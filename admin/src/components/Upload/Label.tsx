import { useState } from "react";
import * as S from "./styles";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = ({ children, ...props }: LabelProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const dragHandler = (isOver: boolean) => (e: React.DragEvent) => {
    setIsDragOver(isOver);
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <S.Label
      {...props}
      onDragOver={dragHandler(true)}
      onDragLeave={dragHandler(false)}
      isOver={isDragOver}
    >
      {children}
    </S.Label>
  );
};
