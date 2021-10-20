#include "../main.h"

#include <ogdf/layered/OptimalHierarchyClusterLayout.h>

EM_PORT_API(OptimalHierarchyClusterLayout *)
HierarchyClusterLayoutModule_OptimalHierarchyClusterLayout(bool fixedLayerDistance, double layerDistance, double nodeDistance, double weightBalancing, double weightClusters, double weightSegments)
{
    OptimalHierarchyClusterLayout *optimalHierarchyClusterLayout = new OptimalHierarchyClusterLayout();
    optimalHierarchyClusterLayout->fixedLayerDistance(fixedLayerDistance);
    optimalHierarchyClusterLayout->layerDistance(layerDistance);
    optimalHierarchyClusterLayout->nodeDistance(nodeDistance);
    optimalHierarchyClusterLayout->weightBalancing(weightBalancing);
    optimalHierarchyClusterLayout->weightClusters(weightClusters);
    optimalHierarchyClusterLayout->weightSegments(weightSegments);
    return optimalHierarchyClusterLayout;
}
