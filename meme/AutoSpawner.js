/**
 * Auto spawning code
 */
class AutoSpawner {
    get ShouldSpawn() {
        return this._spawner != null && Game.creeps.length < 15 &&
               (this._spawner.energy == this._spawner.energyCapacity);
    }

    constructor() {
        this._spawner = null;
    }

    spawnUpgrader() {
         this.spawnByRole([WORK, CARRY, MOVE], "upgrader");
    }

    spawnHarvester() {
        this.spawnByRole([WORK, CARRY, MOVE], "harvester");
    }

    spawnByRole(parts, role) {
        if (!this._spawner) {
            return;
        }

        this._spawner.spawnCreep(parts, `${role}-${Date.now()}`, { memory: { role } });
    }

    roleExists(role, numRoles = 1) {
        for (let name in Game.creeps) {
            let creep = Game.creeps[name];
            if (creep.memory.role == role) {
                numRoles--;
                if (numRoles === 0) {
                    return true;
                }
            }
        }
        return false;
    }

    run() {
        for (let name in Game.spawns) {
            this._spawner = Game.spawns[name];

            if (this.ShouldSpawn) {
                if (!this.roleExists("upgrader", 2)) {
                    this.spawnUpgrader();
                } else {
                    this.spawnHarvester();
                }
            }
        }
        this._spawner = null;
    }
}

var autoSpawner = new AutoSpawner();

module.exports = autoSpawner;