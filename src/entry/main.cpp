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

#include <ogdf/layered/DfsAcyclicSubgraph.h>
#include <ogdf/layered/GreedyCycleRemoval.h>

#include <ogdf/packing/SimpleCCPacker.h>
#include <ogdf/packing/TileToRowsCCPacker.h>

#include <ogdf/planarity/EmbedderMaxFace.h>
#include <ogdf/planarity/EmbedderMinDepth.h>
#include <ogdf/planarity/EmbedderMinDepthPiTa.h>
#include <ogdf/planarity/EmbedderOptimalFlexDraw.h>
#include <ogdf/planarity/SimpleEmbedder.h>
#include <ogdf/orthogonal/OrthoLayout.h>
#include <ogdf/planarlayout/MixedModelLayout.h>
#include <ogdf/planarlayout/MMCBDoubleGrid.h>
#include <ogdf/planarlayout/MMCBLocalStretch.h>
#include <ogdf/planarlayout/BiconnectedShellingOrder.h>
#include <ogdf/planarlayout/TriconnectedShellingOrder.h>
#include <ogdf/planarity/SubgraphPlanarizer.h>

#include <ogdf/planarity/FixedEmbeddingInserter.h>
#include <ogdf/planarity/MultiEdgeApproxInserter.h>
#include <ogdf/planarity/VariableEmbeddingInserter.h>

#include <ogdf/planarity/MaximumPlanarSubgraph.h>
#include <ogdf/planarity/PlanarSubgraphBoyerMyrvold.h>
#include <ogdf/planarity/PlanarSubgraphCactus.h>
#include <ogdf/planarity/PlanarSubgraphEmpty.h>
#include <ogdf/planarity/PlanarSubgraphFast.h>
#include <ogdf/planarity/PlanarSubgraphTree.h>

#include <ogdf/augmentation/DfsMakeBiconnected.h>
#include <ogdf/augmentation/PlanarAugmentation.h>
#include <ogdf/augmentation/PlanarAugmentationFix.h>

EM_PORT_API(void) free_buf(void* buf) {
    free(buf);
}

AcyclicSubgraphModule* getAcyclicSubgraph(int type){
	switch (type)
    {
    case 0:
        {
			DfsAcyclicSubgraph* dfs = new DfsAcyclicSubgraph();
			return dfs;
        }
	case 1:
        {
			GreedyCycleRemoval* greedy = new GreedyCycleRemoval();
			return greedy;
        }
    default:
        return nullptr;
    }
}

