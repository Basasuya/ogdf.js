# ogdf.js

### Introduction

The project is forked from [Basasuya/ogdf.js](https://github.com/Basasuya/ogdf.js). The idea of this project is to compile the C++ library [OGDF](https://ogdf.uos.de/) into a JavaScript library. The former stands both for Open Graph Drawing Framework (the original name) and Open Graph algorithms and Data structures Framework.

We now aim to use [emscripten](https://emscripten.org/) to compile the Layout part of OGDF into ogdf.js.

### How to use

Two layout algorithms are supported now:

-   [FMMM](https://ogdf.uos.de/doc/classogdf_1_1_f_m_m_m_layout.html): the fast multipole multilevel layout algorithm
-   [PivotMDS](https://ogdf.uos.de/doc/classogdf_1_1_pivot_m_d_s.html): the Pivot MDS (multi-dimensional scaling) layout algorithm.

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
```

### How to build it?

We suggest you to build ogdf.js with Linux or MacOS (For Windows developers, WSL1/2 is suggested). Before building the ogdf.js, you should make sure you have enviroments to build C++ library:

-   Git
-   CMake
-   Compiling tools. GCC (Linux), Xcode (MacOS)
-   Python 2.7.x

#### Building Steps

1. Download and install [Emscripten](https://github.com/emscripten-core/emscripten). Here is several main steps, and please refer to [the official document](https://emscripten.org/docs/getting_started/downloads.html) for more details:

    ```bash
    # Get the emsdk repo
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

    On Windows, you should replace `./emsdk` with `emsdk` and replace `source ./emsdk_env.sh` with `emsdk_env`. To ensure that you have install Emscripten successfully, you can create a folder with a file:

    ```bash
    $ mkdir hello
    $ cd hello
    $ echo '#include <stdio.h>' > hello.c
    $ echo 'int main(int argc, char ** argv) {' >> hello.c
    $ echo 'printf("Hello, world!\n");' >> hello.c
    $ echo '}' >> hello.c
    $ emcc hello.c -s WASM=1 -o hello.html
    ```

2. Build ogdf library.

    ```bash
    $ cd ogdf
    $ mkdir build && cd build
    $ emcmake cmake ..
    $ emmake make
    ```

    Everytime you restart your OS, you should run `./emsdk activate latest` and `source ./emsdk_env.sh` in step one the ensure your environment is correct

    For the "this header is only for x86 only" error, please refer to: [emscripten-issue-9363](https://github.com/emscripten-core/emscripten/issues/9363)

3. Build ogdf.js
    ```bash
    $ make ogdf.js
    ```

### Progress

-   add other layout algorithms
