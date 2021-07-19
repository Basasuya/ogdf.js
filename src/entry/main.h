#include <ogdf/basic/GraphAttributes.h>
#include <ogdf/graphalg/steiner_tree/EdgeWeightedGraph.h>
#include <ogdf/module/RankingModule.h>
#include <ogdf/module/LayeredCrossMinModule.h>
#include <ogdf/module/HierarchyLayoutModule.h>
#include <ogdf/module/HierarchyClusterLayoutModule.h>
#include <ogdf/module/CCLayoutPackModule.h>
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
RankingModule* getRanking(int type, bool alignBaseClasses, bool alignSiblings, bool optimizeEdgeLength, bool separateDeg0Layer, bool separateMultiEdges);

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