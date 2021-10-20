#include <ogdf/energybased/FastMultipoleEmbedder.h>
#include "../main.h"

EM_PORT_API(FastMultipoleMultilevelEmbedder *)
LayoutModule_FastMultipoleMultilevelEmbedder(int maxNumThreads, int multilevelUntilNumNodesAreLess)
{
    //LayoutModule
    FastMultipoleMultilevelEmbedder *model = new FastMultipoleMultilevelEmbedder();

    model->maxNumThreads(maxNumThreads);
    model->multilevelUntilNumNodesAreLess(multilevelUntilNumNodesAreLess);

    return model;
}