/**
 * Auto spawning code
 */
class AutoSpawner {
    constructor() {
        this._spawner = null;
    }

    spawnHarvester() {
        if (!this._spawner) {
            return;
        }

        this._spawner.spawnCreep([WORK, CARRY, MOVE], `Harvester-${Date.now()}`, {memory: {role: "harvester"}});
    }

    run() {
        for (let name in Game.spawns) {
            this._spawner = Game.spawns[name];

            if (this._spawner.energy == this._spawner.energyCapacity) {
                this.spawnHarvester();
            }
        }
    }
}

var autoSpawner = new AutoSpawner();

module.exports = autoSpawner;