#include "../main.h"

#include <ogdf/planarity/SubgraphPlanarizer.h>

EM_PORT_API(SubgraphPlanarizer *)
CrossingMinimizationModule_SubgraphPlanarizer(int globalInternalLibraryLogLevel, int globalLogLevel, int globalMinimumLogLevel, bool globalStatisticMode, int localLogLevel, int localLogMode, unsigned int maxThreads, int permutations, bool timeout, double timeLimit, EdgeInsertionModule *inserter, PlanarSubgraphModule<int> *subgraph)
{
    SubgraphPlanarizer *subgraphPlanarizer = new SubgraphPlanarizer();
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
    subgraphPlanarizer->setInserter(inserter);
    subgraphPlanarizer->setSubgraph(subgraph);

    return subgraphPlanarizer;
}