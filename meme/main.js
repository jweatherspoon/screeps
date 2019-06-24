var HarvesterBehavior = require('HarvesterBehavior');
var UpgraderBehavior = require("UpgraderBehavior");

var AutoSpawner = require("AutoSpawner");

const BEHAVIORS = {
    'harvester': new HarvesterBehavior(),
    'upgrader': new UpgraderBehavior(),
}

function IsDead(creep) {
    return (creep.ticksToLive <= 0 || creep.hits <= 0);
}

module.exports.loop = function() {
    // handle spawning code first
    AutoSpawner.run();

    // update all the creeps 
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        // Check the life of the creep 
        if (IsDead(creep)) {
            Memory.creeps[name] = null;
            continue;
        }

        let behavior = BEHAVIORS[creep.memory.role];
        behavior.run(creep);
    }
}