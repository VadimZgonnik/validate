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
            applicationId: "72cec61b163f54ca8ccbbf254795e472f2bf5c38194b19fb095b46b3fa84254e",
            secret: "6634e48c3866a8e50e674bce20e860c22cac6bdb9eebacd0baa7d02b00d03e5e",
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
            <div className="Valid">
                <div className="BGColor">
                    Select ({this.state.rulesvalid}) correct images :)
                </div>
                <div className="WrapperValid">
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
                <div className="BtnWrap">
                    <ul className={'leftMnu'}>
                        <li><a><img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGESURBVDhPrdS/K0ZRHMfxw+BHlIWkZMJmsTGwyEDJhFiESRktZDCIMlhNiIg8RRZ/ASKLJKVsWIhBkR/h/TnPPbqu5173ufnUq+d+z73ndM9z7jkmJMXoxxYu8YQ7nGAeTchFrAzhBp9/2EcdQpOHBbgOz9jEMDrQi3Ecwz3zih4omlFr+jKdRbgHN1CJsDTjAnr2HUv4wCxsBuEGm1RDjJTgEK6frMIUwf1nmmIO4mYU/gF3YOeuQisZNc1guqFp+gdch9n2ipSKLFIDLdgU5jCDNtjvTAPq5r9En4cG7LRV8pR5v+YeGrDLVsniFmdExZlXjKlImCNoDP2fdm+q0FZKkgq8QWO0q6HFK0SbPttod6jvLQrVoA9Zb6fGc2gHxE0D3NtNqMGlHi/QjT18r1hEGvEA9TlFPn6kD+7Lv8IAChBMOTRN92bXqEbG6Ft8hB4UXe9Cx9oyDqDTxd3XgVuLyFRhBf6OQTq9dTZmmkFoSqGDQ/t0DXrDaWi/2tX8HWO+AEkFfjc30QEBAAAAAElFTkSuQmCC"
                            alt=""/></a></li>
                        <li><a><img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADpSURBVEhL7ZJLDgFBFEXbWFgFY2zAQHwSaxILYQliC4RFYMwIISLmnNupSjqdlOpniJOcpKtyb73uSic/QR8nuMOHc+v2evgxdVzhM+ISa2iijVfUASccYQvLTj1r74zKXFCdQuhtbqjiDCsYoopz9EMKfcka/eElbURQxg9ZaOMdXVTwiO/ePI++xF9XRxshpqiQ7tfKGNXV3xVEv6JCjXRlo4nqbtJVgDsqZLkejzrq6owgCshPifb/AwoPyBrD1DGFHaaOKewwdUxhh6ljCjtMnQMWDjvy+T0GGWJ+SIxsVocP8GtIkhffF4WSerMOagAAAABJRU5ErkJggg=="
                            alt=""/></a></li>
                        <li><a><img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHTSURBVEhLxZXPL1xRFMeHKk2oqh/dVEJCIn50041E2CDR9p+wYSMWFn5UrVqJ2AlJm3RJsCZEBBuWNMJG6KKCprUTthZ8vve8aZjemfdeIvFJPsk5NzPvzNx77nmJmORgloUPQwX24xb+xcvA37iE3ViEsSnGSTzDcWzCfEyih77D7/gHBzAXI9GAP3EMC7QQwmucQ/3LMi1k4g2e4geXxaMPD/GlyzyU4BGme3gpzuMU6rB9DOMGZrssBe35qIVehvAmsEMLHtRhq9jpsjtUog70ucv8NOIVagtfaSEN9fgLn7osQK2obglDnfLEwoysYauFxiaqFR+KXpyw0DjHu33u4wK1/ycuy0wLrlhoHaHbGcYLjFqgGncttJPX4YURp0AN7lhoqIPSXpCAOAV0wAsWGsv43sK0xCkwgl8sNLpQgysTcQps41sLDU1PjeByl/mJWqAdf+B/741BnLXQyzGqwDX+a8EU8nAf21yWgm6pRq6mog81QdJCLXiYxq8W+tE8P8CPGOfV+AxnUIPu3gzyofNYR324TgshaM/38BuGPjyJ5rlGrvZdxXqwGauwFtXnn1CXSTfWu+dR0BjRlzW4dFf0S9WCi/gZ77XiI5BI3AIFGFZRXkSxuAAAAABJRU5ErkJggg=="
                            alt=""/></a></li>
                        <a>Report a problem</a>
                    </ul>
                    <ul className={'rightMnu'}>
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
