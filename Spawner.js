var CreepManager = require('CreepManager');

/**
 * StructureSpawn wrapper class 
 * @class
 */
class Spawner {
    /**
     * @var {StructureSpawn} Spawn The spawn
     */
    get Spawn() {
        return this._spawn;
    }

    /**
     * @var {number} PercentLoad The utilized percent of the spawns energy capacity
     */
    get PercentLoad() {
        return this._spawn.energy / this._spawn.energyCapacity;
    }

    /**
     * @var {boolean} IsFull True if the spawn is at full energy capacity 
     */
    get IsFull() {
        return this.PercentLoad === 100;
    }

    /**
     * @var {string} Name the name of the spawn
     */
    get Name() {
        return this._spawn.name;
    }

    /**
     * @var {CreepManager} The creep manager associated with this spawn 
     */
    get CreepManager() {
        return this._creepManager;
    }

    /**
     * create a new spawn 
     * @param {StructureSpawn} spawn The spawn to wrap 
     * @constructor
     */
    constructor(spawn) {
        this._spawn = spawn;
        this._creepManager = new CreepManager(this);
    }
}

module.exports = Spawner;