RankingModule* getRanking(int type, int width, bool alignBaseClasses, bool alignSiblings, bool optimizeEdgeLength, bool separateDeg0Layer, bool separateMultiEdges, int subgraphType){
	AcyclicSubgraphModule* subgraph = getAcyclicSubgraph(subgraphType);
    switch (type)
	{
	case 0:
		{
			CoffmanGrahamRanking *coffmanGrahamRanking = new CoffmanGrahamRanking();
			coffmanGrahamRanking->width(width);
			coffmanGrahamRanking->setSubgraph(subgraph);
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
			longestPathRanking->setSubgraph(subgraph);
			return longestPathRanking;
		}
	case 2:
		{
			OptimalRanking *optimalRaking = new OptimalRanking();
			optimalRaking->separateMultiEdges(separateMultiEdges);
			optimalRaking->setSubgraph(subgraph);
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

EmbedderModule* getEmbedder(int type, double timeLimit, bool useExtendedDepthDefinition){
    switch (type)
    {
    case 0:
        {
            EmbedderMaxFace* maxFace = new EmbedderMaxFace();
            maxFace->timeLimit(timeLimit);
            return maxFace;
        }
    case 1:
        {
            EmbedderMinDepth* minDepth = new EmbedderMinDepth();
            minDepth->timeLimit(timeLimit);
            return minDepth;
        }
    case 2:
        {
            EmbedderMinDepthPiTa* minDepthPiTa = new EmbedderMinDepthPiTa();
            minDepthPiTa->timeLimit(timeLimit);
            minDepthPiTa->useExtendedDepthDefinition(useExtendedDepthDefinition);
            return minDepthPiTa;
        }
    case 3:
        {
            EmbedderOptimalFlexDraw* optimalFlexDraw = new EmbedderOptimalFlexDraw();
            optimalFlexDraw->timeLimit(timeLimit);  //-1, or >= 0
            return optimalFlexDraw;
        }
    case 4:
        {
            SimpleEmbedder* simple = new SimpleEmbedder();
            simple->timeLimit(timeLimit);
            return simple;
        }
    default:
        return nullptr;
    }
}

LayoutPlanRepModule* getLayoutPlanRep(int type, int bendBound, double cOverhang, double margin, bool progressive, bool scaling, double separation){
    switch (type)
    {
    case 0:
        {
            OrthoLayout* ortho = new OrthoLayout();
            ortho->bendBound(bendBound);
            ortho->cOverhang(cOverhang);
            ortho->margin(margin);
            ortho->progressive(progressive);
            ortho->scaling(scaling);
            ortho->separation(separation);
            return ortho;
        }
    default:
        return nullptr;
    }
}

AugmentationModule* getAugmentation(int type){
	switch (type)
    {
    case 0:
        {
			DfsMakeBiconnected* dfs = new DfsMakeBiconnected();
			return dfs;
        }
	case 1:
        {
			PlanarAugmentation* pa = new PlanarAugmentation();
			return pa;
        }
	case 2:
        {
			PlanarAugmentationFix* fix = new PlanarAugmentationFix();
			return fix;
        }
    default:
        return nullptr;
    }
}

MixedModelCrossingsBeautifierModule* getMixedModelCrossingsBeautifier(int type){
	switch (type)
    {
    case 0:
        {
			MMCBDoubleGrid* dg = new MMCBDoubleGrid();
			return dg;
        }
	case 1:
        {
			MMCBLocalStretch* ls = new MMCBLocalStretch();
			return ls;
        }
	case 2:
        {
			MMDummyCrossingsBeautifier* dummy = new MMDummyCrossingsBeautifier();
			return dummy;
        }
    default:
        return nullptr;
    }
}

ShellingOrderModule* getShellingOrder(int type, double baseRatio){
	switch (type)
    {
    case 0:
        {
			BiconnectedShellingOrder* bi = new BiconnectedShellingOrder();
			bi->baseRatio(baseRatio);
			return bi;
        }
	case 1:
        {
			TriconnectedShellingOrder* tri = new TriconnectedShellingOrder();
			tri->baseRatio(baseRatio);
			return tri;
        }
    default:
        return nullptr;
    }
}

GridLayoutPlanRepModule* getGridLayoutPlanRep(int type, double separation, int augmenterType, int crossingsBeautifierType, int embedderType, double timeLimit, bool useExtendedDepthDefinition, int shellingOrderType, double baseRatio){
	switch (type)
    {
    case 0:
        {
            MixedModelLayout* mixed = new MixedModelLayout();
			mixed->separation(separation);
			
			AugmentationModule* augmenter = getAugmentation(augmenterType);
			mixed->setAugmenter(augmenter);
			
			MixedModelCrossingsBeautifierModule* crossingsBeautifier = getMixedModelCrossingsBeautifier(crossingsBeautifierType);
			mixed->setCrossingsBeautifier(crossingsBeautifier);

			EmbedderModule* embedder = getEmbedder(embedderType, timeLimit, useExtendedDepthDefinition);
			mixed->setEmbedder(embedder);

			ShellingOrderModule* shellingOrder = getShellingOrder(shellingOrderType, baseRatio);
			mixed->setShellingOrder(shellingOrder);

			return mixed;
        }
    default:
        return nullptr;
    }
}

EdgeInsertionModule* getEdgeInsertion(int type, bool keepEmbedding, double percentMostCrossed, int removeReinsert, double timeLimit, double percentMostCrossedFix, double percentMostCrossedVar, int removeReinsertFix, int removeReinsertVar, bool statistics){
	switch (type)
    {
    case 0:
        {
			FixedEmbeddingInserter* fixed = new FixedEmbeddingInserter();
			fixed->keepEmbedding(keepEmbedding);
			fixed->percentMostCrossed(percentMostCrossed);
			fixed->removeReinsert(static_cast<RemoveReinsertType>(removeReinsert));
			fixed->timeLimit(timeLimit);
			return fixed;
        }
	case 1:
        {
			MultiEdgeApproxInserter* multi = new MultiEdgeApproxInserter();
			multi->percentMostCrossedFix(percentMostCrossedFix);
			multi->percentMostCrossedVar(percentMostCrossedVar);
			multi->removeReinsertFix(static_cast<RemoveReinsertType>(removeReinsertFix));
			multi->removeReinsertVar(static_cast<RemoveReinsertType>(removeReinsertVar));
			multi->statistics(statistics);
			multi->timeLimit(timeLimit);
			return multi;
        }
	case 2:
        {
			VariableEmbeddingInserter* var = new VariableEmbeddingInserter();
			var->percentMostCrossed(percentMostCrossed);
			var->removeReinsert(static_cast<RemoveReinsertType>(removeReinsert));
			var->timeLimit(timeLimit);
			return var;
        }
    default:
        return nullptr;
    }
}

template<typename T>
PlanarSubgraphModule<T>* getPlanarSubgraph(int type, unsigned int maxThreads, double timeLimit, int runs, double randomness){
	switch (type)
    {
    case 0:
        {
			MaximumPlanarSubgraph* max = new MaximumPlanarSubgraph();
			max->maxThreads(maxThreads);
			max->timeLimit(timeLimit);
			return max;
        }
	case 1:
        {
			PlanarSubgraphBoyerMyrvold* sub = new PlanarSubgraphBoyerMyrvold(runs,randomness);
			sub->maxThreads(maxThreads);
			sub->timeLimit(timeLimit);
			return sub;
        }
	case 2:
        {
			PlanarSubgraphCactus<T>* sub = new PlanarSubgraphCactus<T>();
			sub->maxThreads(maxThreads);
			sub->timeLimit(timeLimit);
			return sub;
        }
	case 3:
        {
			PlanarSubgraphEmpty<T>* sub = new PlanarSubgraphEmpty<T>();
			sub->maxThreads(maxThreads);
			sub->timeLimit(timeLimit);
			return sub;
        }
	case 4:
        {
			PlanarSubgraphFast<T>* sub = new PlanarSubgraphFast<T>();
			sub->maxThreads(maxThreads);
			sub->timeLimit(timeLimit);
			sub->runs(runs);
			return sub;
        }
	case 5:
        {
			PlanarSubgraphTree<T>* sub = new PlanarSubgraphTree<T>();
			sub->maxThreads(maxThreads);
			sub->timeLimit(timeLimit);
			return sub;
        }
    default:
        return nullptr;
    }
}

CrossingMinimizationModule* getCrossingMinimization(int type, int globalInternalLibraryLogLevel, int globalLogLevel, int globalMinimumLogLevel, bool globalStatisticMode, int localLogLevel, int localLogMode, unsigned int maxThreads, int permutations, bool timeout, double timeLimit, int inserterType, bool keepEmbedding, double percentMostCrossed, int removeReinsert, double percentMostCrossedFix, double percentMostCrossedVar, int removeReinsertFix, int removeReinsertVar, bool statistics, int subgraphType, int runs, double randomness){
    switch (type)
    {
    case 0:
        {
            SubgraphPlanarizer* subgraphPlanarizer = new SubgraphPlanarizer();
            // subgraphPlanarizer->globalInternalLibraryLogLevel(static_cast<Logger::Level>(globalInternalLibraryLogLevel));
            // subgraphPlanarizer->globalLogLevel(static_cast<Logger::Level>(globalLogLevel));
            // subgraphPlanarizer->globalMinimumLogLevel(static_cast<Logger::Level>(globalMinimumLogLevel));
            // subgraphPlanarizer->globalStatisticMode(globalStatisticMode);
            // subgraphPlanarizer->localLogLevel(static_cast<Logger::Level>(localLogLevel));
            // subgraphPlanarizer->localLogMode(static_cast<Logger::LogMode>(localLogMode));
            subgraphPlanarizer->maxThreads(maxThreads);
            subgraphPlanarizer->permutations(permutations);
            subgraphPlanarizer->setTimeout(timeout);
            subgraphPlanarizer->timeLimit(timeLimit);

			EdgeInsertionModule* inserter = getEdgeInsertion(inserterType, keepEmbedding, percentMostCrossed, removeReinsert, timeLimit, percentMostCrossedFix, percentMostCrossedVar, removeReinsertFix, removeReinsertVar, statistics);
			subgraphPlanarizer->setInserter(inserter);

			PlanarSubgraphModule<int>* subgraph = getPlanarSubgraph<int>(subgraphType, maxThreads, timeLimit, runs, randomness);
			subgraphPlanarizer->setSubgraph(subgraph);

            return subgraphPlanarizer;
        }
    default:
        return nullptr;
    }
}