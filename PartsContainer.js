/**
 * creep parts container model 
 * @class 
 */
class PartsContainer {
    /**
     * @var {Array} Parts The parts in the container 
     */
    get Parts() {
        return this._parts;
    }

    get PartsArray() {

    }

    /**
     * @var {number} The cost of the parts in the container 
     */
    get Cost() {
        return this._cost || 0;
    }

    /**
     * Create a parts container 
     * @param {Array} parts The parts the container should have in it
     * @constructor 
     */
    constructor(parts) {
        this._partPriceMap = {
            [TOUGH]: 10,
            [MOVE]: 50,
            [CARRY]: 50,
            [ATTACK]: 80,
            [WORK]: 100,
            [RANGED_ATTACK]: 150,
            [HEAL]: 200,
            [CLAIM]: 600
        };

        this._parts = (parts instanceof Array) ? parts : [];
        this._priceParts();
    }

    /**
     * Add a part to the container 
     * @param {number} part The part to add 
     */
    addPart(part) {
        this.Parts.push(part);
        this._priceParts();
    }

    /**
     * Price the parts in the container and update the cost 
     */
    _priceParts() {
        this._cost = _.sum(this._parts, part => this._partPriceMap[part]);
    }
}

module.exports = PartsContainer;