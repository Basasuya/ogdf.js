#include "../main.h"

#include <ogdf/layered/FastHierarchyLayout.h>
#include <ogdf/layered/FastSimpleHierarchyLayout.h>
#include <ogdf/layered/OptimalHierarchyLayout.h>

EM_PORT_API(FastHierarchyLayout *)
HierarchyLayoutModule_FastHierarchyLayout(bool fixedLayerDistance, double layerDistance, double nodeDistance)
{
    FastHierarchyLayout *fastHierarchy = new FastHierarchyLayout();
    fastHierarchy->fixedLayerDistance(fixedLayerDistance);
    fastHierarchy->layerDistance(layerDistance);
    fastHierarchy->nodeDistance(nodeDistance);
    return fastHierarchy;
}

EM_PORT_API(FastSimpleHierarchyLayout *)
HierarchyLayoutModule_FastSimpleHierarchyLayout(bool balanced, bool downward, double layerDistance, bool leftToRight, double nodeDistance)
{
    FastSimpleHierarchyLayout *fastSimpleHierarchy = new FastSimpleHierarchyLayout();
    fastSimpleHierarchy->balanced(balanced);
    fastSimpleHierarchy->downward(downward);
    fastSimpleHierarchy->layerDistance(layerDistance);
    fastSimpleHierarchy->leftToRight(leftToRight);
    fastSimpleHierarchy->nodeDistance(nodeDistance);
    return fastSimpleHierarchy;
}

EM_PORT_API(OptimalHierarchyLayout *)
HierarchyLayoutModule_OptimalHierarchyLayout(bool fixedLayerDistance, double layerDistance, double nodeDistance, double weightBalancing, double weightSegments)
{
    OptimalHierarchyLayout *optimalHierarchyLayout = new OptimalHierarchyLayout();
    optimalHierarchyLayout->fixedLayerDistance(fixedLayerDistance);
    optimalHierarchyLayout->layerDistance(layerDistance);
    optimalHierarchyLayout->nodeDistance(nodeDistance);
    optimalHierarchyLayout->weightBalancing(weightBalancing);
    optimalHierarchyLayout->weightSegments(weightSegments);
    return optimalHierarchyLayout;
}
