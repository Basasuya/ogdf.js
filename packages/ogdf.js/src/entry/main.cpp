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

#include <ogdf/energybased/multilevel_mixer/EdgeCoverMerger.h>
#include <ogdf/energybased/multilevel_mixer/IndependentSetMerger.h>
#include <ogdf/energybased/multilevel_mixer/LocalBiconnectedMerger.h>
#include <ogdf/energybased/multilevel_mixer/MatchingMerger.h>
#include <ogdf/energybased/multilevel_mixer/RandomMerger.h>
#include <ogdf/energybased/multilevel_mixer/SolarMerger.h>
#include <ogdf/energybased/multilevel_mixer/BarycenterPlacer.h>
#include <ogdf/energybased/multilevel_mixer/CirclePlacer.h>
#include <ogdf/energybased/multilevel_mixer/MedianPlacer.h>
#include <ogdf/energybased/multilevel_mixer/RandomPlacer.h>
#include <ogdf/energybased/multilevel_mixer/SolarPlacer.h>
#include <ogdf/energybased/multilevel_mixer/ZeroPlacer.h>

#include <ogdf/energybased/DavidsonHarelLayout.h>
#include <ogdf/energybased/FMMMLayout.h>
#include <ogdf/energybased/FastMultipoleEmbedder.h>
#include <ogdf/energybased/GEMLayout.h>
#include <ogdf/energybased/NodeRespecterLayout.h>
#include <ogdf/energybased/PivotMDS.h>
#include <ogdf/energybased/SpringEmbedderGridVariant.h>
#include <ogdf/energybased/SpringEmbedderKK.h>
#include <ogdf/energybased/StressMinimization.h>
#include <ogdf/energybased/TutteLayout.h>

EM_PORT_API(void)
free_buf(void *buf)
{
    free(buf);
}

AcyclicSubgraphModule *getAcyclicSubgraph(int type)
{
    switch (type)
    {
    case 0:
    {
        DfsAcyclicSubgraph *dfs = new DfsAcyclicSubgraph();
        return dfs;
    }
    case 1:
    {
        GreedyCycleRemoval *greedy = new GreedyCycleRemoval();
        return greedy;
    }
    default:
        return nullptr;
    }
}

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
) {
    switch (type)
    {
    case 0:
    {
        CoffmanGrahamRanking *coffmanGrahamRanking = new CoffmanGrahamRanking();
        coffmanGrahamRanking->width(rankingType_CoffmanGraham_width);
        AcyclicSubgraphModule *subgraph = getAcyclicSubgraph(rankingType_CoffmanGraham_subgraphType);
        coffmanGrahamRanking->setSubgraph(subgraph);
        return coffmanGrahamRanking;
    }
    case 1:
    {
        LongestPathRanking *longestPathRanking = new LongestPathRanking();
        longestPathRanking->alignBaseClasses(rankingType_LongestPath_alignBaseClasses);
        longestPathRanking->alignSiblings(rankingType_LongestPath_alignSiblings);
        longestPathRanking->optimizeEdgeLength(rankingType_LongestPath_optimizeEdgeLength);
        longestPathRanking->separateDeg0Layer(rankingType_LongestPath_separateDeg0Layer);
        longestPathRanking->separateMultiEdges(rankingType_LongestPath_separateMultiEdges);
        
        AcyclicSubgraphModule *subgraph = getAcyclicSubgraph(rankingType_LongestPath_subgraphType);
        longestPathRanking->setSubgraph(subgraph);

        return longestPathRanking;
    }
    case 2:
    {
        OptimalRanking *optimalRaking = new OptimalRanking();
        optimalRaking->separateMultiEdges(rankingType_Optimal_separateMultiEdges);

        AcyclicSubgraphModule *subgraph = getAcyclicSubgraph(rankingType_Optimal_subgraphType);
        optimalRaking->setSubgraph(subgraph);
        return optimalRaking;
    }
    default:
        return nullptr;
    }
}

