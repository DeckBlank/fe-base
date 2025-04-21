// import Icon from "../icon";
import { ICardFlow } from "./props";
import "./styles.scss";

const CardFlow = ({
  children,
  title,
  description,
  iconList,
  iconName,
  iconSize,
  bgPrimary,
  bgSecondary,
  onClick,
  url,
}: ICardFlow) => {
  const onRedirect = () => {
    window.location.href = url;
  };
  return (
    <div className="cardFlow" onClick={url == null ? onClick : onRedirect}>
      <div className={`cardFlow_principal ${bgPrimary}`}>
        {/* <Icon
          list={iconList}
          name={iconName}
          className="cardFlow_principal__icon"
        ></Icon> */}
        <span className="cardFlow_principal__title">{title}</span>
      </div>
      <div className={`cardFlow_secondary ${bgSecondary} `}>
        <span className="cardFlow_secondary__description">{description}</span>
      </div>
    </div>
  );
};

export default CardFlow;
