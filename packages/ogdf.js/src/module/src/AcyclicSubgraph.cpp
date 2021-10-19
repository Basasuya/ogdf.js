#include "../main.h"

#include <ogdf/layered/DfsAcyclicSubgraph.h>
#include <ogdf/layered/GreedyCycleRemoval.h>

EM_PORT_API(DfsAcyclicSubgraph *)
AcyclicSubgraphModule_DfsAcyclicSubgraph()
{
    DfsAcyclicSubgraph *dfs = new DfsAcyclicSubgraph();
    return dfs;
}

EM_PORT_API(GreedyCycleRemoval *)
AcyclicSubgraphModule_GreedyCycleRemoval()
{
    GreedyCycleRemoval *greedy = new GreedyCycleRemoval();
    return greedy;
}
