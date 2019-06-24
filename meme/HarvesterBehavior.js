var ScreepBehavior = require("ScreepBehavior");

class HarvesterBehavior extends ScreepBehavior {
    /**
     * Harvest some energy or move to the first energy source in the room
     * TODO: Set to closest source 
     */
    harvest(creep) {
        // let source = this.findClosestSource();
        let source = this.findEnergy(creep)[0];
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }

    /**
     * Transfer's 1 unit of this creep's energy to spawn or moves 1 space to spawn
     */
    transferPayloadToSpawn(creep) {
        if (creep.transfer(this.findClosestSpawn(), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(this.findClosestSpawn());
        }
    }

    /**
     * Update this creep
     */
    run(creep) {
        if (creep.carry.energy < creep.carryCapacity && !creep.memory.unloading) {
            this.harvest(creep);
        } else {
            creep.memory.unloading = creep.carry.energy > 0;
            this.transferPayloadToSpawn(creep);
        }
    }
}

module.exports = HarvesterBehavior;