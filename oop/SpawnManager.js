var Spawner = require('Spawner');

/**
 * Spawn manager 
 * @class
 */
class SpawnManager {
    /**
     * @var {object} Spawns The spawns as a dictionary
     */
    get Spawns() {
        return this._spawns;
    }

    /**
     * @var {Array<Spawn>} SpawnsArray The spawns as an array 
     */
    get SpawnsArray() {
        let spawnsArray = [];
        for (let key in this.Spawns) {
            spawnsArray.push(this.Spawns[key]);
        }
        return spawnsArray;
    }

    /**
     * Create a new spawn manager 
     * @constructor 
     */
    constructor() {
        this._spawns = {}
    }

    /**
     * Add a spawn to the manager 
     * @param {Spawn} spawn The spawn to add
     */
    addSpawn(spawn) {
        let name = (spawn instanceof StructureSpawn) ? spawn.name : spawn.Name;
        if (!this._spawns[name]) {
            this._spawns[name] = (spawn instanceof StructureSpawn) ? new Spawner(spawn) : spawn;
        }
    }

    /**
     * Get a spawn by its name 
     * @param {string} name The name of the spawn 
     */
    getSpawnByName(name) {
        return this._spawns[name];
    }
}

module.exports = SpawnManager;