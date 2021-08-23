#include <ogdf/energybased/GEMLayout.h>
#include "../main.h"

EM_PORT_API(float *) GEM(int node_num, int link_num, int* source, int* target, double* nodesX, double* nodesY, int attractionFormula, double desiredLength, double gravitationalConstant, double initialTemperature, double maximalDisturbance, double minDistCC, double minimalTemperature, int numberOfRounds, double oscillationAngle, double oscillationSensitivity, double pageRatio, double rotationAngle, double rotationSensitivity){
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
	}
	//LayoutModule
	GEMLayout *model = new GEMLayout();

	model->attractionFormula(attractionFormula);
	model->desiredLength(desiredLength);
	model->gravitationalConstant(gravitationalConstant);
	model->initialTemperature(initialTemperature);
	model->maximalDisturbance(maximalDisturbance);
	model->minDistCC(minDistCC);
	model->minimalTemperature(minimalTemperature);
	model->numberOfRounds(numberOfRounds);
	model->oscillationAngle(oscillationAngle);
	model->oscillationSensitivity(oscillationSensitivity);
	model->pageRatio(pageRatio);
	model->rotationAngle(rotationAngle);
	model->rotationSensitivity(rotationSensitivity);

    model->call(GA);

	float* re = (float*)malloc(node_num * 2 * 4);
    for(int i = 0; i < node_num; ++i) {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}
