var PartsContainer = require('PartsContainer');

/**
 * Base creep class 
 * @class
 */
class BaseCreep {
    /**
     * @var {string} Name the creep's name
     */
    get Name() {
        return this._name;
    }

    /**
     * @var {Creep} Creep the creep this object models
     */
    get Creep() {
        return Game.creeps[this.Name];
    }

    /**
     * @var {boolean} IsAlive whether or not the creep is alive
     */
    get IsAlive() {
        return this._isAlive;
    }

    /**
     * @var {PartsContainer} Parts the creep's parts container
     */
    get Parts() {
        return this._parts;
    }

    /**
     * @var {Array<string>} PartsArray the creep's parts array 
     */
    get PartsArray() {
        return this.Parts.Parts;
    }

    /**
     * @var {float} PercentLoad The utilized percentage of the creep's current carry weight capacity
     */
    get PercentLoad() {
        if (!this.Creep) {
            return 0;
        }

        return this.Creep.carry.energy / this.Creep.carryCapacity;
    }

    /**
     * Create a new base creep 
     * @param {StructureSpawn} rootSpawn the spawner that created this creep
     * @param {PartsContainer | Array<number>} The parts that will make up this creep
     * @param {string} identifier The creep's name
     */
    constructor(rootSpawn, name, parts) {
        this._parent = rootSpawn;
        this._name = name;

        this.setParts(parts);

        this._isAlive = false;
    }

    /**
     * Spawn the creep if it is not already alive 
     * @async
     */
    async spawn() {
        if (!this.Creep && !this._parent.IsFull) {
            let attempt = this._parent.Spawn.spawnCreep(this.PartsArray, this._name);
            switch (attempt) {
                case OK:
                    await (async () => {
                        while (this.Creep.spawning) ;
                    });
                    this._isAlive = true;
                    return true;
                default:
                    return false;
            }

        }
    }

    /**
     * Kill the creep
     * @param {boolean} shouldRenew If set to true, the creep will make an attempt to be recycled by its spawner
     * @async
     */
    async kill(shouldRenew = true) {
        if (this.Creep) {
            // Move back to the root spawner to recycle 
            if (shouldRenew) {
                await (async () => {
                    while (true) {
                        let attempt = this._parent.Spawn.recycleCreep(this.Creep);

                        switch (attempt) {
                            case OK:
                                return;
                            case ERR_NOT_IN_RANGE:
                                this.moveToSpawn();
                            case ERR_NOT_OWNER:
                            case ERR_INVALID_TARGET:
                            case ERR_RCL_NOT_ENOUGH:
                                canRenew = false;
                                break;
                        }
                    }
                });
            }

            this.Creep.suicide();
            Memory.creeps.clear(this.Creep.Name);
        }
    }

    /**
     * Set the creep's parts all at once from an array or a container
     * @param {PartsContainer | Array<number>} The parts that will make up this creep
     * @param {boolean} updateImmediately If set to true, will kill the creep and respawn it (default: false)
     */
    setParts(parts, updateImmediately = false) {
        this._parts = null;

        // Set up the creep's parts container 
        if (parts instanceof PartsContainer) {
            this._parts = parts;
        } else if (parts instanceof Array) {
            this._parts = new PartsContainer();
            parts.forEach(part => this._parts.addPart(part));
        }

        if (updateImmediately) {
            this.kill();
            this.spawn();
        }
    }

    /**
     * Find the energy sources in the room
     * @returns 
     */
    findEnergy() {
        return this.findStructuresOfType()
    }

    /**
     * Find structures in the room of a given type (or types)
     * @param {number | Array<number>} types The types to filter 
     * @param {boolean} areDepleted Set to true to only find sources that are not at maximum energy
     * @returns 
     */
    findStructuresOfType(types, areDepleted = false) {
        return this.Creep.room.find(FIND_STRUCTURES, {
            filter: structure => {
                let success = (match = !(types instanceof Array) ? (types == structure.structureType) :
                    types.reduce((t, cond) => cond || t == structure.structureType));
                if (areDepleted) {
                    success = success && structure.energy < structure.energyCapacity;
                }
            }
        });
    }

    /**
     * Find the energy sources in the room 
     * @returns 
     */
    findSources() {
        if (!this.Creep) {
            return [];
        }

        return this.Creep.room.find(FIND_SOURCES);
    }

    /**
     * Find the closest energy source 
     * @returns 
     */
    findClosestSource() {
        let source = this.findSources();
    }
}


module.exports = BaseCreep;