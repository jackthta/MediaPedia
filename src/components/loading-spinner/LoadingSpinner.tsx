import CSS from "./LoadingSpinner.module.scss";

function LoadingSpinner() {
  return <div className={CSS.spinner} role="presentation"></div>;
}

export default LoadingSpinner;
