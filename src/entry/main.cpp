
#include <ogdf/basic/GraphAttributes.h>
#include <ogdf/energybased/FMMMLayout.h>
#include <ogdf/energybased/PivotMDS.h>
using namespace ogdf;

#ifndef EM_PORT_API
#	if defined(__EMSCRIPTEN__)
#		include <emscripten.h>
#		if defined(__cplusplus)
#			define EM_PORT_API(rettype) extern "C" rettype EMSCRIPTEN_KEEPALIVE
#		else
#			define EM_PORT_API(rettype) rettype EMSCRIPTEN_KEEPALIVE
#		endif
#	else
#		if defined(__cplusplus)
#			define EM_PORT_API(rettype) extern "C" rettype
#		else
#			define EM_PORT_API(rettype) rettype
#		endif
#	endif
#endif

EM_PORT_API(float*) FM3(int node_num, int link_num, int* source, int* target, bool useHighLevelOptions, bool singleLevel){ //, string pageFormat) {
	node* nodes;
	Graph G;
	GraphAttributes GA(G,
		GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics);

		
	nodes = new node[node_num];
	for (int i = 0; i < node_num; i++){
		nodes[i] = G.newNode();
	}

	edge e;

	for (int i = 0; i < link_num; i++) {
		e = G.newEdge(nodes[source[i]], nodes[target[i]]);
		GA.bends(e);
	}
	//LayoutModule
	FMMMLayout *model = new FMMMLayout();

	// parameters
	model->useHighLevelOptions(useHighLevelOptions);
	model->setSingleLevel(singleLevel);
	// if (strcmp(pageFormat, "Landscape")) {
	// 	model->pageFormat(FMMMOptions::PageFormatType::Landscape);
	// } else if (strcmp(pageFormat, "Portrait")) {
	// 	model->pageFormat(FMMMOptions::PageFormatType::Portrait);
	// } else {
	// 	model->pageFormat(FMMMOptions::PageFormatType::Square);
	// }
    // model.unitEdgeLength(15.0);
    // model.newInitialPlacement(true);
    // model.qualityVersusSpeed(FMMMOptions::QualityVsSpeed::GorgeousAndEfficient);

    model->call(GA);

	float* re = (float*)malloc(node_num * 2 * 4);
    for(int i = 0; i < node_num; ++i) {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}

EM_PORT_API(void) free_buf(void* buf) {
    free(buf);
}


EM_PORT_API(float*) PMDS(int node_num, int link_num, int* source, int* target) {
	node* nodes;
	Graph G;
	GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics);

		
	nodes = new node[node_num];
	for (int i = 0; i < node_num; i++){
		nodes[i] = G.newNode();
	}

	edge e;

	for (int i = 0; i < link_num; i++) {
		e = G.newEdge(nodes[source[i]], nodes[target[i]]);
		GA.bends(e);
	}
	//LayoutModule
	PivotMDS *model = new PivotMDS();

    model->call(GA);

	float* re = (float*)malloc(node_num * 2 * 4);
    for(int i = 0; i < node_num; ++i) {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}
