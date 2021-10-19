#include <ogdf/energybased/FastMultipoleEmbedder.h>
#include "../main.h"

EM_PORT_API(FastMultipoleEmbedder *)
LayoutModule_FastMultipoleEmbedder(float defaultEdgeLength, float defaultNodeSize, uint32_t multipolePrec, uint32_t numberOfThreads, uint32_t numIterations, bool randomize)
{
    //LayoutModule
    FastMultipoleEmbedder *model = new FastMultipoleEmbedder();

    model->setDefaultEdgeLength(defaultEdgeLength);
    model->setDefaultNodeSize(defaultNodeSize);
    model->setMultipolePrec(multipolePrec);
    model->setNumberOfThreads(numberOfThreads);
    model->setNumIterations(numIterations);
    model->setRandomize(randomize);

    return model;
}
