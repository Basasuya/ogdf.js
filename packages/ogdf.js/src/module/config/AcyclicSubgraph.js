import createModule from "../module-helper";

const NAME = "AcyclicSubgraphModule"

const MODULE_DIRECTORY = {
    DfsAcyclicSubgraph: {},
    GreedyCycleRemoval: {}
}

const AcyclicSubgraphModule = createModule(NAME, MODULE_DIRECTORY)
export default AcyclicSubgraphModule