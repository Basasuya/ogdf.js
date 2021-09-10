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

EM_PORT_API(float *)
NR(int node_num, int link_num, int *source, int *target, double bendNormalizationAngle, double desiredMinEdgeLength, double dummyInsertionThreshold, double gravitation, int initDummiesPerEdge, double initialTemperature, double maxDisturbance, int maxDummiesPerEdge, double minDistCC, double minimalTemperature, int numberOfIterations, double oscillationAngle, double pageRatio, int postProcessing, bool randomInitialPlacement, double repulsionDistance, double temperatureDecreaseOffset)
{
    node *nodes;
    Graph G;
    GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics);

    nodes = new node[node_num];
    for (int i = 0; i < node_num; i++)
    {
        nodes[i] = G.newNode();
    }

    edge e;

    for (int i = 0; i < link_num; i++)
    {
        e = G.newEdge(nodes[source[i]], nodes[target[i]]);
        GA.bends(e);
    }
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

    model->call(GA);

    float *re = (float *)malloc(node_num * 2 * 4);
    for (int i = 0; i < node_num; ++i)
    {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}