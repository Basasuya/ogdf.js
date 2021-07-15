# Layout-loader for ogdf

## Introduction

This webpack-loader is used for ogdf.js project.

## How to use

Add loader in `webpack.config.js` like this:

```js
module: {
    rules: [
        {
            test: /\.layout.js$/,
            use: [
                {
                    loader: path.resolve('./loader/layout-loader.js')
                }
            ]
        }
    ]
}
```

Then you can use layout-loader now.

## How to create a layout

First name your layout file as `[name].layout.js` , such as `example.layout.js`

Then in your layout js file , you should implement some variables:

###### Required Variables

At least one of these Required Variables below should be defined correctely:

-   ENTRY_DEFINITION: A string copy of C entry definition of ogdf.js

If your layout entry has been defined like this:

```c
EXAMPLE(int node_num, int link_num, int* source, int* target, ...)
```

The ENTRY_DEFINITION should be this:

```js
ENTRY_DEFINITION = 'EXAMPLE(int node_num, int link_num, int* source, int* target, ...)'
```

-   LAYOUT_NAME (NOT recommended): The string name of your layout

```js
LAYOUT_NAME = 'EXAMPLE'
```

We strongly recommend you to use C_DEFINITION.

###### Optional Variables

These variables are optional, you should use these variables in need.

-   GRAPH_ATTRYBUTES: An array with objects, each element has two attributes:
    (Attribute)name: the parameter in C entry definition
    (Attribute)mapper: a map funtion for graph, returns a constant variable about this graph

```js
GRAPH_ATTRYBUTES = [
    { name: 'node_num', mapper: (graph) => graph.nodes.length },
    { name: 'link_num', mapper: (graph) => graph.links.length },
    ...
]
```

-   NODE_ATTRIBUTES: An array with objects, each element has two attributes:
    (Attribute)name: the parameter in C entry definition
    (Attribute)mapper: a map funtion for nodes

```js
NODE_ATTRIBUTES = [
    { name: 'nodesX', mapper: (node) => nodes.x },
    { name: 'nodesY', mapper: (node) => nodes.y },
    ...
]
```

-   LINK_ATTRIBUTES: An array with objects, each element has two attributes:
    (Attribute)name: the parameter in C entry definition
    (Attribute)mapper: a map funtion for links

```js
LINK_ATTRIBUTES = [
    { name: 'source', mapper: (link) => link.source },
    { name: 'target', mapper: (link) => link.target },
    ...
]
```

-   OUR_PARAMETERS: Defines our own parameters

```js
OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    ...
}
```

-   ORIGIN_PARAMETERS: Defines the origin parameters in ogdf layout

```js
ORIGIN_PARAMETERS = {
    settings: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: ['standard', 'repulse', 'planar'],
        default: 'none'
    },
    ...
}
```

-   ATTRIBUTE_ARRAYS (NOT recommended): A function with parameter `graph`, and returns a array with objects.

```js
ATTRIBUTE_ARRAYS = function (graph) {
    let sourceIndexArray = []
    let nodesXArray = []
    //TODO
    for (let i = 0; i < graph.links.length; i++) {
        sourceIndexArray.push(graph.links[i].source)
    }
    for (let i = 0; i < graph.nodes.length; i++) {
        nodesXArray.push(graph.nodes[i].x)
    }
    return [
        {
            name: 'source',
            value: sourceIndexArray
        },
        {
            name: 'nodesX',
            value: nodesXArray
        }
        ...
    ]
}
```

## Example

###### C entry of StressMinimization Layout:

```c
SM(int node_num, int link_num, int* source, int* target, double* edgesWeight, double* nodesX, double* nodesY, int terminationCriterion, bool fixXCoords, bool fixYCoords, bool fixZCoords, bool hasInitialLayout, bool layoutComponentsSeparately, double edgeCosts, int numberOfIterations, bool useEdgeCostsAttribute)
```

###### sm.layout.js:

