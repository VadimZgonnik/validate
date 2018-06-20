import React, {Component} from 'react';
import '../App.css';

export default class Valid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rulesValidate: 3,
            images: [
                //1
                {
                    scr: 'https://source.unsplash.com/random/300x400',
                    active: false,
                    validate: true,
                },
                //2
                {
                    scr: 'https://source.unsplash.com/random/300x400',
                    active: false,
                },
                //3
                {
                    scr: 'https://source.unsplash.com/random/300x400',
                    active: false,
                    validate: true,
                },
                //4
                {
                    scr: 'https://source.unsplash.com/random/300x400',
                    active: false,
                },
                //5
                {
                    scr: 'https://source.unsplash.com/random/300x400',
                    active: false,
                },
                //6
                {
                    scr: 'https://source.unsplash.com/random/300x400',
                    active: false,
                },
                //7
                {
                    scr: 'https://source.unsplash.com/random/300x400',
                    active: false,
                },
                //8
                {
                    scr: 'https://source.unsplash.com/random/300x400',
                    active: false,
                },
                //9
                {
                    scr: 'https://source.unsplash.com/random/300x400',
                    active: false,
                    validate: true,
                },
            ],
            newArr: [],
        };
        this.handleClick = (index) => {
            return () => {
                this.setState((state) => {
                    return {
                        images: state.images.map((img, i) => {
                            if (i === index) {
                                img.active = !img.active;
                                if (img.active && !img.checker) {
                                    img.checker = true;
                                    console.log(state.newArr.push(img));
                                }
                                // if (!img.active && img.checker) {
                                //     // console.log(state.newArr.indexOf(img));
                                //     console.log(state.newArr = state.newArr.slice(state.newArr.indexOf(img), 1));
                                // }
                            }
                            return img;
                        }),
                    }
                })
            }
        }
    }

    get validate() {
        return this.state.newArr.map((img) => img.validate || false) && this.state.newArr.length !== 3 && this.state.newArr.map((img) => img.checker  )
    }

    render() {
        console.log(this.state.newArr);
        return (
            <div className="Valid">
                <div className="BGColor">
                    Select all images with <b>BMW</b>
                </div>
                <div className="WrapperValid">
                    {this.state.images.map((img, index) => {
                        return (
                            <img key={index} onClick={this.handleClick(index)} src={img.scr}
                                 className={img.active ? 'active' : ''} alt="validImg" id={'falseImg'}/>
                        )
                    })}
                </div>
                <div className="BtnWrapper">
                    <ul className={"leftMenu"}>
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
                    <ul className={"rightMenu"}>
                        <li>
                            <button
                                disabled={this.validate}
                                onClick={() => {
                                    alert('ok')
                                }}>Verify
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