LayeredCrossMinModule *getLayeredCrossMin(
    int type,
    int crossMinType_GlobalSifting_nRepeats, 
	int crossMinType_GridSifting_verticalStepsBound
) {
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
        globalSifting->nRepeats(crossMinType_GlobalSifting_nRepeats);
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
        gridShifting->verticalStepsBound(crossMinType_GridSifting_verticalStepsBound);
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
) {
    switch (type)
    {
    case 0:
    {
        FastHierarchyLayout *fastHierarchy = new FastHierarchyLayout();
        fastHierarchy->fixedLayerDistance(layoutType_Fast_fixedLayerDistance);
        fastHierarchy->layerDistance(layoutType_Fast_layerDistance);
        fastHierarchy->nodeDistance(layoutType_Fast_nodeDistance);
        return fastHierarchy;
    }
    case 1:
    {
        FastSimpleHierarchyLayout *fastSimpleHierarchy = new FastSimpleHierarchyLayout();
        fastSimpleHierarchy->balanced(layoutType_FastSimple_balanced);
        fastSimpleHierarchy->downward(layoutType_FastSimple_downward);
        fastSimpleHierarchy->layerDistance(layoutType_FastSimple_layerDistance);
        fastSimpleHierarchy->leftToRight(layoutType_FastSimple_leftToRight);
        fastSimpleHierarchy->nodeDistance(layoutType_FastSimple_nodeDistance);
        return fastSimpleHierarchy;
    }
    case 2:
    {
        OptimalHierarchyLayout *optimalHierarchyLayout = new OptimalHierarchyLayout();
        optimalHierarchyLayout->fixedLayerDistance(layoutType_Optimal_fixedLayerDistance);
        optimalHierarchyLayout->layerDistance(layoutType_Optimal_layerDistance);
        optimalHierarchyLayout->nodeDistance(layoutType_Optimal_nodeDistance);
        optimalHierarchyLayout->weightBalancing(layoutType_Optimal_weightBalancing);
        optimalHierarchyLayout->weightSegments(layoutType_Optimal_weightSegments);
        return optimalHierarchyLayout;
    }
    default:
        return nullptr;
    }
}

HierarchyClusterLayoutModule *getHierarchyClusterLayout(
    int type,
    bool clusterLayoutType_Optimal_fixedLayerDistance, 
	double clusterLayoutType_Optimal_layerDistance, 
	double clusterLayoutType_Optimal_nodeDistance, 
	double clusterLayoutType_Optimal_weightBalancing, 
	double clusterLayoutType_Optimal_weightClusters, 
	double clusterLayoutType_Optimal_weightSegments
) {
    switch (type)
    {
    case 0:
    {
        OptimalHierarchyClusterLayout *optimalHierarchyClusterLayout = new OptimalHierarchyClusterLayout();
        optimalHierarchyClusterLayout->fixedLayerDistance(clusterLayoutType_Optimal_fixedLayerDistance);
        optimalHierarchyClusterLayout->layerDistance(clusterLayoutType_Optimal_layerDistance);
        optimalHierarchyClusterLayout->nodeDistance(clusterLayoutType_Optimal_nodeDistance);
        optimalHierarchyClusterLayout->weightBalancing(clusterLayoutType_Optimal_weightBalancing);
        optimalHierarchyClusterLayout->weightClusters(clusterLayoutType_Optimal_weightClusters);
        optimalHierarchyClusterLayout->weightSegments(clusterLayoutType_Optimal_weightSegments);
        return optimalHierarchyClusterLayout;
    }

    default:
        return nullptr;
    }
}

CCLayoutPackModule *getCCLayoutPack(int type)
{
    switch (type)
    {
    case 0:
    {
        TileToRowsCCPacker *tile2row = new TileToRowsCCPacker();
        return tile2row;
    }
    default:
        return nullptr;
    }
}

