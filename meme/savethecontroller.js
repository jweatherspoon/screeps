var ScreepBehavior = require("ScreepBehavior");

class UpgraderBehavior extends ScreepBehavior {
    get isMining() {
        return this._creep.memory.isMining;
    }

    set isMining(value) {
        if (this._creep) {
            this._creep.memory.isMining = value;
        }
    }

    run(creep) {
        this._creep = creep;

        // if we are mining, go mine dawg
        if (this._creep.carry.energy < this._creep.carryCapacity && this.isMining) {
            let sources = this._creep.room.find(FIND_SOURCES);
            if (this._creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                this._creep.moveTo(sources[0]);
            }
        }

        // If we aren't at full carry capacity we aren't mining 
        // But if we aren't mining and we have no energy then we gonna mine dawg 
        this.isMining = (!this.isMining && this._creep.carry.energy === 0) || (this._creep.carry.energy < this._creep.carryCapacity && this.isMining);

        // we are DELIVERING 
        if (!this.isMining) {
            if (this._creep.transfer(this._creep.room.controller, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                this._creep.moveTo(this._creep.room.controller);
            }
        }

        this._creep = null;
    }
}

module.exports = UpgraderBehavior;