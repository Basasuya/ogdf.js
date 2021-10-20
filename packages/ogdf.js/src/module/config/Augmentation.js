import createModule from '../module-helper'

const NAME = 'AugmentationModule'

const MODULE_DIRECTORY = {
    DfsMakeBiconnected: {},
    PlanarAugmentation: {},
    PlanarAugmentationFix: {}
}

const AugmentationModule = createModule(NAME, MODULE_DIRECTORY)
export default AugmentationModule
