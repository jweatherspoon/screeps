class ScreepBehavior {
    /**
     * Kill the creep
     * @param {Creep} creep the creep to kill
     * @param {boolean} shouldRenew If set to true, the creep will make an attempt to be recycled by its spawner
     * @async
     */
    async kill(creep, shouldRenew = true) {
        if (creep) {
            // Move back to the root spawner to recycle 
            if (shouldRenew) {
                await (async () => {
                    while (true) {
                        let attempt = Game.spawns['Spawn1'].recycleCreep(creep);

                        switch (attempt) {
                            case OK:
                                return;
                            case ERR_NOT_IN_RANGE:
                                this.moveToSpawn(creep);
                            case ERR_NOT_OWNER:
                            case ERR_INVALID_TARGET:
                            case ERR_RCL_NOT_ENOUGH:
                                canRenew = false;
                                break;
                        }
                    }
                });
            }

            creep.suicide();
            Memory.creeps.clear(creep.name);
        }
    }

    /**
     * Find structures in the room of a given type (or types)
     * @param {number | Array<number>} types The types to filter 
     * @param {boolean} areDepleted Set to true to only find sources that are not at maximum energy
     * @returns 
     */
    findStructuresOfType(creep, types, areDepleted = false) {
        if (!creep) {
            return [];
        }
        
        return creep.room.find(FIND_STRUCTURES, {
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
    findEnergy(creep) {
        if (!creep) {
            return [];
        }

        return creep.room.find(FIND_SOURCES);
    }

    /**
     * Find the closest energy source 
     * @returns 
     */
    findClosestEnergySource() {
        let source = this.findEnergy();
    }
}

module.exports = ScreepBehavior;