#include <ogdf/layered/FastSimpleHierarchyLayout.h>
#include <ogdf/layered/SugiyamaLayout.h>
#include <ogdf/layered/CoffmanGrahamRanking.h>
#include <ogdf/layered/LongestPathRanking.h>
#include "../main.h"

EM_PORT_API(SugiyamaLayout *)
LayoutModule_SugiyamaLayout(bool alignBaseClasses, bool alignSiblings, bool arrangeCCs, int fails, unsigned int maxThreads, double minDistCC, double pageRatio, bool permuteFirst, int runs, bool transpose, HierarchyClusterLayoutModule *clusterLayout, LayeredCrossMinModule *crossMin, HierarchyLayoutModule *layout, CCLayoutPackModule *packer, RankingModule *ranking)
{
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

	model->setClusterLayout(clusterLayout);
	model->setCrossMin(crossMin);
	model->setLayout(layout);
	model->setPacker(packer);
	model->setRanking(ranking);

	return model;
}

EM_PORT_API(float *)
SUGI(
	int node_num,
	int link_num,
	int *source,
	int *target,
	bool alignBaseClasses,
	bool alignSiblings,
	bool arrangeCCs,
	int fails,
	unsigned int maxThreads,
	double minDistCC,
	double pageRatio,
	bool permuteFirst,
	int runs,
	bool transpose,
	int clusterLayoutType,
	bool clusterLayoutType_Optimal_fixedLayerDistance,
	double clusterLayoutType_Optimal_layerDistance,
	double clusterLayoutType_Optimal_nodeDistance,
	double clusterLayoutType_Optimal_weightBalancing,
	double clusterLayoutType_Optimal_weightClusters,
	double clusterLayoutType_Optimal_weightSegments,
	int crossMinType,
	int crossMinType_GlobalSifting_nRepeats,
	int crossMinType_GridSifting_verticalStepsBound,
	int layoutType,
	bool layoutType_Fast_fixedLayerDistance,
	double layoutType_Fast_layerDistance,
	double layoutType_Fast_nodeDistance,
	double layoutType_FastSimple_layerDistance,
	double layoutType_FastSimple_nodeDistance,
	bool layoutType_FastSimple_balanced,
	bool layoutType_FastSimple_downward,
	bool layoutType_FastSimple_leftToRight,
	bool layoutType_Optimal_fixedLayerDistance,
	double layoutType_Optimal_layerDistance,
	double layoutType_Optimal_nodeDistance,
	double layoutType_Optimal_weightBalancing,
	double layoutType_Optimal_weightSegments,
	int packerType,
	int rankingType,
	int rankingType_CoffmanGraham_width,
	int rankingType_CoffmanGraham_subgraphType,
	bool rankingType_LongestPath_alignBaseClasses,
	bool rankingType_LongestPath_alignSiblings,
	bool rankingType_LongestPath_optimizeEdgeLength,
	bool rankingType_LongestPath_separateDeg0Layer,
	bool rankingType_LongestPath_separateMultiEdges,
	int rankingType_LongestPath_subgraphType,
	bool rankingType_Optimal_separateMultiEdges,
	int rankingType_Optimal_subgraphType)
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

	HierarchyClusterLayoutModule *clusterLayout = getHierarchyClusterLayout(
		clusterLayoutType,
		clusterLayoutType_Optimal_fixedLayerDistance,
		clusterLayoutType_Optimal_layerDistance,
		clusterLayoutType_Optimal_nodeDistance,
		clusterLayoutType_Optimal_weightBalancing,
		clusterLayoutType_Optimal_weightClusters,
		clusterLayoutType_Optimal_weightSegments);
	model->setClusterLayout(clusterLayout);

	LayeredCrossMinModule *crossMin = getLayeredCrossMin(
		crossMinType,
		crossMinType_GlobalSifting_nRepeats,
		crossMinType_GridSifting_verticalStepsBound);
	model->setCrossMin(crossMin);

	HierarchyLayoutModule *layout = getHierarchyLayout(
		layoutType,
		layoutType_Fast_fixedLayerDistance,
		layoutType_Fast_layerDistance,
		layoutType_Fast_nodeDistance,
		layoutType_FastSimple_layerDistance,
		layoutType_FastSimple_nodeDistance,
		layoutType_FastSimple_balanced,
		layoutType_FastSimple_downward,
		layoutType_FastSimple_leftToRight,
		layoutType_Optimal_fixedLayerDistance,
		layoutType_Optimal_layerDistance,
		layoutType_Optimal_nodeDistance,
		layoutType_Optimal_weightBalancing,
		layoutType_Optimal_weightSegments);
	model->setLayout(layout);

	CCLayoutPackModule *packer = getCCLayoutPack(packerType);
	model->setPacker(packer);

	RankingModule *ranking = getRanking(
		rankingType,
		rankingType_CoffmanGraham_width,
		rankingType_CoffmanGraham_subgraphType,
		rankingType_LongestPath_alignBaseClasses,
		rankingType_LongestPath_alignSiblings,
		rankingType_LongestPath_optimizeEdgeLength,
		rankingType_LongestPath_separateDeg0Layer,
		rankingType_LongestPath_separateMultiEdges,
		rankingType_LongestPath_subgraphType,
		rankingType_Optimal_separateMultiEdges,
		rankingType_Optimal_subgraphType);
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