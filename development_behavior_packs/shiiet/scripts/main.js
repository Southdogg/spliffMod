import { world, system } from "@minecraft/server";

/** @type {import("@minecraft/server").BlockCustomComponent} */
const BlockGrowableComponent = {
    onRandomTick({ block }, { params }) {
        const growthState = params.growth_state;
        const growthChance = params.growth_chance / 100;
        
        if (Math.random() > growthChance) return;

        const growth = block.permutation.getState(growthState);
        block.setPermutation(block.permutation.withState(growthState, growth + 1));
    }
}
system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    blockComponentRegistry.registerCustomComponent("demo:growable", BlockGrowableComponent);
});
