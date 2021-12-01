<p align="center">
  <a href="https://github.com/ZJUVAI/ogdf.js">
    <img width="200" src="https://github.com/ZJUVAI/ogdf.js/raw/master/icon.svg">
  </a>
</p>

<h1 align="center">ogdf.js</h1>

<div align="center">

A JavaScript Graph Drawing Library Emscripts the C++ Library [OGDF](https://ogdf.uos.de/).

</div>

### Introduction

The project is forked from [Basasuya/ogdf.js](https://github.com/Basasuya/ogdf.js). The idea of this project is to compile the C++ library [OGDF](https://ogdf.uos.de/) into a JavaScript library. The former stands both for Open Graph Drawing Framework (the original name) and Open Graph algorithms and Data structures Framework.

We now aim to use [emscripten](https://emscripten.org/) to compile the **Layout** part of OGDF into ogdf.js.

### How to use

-   npm ([ogdfjs](https://www.npmjs.com/package/ogdfjs)):

    ```bash
    $ npm install ogdfjs
    ```

-   unpkg: [ogdf.js](https://unpkg.com/ogdfjs)

    ```html
    <script src="https://unpkg.com/ogdfjs"></script>
    ```

### Layout Supported

Some layout algorithms are supported now:

##### Energy-based Layout Algorithms

-   [DavidsonHarel](https://ogdf.uos.de/doc/classogdf_1_1_davidson_harel_layout.html): the Davidson-Harel layout algorithm.
-   [FastMultipoleEmbedder](https://ogdf.uos.de/doc/classogdf_1_1_fast_multipole_embedder.html): the fast multipole embedder approach for force-directed layout.
-   [FastMultipoleMultilevelEmbedder](https://ogdf.uos.de/doc/classogdf_1_1_fast_multipole_multilevel_embedder.html): the fast multipole multilevel embedder approach for force-directed multilevel layout.
-   [FMMM](https://ogdf.uos.de/doc/classogdf_1_1_f_m_m_m_layout.html): the fast multipole multilevel layout algorithm
-   [GEM](https://ogdf.uos.de/doc/classogdf_1_1_g_e_m_layout.html): the energy-based GEM layout algorithm.
-   [MultilevelLayout](https://ogdf.uos.de/doc/classogdf_1_1_multilevel_layout.html): the multilevel drawing framework.
-   [NodeRespecter](https://ogdf.uos.de/doc/classogdf_1_1_node_respecter_layout.html): the NodeRespecterLayout layout algorithm.
-   [PivotMDS](https://ogdf.uos.de/doc/classogdf_1_1_pivot_m_d_s.html): the Pivot MDS (multi-dimensional scaling) layout algorithm.
-   [SpringEmbedderGridVariant](https://ogdf.uos.de/doc/classogdf_1_1_spring_embedder_grid_variant.html): the spring-embedder layout algorithm with force approximation using hte grid variant approach.
-   [SpringEmbedderKK](https://ogdf.uos.de/doc/classogdf_1_1_spring_embedder_k_k.html): the spring-embedder layout algorithm by Kamada and Kawai.
-   [StressMinimization](https://ogdf.uos.de/doc/classogdf_1_1_stress_minimization.html): energy-based layout using stress minimization.

##### Layer-based Layout Algorithms

-   [Sugiyama](https://ogdf.uos.de/doc/classogdf_1_1_sugiyama_layout.html): Sugiyama's layout algorithm.

##### Planar and Planarization-based Layout Algorithms

-   [Planarization](https://ogdf.uos.de/doc/classogdf_1_1_planarization_layout.html): The planarization approach for drawing graphs.
-   [PlanarizationGrid](https://ogdf.uos.de/doc/classogdf_1_1_planarization_grid_layout.html): the planarization grid layout algorithm

Examples can be found in [./examples](https://github.com/ZJUVAI/ogdf.js/tree/master/examples). We use [NetV.js](https://github.com/ZJUVAG/NetV.js) to render the graph.

```JavaScript
// layouts can be called like:
let layout = new ogdf.Layout.SugiyamaLayout({
    graph: miserables,
    parameters: {
        edgeCosts: 100,
        numberOfPivots: 250,
        useEdgeCostsAttribute: true,
        crossMin: new ogdf.Module.LayeredCrossMinModule.MedianHeuristic()
    },
    useWorker: false
})
layout.run().then(graph => {
    // ...
})

// or using import/export
import * as ogdf from 'ogdfjs'
```

To `get`/`set` original layout parameters (defined by [OGDF](https://ogdf.uos.de/)) by `layout.parameters.xxxx`:

```JavaScript
console.log(layout.parameters.minDistCC) // 20
layout.parameters.minDistCC = 10
console.log(layout.parameters.minDistCC) // 10
// To apply changes, the graph should be recalculated
layout.run().then(graph => {
    // ...
})
```

To `get`/`set` our new parameters by `layout.xxxx`:

```JavaScript
console.log(layout.useWorker) // false
layout.useWorker = true
console.log(layout.useWorker) // true
// To apply changes, the graph should be recalculated
layout.run().then(graph => {
    // ...
})
```

To `get`/`set` graph data by `layout.graph()`:

```JavaScript
console.log(layout.graph()) // {nodes: Array(77), links: Array(254)}
layout.graph({
    nodes,
    links
})
```

To get default and current settings of layout parameters, use `layout.value()`:

```JavaScript
value = {
    type: 'MODULE', // PARAMETER_TYPE
    range: [{...},...], // possible value range
    default: { // default value of this module or data
        name: "SugiyamaLayout", // name of this module or data
        parameters: { // parameters of this module
            alignBaseClasses: {type,range,default}
            ...
        }
    },
    value: { // current value of this module or data
        name: "FMMMLayout",
        parameters: {
            ...
        }
    }
}
```

### How to build it?

We suggest you to build ogdf.js with Linux or MacOS (we still have no experience with Windows OS to build the ogdf library, for Windows developers, WSL is suggested). Before building the ogdf.js, you should make sure you have enviroments to build C++ library:

-   Git
-   CMake
-   Compiling tools. GCC (Linux), Xcode (MacOS)
-   Python 2.7.x

#### Building Steps

_NOTE\*: for Windows users, please use WSL to perform step 1~3._

1. Download and install [Emscripten](https://github.com/emscripten-core/emscripten). Here is several main steps, and please refer to [the official document](https://emscripten.org/docs/getting_started/downloads.html) for more details:

    ```bash
    # Get the emsdk repo
    $ cd ..
    $ git clone https://github.com/emscripten-core/emsdk.git

    # Enter that directory
    $ cd emsdk

    # Fetch the latest version of the emsdk (not needed the first time you clone)
    $ git pull

    # Download and install the latest SDK tools.
    $ ./emsdk install latest

    # Make the "latest" SDK "active" for the current user. (writes .emscripten file)
    $ ./emsdk activate latest

    # Activate PATH and other environment variables in the current terminal
    $ source ./emsdk_env.sh
    ```

    To ensure that you have install Emscripten successfully, you can create a folder with a file:

    ```bash
    $ mkdir hello
    $ cd hello
    $ echo '#include <stdio.h>' > hello.c
    $ echo 'int main(int argc, char ** argv) {' >> hello.c
    $ echo 'printf("Hello, world!\n");' >> hello.c
    $ echo '}' >> hello.c
    $ emcc hello.c -s WASM=1 -o hello.html
    $ python -m SimpleHTTPServer 1111 # for python2
    $ python -m http.server 1111 # for python3
    # open your browser, and open http://localhost:1111/hello.html
    ```

    Then you can start a localhost server to view the html.

2. Build ogdf library.

    ```bash
    # cd to ~/packages/ogdf.js
    $ cd ../../ogdf.js
    $ cd packages/ogdf.js/ogdf
    $ mkdir build && cd build
    $ emcmake cmake ..
    $ emmake make
    ```

    Everytime you restart your OS, you should run `./emsdk activate latest` and `source ./emsdk_env.sh` in step one the ensure your environment is correct

    For the "this header is only for x86 only" error, please refer to: [emscripten-issue-9363](https://github.com/emscripten-core/emscripten/issues/9363)

3. Build rawogdf.js

    ```bash
    # cd to ~/packages/ogdf.js
    $ cd ../..
    $ make rawogdf.js
    ```

4. Build ogdf.js
    ```bash
    # cd to ~/
    $ cd ../..
    $ npm install
    $ npm run bootstrap
    $ npm run build
    # open dashboard
    $ npm run watch:dashboard
    ```

#### Server & Testing

```bash
$ npm run test # run all tests
$ npm run server # open a local http server to see examples
$ npm run watch:dashboard # to open the dashboard
```

#### Publish

```bash
$ npm install -g lerna # if you didn't install lerna globally
$ lerna version [major | minor | patch | premajor | preminor | prepatch | prerelease]
$ lerna publish
```

### Progress

-   add other layout algorithms

### License

[MIT License](/LICENSE)
