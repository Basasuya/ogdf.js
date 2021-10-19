#include "../main.h"

#include <ogdf/layered/OptimalRanking.h>
#include <ogdf/layered/LongestPathRanking.h>
#include <ogdf/layered/CoffmanGrahamRanking.h>

EM_PORT_API(OptimalRanking *)
RankingModule_OptimalRanking(bool separateMultiEdges, AcyclicSubgraphModule *subgraph)
{
    OptimalRanking *optimalRaking = new OptimalRanking();
    optimalRaking->separateMultiEdges(separateMultiEdges);
    optimalRaking->setSubgraph(subgraph);

    return optimalRaking;
}

EM_PORT_API(CoffmanGrahamRanking *)
RankingModule_CoffmanGrahamRanking(int width, AcyclicSubgraphModule *subgraph)
{
    CoffmanGrahamRanking *coffmanGrahamRanking = new CoffmanGrahamRanking();
    coffmanGrahamRanking->width(width);
    coffmanGrahamRanking->setSubgraph(subgraph);
    return coffmanGrahamRanking;
}

EM_PORT_API(LongestPathRanking *)
RankingModule_LongestPathRanking(bool alignBaseClasses, bool alignSiblings, bool optimizeEdgeLength, bool separateDeg0Layer, bool separateMultiEdges, AcyclicSubgraphModule *subgraph)
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
