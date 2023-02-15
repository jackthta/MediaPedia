import CSS from "./CardImage.module.scss";

type Props = {
  className?: string;
  interactable?: boolean;

  [attribute: string]: any;
};

const DefaultProps: Props = {
  className: "",
  interactable: true,
};

const CardImage: React.FC<Props> = ({
  className,
  interactable,
  ...rest
}: Props) => {
  return (
    <img
      className={`${CSS.image} ${className} ${
        interactable && CSS.interactable
      }`}
      {...rest}
    />
  );
};

CardImage.defaultProps = DefaultProps;

export default CardImage;
