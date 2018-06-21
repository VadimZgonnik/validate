import React, {Component} from 'react';
import Unsplash from 'unsplash-js';
import cs from 'classnames';
import '../App.css';

export default class Valid extends Component {

    state = {
        rulesvalid: 0,
        valid: [],
        images: [],
    };

    constructor(props) {
        super(props);

        this.unsplash = new Unsplash({
            applicationId: "abdd14abf697b5ce6740d9accd3f34d37ee95431fbc18a536005b6d30c452975",
            secret: "26aa8db54225fe8e7e85425b08471d50716879a3ecb55c3c1ea57cb7bbc0d3b2",
            callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
        });


        this.handlerClick = (index) => {
            return () => {
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

        this.handleloaderImage = (index) => {
            return () => {
                this.setState(state => {
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

    Randomaiz(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getGallery() {
        const request = (count = 9, cb) => this.unsplash.search.photos("car", this.Randomaiz(1, 400), count)
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
                    const valid = this.Randomaiz(1, 100) < 40;
                    if (valid) {
                        state.rulesvalid += 1;
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
    compaere( arr) {
        let all = true;
        arr.map(e => {if(!e) {all = false; return;}});
        return all;
    }
    get valid() {
        const newValidArr = this.state.valid
            .map((img) => img.valid ? img.valid : false);
        console.log(newValidArr, this.state.rulesvalid);
        return  this.compaere(newValidArr)&& newValidArr.length === this.state.rulesvalid;
    }

    render() {
        return (
            <div className={"valid"}>
                <div className={"text-valid-wrapper"}>
                    Select ({this.state.rulesvalid}) correct images :)
                </div>
                <div className={"wrapper-valid"}>
                    {this.state.images.map((img, index) => {
                        return (
                            <img key={index}
                                 onClick={this.handlerClick(index)} src={img.scr}
                                 className={cs({active: img.active, animate: img.valid, rotate: img.rotate}, 'img')}
                                 alt="validImg"
                                 onLoad={this.handleloaderImage(index)}
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
