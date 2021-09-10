#include "../main.h"

#include <ogdf/planarlayout/MixedModelLayout.h>

EM_PORT_API(MixedModelLayout *)
GridLayoutPlanRepModule_MixedModelLayout(double separation, AugmentationModule *augmenter, MixedModelCrossingsBeautifierModule *crossingsBeautifier, EmbedderModule *embedder, ShellingOrderModule *shellingOrder)
{
    MixedModelLayout *mixed = new MixedModelLayout();
    mixed->separation(separation);
    mixed->setAugmenter(augmenter);
    mixed->setCrossingsBeautifier(crossingsBeautifier);
    mixed->setEmbedder(embedder);
    mixed->setShellingOrder(shellingOrder);
    return mixed;
}
