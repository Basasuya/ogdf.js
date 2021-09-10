#include "../main.h"

#include <ogdf/planarity/MaximumPlanarSubgraph.h>
#include <ogdf/planarity/PlanarSubgraphBoyerMyrvold.h>
#include <ogdf/planarity/PlanarSubgraphCactus.h>
#include <ogdf/planarity/PlanarSubgraphEmpty.h>
#include <ogdf/planarity/PlanarSubgraphFast.h>
#include <ogdf/planarity/PlanarSubgraphTree.h>

EM_PORT_API(MaximumPlanarSubgraph *)
PlanarSubgraphModule_MaximumPlanarSubgraph(unsigned int maxThreads, double timeLimit)
{
    MaximumPlanarSubgraph *max = new MaximumPlanarSubgraph();
    max->maxThreads(maxThreads);
    max->timeLimit(timeLimit);
    return max;
}

EM_PORT_API(PlanarSubgraphBoyerMyrvold *)
PlanarSubgraphModule_PlanarSubgraphBoyerMyrvold(int runs, double randomness, unsigned int maxThreads, double timeLimit)
{
    PlanarSubgraphBoyerMyrvold *sub = new PlanarSubgraphBoyerMyrvold(runs, randomness);
    sub->maxThreads(maxThreads);
    sub->timeLimit(timeLimit);
    return sub;
}

EM_PORT_API(PlanarSubgraphCactus<int> *)
PlanarSubgraphModule_PlanarSubgraphCactus(unsigned int maxThreads, double timeLimit)
{
    PlanarSubgraphCactus<int> *sub = new PlanarSubgraphCactus<int>();
    sub->maxThreads(maxThreads);
    sub->timeLimit(timeLimit);
    return sub;
}

EM_PORT_API(PlanarSubgraphEmpty<int> *)
PlanarSubgraphModule_PlanarSubgraphEmpty(unsigned int maxThreads, double timeLimit)
{
    PlanarSubgraphEmpty<int> *sub = new PlanarSubgraphEmpty<int>();
    sub->maxThreads(maxThreads);
    sub->timeLimit(timeLimit);
    return sub;
}

EM_PORT_API(PlanarSubgraphFast<int> *)
PlanarSubgraphModule_PlanarSubgraphFast(unsigned int maxThreads, double timeLimit, int runs)
{
    PlanarSubgraphFast<int> *sub = new PlanarSubgraphFast<int>();
    sub->maxThreads(maxThreads);
    sub->timeLimit(timeLimit);
    sub->runs(runs);
    return sub;
}

EM_PORT_API(PlanarSubgraphTree<int> *)
PlanarSubgraphModule_PlanarSubgraphTree(unsigned int maxThreads, double timeLimit)
{
    PlanarSubgraphTree<int> *sub = new PlanarSubgraphTree<int>();
    sub->maxThreads(maxThreads);
    sub->timeLimit(timeLimit);
    return sub;
}
