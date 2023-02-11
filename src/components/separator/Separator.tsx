import React from "react";

import CSS from "./Separator.module.scss";

type Props = {
  className?: string;
  inMenuDialog?: boolean;
};

const DefaultProps = {
  className: "",
  inMenuDialog: false,
};

const Separator: React.FC<Props> = ({ className, inMenuDialog }: Props) => {
  const CSS_separator = inMenuDialog ? CSS.menuDialogSeparator : CSS.separator;
  return (
    <hr
      className={`${CSS.base} ${CSS_separator} ${className}`}
      aria-hidden="true"
    />
  );
};

Separator.defaultProps = DefaultProps;

export default Separator;
