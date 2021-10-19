#include "../main.h"

#include <ogdf/energybased/multilevel_mixer/EdgeCoverMerger.h>
#include <ogdf/energybased/multilevel_mixer/IndependentSetMerger.h>
#include <ogdf/energybased/multilevel_mixer/LocalBiconnectedMerger.h>
#include <ogdf/energybased/multilevel_mixer/MatchingMerger.h>
#include <ogdf/energybased/multilevel_mixer/RandomMerger.h>
#include <ogdf/energybased/multilevel_mixer/SolarMerger.h>

EM_PORT_API(EdgeCoverMerger *)
MultilevelBuilder_EdgeCoverMerger(int edgeLengthAdjustment, double factor)
{
    EdgeCoverMerger *merger = new EdgeCoverMerger();
    merger->setEdgeLengthAdjustment(edgeLengthAdjustment);
    merger->setFactor(factor);
    return merger;
}

EM_PORT_API(IndependentSetMerger *)
MultilevelBuilder_IndependentSetMerger(int edgeLengthAdjustment, float searchDepthBase)
{
    IndependentSetMerger *merger = new IndependentSetMerger();
    merger->setEdgeLengthAdjustment(edgeLengthAdjustment);
    merger->setSearchDepthBase(searchDepthBase);
    return merger;
}

EM_PORT_API(LocalBiconnectedMerger *)
MultilevelBuilder_LocalBiconnectedMerger(int edgeLengthAdjustment, double factor)
{
    LocalBiconnectedMerger *merger = new LocalBiconnectedMerger();
    merger->setEdgeLengthAdjustment(edgeLengthAdjustment);
    merger->setFactor(factor);
    return merger;
}

EM_PORT_API(MatchingMerger *)
MultilevelBuilder_MatchingMerger(int edgeLengthAdjustment, bool selectByNodeMass)
{
    MatchingMerger *merger = new MatchingMerger();
    merger->setEdgeLengthAdjustment(edgeLengthAdjustment);
    merger->selectByNodeMass(selectByNodeMass);
    return merger;
}

EM_PORT_API(RandomMerger *)
MultilevelBuilder_RandomMerger(int edgeLengthAdjustment, double factor)
{
    RandomMerger *merger = new RandomMerger();
    merger->setEdgeLengthAdjustment(edgeLengthAdjustment);
    merger->setFactor(factor);
    return merger;
}

EM_PORT_API(SolarMerger *)
MultilevelBuilder_SolarMerger(int edgeLengthAdjustment)
{
    SolarMerger *merger = new SolarMerger();
    merger->setEdgeLengthAdjustment(edgeLengthAdjustment);
    return merger;
}
