#include "../main.h"

#include <ogdf/augmentation/DfsMakeBiconnected.h>
#include <ogdf/augmentation/PlanarAugmentation.h>
#include <ogdf/augmentation/PlanarAugmentationFix.h>

EM_PORT_API(DfsMakeBiconnected *)
AugmentationModule_DfsMakeBiconnected()
{
    DfsMakeBiconnected *dfs = new DfsMakeBiconnected();
    return dfs;
}

EM_PORT_API(PlanarAugmentation *)
AugmentationModule_PlanarAugmentation()
{
    PlanarAugmentation *pa = new PlanarAugmentation();
    return pa;
}

EM_PORT_API(PlanarAugmentationFix *)
AugmentationModule_PlanarAugmentationFix()
{
    PlanarAugmentationFix *fix = new PlanarAugmentationFix();
    return fix;
}