EmbedderModule *getEmbedder(
    int type,
    double MaxFace_timeLimit,
    double MinDepth_timeLimit,
    double MinDepthPiTa_timeLimit,
    bool MinDepthPiTa_useExtendedDepthDefinition,
    double OptimalFlexDraw_timeLimit,
    double Simple_timeLimit
)
{
    switch (type)
    {
    case 0:
    {
        EmbedderMaxFace *maxFace = new EmbedderMaxFace();
        maxFace->timeLimit(MaxFace_timeLimit);
        return maxFace;
    }
    case 1:
    {
        EmbedderMinDepth *minDepth = new EmbedderMinDepth();
        minDepth->timeLimit(MinDepth_timeLimit);
        return minDepth;
    }
    case 2:
    {
        EmbedderMinDepthPiTa *minDepthPiTa = new EmbedderMinDepthPiTa();
        minDepthPiTa->timeLimit(MinDepthPiTa_timeLimit);
        minDepthPiTa->useExtendedDepthDefinition(MinDepthPiTa_useExtendedDepthDefinition);
        return minDepthPiTa;
    }
    case 3:
    {
        EmbedderOptimalFlexDraw *optimalFlexDraw = new EmbedderOptimalFlexDraw();
        optimalFlexDraw->timeLimit(OptimalFlexDraw_timeLimit); //-1, or >= 0
        return optimalFlexDraw;
    }
    case 4:
    {
        SimpleEmbedder *simple = new SimpleEmbedder();
        simple->timeLimit(Simple_timeLimit);
        return simple;
    }
    default:
        return nullptr;
    }
}

