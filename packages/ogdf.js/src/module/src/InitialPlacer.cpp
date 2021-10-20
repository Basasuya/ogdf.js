#include "../main.h"

#include <ogdf/energybased/multilevel_mixer/BarycenterPlacer.h>
#include <ogdf/energybased/multilevel_mixer/CirclePlacer.h>
#include <ogdf/energybased/multilevel_mixer/MedianPlacer.h>
#include <ogdf/energybased/multilevel_mixer/RandomPlacer.h>
#include <ogdf/energybased/multilevel_mixer/SolarPlacer.h>
#include <ogdf/energybased/multilevel_mixer/ZeroPlacer.h>

EM_PORT_API(BarycenterPlacer *)
InitialPlacer_BarycenterPlacer(bool randomOffset, bool weightedPositionPriority)
{
    BarycenterPlacer *placer = new BarycenterPlacer();
    placer->setRandomOffset(randomOffset);
    placer->weightedPositionPriority(weightedPositionPriority);
    return placer;
}

EM_PORT_API(CirclePlacer *)
InitialPlacer_CirclePlacer(float circleSize, int nodeSelection, bool radiusFixed, bool randomOffset)
{
    CirclePlacer *placer = new CirclePlacer();
    placer->setCircleSize(circleSize);
    placer->setNodeSelection(static_cast<CirclePlacer::NodeSelection>(nodeSelection));
    placer->setRadiusFixed(radiusFixed);
    placer->setRandomOffset(randomOffset);
    return placer;
}

EM_PORT_API(MedianPlacer *)
InitialPlacer_MedianPlacer(bool randomOffset)
{
    MedianPlacer *placer = new MedianPlacer();
    placer->setRandomOffset(randomOffset);
    return placer;
}

EM_PORT_API(RandomPlacer *)
InitialPlacer_RandomPlacer(bool randomOffset, double circleSize)
{
    RandomPlacer *placer = new RandomPlacer();
    placer->setRandomOffset(randomOffset);
    placer->setCircleSize(circleSize);
    return placer;
}

EM_PORT_API(SolarPlacer *)
InitialPlacer_SolarPlacer(bool randomOffset)
{
    SolarPlacer *placer = new SolarPlacer();
    placer->setRandomOffset(randomOffset);
    return placer;
}

EM_PORT_API(ZeroPlacer *)
InitialPlacer_ZeroPlacer(double randomRange, bool randomOffset)
{
    ZeroPlacer *placer = new ZeroPlacer();
    placer->setRandomRange(randomRange);
    placer->setRandomOffset(randomOffset);
    return placer;
}
