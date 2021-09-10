#include <ogdf/energybased/PivotMDS.h>
#include "../main.h"

EM_PORT_API(PivotMDS *)
LayoutModule_PivotMDS(double edgeCosts, int numberOfPivots, bool useEdgeCostsAttribute)
{
	//LayoutModule
	PivotMDS *model = new PivotMDS();

	model->setEdgeCosts(edgeCosts);
	model->setNumberOfPivots(numberOfPivots);
	model->useEdgeCostsAttribute(useEdgeCostsAttribute);

	return model;
}

EM_PORT_API(float *)
PMDS(int node_num, int link_num, int *source, int *target, double *edgesWeight, double edgeCosts, int numberOfPivots, bool useEdgeCostsAttribute)
{
	node *nodes;
	Graph G;
	GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics | GraphAttributes::edgeDoubleWeight);

	nodes = new node[node_num];
	for (int i = 0; i < node_num; i++)
	{
		nodes[i] = G.newNode();
	}

	edge e;

	for (int i = 0; i < link_num; i++)
	{
		e = G.newEdge(nodes[source[i]], nodes[target[i]]);
		GA.bends(e);
		GA.doubleWeight(e) = edgesWeight[i];
	}
	//LayoutModule
	PivotMDS *model = new PivotMDS();

	model->setEdgeCosts(edgeCosts);
	model->setNumberOfPivots(numberOfPivots);
	model->useEdgeCostsAttribute(true);

	model->call(GA);

	float *re = (float *)malloc(node_num * 2 * 4);
	for (int i = 0; i < node_num; ++i)
	{
		re[i * 2] = GA.x(nodes[i]);
		re[i * 2 + 1] = GA.y(nodes[i]);
	}

	return re;
}