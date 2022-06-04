// =====================================
// Module
// =====================================

export const MODULE_NAME = "foundry-vtt-dextracker";

// =====================================
// Paths
// =====================================

const MODULE_LOCATION = "modules/foundry-vtt-dextracker";

const TEMPLATES_LOCATION = `${MODULE_LOCATION}/templates`;

export const TEMPLATE_CLASS_NAMES = {
  DEX: "dex-template",
  IMPORTS_AND_EXPORTS: "imports-and-exports-template",
};

export const PATHS = {
  TEMPLATES: {
    DEX: `${TEMPLATES_LOCATION}/dex.hbs`,
    IMPORTS_AND_EXPORTS: `${TEMPLATES_LOCATION}/imports-and-exports.hbs`,
    CREATURE_EDIT: `${TEMPLATES_LOCATION}/creature-edit.hbs`,
  },
};
