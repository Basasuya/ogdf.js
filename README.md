# ogdf.js

### Introduction

The project is actively developing. My idea is to compile the ogdf library into javascript using [emscripten](https://github.com/emscripten-core/emscripten). Now the library is compiled to  ogdf.js(WASM based) successfully. More details will be updated later.

You can see the layout performance in [the random square graph](./squareLayout.html) and [facebook network](./facebookLayout.html)(use python -m http.server). They use the FM3 graph layout algorithm from the ogdf library and get a faster performance compared to some algorithms such as D3 force in the browser.

<img src="./doc/facebook.png">

### How to use

now I have writen two layout: [FM3](<https://www.semanticscholar.org/paper/Drawing-Large-Graphs-with-a-Potential-Field-Based-Hachul-J%C3%BCnger/3a389251f7e3879622eff52da5493cdc56a0ace4>), [Pviot MDS](<http://mrvar.fdv.uni-lj.si/pajek/community/DrawPivotMDS.htm>)

```js
initOGDF().then(function (Module) {
    	...
    	// we assume the nodes, links store the data similar to usage in d3.force 
    	let nodes = graph.nodes.length
        let links = graph.links.length
        let source = Module._malloc(4 * links);
        let target = Module._malloc(4 * links);
    
    	// store the edge information to wasm array
        for (let i = 0; i < links; ++i) {
            Module.HEAP32[source / 4 + i] = dic[graph.links[i].source]; 
            Module.HEAP32[target / 4 + i] = dic[graph.links[i].target];
        }
        let result = Module._FM3(nodes, links, source, target);
    	// or: let result = Module._PMDS(nodes, links, source, target);
    	
    	// get nodes position from result
    	for (let i = 0; i < nodes; ++i) {
            graph.nodes[i]['x'] = Module.HEAPF32[(result >> 2) + i * 2]
            graph.nodes[i]['y'] = Module.HEAPF32[(result >> 2) + i * 2 + 1];
        }
    	...
    	
    	Module._free(source);
        Module._free(target);
        Module._free_buf(result);
    
});
```



### Progress

* add PMDS algorithm
* use initOGDF to start which can use mutiple times in browser(better than Module onRuntime)