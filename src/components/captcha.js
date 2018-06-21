import React, {Component} from 'react';
import Unsplash from 'unsplash-js';
import cs from 'classnames';
import '../App.css';
import ImageItem from './image.item'

export default class Captcha extends Component {

    state = {
        rulesValid: 0,
        valid: [],
        images: [],
    };

    constructor(props) {
        super(props);

        this.unsplash = new Unsplash({
            applicationId: "e622d1f39ca4b655729e04fd47f42a7263208c1ab1b198317405e0394a596c56",
            secret: "26128d4c04ebe228c9a40de6980a4f2c39ba977f3acc80df484a27cb8d187d3e",
            callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
        });

        this.handlerClick = (index) => {
            return () => {
                console.log(this.state, '<<<<<');
                this.setState((state) => {
                    return {
                        images: state.images.map((img, i) => {
                            if (i === index) {
                                img.active = !img.active;
                                img.index = i;
                                img.rotate = true;
                                state.valid.push(img);
                                if (!img.active) {
                                    state.valid = state.valid.filter((img) => img.key !== index);
                                }
                                setTimeout(() =>
                                        this.getGallery().one(index)
                                    , 0)
                            }
                            return img;
                        }),
                    };
                });
            };
        };

        this.handleLoaderImage = (index) => {
            return () => {
                this.setState((state) => {
                    return {
                        images: state.images.map((img) => {
                            if (img.key === index) {
                                img.loader = true;
                            }
                            return img;
                        })
                    }
                })
            }
        }
    }

    componentDidMount() {
        this.getGallery().list()
    }

    random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getGallery() {
        const request = (count = 9, cb) => this.unsplash.search.photos("car", this.random(1, 400), count)
            .then(res => res.json())
            .then(json => {
                !json.results.length && request(count, cb);
                cb(json)
            });

        return {
            list: () => request(9, (json) => this.setGallery(json)),
            one: (index) => request(1, (json) => this.setGallery(json, index)),
        }
    }

    setGallery(json, index) {
        this.setState((state) => {
            return {
                images: json.results.reduce((init, img, key) => {
                    const valid = this.random(1, 100) < 40;
                    if (valid) {
                        state.rulesValid += 1;
                    }
                    if (index || index === 0) {
                        init[index] = {
                            scr: img.urls.small,
                            index,
                            active: false,
                            rotate: false,
                            loader: false,
                            valid
                        };
                        return init;
                    }
                    init.push({
                        scr: img.urls.small,
                        index,
                        active: false,
                        loader: false,
                        rotate: false,
                        valid
                    });
                    return init
                }, (typeof index !== "undefined" ? state.images : []))

            }
        })
    }
    compare( arr) {
        let all = true;
        arr.map(e => {if(!e) {all = false; return;}});
        return all;
    }
    get valid() {
        const newValidArr = this.state.valid
            .map((img) => img.valid ? img.valid : false);
        console.log(newValidArr, this.state.rulesValid);
        return  this.compare(newValidArr)&& newValidArr.length === this.state.rulesValid;
    }

    render() {
        return (
            <div className={"valid"}>
                <div className={"text-valid-wrapper"}>
                    Select ({this.state.rulesValid}) correct images :)
                </div>
                <div className={"wrapper-valid"}>
                    {this.state.images.map((img, index) => {
                        return (
                            <ImageItem key={index}
                                       img={img}
                                       handleLoaderImage={this.handleLoaderImage}
                                       handlerClick={this.handlerClick}
                            />
                        );
                    })}
                </div>
                <div className={"btn-wrap"}>
                    <ul className={'left-mnu'}>
                        <li><a><img src="./images/restartFilled.svg" alt=""/></a></li>
                        <li><a><img src="./images/info.svg" alt=""/></a></li>
                        <li><a><img src="./images/headphones-silhouette.svg" alt=""/></a></li>
                        <a>Report a problem</a>
                    </ul>
                    <ul className={'right-mnu'}>
                        <li>
                            <button

                                disabled={!this.valid}
                                onClick={() => {
                                    this.props.onValidate('ok')
                                }}>Verify
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
};
