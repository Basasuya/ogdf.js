#include <ogdf/energybased/NodeRespecterLayout.h>
#include "../main.h"

EM_PORT_API(NodeRespecterLayout *)
LayoutModule_NodeRespecterLayout(double bendNormalizationAngle, double desiredMinEdgeLength, double dummyInsertionThreshold, double gravitation, int initDummiesPerEdge, double initialTemperature, double maxDisturbance, int maxDummiesPerEdge, double minDistCC, double minimalTemperature, int numberOfIterations, double oscillationAngle, double pageRatio, int postProcessing, bool randomInitialPlacement, double repulsionDistance, double temperatureDecreaseOffset)
{
    //LayoutModule
    NodeRespecterLayout *model = new NodeRespecterLayout();

    model->setBendNormalizationAngle(bendNormalizationAngle);
    model->setDesiredMinEdgeLength(desiredMinEdgeLength);
    model->setDummyInsertionThreshold(dummyInsertionThreshold);
    model->setGravitation(gravitation);
    model->setInitDummiesPerEdge(initDummiesPerEdge);
    model->setInitialTemperature(initialTemperature);
    model->setMaxDisturbance(maxDisturbance);
    model->setMaxDummiesPerEdge(maxDummiesPerEdge);
    model->setMinDistCC(minDistCC);
    model->setMinimalTemperature(minimalTemperature);
    model->setNumberOfIterations(numberOfIterations);
    model->setOscillationAngle(oscillationAngle);
    model->setPageRatio(pageRatio);
    model->setPostProcessing(static_cast<NodeRespecterLayout::PostProcessingMode>(postProcessing));
    model->setRandomInitialPlacement(randomInitialPlacement);
    model->setRepulsionDistance(repulsionDistance);
    model->setTemperatureDecreaseOffset(temperatureDecreaseOffset);

    return model;
}