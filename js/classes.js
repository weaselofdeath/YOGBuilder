class runeClass {
    constructor(json_object) {
        this.name = json_object.name;
        this.max_level = json_object.max_level;
        this.rune_type = json_object.rune_type;
        this.skill = json_object.skill;
        this.basic = json_object.basic;
        this.prefix = json_object.prefix;
        this.suffix = json_object.suffix;
        this.icon = json_object.icon;
        this.id = json_object.id;
    }
}

class gemClass {
    constructor(json_object) {
        this.name = json_object.name;
        this.upgrades = json_object.upgrades;
        this.affix = json_object.affix;
        this.icon = json_object.icon;
        this.id = json_object.id;
    }
}

const itemType = Object.freeze({
    GEM:   "gem",
    RUNE:  "rune",
    GEAR: "gear",
    HEIRLOOM: "heirloom",
});

const runeType = Object.freeze({
    PRIMARY: "Primary rune",
    SECONDARY: "Secondary rune",
})

const secondaryRuneColors = Object.freeze({
    RED: "red",
    GREEN: "green",
    BLUE: "blue",
    WHITE: "white",
})