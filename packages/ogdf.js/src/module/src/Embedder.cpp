#include "../main.h"

#include <ogdf/planarity/EmbedderMaxFace.h>
#include <ogdf/planarity/EmbedderMinDepth.h>
#include <ogdf/planarity/EmbedderMinDepthPiTa.h>
#include <ogdf/planarity/EmbedderOptimalFlexDraw.h>
#include <ogdf/planarity/SimpleEmbedder.h>

EM_PORT_API(EmbedderMaxFace *)
EmbedderModule_EmbedderMaxFace(double timeLimit)
{
    EmbedderMaxFace *maxFace = new EmbedderMaxFace();
    maxFace->timeLimit(timeLimit);
    return maxFace;
}

EM_PORT_API(EmbedderMinDepth *)
EmbedderModule_EmbedderMinDepth(double timeLimit)
{
    EmbedderMinDepth *minDepth = new EmbedderMinDepth();
    minDepth->timeLimit(timeLimit);
    return minDepth;
}

EM_PORT_API(EmbedderMinDepthPiTa *)
EmbedderModule_EmbedderMinDepthPiTa(double timeLimit, bool useExtendedDepthDefinition)
{
    EmbedderMinDepthPiTa *minDepthPiTa = new EmbedderMinDepthPiTa();
    minDepthPiTa->timeLimit(timeLimit);
    minDepthPiTa->useExtendedDepthDefinition(useExtendedDepthDefinition);
    return minDepthPiTa;
}

EM_PORT_API(EmbedderOptimalFlexDraw *)
EmbedderModule_EmbedderOptimalFlexDraw(double timeLimit)
{
    EmbedderOptimalFlexDraw *optimalFlexDraw = new EmbedderOptimalFlexDraw();
    optimalFlexDraw->timeLimit(timeLimit); //-1, or >= 0
    return optimalFlexDraw;
}

EM_PORT_API(SimpleEmbedder *)
EmbedderModule_SimpleEmbedder(double timeLimit)
{
    SimpleEmbedder *simple = new SimpleEmbedder();
    simple->timeLimit(timeLimit);
    return simple;
}
