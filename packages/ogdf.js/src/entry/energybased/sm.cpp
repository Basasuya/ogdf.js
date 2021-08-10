#include <ogdf/energybased/StressMinimization.h>
#include "../main.h"

EM_PORT_API(float*) SM(int node_num, int link_num, int* source, int* target, double* edgesWeight, double* nodesX, double* nodesY, int terminationCriterion, bool fixXCoords, bool fixYCoords, bool fixZCoords, bool hasInitialLayout, bool layoutComponentsSeparately, double edgeCosts, int numberOfIterations, bool useEdgeCostsAttribute){
	node* nodes;
	Graph G;
	GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics | GraphAttributes::edgeDoubleWeight);

	nodes = new node[node_num];
	for (int i = 0; i < node_num; i++){
		nodes[i] = G.newNode();
		GA.x(nodes[i]) = nodesX[i];
		GA.y(nodes[i]) = nodesY[i];
	}

	edge e;

	for (int i = 0; i < link_num; i++) {
		e = G.newEdge(nodes[source[i]], nodes[target[i]]);
		GA.bends(e);
		GA.doubleWeight(e) = edgesWeight[i];
	}
	//LayoutModule
	StressMinimization *model = new StressMinimization();

	model->convergenceCriterion(static_cast<StressMinimization::TerminationCriterion>(terminationCriterion));
	model->fixXCoordinates(fixXCoords);
	model->fixYCoordinates(fixYCoords);
	model->fixZCoordinates(fixZCoords);
	model->hasInitialLayout(hasInitialLayout);
	model->layoutComponentsSeparately(layoutComponentsSeparately);
	model->setEdgeCosts(edgeCosts);
	model->setIterations(numberOfIterations);
	model->useEdgeCostsAttribute(useEdgeCostsAttribute);

    model->call(GA);

	float* re = (float*)malloc(node_num * 2 * 4);
    for(int i = 0; i < node_num; ++i) {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}
