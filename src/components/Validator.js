import React, {Component} from 'react';
import Unsplash from 'unsplash-js';
import cs from 'classnames';
import {getRandomInt} from '../helpers';
import '../App.css';

export default class Valid extends Component {

    state = {
        rulesValidate: 0,
        validate: [],
        images: [],
    };
    constructor(props) {
        super(props);

        this.unsplash = new Unsplash({
            applicationId: "96ecfabb47da1ff9c8946bb4208055b209772da32b2b05d271d3c23761acaecb",
            secret: "3f5b1997db9945143691d707235939211a1f46a4f82a223e51f9278e15c6ecf7",
            callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
        });


        this.handleClick = (index) => {
            return () => {
                this.setState((state) => {
                    return {
                        images: state.images.map((img, i) => {
                            if (i === index) {
                                img.active = !img.active;
                                img.key = i;
                                img.rotate = true;
                                // if (!state.validate.map((img) => img.key).includes(index)) {
                                    state.validate.push(img);
                                // }
                                if (!img.active) {
                                    state.validate = state.validate.filter((img) => img.key !== index);
                                }
                                setTimeout(() =>
                                    this.getImages().one(index)
                                , 0)
                            }
                            return img;
                        }),
                    };
                });
            };
        };

        this.handleLoadImage = (index) => {
            return () => {
                this.setState(state => {
                    return {
                        images: state.images.map((img) => {
                            if(img.key === index) {
                                img.load = true;
                            }
                            return img;
                        })
                    }
                })
            }
        }
    }

    componentDidMount() {
        this.getImages().list()
    }

    getImages() {
        const request = (count = 9, cb) => this.unsplash.search.photos("car", getRandomInt(1, 400), count)
            .then(res => res.json())
            .then(json => {
                !json.results.length && request(count, cb);
                cb(json)
            });

        return {
            list: () => request(9, (json) => this.setImages(json)),
            one: (index) => request(1, (json) => this.setImages(json, index)),
        }
    }

    setImages(json, index) {
        this.setState((state) => {
            return {
                images: json.results.reduce((init, img, key) => {
                    const validate = img.likes < 10;
                    if (validate) {
                        state.rulesValidate += 1;
                    }
                    if(index || index ===0 ) {
                        init[index] = {
                            scr: img.urls.small,
                            key,
                            active: false,
                            rotate: false,
                            load: false,
                            validate
                        };
                        return init;
                    }
                    init.push({
                        scr: img.urls.small,
                        key,
                        active: false,
                        load: false,
                        rotate: false,
                        validate
                    });
                    return init
                }, (typeof index !== "undefined" ? state.images : [] ))

            }
        })
    }

    get validate() {
        const validateArr = this.state.validate
            .map((img) => img.validate ? img.validate : false);
        console.log(validateArr, this.state.rulesValidate);
        return validateArr.compareAll() && validateArr.length === this.state.rulesValidate;
    }

    render() {
        return (
            <div className="Valid">
                <div className="BGColor">
                    Select ({this.state.rulesValidate}) correct images :)
                </div>
                <div className="WrapperValid">
                    {this.state.images.map((img, index) => {
                        return (
                            <img key={index}
                                 onClick={this.handleClick(index)} src={img.scr}
                                 className={cs({active: img.active, animate: img.validate, rotate: img.rotate}, 'img')} alt="validImg"
                                 onLoad={this.handleLoadImage(index)}
                            />
                        );
                    })}
                </div>
                <div className="BtnWrapper">
                    <ul className={'leftMenu'}>
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
                    <ul className={'rightMenu'}>
                        <li>
                            <button

                                disabled={!this.validate}
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
