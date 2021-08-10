#include <ogdf/upward/LayerBasedUPRLayout.h>
#include "../main.h"

EM_PORT_API(float *)
LBUPR(int node_num, int link_num, int *source, int *target, double *nodesX, double *nodesY, double *nodesWidth, double *nodesHeight, int hierarchyLayoutType, bool fixedLayerDistance, double layerDistance, double nodeDistance, bool balanced, bool downward, bool leftToRight, double weightBalancing, double weightSegments, int rankingType, int width, bool alignBaseClasses, bool alignSiblings, bool optimizeEdgeLength, bool separateDeg0Layer, bool separateMultiEdges, int subgraphType)
{
	node *nodes;
	Graph G;
	GraphAttributes GA(G, GraphAttributes::nodeGraphics |
							  GraphAttributes::edgeGraphics |
							  GraphAttributes::nodeStyle |
							  GraphAttributes::edgeStyle |
							  GraphAttributes::nodeLabel |
							  GraphAttributes::edgeLabel);

	nodes = new node[node_num];
	for (int i = 0; i < node_num; i++)
	{
		nodes[i] = G.newNode();
		GA.x(nodes[i]) = nodesX[i];
		GA.y(nodes[i]) = nodesY[i];
		GA.width(nodes[i]) = nodesWidth[i];
		GA.height(nodes[i]) = nodesHeight[i];
	}

	edge e;

	for (int i = 0; i < link_num; i++)
	{
		e = G.newEdge(nodes[source[i]], nodes[target[i]]);
		GA.bends(e);
	}

	UpwardPlanRep UPR;
	UPR.init(G);


	//LayoutModule
	LayerBasedUPRLayout *model = new LayerBasedUPRLayout();

	HierarchyLayoutModule *layout = getHierarchyLayout(hierarchyLayoutType, fixedLayerDistance, layerDistance, nodeDistance, balanced, downward, leftToRight, weightBalancing, weightSegments);
	model->setLayout(layout);

	RankingModule *ranking = getRanking(rankingType, width, alignBaseClasses, alignSiblings, optimizeEdgeLength, separateDeg0Layer, separateMultiEdges, subgraphType);
	model->setRanking(ranking);

	model->call(UPR, GA);
	//model->UPRLayoutSimple(UPR,GA);

	float *re = (float *)malloc(node_num * 2 * 4);
	for (int i = 0; i < node_num; ++i)
	{
		re[i * 2] = GA.x(nodes[i]);
		re[i * 2 + 1] = GA.y(nodes[i]);
	}

	return re;
}