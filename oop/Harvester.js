var BaseCreep = require('BaseCreep');

/**
 * Harvester creep base class 
 * @class 
 */
class Harvester extends BaseCreep {
    /**
     * Create a harvester creep 
     * @param {Spawn} rootSpawn the spawner that created this creep 
     * @param {string} name The creep's name 
     * @param {PartsContainer | Array<number>} The parts that will make up this creep
     * @constructor
     */
    constructor(rootSpawn, name, parts) {
        // TODO: Remove this stub when harvester subclasses are implemented 
        if (!parts) {
            parts = [WORK, CARRY, MOVE];
        }

        super(rootSpawn, name, parts);
    }

    /**
     * Harvest some energy or move to the first energy source in the room
     * TODO: Set to closest source 
     */
    harvest() {
        // let source = this.findClosestSource();
        let source = this.findSources()[0];
        if (this._creep.harvest(source) === ERR_NOT_IN_RANGE) {
            this.moveTo(source);
        }
    }

    /**
     * Transfer's 1 unit of this creep's energy to spawn or moves 1 space to spawn
     */
    transferPayloadToSpawn() {
        if (this._creep.transfer(this._parent, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this.moveTo(this._parent);
        }
    }

    /**
     * Update this creep
     */
    run() {
        if (this.PercentLoad < 100) {
            this.harvest();
        } else {
            while (this.PercentLoad > 0 || !this._parent.IsFull());
            this.transferPayloadToSpawn();
        }
    }
}

module.exports = Harvester;