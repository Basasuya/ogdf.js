#include <ogdf/basic/GraphAttributes.h>
#include <ogdf/graphalg/steiner_tree/EdgeWeightedGraph.h>
#include <ogdf/module/RankingModule.h>
#include <ogdf/module/LayeredCrossMinModule.h>
#include <ogdf/module/HierarchyLayoutModule.h>
#include <ogdf/module/HierarchyClusterLayoutModule.h>
#include <ogdf/module/CCLayoutPackModule.h>
#include <ogdf/module/EmbedderModule.h>
#include <ogdf/module/LayoutPlanRepModule.h>
#include <ogdf/module/GridLayoutModule.h>
#include <ogdf/module/CrossingMinimizationModule.h>
#include <ogdf/module/AugmentationModule.h>
#include <ogdf/module/AcyclicSubgraphModule.h>
#include <ogdf/module/MixedModelCrossingsBeautifierModule.h>
#include <ogdf/module/ShellingOrderModule.h>
#include <ogdf/module/EdgeInsertionModule.h>
#include <ogdf/module/PlanarSubgraphModule.h>
#include <ogdf/energybased/multilevel_mixer/MultilevelBuilder.h>
#include <ogdf/energybased/multilevel_mixer/InitialPlacer.h>
#ifndef EM_PORT_API
#if defined(__EMSCRIPTEN__)
#include <emscripten.h>
#if defined(__cplusplus)
#define EM_PORT_API(rettype) extern "C" rettype EMSCRIPTEN_KEEPALIVE
#else
#define EM_PORT_API(rettype) rettype EMSCRIPTEN_KEEPALIVE
#endif
#else
#if defined(__cplusplus)
#define EM_PORT_API(rettype) extern "C" rettype
#else
#define EM_PORT_API(rettype) rettype
#endif
#endif
#endif

using namespace ogdf;

/**
 * type:
 * 0: CoffmanGrahamRanking
 * 1: LongestPathRanking
 * 2: OptimalRanking
 */
RankingModule *getRanking(
    int type,
    int rankingType_CoffmanGraham_width, 
	int rankingType_CoffmanGraham_subgraphType, 
	bool rankingType_LongestPath_alignBaseClasses, 
	bool rankingType_LongestPath_alignSiblings, 
	bool rankingType_LongestPath_optimizeEdgeLength, 
	bool rankingType_LongestPath_separateDeg0Layer,
	bool rankingType_LongestPath_separateMultiEdges,
	int rankingType_LongestPath_subgraphType,
    bool rankingType_Optimal_separateMultiEdges,
	int rankingType_Optimal_subgraphType
);

/**
 * type:
 * 0: BarycenterHeuristic
 * 1: GlobalSifting
 * 2: GreedyInsertHeuristic
 * 3: GreedySwitchHeuristic
 * 4: GridSifting
 * 5: MedianHeuristic
 * 6: SiftingHeuristic
 * 7: SplitHeuristic
 */
LayeredCrossMinModule *getLayeredCrossMin(
    int type,
    int crossMinType_GlobalSifting_nRepeats, 
	int crossMinType_GridSifting_verticalStepsBound
);

/**
 * type:
 * 0: FastHierarchyLayout
 * 1: FastSimpleHierarchyLayout
 * 2: OptimalHierarchyLayout
 */
HierarchyLayoutModule *getHierarchyLayout(
    int type,
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
	double layoutType_Optimal_weightSegments
);

/**
 * type:
 * 0: OptimalHierarchyClusterLayout
 */
HierarchyClusterLayoutModule *getHierarchyClusterLayout(
    int type,
    bool clusterLayoutType_Optimal_fixedLayerDistance, 
	double clusterLayoutType_Optimal_layerDistance, 
	double clusterLayoutType_Optimal_nodeDistance, 
	double clusterLayoutType_Optimal_weightBalancing, 
	double clusterLayoutType_Optimal_weightClusters, 
	double clusterLayoutType_Optimal_weightSegments
);

/**
 * type:
 * 0: TileToRowsCCPacker
 */
CCLayoutPackModule *getCCLayoutPack(int type);

