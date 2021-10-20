import createModule from '../module-helper'

const NAME = 'MixedModelCrossingsBeautifierModule'

const MODULE_DIRECTORY = {
    MMCBDoubleGrid: {},
    MMCBLocalStretch: {},
    MMDummyCrossingsBeautifier: {}
}

const MixedModelCrossingsBeautifierModule = createModule(NAME, MODULE_DIRECTORY)
export default MixedModelCrossingsBeautifierModule
