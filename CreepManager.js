var Harvester = require('Harvester');

/**
 * Creep manager 
 * @class 
 */
class CreepManager {
    /**
     * @var {Array<BaseCreep>} Creeps The creeps managed by this object 
     */
    get Creeps() {
        return this._creeps;
    }

    /**
     * @var {number} CreepCount the number of creeps being managed
     */
    get CreepCount() {
        return this._creeps.length;
    }

    /**
     * @var {boolean} True if there are any creeps being managed
     */
    Any() {
        return this.CreepCount > 0;
    }

    /**
     * Create a creep manager 
     * @param {Spawn} The parent spawner 
     * @constructor
     */
    constructor(rootSpawn) {
        this._creeps = [];
        this._parent = rootSpawn;
    }

    /**
     * Spawn a harvester creep
     * @async 
     */
    async createHarvester() {
        let harvester = new Harvester(this._parent, `Harvester-${Date.now()}`, [WORK, CARRY, MOVE]);
        this.Creeps.push(harvester);
        let success = await harvester.spawn();
        if (!success) {
            let err = new Error("Failed to create harvester.");
            throw err;
        }
        return harvester;
    }
}

module.exports = CreepManager;