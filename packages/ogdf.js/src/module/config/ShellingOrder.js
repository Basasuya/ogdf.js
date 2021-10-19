import createModule from '../module-helper'
import { PARAMETER_TYPE } from '../../utils/parameter-type'
const NAME = 'ShellingOrderModule'

const MODULE_DIRECTORY = {
    BiconnectedShellingOrder: {
        baseRatio: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 0.33
        }
    },
    TriconnectedShellingOrder: {
        baseRatio: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 0.33
        }
    }
}

const ShellingOrderModule = createModule(NAME, MODULE_DIRECTORY)
export default ShellingOrderModule
