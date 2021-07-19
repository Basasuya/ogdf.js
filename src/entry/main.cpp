#include "main.h"
#include <ogdf/layered/OptimalRanking.h>
#include <ogdf/layered/LongestPathRanking.h>
#include <ogdf/layered/CoffmanGrahamRanking.h>
#include <ogdf/layered/BarycenterHeuristic.h>
#include <ogdf/layered/GridSifting.h>
#include <ogdf/layered/GreedyInsertHeuristic.h>
#include <ogdf/layered/GreedySwitchHeuristic.h>
#include <ogdf/layered/MedianHeuristic.h>
#include <ogdf/layered/SiftingHeuristic.h>
#include <ogdf/layered/SplitHeuristic.h>
#include <ogdf/layered/FastHierarchyLayout.h>
#include <ogdf/layered/FastSimpleHierarchyLayout.h>
#include <ogdf/layered/OptimalHierarchyLayout.h>
#include <ogdf/layered/OptimalHierarchyClusterLayout.h>
#include <ogdf/packing/SimpleCCPacker.h>
#include <ogdf/packing/TileToRowsCCPacker.h>

EM_PORT_API(void) free_buf(void* buf) {
    free(buf);
}

RankingModule* getRanking(int type, bool alignBaseClasses, bool alignSiblings, bool optimizeEdgeLength, bool separateDeg0Layer, bool separateMultiEdges){
    switch (type)
	{
	case 0:
		{
			CoffmanGrahamRanking *coffmanGrahamRanking = new CoffmanGrahamRanking();
			return coffmanGrahamRanking;
		}
	case 1:
		{
			LongestPathRanking *longestPathRanking = new LongestPathRanking();
			longestPathRanking->alignBaseClasses(alignBaseClasses);
			longestPathRanking->alignSiblings(alignSiblings);
			longestPathRanking->optimizeEdgeLength(optimizeEdgeLength);
			longestPathRanking->separateDeg0Layer(separateDeg0Layer);
			longestPathRanking->separateMultiEdges(separateMultiEdges);
			return longestPathRanking;
		}
	case 2:
		{
			OptimalRanking *optimalRaking = new OptimalRanking();
			optimalRaking->separateMultiEdges(separateMultiEdges);
			return optimalRaking;
		}
	default:
		return nullptr;
	}
}

LayeredCrossMinModule* getLayeredCrossMin(int type, int nRepeats, int verticalStepsBound){
    switch (type)
	{
	case 0:
		{
			BarycenterHeuristic *barycenterHeuristic = new BarycenterHeuristic();
			return barycenterHeuristic;
		}
	case 1:
		{
			GlobalSifting *globalSifting = new GlobalSifting();
            globalSifting->nRepeats(nRepeats);
			return globalSifting;
		}
	case 2:
		{
			GreedyInsertHeuristic *greedyInsertHeuristic = new GreedyInsertHeuristic();
			return greedyInsertHeuristic;
		}
    case 3:
        {
            GreedySwitchHeuristic *greedySwitchHeuristic = new GreedySwitchHeuristic();
            return greedySwitchHeuristic;
        }
    case 4:
        {
            GridSifting *gridShifting = new GridSifting();
            gridShifting->verticalStepsBound(verticalStepsBound);
            return gridShifting;
        }
    case 5:
        {
            MedianHeuristic *medianHeuristic = new MedianHeuristic();
            return medianHeuristic;
        }
    case 6:
        {
            SiftingHeuristic *siftingHeuristic = new SiftingHeuristic();
            return siftingHeuristic;
        }
    case 7:
        {
            SplitHeuristic *splitHeuristic = new SplitHeuristic();
            return splitHeuristic;
        }
	default:
		return nullptr;
	}
}

HierarchyLayoutModule* getHierarchyLayout(int type, bool fixedLayerDistance, double layerDistance, double nodeDistance, bool balanced, bool downward, bool leftToRight, double weightBalancing, double weightSegments){
    switch (type)
	{
	case 0:
		{
			FastHierarchyLayout *fastHierarchy = new FastHierarchyLayout();
			fastHierarchy->fixedLayerDistance(fixedLayerDistance);
			fastHierarchy->layerDistance(layerDistance);
			fastHierarchy->nodeDistance(nodeDistance);
			return fastHierarchy;
		}
	case 1:
		{
			FastSimpleHierarchyLayout *fastSimpleHierarchy = new FastSimpleHierarchyLayout();
			fastSimpleHierarchy->balanced(balanced);
			fastSimpleHierarchy->downward(downward);
			fastSimpleHierarchy->layerDistance(layerDistance);
			fastSimpleHierarchy->leftToRight(leftToRight);
			fastSimpleHierarchy->nodeDistance(nodeDistance);
			return fastSimpleHierarchy;
		}
	case 2:
		{
			OptimalHierarchyLayout *optimalHierarchyLayout = new OptimalHierarchyLayout();
			optimalHierarchyLayout->fixedLayerDistance(fixedLayerDistance);
			optimalHierarchyLayout->layerDistance(layerDistance);
			optimalHierarchyLayout->nodeDistance(nodeDistance);
			optimalHierarchyLayout->weightBalancing(weightBalancing);
			optimalHierarchyLayout->weightSegments(weightSegments);
			return optimalHierarchyLayout;
		}
	default:
		return nullptr;
	}
}

HierarchyClusterLayoutModule* getHierarchyClusterLayout(int type, bool fixedLayerDistance, double layerDistance, double nodeDistance, double weightBalancing, double weightClusters, double weightSegments){
    switch (type)
    {
    case 0:
        {
            OptimalHierarchyClusterLayout *optimalHierarchyClusterLayout = new OptimalHierarchyClusterLayout();
            optimalHierarchyClusterLayout->fixedLayerDistance(fixedLayerDistance);
            optimalHierarchyClusterLayout->layerDistance(layerDistance);
            optimalHierarchyClusterLayout->nodeDistance(nodeDistance);
            optimalHierarchyClusterLayout->weightBalancing(weightBalancing);
            optimalHierarchyClusterLayout->weightClusters(weightClusters);
            optimalHierarchyClusterLayout->weightSegments(weightSegments);
            return optimalHierarchyClusterLayout;
        }
    
    default:
        return nullptr;
    }
}

CCLayoutPackModule* getCCLayoutPack(int type){
    switch (type)
    {
    case 0:
        {
            TileToRowsCCPacker* tile2row = new TileToRowsCCPacker();
            return tile2row;
        }
    default:
        return nullptr;
    }
}