EmbedderModule *getEmbedder(
    int type,
    double MaxFace_timeLimit,
    double MinDepth_timeLimit,
    double MinDepthPiTa_timeLimit,
    bool MinDepthPiTa_useExtendedDepthDefinition,
    double OptimalFlexDraw_timeLimit,
    double Simple_timeLimit
);

LayoutPlanRepModule *getLayoutPlanRep(int type, int bendBound, double cOverhang, double margin, bool progressive, bool scaling, double separation);

AugmentationModule *getAugmentation(int type);

AcyclicSubgraphModule *getAcyclicSubgraph(int type);

MixedModelCrossingsBeautifierModule *getMixedModelCrossingsBeautifier(int type);

ShellingOrderModule *getShellingOrder(
    int type,
    double Biconnected_baseRatio,
    double Triconnected_baseRatio
);

GridLayoutPlanRepModule *getGridLayoutPlanRep(
    int type,
    double Mixed_separation,
    int Mixed_augmenterType,
    int Mixed_crossingsBeautifierType,
    int Mixed_embedderType,
    double Mixed_embedderType_MaxFace_timeLimit,
    double Mixed_embedderType_MinDepth_timeLimit,
    double Mixed_embedderType_MinDepthPiTa_timeLimit,
    bool Mixed_embedderType_MinDepthPiTa_useExtendedDepthDefinition,
    double Mixed_embedderType_OptimalFlexDraw_timeLimit,
    double Mixed_embedderType_Simple_timeLimit,
    int Mixed_shellingOrderType,
    double Mixed_shellingOrderType_Biconnected_baseRatio,
    double Mixed_shellingOrderType_Triconnected_baseRatio
);

EdgeInsertionModule *getEdgeInsertion(
    int type,
	bool FixedEmbedding_keepEmbedding,
	double FixedEmbedding_percentMostCrossed,
	int FixedEmbedding_removeReinsert,
	double FixedEmbedding_timeLimit,
	double MultiEdgeApprox_percentMostCrossedFix,
	double MultiEdgeApprox_percentMostCrossedVar,
	int MultiEdgeApprox_removeReinsertFix,
	int MultiEdgeApprox_removeReinsertVar,
	bool MultiEdgeApprox_statistics,
	double MultiEdgeApprox_timeLimit,
	double VariableEmbedding_percentMostCrossed,
	int VariableEmbedding_removeReinsert,
	double VariableEmbedding_timeLimit
);

template <typename T>
PlanarSubgraphModule<T> *getPlanarSubgraph(
    int type,
    unsigned int Maximum_maxThreads,
	double Maximum_timeLimit,
	unsigned int BoyerMyrvold_maxThreads,
	double BoyerMyrvold_timeLimit,
	int BoyerMyrvold_runs,
	double BoyerMyrvold_randomness,
	unsigned int Cactus_maxThreads,
	double Cactus_timeLimit,
	unsigned int Empty_maxThreads,
	double Empty_timeLimit,
	unsigned int Fast_maxThreads,
	double Fast_timeLimit,
	int Fast_runs,
	unsigned int Tree_maxThreads,
	double Tree_timeLimit
);

