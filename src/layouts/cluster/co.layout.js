

OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
}

ORIGIN_PARAMETERS = {
    align: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: "none"
    },
    costAssoc: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 1
    },
    costGen: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 4
    },
    cOverhang: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0.2
    },
    margin: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 40.0
    },
    optionProfile: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 0
    },
    preferedDir: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: ["North", "East", "South", "West", "Undefined"],
        default: "South"
    },
    scaling: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    separation: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 40.0
    },
    optionField: {
        type: PARAMETER_TYPE.INT,
        range: [0, 2],
        default: 0
    }
}

ENTRY_DEFINITION = "CO(int node_num, int link_num, int group_num, int* source, int* target, int* nodeGroups, bool align, int costAssoc, int costGen, double cOverhang, double margin, int optionProfile, int preferedDir, bool scaling, double separation, int optionField)"

GRAPH_ATTRIBUTES = [
    {
        name: "group_num",
        mapper: graph => {
            if (graph.groups) return graph.groups.length
            let index = 0
            let group2index = {}
            graph.nodes.forEach(node => {
                if (!group2index[node.group]) {
                    group2index[node.group] = index
                    index++
                }
                node.groupIndex = group2index[node.group]
            })
        }
    }
]

NODE_ATTRIBUTES = [
    {
        name: "nodeGroups",
        mapper: node => node.groupIndex ? node.groupIndex : 0
    }
]