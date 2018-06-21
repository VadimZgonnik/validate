import React, {Component} from "react";
import cs from "classnames";

class ImageItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {index, img} = this.props;
        return (
            <img onClick={this.props.handlerClick(index)} src={img.scr}
                 className={cs({active: img.active, animate: img.valid, rotate: img.rotate}, 'img')}
                 alt="validImg"
                 onLoad={this.props.handleLoaderImage(index)}
            />
        )
    }
}

export default ImageItem;
