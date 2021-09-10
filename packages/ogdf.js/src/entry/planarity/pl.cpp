#include <ogdf/planarity/PlanarizationLayout.h>
#include "../main.h"

EM_PORT_API(PlanarizationLayout *)
LayoutModule_PlanarizationLayout(int minCliqueSize, double pageRatio, CrossingMinimizationModule *crossMin, CCLayoutPackModule *packer, EmbedderModule *embedder, LayoutPlanRepModule *planarLayouter)
{
	//LayoutModule
	PlanarizationLayout *model = new PlanarizationLayout();

	model->minCliqueSize(minCliqueSize);
	model->pageRatio(pageRatio);

	model->setCrossMin(crossMin);
	model->setPacker(packer);
	model->setEmbedder(embedder);
	model->setPlanarLayouter(planarLayouter);

	return model;
}

EM_PORT_API(float *)
PL(
	int node_num,
	int link_num,
	int *source,
	int *target,
	int minCliqueSize,
	double pageRatio,
	int crossMinType,
	int crossMinType_SubgraphPlanarizer_globalInternalLibraryLogLevel,
	int crossMinType_SubgraphPlanarizer_globalLogLevel,
	int crossMinType_SubgraphPlanarizer_globalMinimumLogLevel,
	bool crossMinType_SubgraphPlanarizer_globalStatisticMode,
	int crossMinType_SubgraphPlanarizer_localLogLevel,
	int crossMinType_SubgraphPlanarizer_localLogMode,
	unsigned int crossMinType_SubgraphPlanarizer_maxThreads,
	int crossMinType_SubgraphPlanarizer_permutations,
	bool crossMinType_SubgraphPlanarizer_timeout,
	double crossMinType_SubgraphPlanarizer_timeLimit,
	int crossMinType_SubgraphPlanarizer_inserterType,
	bool crossMinType_SubgraphPlanarizer_inserterType_FixedEmbedding_keepEmbedding,
	double crossMinType_SubgraphPlanarizer_inserterType_FixedEmbedding_percentMostCrossed,
	int crossMinType_SubgraphPlanarizer_inserterType_FixedEmbedding_removeReinsert,
	double crossMinType_SubgraphPlanarizer_inserterType_FixedEmbedding_timeLimit,
	double crossMinType_SubgraphPlanarizer_inserterType_MultiEdgeApprox_percentMostCrossedFix,
	double crossMinType_SubgraphPlanarizer_inserterType_MultiEdgeApprox_percentMostCrossedVar,
	int crossMinType_SubgraphPlanarizer_inserterType_MultiEdgeApprox_removeReinsertFix,
	int crossMinType_SubgraphPlanarizer_inserterType_MultiEdgeApprox_removeReinsertVar,
	bool crossMinType_SubgraphPlanarizer_inserterType_MultiEdgeApprox_statistics,
	double crossMinType_SubgraphPlanarizer_inserterType_MultiEdgeApprox_timeLimit,
	double crossMinType_SubgraphPlanarizer_inserterType_VariableEmbedding_percentMostCrossed,
	int crossMinType_SubgraphPlanarizer_inserterType_VariableEmbedding_removeReinsert,
	double crossMinType_SubgraphPlanarizer_inserterType_VariableEmbedding_timeLimit,
	int crossMinType_SubgraphPlanarizer_subgraphType,
	unsigned int crossMinType_SubgraphPlanarizer_subgraphType_Maximum_maxThreads,
	double crossMinType_SubgraphPlanarizer_subgraphType_Maximum_timeLimit,
	unsigned int crossMinType_SubgraphPlanarizer_subgraphType_BoyerMyrvold_maxThreads,
	double crossMinType_SubgraphPlanarizer_subgraphType_BoyerMyrvold_timeLimit,
	int crossMinType_SubgraphPlanarizer_subgraphType_BoyerMyrvold_runs,
	double crossMinType_SubgraphPlanarizer_subgraphType_BoyerMyrvold_randomness,
	unsigned int crossMinType_SubgraphPlanarizer_subgraphType_Cactus_maxThreads,
	double crossMinType_SubgraphPlanarizer_subgraphType_Cactus_timeLimit,
	unsigned int crossMinType_SubgraphPlanarizer_subgraphType_Empty_maxThreads,
	double crossMinType_SubgraphPlanarizer_subgraphType_Empty_timeLimit,
	unsigned int crossMinType_SubgraphPlanarizer_subgraphType_Fast_maxThreads,
	double crossMinType_SubgraphPlanarizer_subgraphType_Fast_timeLimit,
	int crossMinType_SubgraphPlanarizer_subgraphType_Fast_runs,
	unsigned int crossMinType_SubgraphPlanarizer_subgraphType_Tree_maxThreads,
	double crossMinType_SubgraphPlanarizer_subgraphType_Tree_timeLimit,
	int embedderType,
	double embedderType_MaxFace_timeLimit,
	double embedderType_MinDepth_timeLimit,
	double embedderType_MinDepthPiTa_timeLimit,
	bool embedderType_MinDepthPiTa_useExtendedDepthDefinition,
	double embedderType_OptimalFlexDraw_timeLimit,
	double embedderType_Simple_timeLimit,
	int packerType,
	int planarLayouterType,
	int planarLayouterType_Ortho_bendBound,
	double planarLayouterType_Ortho_cOverhang,
	double planarLayouterType_Ortho_margin,
	bool planarLayouterType_Ortho_progressive,
	bool planarLayouterType_Ortho_scaling,
	double planarLayouterType_Ortho_separation)
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
	PlanarizationLayout *model = new PlanarizationLayout();

	model->minCliqueSize(minCliqueSize);
	model->pageRatio(pageRatio);

	CrossingMinimizationModule *crossMin = getCrossingMinimization(
		crossMinType,
		crossMinType_SubgraphPlanarizer_globalInternalLibraryLogLevel,
		crossMinType_SubgraphPlanarizer_globalLogLevel,
		crossMinType_SubgraphPlanarizer_globalMinimumLogLevel,
		crossMinType_SubgraphPlanarizer_globalStatisticMode,
		crossMinType_SubgraphPlanarizer_localLogLevel,
		crossMinType_SubgraphPlanarizer_localLogMode,
		crossMinType_SubgraphPlanarizer_maxThreads,
		crossMinType_SubgraphPlanarizer_permutations,
		crossMinType_SubgraphPlanarizer_timeout,
		crossMinType_SubgraphPlanarizer_timeLimit,
		crossMinType_SubgraphPlanarizer_inserterType,
		crossMinType_SubgraphPlanarizer_inserterType_FixedEmbedding_keepEmbedding,
		crossMinType_SubgraphPlanarizer_inserterType_FixedEmbedding_percentMostCrossed,
		crossMinType_SubgraphPlanarizer_inserterType_FixedEmbedding_removeReinsert,
		crossMinType_SubgraphPlanarizer_inserterType_FixedEmbedding_timeLimit,
		crossMinType_SubgraphPlanarizer_inserterType_MultiEdgeApprox_percentMostCrossedFix,
		crossMinType_SubgraphPlanarizer_inserterType_MultiEdgeApprox_percentMostCrossedVar,
		crossMinType_SubgraphPlanarizer_inserterType_MultiEdgeApprox_removeReinsertFix,
		crossMinType_SubgraphPlanarizer_inserterType_MultiEdgeApprox_removeReinsertVar,
		crossMinType_SubgraphPlanarizer_inserterType_MultiEdgeApprox_statistics,
		crossMinType_SubgraphPlanarizer_inserterType_MultiEdgeApprox_timeLimit,
		crossMinType_SubgraphPlanarizer_inserterType_VariableEmbedding_percentMostCrossed,
		crossMinType_SubgraphPlanarizer_inserterType_VariableEmbedding_removeReinsert,
		crossMinType_SubgraphPlanarizer_inserterType_VariableEmbedding_timeLimit,
		crossMinType_SubgraphPlanarizer_subgraphType,
		crossMinType_SubgraphPlanarizer_subgraphType_Maximum_maxThreads,
		crossMinType_SubgraphPlanarizer_subgraphType_Maximum_timeLimit,
		crossMinType_SubgraphPlanarizer_subgraphType_BoyerMyrvold_maxThreads,
		crossMinType_SubgraphPlanarizer_subgraphType_BoyerMyrvold_timeLimit,
		crossMinType_SubgraphPlanarizer_subgraphType_BoyerMyrvold_runs,
		crossMinType_SubgraphPlanarizer_subgraphType_BoyerMyrvold_randomness,
		crossMinType_SubgraphPlanarizer_subgraphType_Cactus_maxThreads,
		crossMinType_SubgraphPlanarizer_subgraphType_Cactus_timeLimit,
		crossMinType_SubgraphPlanarizer_subgraphType_Empty_maxThreads,
		crossMinType_SubgraphPlanarizer_subgraphType_Empty_timeLimit,
		crossMinType_SubgraphPlanarizer_subgraphType_Fast_maxThreads,
		crossMinType_SubgraphPlanarizer_subgraphType_Fast_timeLimit,
		crossMinType_SubgraphPlanarizer_subgraphType_Fast_runs,
		crossMinType_SubgraphPlanarizer_subgraphType_Tree_maxThreads,
		crossMinType_SubgraphPlanarizer_subgraphType_Tree_timeLimit);
	model->setCrossMin(crossMin);

	EmbedderModule *embedder = getEmbedder(
		embedderType,
		embedderType_MaxFace_timeLimit,
		embedderType_MinDepth_timeLimit,
		embedderType_MinDepthPiTa_timeLimit,
		embedderType_MinDepthPiTa_useExtendedDepthDefinition,
		embedderType_OptimalFlexDraw_timeLimit,
		embedderType_Simple_timeLimit);
	model->setEmbedder(embedder);

	CCLayoutPackModule *packer = getCCLayoutPack(packerType);
	model->setPacker(packer);

	LayoutPlanRepModule *planarLayouter = getLayoutPlanRep(
		planarLayouterType,
		planarLayouterType_Ortho_bendBound,
		planarLayouterType_Ortho_cOverhang,
		planarLayouterType_Ortho_margin,
		planarLayouterType_Ortho_progressive,
		planarLayouterType_Ortho_scaling,
		planarLayouterType_Ortho_separation);
	model->setPlanarLayouter(planarLayouter);

	model->call(GA);

	float *re = (float *)malloc(node_num * 2 * 4);
	for (int i = 0; i < node_num; ++i)
	{
		re[i * 2] = GA.x(nodes[i]);
		re[i * 2 + 1] = GA.y(nodes[i]);
	}

	return re;
}