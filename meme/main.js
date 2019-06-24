var HarvesterBehavior = require('HarvesterBehavior');

const BEHAVIORS = {
    'harvester': new HarvesterBehavior()
}

module.exports.loop = function() {

    // update all the creeps 
    for (let name in Game.creeps) {
        let creep = Game.creeps[name];

        let behavior = BEHAVIORS[creep.memory.role];
        behavior.run(creep);
    }
}