```js
OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

ORIGIN_PARAMETERS = {
    terminationCriterion: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: ['None', 'PositionDifference', 'Stress'],
        default: 'None'
    },
    fixXCoords: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    fixYCoords: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    fixZCoords: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    hasInitialLayout: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    layoutComponentsSeparately: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    edgeCosts: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 100
    },
    numberOfIterations: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 200
    },
    useEdgeCostsAttribute: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

ENTRY_DEFINITION =
    'SM(int node_num, int link_num, int* source, int* target, double* edgesWeight, double* nodesX, double* nodesY, int terminationCriterion, bool fixXCoords, bool fixYCoords, bool fixZCoords, bool hasInitialLayout, bool layoutComponentsSeparately, double edgeCosts, int numberOfIterations, bool useEdgeCostsAttribute)'

LINK_ATTRIBUTES = [
    {
        name: 'edgesWeight',
        mapper: (link) => ('weight' in link ? link.weight : 1)
    }
]

NODE_ATTRIBUTES = [
    {
        name: 'nodesX',
        mapper: (node) => node.x
    },
    {
        name: 'nodesY',
        mapper: (node) => node.y
    }
]
```

###### Compiled result:

```js
const initOGDF = require('../entry/rawogdf')
const { PARAMETER_TYPE } = require('../utils/parameters')
const OUR_PARAMETERS = { useWorker: { type: 'BOOL', range: [true, false], default: false } }
const ORIGIN_PARAMETERS = {
    terminationCriterion: {
        type: 'CATEGORICAL',
        range: ['None', 'PositionDifference', 'Stress'],
        default: 'None'
    },
    fixXCoords: { type: 'BOOL', range: [true, false], default: false },
    fixYCoords: { type: 'BOOL', range: [true, false], default: false },
    fixZCoords: { type: 'BOOL', range: [true, false], default: false },
    hasInitialLayout: { type: 'BOOL', range: [true, false], default: false },
    layoutComponentsSeparately: { type: 'BOOL', range: [true, false], default: false },
    edgeCosts: { type: 'DOUBLE', range: [0, null], default: 100 },
    numberOfIterations: { type: 'INT', range: [0, null], default: 200 },
    useEdgeCostsAttribute: { type: 'BOOL', range: [true, false], default: false }
}
const PARAMETERS = {
    ...OUR_PARAMETERS,
    ...ORIGIN_PARAMETERS
}
function sm(graph, params, callback) {
    const ORIGIN_PARAMETER_SEQUENCE = [
        'terminationCriterion',
        'fixXCoords',
        'fixYCoords',
        'fixZCoords',
        'hasInitialLayout',
        'layoutComponentsSeparately',
        'edgeCosts',
        'numberOfIterations',
        'useEdgeCostsAttribute'
    ]
    let Module
    const parameters = {
        ...{
            useWorker: false,
            terminationCriterion: 'None',
            fixXCoords: false,
            fixYCoords: false,
            fixZCoords: false,
            hasInitialLayout: false,
            layoutComponentsSeparately: false,
            edgeCosts: 100,
            numberOfIterations: 200,
            useEdgeCostsAttribute: false
        },
        ...params
    }
    const originalParameters = ORIGIN_PARAMETER_SEQUENCE.map((paramName) => {
        if (PARAMETERS[paramName].type === PARAMETER_TYPE.CATEGORICAL) {
            return PARAMETERS[paramName].range.indexOf(parameters[paramName])
        } else {
            return parameters[paramName]
        }
    })
    const _graph = JSON.parse(JSON.stringify(graph))
    const N = _graph.nodes.length
    const M = _graph.links.length
    const indexArrays = (function (graph) {
        let ATTRIBUTR_ARRAYS = [
            {
                name: 'source',
                type: { length: 4, heap: 'HEAP32' },
                value: [],
                setValue:
                    "\n                    (graph) => {\n                        const linkAttributeArray = []\n                        for (let i = 0; i < M; ++i) {\n                            linkAttributeArray.push((link => {\r\n                    const id2index = {}\r\n                    for (let i = 0; i < N; ++i) {\r\n                        if (graph.nodes[i]['id'] in id2index) {\r\n                            throw Error('Duplicated Node ID')\r\n                        } else id2index[graph.nodes[i]['id']] = i\r\n                    }\r\n                    return id2index[link.source]\r\n                })(graph.links[i]))\n                        }\n                        return linkAttributeArray\n                    }"
            },
            {
                name: 'target',
                type: { length: 4, heap: 'HEAP32' },
                value: [],
                setValue:
                    "\n                    (graph) => {\n                        const linkAttributeArray = []\n                        for (let i = 0; i < M; ++i) {\n                            linkAttributeArray.push((link => {\r\n                    const id2index = {}\r\n                    for (let i = 0; i < N; ++i) {\r\n                        if (graph.nodes[i]['id'] in id2index) {\r\n                            throw Error('Duplicated Node ID')\r\n                        } else id2index[graph.nodes[i]['id']] = i\r\n                    }\r\n                    return id2index[link.target]\r\n                })(graph.links[i]))\n                        }\n                        return linkAttributeArray\n                    }"
            },
            {
                name: 'edgesWeight',
                type: { length: 8, heap: 'HEAPF64' },
                value: [],
                setValue:
                    '\n                    (graph) => {\n                        const linkAttributeArray = []\n                        for (let i = 0; i < M; ++i) {\n                            linkAttributeArray.push((link => "weight" in link ? link.weight : 1)(graph.links[i]))\n                        }\n                        return linkAttributeArray\n                    }'
            },
            {
                name: 'nodesX',
                type: { length: 8, heap: 'HEAPF64' },
                value: [],
                setValue:
                    '\n                    (graph) => {\n                        const nodeAttributeArray = []\n                        for (let i = 0; i < N; ++i) {\n                            nodeAttributeArray.push((node => node.x)(graph.nodes[i]))\n                        }\n                        return nodeAttributeArray\n                    }'
            },
            {
                name: 'nodesY',
                type: { length: 8, heap: 'HEAPF64' },
                value: [],
                setValue:
                    '\n                    (graph) => {\n                        const nodeAttributeArray = []\n                        for (let i = 0; i < N; ++i) {\n                            nodeAttributeArray.push((node => node.y)(graph.nodes[i]))\n                        }\n                        return nodeAttributeArray\n                    }'
            }
        ]
        ATTRIBUTR_ARRAYS[0].value = ((graph) => {
            const linkAttributeArray = []
            for (let i = 0; i < M; ++i) {
                linkAttributeArray.push(
                    ((link) => {
                        const id2index = {}
                        for (let i = 0; i < N; ++i) {
                            if (graph.nodes[i]['id'] in id2index) {
                                throw Error('Duplicated Node ID')
                            } else id2index[graph.nodes[i]['id']] = i
                        }
                        return id2index[link.source]
                    })(graph.links[i])
                )
            }
            return linkAttributeArray
        })(_graph)
        ATTRIBUTR_ARRAYS[1].value = ((graph) => {
            const linkAttributeArray = []
            for (let i = 0; i < M; ++i) {
                linkAttributeArray.push(
                    ((link) => {
                        const id2index = {}
                        for (let i = 0; i < N; ++i) {
                            if (graph.nodes[i]['id'] in id2index) {
                                throw Error('Duplicated Node ID')
                            } else id2index[graph.nodes[i]['id']] = i
                        }
                        return id2index[link.target]
                    })(graph.links[i])
                )
            }
            return linkAttributeArray
        })(_graph)
        ATTRIBUTR_ARRAYS[2].value = ((graph) => {
            const linkAttributeArray = []
            for (let i = 0; i < M; ++i) {
                linkAttributeArray.push(
                    ((link) => ('weight' in link ? link.weight : 1))(graph.links[i])
                )
            }
            return linkAttributeArray
        })(_graph)
        ATTRIBUTR_ARRAYS[3].value = ((graph) => {
            const nodeAttributeArray = []
            for (let i = 0; i < N; ++i) {
                nodeAttributeArray.push(((node) => node.x)(graph.nodes[i]))
            }
            return nodeAttributeArray
        })(_graph)
        ATTRIBUTR_ARRAYS[4].value = ((graph) => {
            const nodeAttributeArray = []
            for (let i = 0; i < N; ++i) {
                nodeAttributeArray.push(((node) => node.y)(graph.nodes[i]))
            }
            return nodeAttributeArray
        })(_graph)
        return ATTRIBUTR_ARRAYS
    })(_graph)
    if (parameters.useWorker) {
        const workerFunc = function () {
            addEventListener('message', (e) => {
                let { initOGDF, N, M, indexArrays, originalParameters } = JSON.parse(e.data)
                let evalstr = 'initOGDF = ' + initOGDF
                eval(evalstr)
                initOGDF().then(function (md) {
                    Module = md
                    const arrays = (function (arrays) {
                        let mallocs = []
                        for (let name in arrays) {
                            const array = arrays[name]
                            const location = Module._malloc(array.type.length * array.value.length)
                            for (let i = 0; i < array.value.length; ++i) {
                                Module[array.type.heap][location / array.type.length + i] =
                                    array.value[i]
                            }
                            mallocs.push(location)
                        }
                        return mallocs
                    })(indexArrays)
                    const result = Module._SM(N, M, ...arrays, ...originalParameters)
                    const nodes = []
                    for (let i = 0; i < N; ++i) {
                        nodes[i] = {}
                        nodes[i]['x'] = Module.HEAPF32[(result >> 2) + i * 2]
                        nodes[i]['y'] = Module.HEAPF32[(result >> 2) + i * 2 + 1]
                    }
                    postMessage(JSON.stringify(nodes))
                    ;(function (arrays, buffers) {
                        for (let array of arrays) {
                            Module._free(array)
                        }
                        for (let buffer of buffers) {
                            Module._free_buf(buffer)
                        }
                    })(arrays, [result])
                })
            })
        }
        const blob = new Blob(['(' + workerFunc.toString() + ')()'])
        const url = window.URL.createObjectURL(blob)
        const worker = new Worker(url)
        worker.postMessage(
            JSON.stringify({
                initOGDF: initOGDF.toString(), // ! Maybe we can put initOGDF out of web worker
                N,
                M,
                indexArrays,
                originalParameters
            })
        )
        worker.onmessage = function (e) {
            const nodePositions = JSON.parse(e.data)
            for (let i = 0; i < N; ++i) {
                _graph.nodes[i].x = nodePositions[i].x
                _graph.nodes[i].y = nodePositions[i].y
            }
            worker.terminate()
            callback(_graph)
        }
    } else {
        initOGDF().then(function (md) {
            Module = md
            const arrays = (function (arrays) {
                let mallocs = []
                for (let name in arrays) {
                    const array = arrays[name]
                    const location = Module._malloc(array.type.length * array.value.length)
                    for (let i = 0; i < array.value.length; ++i) {
                        Module[array.type.heap][location / array.type.length + i] = array.value[i]
                    }
                    mallocs.push(location)
                }
                return mallocs
            })(indexArrays)
            const result = Module._SM(N, M, ...arrays, ...originalParameters)
            for (let i = 0; i < N; ++i) {
                _graph.nodes[i]['x'] = Module.HEAPF32[(result >> 2) + i * 2]
                _graph.nodes[i]['y'] = Module.HEAPF32[(result >> 2) + i * 2 + 1]
            }
            callback(_graph)
            ;(function (arrays, buffers) {
                for (let array of arrays) {
                    Module._free(array)
                }
                for (let buffer of buffers) {
                    Module._free_buf(buffer)
                }
            })(arrays, [result])
        })
    }
}
sm.parameters = {
    useWorker: { type: 'BOOL', range: [true, false], default: false },
    terminationCriterion: {
        type: 'CATEGORICAL',
        range: ['None', 'PositionDifference', 'Stress'],
        default: 'None'
    },
    fixXCoords: { type: 'BOOL', range: [true, false], default: false },
    fixYCoords: { type: 'BOOL', range: [true, false], default: false },
    fixZCoords: { type: 'BOOL', range: [true, false], default: false },
    hasInitialLayout: { type: 'BOOL', range: [true, false], default: false },
    layoutComponentsSeparately: { type: 'BOOL', range: [true, false], default: false },
    edgeCosts: { type: 'DOUBLE', range: [0, null], default: 100 },
    numberOfIterations: { type: 'INT', range: [0, null], default: 200 },
    useEdgeCostsAttribute: { type: 'BOOL', range: [true, false], default: false }
}
export default sm
```
