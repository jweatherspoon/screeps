var SpawnManager = require("SpawnManager");
var Spawner = require("Spawner");

function BuildSpawnManager() {
    let spawnManager = new SpawnManager();

    for (const spawn in Game.spawns) {
        spawnManager.addSpawn(Game.spawns[spawn]);
    }

    return spawnManager;
}

var spawnManager = BuildSpawnManager();

module.exports.loop = function () {
    var spawner = spawnManager.getSpawnByName('Spawn1');

    if (!spawner.CreepManager.Any()) {
        spawner.CreepManager.createHarvester().then(harvester => {
            console.log("Spawned harvester!", harvester);
        }).catch(err => console.log(`Failed to create harvester error code ${err}`));
    }

    // Go through and update all the creeps
    spawnManager.SpawnsArray.forEach(spawn => {
        spawn.CreepManager.Creeps.forEach(creep => creep.run());
    });
}