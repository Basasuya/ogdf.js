#include <ogdf/energybased/SpringEmbedderKK.h>
#include "../main.h"

EM_PORT_API(float*) SEKK(int node_num, int link_num, int* source, int* target, double* nodesX, double* nodesY, double* nodesWidth, double* nodesHeight, bool computeMaxIterations, double desLength, int globalIterationFactor, int maxGlobalIterations, int maxLocalIterations, double stopTolerance, bool useLayout, double zeroLength) {
	node* nodes;
	Graph G;
	GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics);

	nodes = new node[node_num];
	for (int i = 0; i < node_num; i++){
		nodes[i] = G.newNode();
		GA.x(nodes[i]) = nodesX[i];
		GA.y(nodes[i]) = nodesY[i];
		GA.width(nodes[i]) = nodesWidth[i];
		GA.height(nodes[i]) = nodesHeight[i];
	}

	edge e;

	for (int i = 0; i < link_num; i++) {
		e = G.newEdge(nodes[source[i]], nodes[target[i]]);
		GA.bends(e);
	}
	//LayoutModule
	SpringEmbedderKK *model = new SpringEmbedderKK();
	
	model->computeMaxIterations(computeMaxIterations);
    model->setDesLength(desLength);
    model->setGlobalIterationFactor(globalIterationFactor);
    model->setMaxGlobalIterations(maxGlobalIterations);
    model->setMaxLocalIterations(maxLocalIterations);
    model->setStopTolerance(stopTolerance);
    model->setUseLayout(useLayout);
    model->setZeroLength(zeroLength);

    model->call(GA);

	float* re = (float*)malloc(node_num * 2 * 4);
    for(int i = 0; i < node_num; ++i) {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}