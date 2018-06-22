import cs from 'classnames';
import React, {Component} from 'react';

class ImageItem extends Component {

    render() {
        const {img} = this.props;
        return (
            <img onClick={this.props.handlerClick(img.position)} src={img.scr}
                 className={cs({active: img.active, animate: img.valid, rotate: img.rotate}, 'img')}
                 alt="validImg"
                 onLoad={this.props.handleLoaderImage(img.position)}
            />
        );
    }
}

export default ImageItem;
