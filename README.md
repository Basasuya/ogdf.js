# ogdf.js

### Introduction

The project is forked from [Basasuya/ogdf.js](https://github.com/Basasuya/ogdf.js). The idea of this project is to compile the C++ library [OGDF](https://ogdf.uos.de/) into a JavaScript library. The former stands both for Open Graph Drawing Framework (the original name) and Open Graph algorithms and Data structures Framework.

We now aim to use [emscripten](https://emscripten.org/) to compile the **Layout** part of OGDF into ogdf.js.

### How to use

Two layout algorithms are supported now:

-   [FMMM](https://ogdf.uos.de/doc/classogdf_1_1_f_m_m_m_layout.html) (`fm3`): the fast multipole multilevel layout algorithm
-   [PivotMDS](https://ogdf.uos.de/doc/classogdf_1_1_pivot_m_d_s.html) (`pmds`): the Pivot MDS (multi-dimensional scaling) layout algorithm.

Examples can be found in [./examples](./examples). We use [NetV.js](https://github.com/ZJUVAG/NetV.js) to render the graph.

```JavaScript
// layouts can be called like:
fm3(/* graph data */ { nodes: facebook.nodes, links: facebook.links },
    /* parameters */ { qualityVersusSpeed: "GorgeousAndEfficient" },
    /* callback */ (graph) => {
        netv.data(graph)
        netv.draw()
    }
)

// or using import/export
import * as ogdf from 'ogdfjs'
ogdf.fm3(/* .... */) {
    // ...
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

### Progress

-   add other layout algorithms
