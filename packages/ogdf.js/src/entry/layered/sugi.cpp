#include <ogdf/layered/FastSimpleHierarchyLayout.h>
#include <ogdf/layered/SugiyamaLayout.h>
#include <ogdf/layered/CoffmanGrahamRanking.h>
#include <ogdf/layered/LongestPathRanking.h>
#include "../main.h"

EM_PORT_API(float *) SUGI(int node_num, int link_num, int *source, int *target, bool alignBaseClasses, bool alignSiblings, bool arrangeCCs, int fails, unsigned int maxThreads, double minDistCC, double pageRatio, bool permuteFirst, int runs, bool transpose, int clusterLayoutType, bool fixedLayerDistance, double layerDistance, double nodeDistance, double weightBalancing, double weightClusters, double weightSegments, int crossMinType, int nRepeats, int verticalStepsBound, int layoutType, bool balanced, bool downward, bool leftToRight, int packerType, int rankingType, int width, int subgraphType, bool optimizeEdgeLength, bool separateDeg0Layer, bool separateMultiEdges)
{
	node *nodes;
	Graph G;
	GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics);

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
	SugiyamaLayout *model = new SugiyamaLayout();

	model->alignBaseClasses(alignBaseClasses);
	model->alignSiblings(alignSiblings);
	model->arrangeCCs(arrangeCCs);
	model->fails(fails);
	model->maxThreads(maxThreads);
	model->minDistCC(minDistCC);
	model->pageRatio(pageRatio);
	model->permuteFirst(permuteFirst);
	model->runs(runs);
	model->transpose(transpose);

	HierarchyClusterLayoutModule *clusterLayout = getHierarchyClusterLayout(clusterLayoutType, fixedLayerDistance, layerDistance, nodeDistance, weightBalancing, weightClusters, weightSegments);
	model->setClusterLayout(clusterLayout);

	LayeredCrossMinModule *crossMin = getLayeredCrossMin(crossMinType, nRepeats, verticalStepsBound);
	model->setCrossMin(crossMin);

	HierarchyLayoutModule *layout = getHierarchyLayout(layoutType, fixedLayerDistance, layerDistance, nodeDistance, balanced, downward, leftToRight, weightBalancing, weightSegments);
	model->setLayout(layout);

	CCLayoutPackModule *packer = getCCLayoutPack(packerType);
	model->setPacker(packer);

	RankingModule *ranking = getRanking(rankingType, width, alignBaseClasses, alignSiblings, optimizeEdgeLength, separateDeg0Layer, separateMultiEdges, subgraphType);
	model->setRanking(ranking);

	model->call(GA);

	float *re = (float *)malloc(node_num * 2 * 4);
	for (int i = 0; i < node_num; ++i)
	{
		re[i * 2] = GA.x(nodes[i]);
		re[i * 2 + 1] = GA.y(nodes[i]);
	}

	return re;
}