LayoutPlanRepModule *getLayoutPlanRep(int type, int bendBound, double cOverhang, double margin, bool progressive, bool scaling, double separation)
{
    switch (type)
    {
    case 0:
    {
        OrthoLayout *ortho = new OrthoLayout();
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

AugmentationModule *getAugmentation(int type)
{
    switch (type)
    {
    case 0:
    {
        DfsMakeBiconnected *dfs = new DfsMakeBiconnected();
        return dfs;
    }
    case 1:
    {
        PlanarAugmentation *pa = new PlanarAugmentation();
        return pa;
    }
    case 2:
    {
        PlanarAugmentationFix *fix = new PlanarAugmentationFix();
        return fix;
    }
    default:
        return nullptr;
    }
}

MixedModelCrossingsBeautifierModule *getMixedModelCrossingsBeautifier(int type)
{
    switch (type)
    {
    case 0:
    {
        MMCBDoubleGrid *dg = new MMCBDoubleGrid();
        return dg;
    }
    case 1:
    {
        MMCBLocalStretch *ls = new MMCBLocalStretch();
        return ls;
    }
    case 2:
    {
        MMDummyCrossingsBeautifier *dummy = new MMDummyCrossingsBeautifier();
        return dummy;
    }
    default:
        return nullptr;
    }
}

ShellingOrderModule *getShellingOrder(
    int type,
    double Biconnected_baseRatio,
    double Triconnected_baseRatio
) {
    switch (type)
    {
    case 0:
    {
        BiconnectedShellingOrder *bi = new BiconnectedShellingOrder();
        bi->baseRatio(Biconnected_baseRatio);
        return bi;
    }
    case 1:
    {
        TriconnectedShellingOrder *tri = new TriconnectedShellingOrder();
        tri->baseRatio(Triconnected_baseRatio);
        return tri;
    }
    default:
        return nullptr;
    }
}

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
) {
    switch (type)
    {
    case 0:
    {
        MixedModelLayout *mixed = new MixedModelLayout();
        mixed->separation(Mixed_separation);

        AugmentationModule *augmenter = getAugmentation(Mixed_augmenterType);
        mixed->setAugmenter(augmenter);

        MixedModelCrossingsBeautifierModule *crossingsBeautifier = getMixedModelCrossingsBeautifier(Mixed_crossingsBeautifierType);
        mixed->setCrossingsBeautifier(crossingsBeautifier);

        EmbedderModule *embedder = getEmbedder(
            Mixed_embedderType, 
            Mixed_embedderType_MaxFace_timeLimit,
            Mixed_embedderType_MinDepth_timeLimit,
            Mixed_embedderType_MinDepthPiTa_timeLimit,
            Mixed_embedderType_MinDepthPiTa_useExtendedDepthDefinition,
            Mixed_embedderType_OptimalFlexDraw_timeLimit,
            Mixed_embedderType_Simple_timeLimit
        );
        mixed->setEmbedder(embedder);

        ShellingOrderModule *shellingOrder = getShellingOrder(
            Mixed_shellingOrderType,
            Mixed_shellingOrderType_Biconnected_baseRatio,
            Mixed_shellingOrderType_Triconnected_baseRatio
        );
        mixed->setShellingOrder(shellingOrder);

        return mixed;
    }
    default:
        return nullptr;
    }
}

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
) {
    switch (type)
    {
    case 0:
    {
        FixedEmbeddingInserter *fixed = new FixedEmbeddingInserter();
        fixed->keepEmbedding(FixedEmbedding_keepEmbedding);
        fixed->percentMostCrossed(FixedEmbedding_percentMostCrossed);
        fixed->removeReinsert(static_cast<RemoveReinsertType>(FixedEmbedding_removeReinsert));
        fixed->timeLimit(FixedEmbedding_timeLimit);
        return fixed;
    }
    case 1:
    {
        MultiEdgeApproxInserter *multi = new MultiEdgeApproxInserter();
        multi->percentMostCrossedFix(MultiEdgeApprox_percentMostCrossedFix);
        multi->percentMostCrossedVar(MultiEdgeApprox_percentMostCrossedVar);
        multi->removeReinsertFix(static_cast<RemoveReinsertType>(MultiEdgeApprox_removeReinsertFix));
        multi->removeReinsertVar(static_cast<RemoveReinsertType>(MultiEdgeApprox_removeReinsertVar));
        multi->statistics(MultiEdgeApprox_statistics);
        multi->timeLimit(MultiEdgeApprox_timeLimit);
        return multi;
    }
    case 2:
    {
        VariableEmbeddingInserter *var = new VariableEmbeddingInserter();
        var->percentMostCrossed(VariableEmbedding_percentMostCrossed);
        var->removeReinsert(static_cast<RemoveReinsertType>(VariableEmbedding_removeReinsert));
        var->timeLimit(VariableEmbedding_timeLimit);
        return var;
    }
    default:
        return nullptr;
    }
}

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
)
{
    switch (type)
    {
    case 0:
    {
        MaximumPlanarSubgraph *max = new MaximumPlanarSubgraph();
        max->maxThreads(Maximum_maxThreads);
        max->timeLimit(Maximum_timeLimit);
        return max;
    }
    case 1:
    {
        PlanarSubgraphBoyerMyrvold *sub = new PlanarSubgraphBoyerMyrvold(BoyerMyrvold_runs, BoyerMyrvold_randomness);
        sub->maxThreads(BoyerMyrvold_maxThreads);
        sub->timeLimit(BoyerMyrvold_timeLimit);
        return sub;
    }
    case 2:
    {
        PlanarSubgraphCactus<T> *sub = new PlanarSubgraphCactus<T>();
        sub->maxThreads(Cactus_maxThreads);
        sub->timeLimit(Cactus_timeLimit);
        return sub;
    }
    case 3:
    {
        PlanarSubgraphEmpty<T> *sub = new PlanarSubgraphEmpty<T>();
        sub->maxThreads(Empty_maxThreads);
        sub->timeLimit(Empty_timeLimit);
        return sub;
    }
    case 4:
    {
        PlanarSubgraphFast<T> *sub = new PlanarSubgraphFast<T>();
        sub->maxThreads(Fast_maxThreads);
        sub->timeLimit(Fast_timeLimit);
        sub->runs(Fast_runs);
        return sub;
    }
    case 5:
    {
        PlanarSubgraphTree<T> *sub = new PlanarSubgraphTree<T>();
        sub->maxThreads(Tree_maxThreads);
        sub->timeLimit(Tree_timeLimit);
        return sub;
    }
    default:
        return nullptr;
    }
}

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
) {
    switch (type)
    {
    case 0:
    {
        SubgraphPlanarizer *subgraphPlanarizer = new SubgraphPlanarizer();
        // subgraphPlanarizer->globalInternalLibraryLogLevel(static_cast<Logger::Level>(globalInternalLibraryLogLevel));
        // subgraphPlanarizer->globalLogLevel(static_cast<Logger::Level>(globalLogLevel));
        // subgraphPlanarizer->globalMinimumLogLevel(static_cast<Logger::Level>(globalMinimumLogLevel));
        // subgraphPlanarizer->globalStatisticMode(globalStatisticMode);
        // subgraphPlanarizer->localLogLevel(static_cast<Logger::Level>(localLogLevel));
        // subgraphPlanarizer->localLogMode(static_cast<Logger::LogMode>(localLogMode));
        subgraphPlanarizer->maxThreads(SubgraphPlanarizer_maxThreads);
        subgraphPlanarizer->permutations(SubgraphPlanarizer_permutations);
        subgraphPlanarizer->setTimeout(SubgraphPlanarizer_timeout);
        subgraphPlanarizer->timeLimit(SubgraphPlanarizer_timeLimit);

        EdgeInsertionModule *inserter = getEdgeInsertion(
            SubgraphPlanarizer_inserterType,
            SubgraphPlanarizer_inserterType_FixedEmbedding_keepEmbedding,
            SubgraphPlanarizer_inserterType_FixedEmbedding_percentMostCrossed,
            SubgraphPlanarizer_inserterType_FixedEmbedding_removeReinsert,
            SubgraphPlanarizer_inserterType_FixedEmbedding_timeLimit,
            SubgraphPlanarizer_inserterType_MultiEdgeApprox_percentMostCrossedFix,
            SubgraphPlanarizer_inserterType_MultiEdgeApprox_percentMostCrossedVar,
            SubgraphPlanarizer_inserterType_MultiEdgeApprox_removeReinsertFix,
            SubgraphPlanarizer_inserterType_MultiEdgeApprox_removeReinsertVar,
            SubgraphPlanarizer_inserterType_MultiEdgeApprox_statistics,
            SubgraphPlanarizer_inserterType_MultiEdgeApprox_timeLimit,
            SubgraphPlanarizer_inserterType_VariableEmbedding_percentMostCrossed,
            SubgraphPlanarizer_inserterType_VariableEmbedding_removeReinsert,
            SubgraphPlanarizer_inserterType_VariableEmbedding_timeLimit
        );
        subgraphPlanarizer->setInserter(inserter);

        PlanarSubgraphModule<int> *subgraph = getPlanarSubgraph<int>(
            SubgraphPlanarizer_subgraphType,
            SubgraphPlanarizer_subgraphType_Maximum_maxThreads,
            SubgraphPlanarizer_subgraphType_Maximum_timeLimit,
            SubgraphPlanarizer_subgraphType_BoyerMyrvold_maxThreads,
            SubgraphPlanarizer_subgraphType_BoyerMyrvold_timeLimit,
            SubgraphPlanarizer_subgraphType_BoyerMyrvold_runs,
            SubgraphPlanarizer_subgraphType_BoyerMyrvold_randomness,
            SubgraphPlanarizer_subgraphType_Cactus_maxThreads,
            SubgraphPlanarizer_subgraphType_Cactus_timeLimit,
            SubgraphPlanarizer_subgraphType_Empty_maxThreads,
            SubgraphPlanarizer_subgraphType_Empty_timeLimit,
            SubgraphPlanarizer_subgraphType_Fast_maxThreads,
            SubgraphPlanarizer_subgraphType_Fast_timeLimit,
            SubgraphPlanarizer_subgraphType_Fast_runs,
            SubgraphPlanarizer_subgraphType_Tree_maxThreads,
            SubgraphPlanarizer_subgraphType_Tree_timeLimit
        );
        subgraphPlanarizer->setSubgraph(subgraph);

        return subgraphPlanarizer;
    }
    default:
        return nullptr;
    }
}

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
)
{
    switch (type)
    {
    case 0:
    {
        EdgeCoverMerger *merger = new EdgeCoverMerger();
        merger->setEdgeLengthAdjustment(multilevelBuilderType_EdgeCoverMerger_edgeLengthAdjustment);
        merger->setFactor(multilevelBuilderType_EdgeCoverMerger_factor);
        return merger;
    }
    case 1:
    {
        IndependentSetMerger *merger = new IndependentSetMerger();
        merger->setEdgeLengthAdjustment(multilevelBuilderType_IndependentSetMerger_edgeLengthAdjustment);
        merger->setSearchDepthBase(multilevelBuilderType_IndependentSetMerger_searchDepthBase);
        return merger;
    }
    case 2:
    {
        LocalBiconnectedMerger *merger = new LocalBiconnectedMerger();
        merger->setEdgeLengthAdjustment(multilevelBuilderType_LocalBiconnectedMerger_edgeLengthAdjustment);
        merger->setFactor(multilevelBuilderType_LocalBiconnectedMerger_factor);
        return merger;
    }
    case 3:
    {
        MatchingMerger *merger = new MatchingMerger();
        merger->setEdgeLengthAdjustment(multilevelBuilderType_MatchingMerger_edgeLengthAdjustment);
        merger->selectByNodeMass(multilevelBuilderType_MatchingMerger_selectByNodeMass);
        return merger;
    }
    case 4:
    {
        RandomMerger *merger = new RandomMerger();
        merger->setEdgeLengthAdjustment(multilevelBuilderType_RandomMerger_edgeLengthAdjustment);
        merger->setFactor(multilevelBuilderType_RandomMerger_factor);
        return merger;
    }
    case 5:
    {
        SolarMerger *merger = new SolarMerger();
        merger->setEdgeLengthAdjustment(multilevelBuilderType_SolarMerger_edgeLengthAdjustment);
        return merger;
    }
    default:
        return nullptr;
    }
}

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
) {
    switch (type)
    {
    case 0:
    {
        BarycenterPlacer *placer = new BarycenterPlacer();
        placer->setRandomOffset(placerType_BarycenterPlacer_randomOffset);
        placer->weightedPositionPriority(placerType_BarycenterPlacer_weightedPositionPriority);
        return placer;
    }
    case 1:
    {
        CirclePlacer *placer = new CirclePlacer();
        placer->setCircleSize(placerType_CirclePlacer_circleSize);
        placer->setNodeSelection(static_cast<CirclePlacer::NodeSelection>(placerType_CirclePlacer_nodeSelection));
        placer->setRadiusFixed(placerType_CirclePlacer_radiusFixed);
        placer->setRandomOffset(placerType_CirclePlacer_randomOffset);
        return placer;
    }
    case 2:
    {
        MedianPlacer *placer = new MedianPlacer();
        placer->setRandomOffset(placerType_MedianPlacer_randomOffset);
        return placer;
    }
    case 3:
    {
        RandomPlacer *placer = new RandomPlacer();
        placer->setRandomOffset(placerType_RandomPlacer_randomOffset);
        placer->setCircleSize(placerType_RandomPlacer_circleSize);
        return placer;
    }
    case 4:
    {
        SolarPlacer *placer = new SolarPlacer();
        placer->setRandomOffset(placerType_SolarPlacer_randomOffset);
        return placer;
    }
    case 5:
    {
        ZeroPlacer *placer = new ZeroPlacer();
        placer->setRandomRange(placerType_ZeroPlacer_randomRange);
        placer->setRandomOffset(placerType_ZeroPlacer_randomOffset);
        return placer;
    }
    default:
        return nullptr;
    }
}

LayoutModule *getLayout(int type)
{
    switch (type)
    {
        case 0:
        {
            return new DavidsonHarelLayout();
        }
        case 1:
        {
            return new FMMMLayout();
        }
        case 2:
        {
            return new FastMultipoleEmbedder();
        }
        case 3:
        {
            return new FastMultipoleMultilevelEmbedder();
        }
        case 4:
        {
            return new GEMLayout();
        }
        case 5:
        {
            return new NodeRespecterLayout();
        }
        case 6:
        {
            return new PivotMDS();
        }
        case 7:
        {
            return new SpringEmbedderGridVariant();
        }
        case 8:
        {
            return new SpringEmbedderKK();
        }
        case 9:
        {
            return new StressMinimization();
        }
        case 10:
        {
            return new TutteLayout();
        }
        default:
        return nullptr;
    }
}