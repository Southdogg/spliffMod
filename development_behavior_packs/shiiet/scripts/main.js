import { world, system, EquipmentSlot, GameMode, BlockType, EnchantmentSlot, Dimension, ItemStack } from "@minecraft/server";

/** @type {import("@minecraft/server").BlockCustomComponent} */
const BlockGrowableComponent = {
    onRandomTick({ block }, { params }) {
        const growthState = params.growth_state;
        const growthChance = params.growth_chance / 100;
        
        if (Math.random() > growthChance) return;

        const growth = block.permutation.getState(growthState);
        if(growth != 3){
        block.setPermutation(block.permutation.withState(growthState, growth + 1));
        }
    },
    onPlayerInteract({block, player, dimension}, {params}){
        const growthState = params.growth_state;
        const growth = block.permutation.getState(growthState);

        if ( growth == 3) {
            const equippable = player.getComponent("minecraft:equippable");
            const mainhand = equippable.getEquipmentSlot(EquipmentSlot.Mainhand);
            const harwest = new ItemStack("demo:wildbud", 1);
            const location = block.location;
            if (mainhand.typeId == "minecraft:shears")
            {
                block.setType("minecraft:air");
                world.sendMessage("Harvest");
                dimension.spawnItem(harwest, { x: location.x, y: location.y, z: location.z});
            }

            
        }
    }
}

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent("demo:growable", BlockGrowableComponent);
});
