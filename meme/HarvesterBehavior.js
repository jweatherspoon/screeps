var ScreepBehavior = require("ScreepBehavior");

class HarvesterBehavior extends ScreepBehavior {
    /**
     * Harvest some energy or move to the first energy source in the room
     * TODO: Set to closest source 
     */
    harvest() {
        // let source = this.findClosestSource();
        let source = this.findEnergy()[0];
        if (this._creep.harvest(source) === ERR_NOT_IN_RANGE) {
            this._creep.moveTo(source);
        }
    }

    /**
     * Transfer's 1 unit of this creep's energy to spawn or moves 1 space to spawn
     */
    transferPayloadToSpawn() {
        if (this._creep.transfer(this.findClosestSpawn(), RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            this._creep.moveTo(this.findClosestSpawn());
        }
    }

    /**
     * Update this creep
     */
    run(creep) {
        this._creep = creep;
        if (this._creep.carry.energy < this._creep.carryCapacity && !this._creep.memory.unloading) {
            this.harvest();
        } else {
            this._creep.memory.unloading = this._creep.carry.energy > 0;
            this.transferPayloadToSpawn();
        }
        this._creep = null;
    }
}

module.exports = HarvesterBehavior;