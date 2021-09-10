#include "../main.h"

#include <ogdf/layered/BarycenterHeuristic.h>
#include <ogdf/layered/GridSifting.h>
#include <ogdf/layered/GreedyInsertHeuristic.h>
#include <ogdf/layered/GreedySwitchHeuristic.h>
#include <ogdf/layered/MedianHeuristic.h>
#include <ogdf/layered/SiftingHeuristic.h>
#include <ogdf/layered/SplitHeuristic.h>

EM_PORT_API(BarycenterHeuristic *)
LayeredCrossMinModule_BarycenterHeuristic()
{
    BarycenterHeuristic *barycenterHeuristic = new BarycenterHeuristic();
    return barycenterHeuristic;
}

EM_PORT_API(GlobalSifting *)
LayeredCrossMinModule_GlobalSifting(int nRepeats)
{
    GlobalSifting *globalSifting = new GlobalSifting();
    globalSifting->nRepeats(nRepeats);
    return globalSifting;
}

EM_PORT_API(GreedyInsertHeuristic *)
LayeredCrossMinModule_GreedyInsertHeuristic()
{
    GreedyInsertHeuristic *greedyInsertHeuristic = new GreedyInsertHeuristic();
    return greedyInsertHeuristic;
}

EM_PORT_API(GreedySwitchHeuristic *)
LayeredCrossMinModule_GreedySwitchHeuristic()
{
    GreedySwitchHeuristic *greedySwitchHeuristic = new GreedySwitchHeuristic();
    return greedySwitchHeuristic;
}

EM_PORT_API(GridSifting *)
LayeredCrossMinModule_GridSifting(int verticalStepsBound)
{
    GridSifting *gridShifting = new GridSifting();
    gridShifting->verticalStepsBound(verticalStepsBound);
    return gridShifting;
}

EM_PORT_API(MedianHeuristic *)
LayeredCrossMinModule_MedianHeuristic()
{
    MedianHeuristic *medianHeuristic = new MedianHeuristic();
    return medianHeuristic;
}

EM_PORT_API(SiftingHeuristic *)
LayeredCrossMinModule_SiftingHeuristic()
{
    SiftingHeuristic *siftingHeuristic = new SiftingHeuristic();
    return siftingHeuristic;
}

EM_PORT_API(SplitHeuristic *)
LayeredCrossMinModule_SplitHeuristic()
{
    SplitHeuristic *splitHeuristic = new SplitHeuristic();
    return splitHeuristic;
}
