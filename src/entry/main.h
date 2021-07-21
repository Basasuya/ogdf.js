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
#ifndef EM_PORT_API
#	if defined(__EMSCRIPTEN__)
#		include <emscripten.h>
#		if defined(__cplusplus)
#			define EM_PORT_API(rettype) extern "C" rettype EMSCRIPTEN_KEEPALIVE
#		else
#			define EM_PORT_API(rettype) rettype EMSCRIPTEN_KEEPALIVE
#		endif
#	else
#		if defined(__cplusplus)
#			define EM_PORT_API(rettype) extern "C" rettype
#		else
#			define EM_PORT_API(rettype) rettype
#		endif
#	endif
#endif

using namespace ogdf;

/**
 * type:
 * 0: CoffmanGrahamRanking
 * 1: LongestPathRanking
 * 2: OptimalRanking
 */
RankingModule* getRanking(int type, int width, bool alignBaseClasses, bool alignSiblings, bool optimizeEdgeLength, bool separateDeg0Layer, bool separateMultiEdges, int subgraphType);

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
LayeredCrossMinModule* getLayeredCrossMin(int type, int nRepeats, int verticalStepsBound);

/**
 * type:
 * 0: FastHierarchyLayout
 * 1: FastSimpleHierarchyLayout
 * 2: OptimalHierarchyLayout
 */
HierarchyLayoutModule* getHierarchyLayout(int type, bool fixedLayerDistance, double layerDistance, double nodeDistance, bool balanced, bool downward, bool leftToRight, double weightBalancing, double weightSegments);

/**
 * type:
 * 0: OptimalHierarchyClusterLayout
 */
HierarchyClusterLayoutModule* getHierarchyClusterLayout(int type, bool fixedLayerDistance, double layerDistance, double nodeDistance, double weightBalancing, double weightClusters, double weightSegments);

/**
 * type:
 * 0: TileToRowsCCPacker
 */
CCLayoutPackModule* getCCLayoutPack(int type);

EmbedderModule* getEmbedder(int type, double timeLimit, bool useExtendedDepthDefinition);

LayoutPlanRepModule* getLayoutPlanRep(int type, int bendBound, double cOverhang, double margin, bool progressive, bool scaling, double separation);

AugmentationModule* getAugmentation(int type);

AcyclicSubgraphModule* getAcyclicSubgraph(int type);

MixedModelCrossingsBeautifierModule* getMixedModelCrossingsBeautifier(int type);

ShellingOrderModule* getShellingOrder(int type, double baseRatio);

GridLayoutPlanRepModule* getGridLayoutPlanRep(int type, double separation, int augmenterType, int crossingsBeautifierType, int embedderType, double timeLimit, bool useExtendedDepthDefinition, int shellingOrderType, double baseRatio);

EdgeInsertionModule* getEdgeInsertion(int type, bool keepEmbedding, double percentMostCrossed, int removeReinsert, double timeLimit, double percentMostCrossedFix, double percentMostCrossedVar, int removeReinsertFix, int removeReinsertVar, bool statistics, int runsPostprocessing);

template<typename T>
PlanarSubgraphModule<T>* getPlanarSubgraph(int type, unsigned int maxThreads, double timeLimit, int runs, double randomness);

CrossingMinimizationModule* getCrossingMinimization(int type, int globalInternalLibraryLogLevel, int globalLogLevel, int globalMinimumLogLevel, bool globalStatisticMode, int localLogLevel, int localLogMode, unsigned int maxThreads, int permutations, bool timeout, double timeLimit, int inserterType, bool keepEmbedding, double percentMostCrossed, int removeReinsert, double percentMostCrossedFix, double percentMostCrossedVar, int removeReinsertFix, int removeReinsertVar, bool statistics, int runsPostprocessing, int subgraphType, int runs, double randomness);