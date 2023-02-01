import CSS from "./CardImage.module.scss";

type Props = {
  className?: string;

  [attribute: string]: any;
};

function CardImage({ className, ...rest }: Props) {
  return <img className={`${CSS.image} ${className}`} {...rest} />;
}

export default CardImage;
