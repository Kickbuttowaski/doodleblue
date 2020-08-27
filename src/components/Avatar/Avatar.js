import React from "react";
import style from "./Avatar.module.css";
import { PropTypes } from "prop-types";

class Avatar extends React.PureComponent {
  returnColor() {
    const color = [
      "#a3a398",
      "#b7a1f9",
      "#40a78c",
      "#D0EAF1",
      "#8FBCBC",
      "#cbcef9",
      "#76a5b4",
      "#5b9d60",
      "#B1DC88",
    ];
    return color[Math.floor(Math.random() * color.length)];
  }
  returnNode() {
    const { text, size } = this.props;
    let displayText = text.split(" ");
    let formatedText =
      displayText[0][0].toUpperCase() +
        (displayText[1] && displayText[1][0].toUpperCase()) || "";

    return (
      <div
        className={style["avatar"]}
        style={{
          width: size,
          height: size,
          backgroundColor: this.returnColor(),
          lineHeight: size,
        }}
      >
        {formatedText}
      </div>
    );
  }

  render() {
    return this.returnNode();
  }
}

export default Avatar;

Avatar.defaultProps = {
  imageUrl: "",
  size: "24px",
};
Avatar.propTypes = {
  imageUrl: PropTypes.string,
  text: PropTypes.string,
  size: PropTypes.string,
};
