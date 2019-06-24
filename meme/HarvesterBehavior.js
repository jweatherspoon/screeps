var ScreepBehavior = require("ScreepBehavior");

class HarvesterBehavior extends ScreepBehavior {
    /**
     * Harvest some energy or move to the first energy source in the room
     * TODO: Set to closest source 
     */
    harvest(creep) {
        // let source = this.findClosestSource();
        let source = this.findSources()[0];
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }

    /**
     * Transfer's 1 unit of this creep's energy to spawn or moves 1 space to spawn
     */
    transferPayloadToSpawn(creep) {
        if (creep.transfer(this._parent, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(this._parent);
        }
    }

    /**
     * Update this creep
     */
    run(creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            this.harvest(creep);
        } else {
            while (creep.carry.energy > 0) {
                this.transferPayloadToSpawn();
            }
        }
    }
}

module.exports = HarvesterBehavior;