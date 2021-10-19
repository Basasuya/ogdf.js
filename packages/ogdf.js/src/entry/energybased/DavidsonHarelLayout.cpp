#include <ogdf/energybased/DavidsonHarelLayout.h>
#include "../main.h"

EM_PORT_API(DavidsonHarelLayout *)
LayoutModule_DavidsonHarelLayout(int fixSettings, double attractionWeight, bool iterationNumberAsFactor, double nodeOverlapWeight, int numberOfIterations, double planarityWeight, double preferredEdgeLength, double preferredEdgeLengthMultiplier, double repulsionWeight, int speed, int startTemperature)
{
	//LayoutModule
	DavidsonHarelLayout *model = new DavidsonHarelLayout();

	if (fixSettings >= 0)
		model->fixSettings(static_cast<DavidsonHarelLayout::SettingsParameter>(fixSettings));
	model->setAttractionWeight(attractionWeight);
	model->setIterationNumberAsFactor(iterationNumberAsFactor);
	model->setNodeOverlapWeight(nodeOverlapWeight);
	model->setNumberOfIterations(numberOfIterations);
	model->setPlanarityWeight(planarityWeight);
	model->setPreferredEdgeLength(preferredEdgeLength);
	model->setPreferredEdgeLengthMultiplier(preferredEdgeLengthMultiplier);
	model->setRepulsionWeight(repulsionWeight);
	model->setSpeed(static_cast<DavidsonHarelLayout::SpeedParameter>(speed));
	model->setStartTemperature(startTemperature);
	return model;
}

EM_PORT_API(float *)
DH(int node_num, int link_num, int *source, int *target, int fixSettings, double attractionWeight, bool iterationNumberAsFactor, double nodeOverlapWeight, int numberOfIterations, double planarityWeight, double preferredEdgeLength, double preferredEdgeLengthMultiplier, double repulsionWeight, int speed, int startTemperature)
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
	}
	//LayoutModule
	DavidsonHarelLayout *model = new DavidsonHarelLayout();

	if (fixSettings >= 0)
		model->fixSettings(static_cast<DavidsonHarelLayout::SettingsParameter>(fixSettings));
	model->setAttractionWeight(attractionWeight);
	model->setIterationNumberAsFactor(iterationNumberAsFactor);
	model->setNodeOverlapWeight(nodeOverlapWeight);
	model->setNumberOfIterations(numberOfIterations);
	model->setPlanarityWeight(planarityWeight);
	model->setPreferredEdgeLength(preferredEdgeLength);
	model->setPreferredEdgeLengthMultiplier(preferredEdgeLengthMultiplier);
	model->setRepulsionWeight(repulsionWeight);
	model->setSpeed(static_cast<DavidsonHarelLayout::SpeedParameter>(speed));
	model->setStartTemperature(startTemperature);

	model->call(GA);

	float *re = (float *)malloc(node_num * 2 * 4);
	for (int i = 0; i < node_num; ++i)
	{
		re[i * 2] = GA.x(nodes[i]);
		re[i * 2 + 1] = GA.y(nodes[i]);
	}

	return re;
}