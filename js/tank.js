export default class Tank{
    visibility;
    disguise;
    disguiseWithAttack;
    disguiseWithMove;
    disguiseWithMoveAndAttack;
    isHaveCommandersDevice;
    isCommandersDeviceInSlot;
    isLeftModernization;
    isRightModernization;

    constructor(
        visibility = 479, 
        disguise = 34.18, 
        disguiseWithAttack = 7.14,
        disguiseWithMove = 27.11,
        disguiseWithMoveAndAttack = 5.67,
        isHaveCommandersDevice = false,
        isCommandersDeviceInSlot = false,
        isLeftModernization = false,
        isRightModernization = false,
    ) {
            this.visibility = visibility;
            this.disguise = disguise;
            this.disguiseWithAttack = disguiseWithAttack;
            this.disguiseWithMove = disguiseWithMove;
            this.disguiseWithMoveAndAttack = disguiseWithMoveAndAttack;
            this.isHaveCommandersDevice = isHaveCommandersDevice;
            this.isCommandersDeviceInSlot = isCommandersDeviceInSlot;
            this.isLeftModernization = isLeftModernization;
            this.isRightModernization = isRightModernization; 
    }
};