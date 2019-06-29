var ScreepBehavior = require("ScreepBehavior");

class UpgraderBehavior extends ScreepBehavior {
    run(creep) {
        this._creep = creep;

        if (this._creep.energy == 0) {
            this._creep.memory.role = "harvester";
        }

        let controller = this._creep.room.controller;
        let attempt = this._creep.transfer(controller, RESOURCE_ENERGY);
        if (attempt == ERR_NOT_IN_RANGE) {
            this._creep.moveTo(controller);
        }

        this._creep = null;
    }
}

module.exports = UpgraderBehavior;