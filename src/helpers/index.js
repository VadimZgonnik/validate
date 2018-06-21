/*eslint-disable */
Array.prototype.compareAll = function() {
    let all = true;
    this.map(e => {
        if(!e) {
            all = false;
            return;
        }
    });
    return all;
};
/* eslint-enable */

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}