CrossingMinimizationModule *getCrossingMinimization(
    int type,
    int SubgraphPlanarizer_globalInternalLibraryLogLevel,
	int SubgraphPlanarizer_globalLogLevel,
	int SubgraphPlanarizer_globalMinimumLogLevel,
	bool SubgraphPlanarizer_globalStatisticMode,
	int SubgraphPlanarizer_localLogLevel,
	int SubgraphPlanarizer_localLogMode,
	unsigned int SubgraphPlanarizer_maxThreads,
	int SubgraphPlanarizer_permutations,
	bool SubgraphPlanarizer_timeout,
	double SubgraphPlanarizer_timeLimit,
	int SubgraphPlanarizer_inserterType,
	bool SubgraphPlanarizer_inserterType_FixedEmbedding_keepEmbedding,
	double SubgraphPlanarizer_inserterType_FixedEmbedding_percentMostCrossed,
	int SubgraphPlanarizer_inserterType_FixedEmbedding_removeReinsert,
	double SubgraphPlanarizer_inserterType_FixedEmbedding_timeLimit,
	double SubgraphPlanarizer_inserterType_MultiEdgeApprox_percentMostCrossedFix,
	double SubgraphPlanarizer_inserterType_MultiEdgeApprox_percentMostCrossedVar,
	int SubgraphPlanarizer_inserterType_MultiEdgeApprox_removeReinsertFix,
	int SubgraphPlanarizer_inserterType_MultiEdgeApprox_removeReinsertVar,
	bool SubgraphPlanarizer_inserterType_MultiEdgeApprox_statistics,
	double SubgraphPlanarizer_inserterType_MultiEdgeApprox_timeLimit,
	double SubgraphPlanarizer_inserterType_VariableEmbedding_percentMostCrossed,
	int SubgraphPlanarizer_inserterType_VariableEmbedding_removeReinsert,
	double SubgraphPlanarizer_inserterType_VariableEmbedding_timeLimit,
	int SubgraphPlanarizer_subgraphType,
	unsigned int SubgraphPlanarizer_subgraphType_Maximum_maxThreads,
	double SubgraphPlanarizer_subgraphType_Maximum_timeLimit,
	unsigned int SubgraphPlanarizer_subgraphType_BoyerMyrvold_maxThreads,
	double SubgraphPlanarizer_subgraphType_BoyerMyrvold_timeLimit,
	int SubgraphPlanarizer_subgraphType_BoyerMyrvold_runs,
	double SubgraphPlanarizer_subgraphType_BoyerMyrvold_randomness,
	unsigned int SubgraphPlanarizer_subgraphType_Cactus_maxThreads,
	double SubgraphPlanarizer_subgraphType_Cactus_timeLimit,
	unsigned int SubgraphPlanarizer_subgraphType_Empty_maxThreads,
	double SubgraphPlanarizer_subgraphType_Empty_timeLimit,
	unsigned int SubgraphPlanarizer_subgraphType_Fast_maxThreads,
	double SubgraphPlanarizer_subgraphType_Fast_timeLimit,
	int SubgraphPlanarizer_subgraphType_Fast_runs,
	unsigned int SubgraphPlanarizer_subgraphType_Tree_maxThreads,
	double SubgraphPlanarizer_subgraphType_Tree_timeLimit
);

MultilevelBuilder *getMultilevelBuilder(
    int type, 
    int multilevelBuilderType_EdgeCoverMerger_edgeLengthAdjustment, 
    double multilevelBuilderType_EdgeCoverMerger_factor, 
    int multilevelBuilderType_IndependentSetMerger_edgeLengthAdjustment, 
    float multilevelBuilderType_IndependentSetMerger_searchDepthBase, 
    int multilevelBuilderType_LocalBiconnectedMerger_edgeLengthAdjustment, 
    double multilevelBuilderType_LocalBiconnectedMerger_factor, 
    int multilevelBuilderType_MatchingMerger_edgeLengthAdjustment, 
    bool multilevelBuilderType_MatchingMerger_selectByNodeMass, 
    int multilevelBuilderType_RandomMerger_edgeLengthAdjustment, 
    double multilevelBuilderType_RandomMerger_factor, 
    int multilevelBuilderType_SolarMerger_edgeLengthAdjustment
);

InitialPlacer *getInitialPlacer(
    int type,
    bool placerType_BarycenterPlacer_randomOffset, 
    bool placerType_BarycenterPlacer_weightedPositionPriority, 
    double placerType_CirclePlacer_circleSize, 
    int placerType_CirclePlacer_nodeSelection, 
    bool placerType_CirclePlacer_radiusFixed, 
    bool placerType_CirclePlacer_randomOffset, 
    bool placerType_MedianPlacer_randomOffset, 
    bool placerType_RandomPlacer_randomOffset, 
    double placerType_RandomPlacer_circleSize, 
    bool placerType_SolarPlacer_randomOffset, 
    double placerType_ZeroPlacer_randomRange,
    bool placerType_ZeroPlacer_randomOffset
);

LayoutModule *getLayout(int type);