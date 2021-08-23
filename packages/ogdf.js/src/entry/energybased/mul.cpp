#include <ogdf/energybased/MultilevelLayout.h>
#include "../main.h"

EM_PORT_API(float *) MUL(
    int node_num,
    int link_num,
    int *source,
    int *target, 
    int layoutType, 
    int multilevelBuilderType, 
    int multilevelBuilderType_EdgeCoverMerger_edgeLengthAdjustment, 
    double multilevelBuilderType_EdgeCoverMerger_factor, 
    float searchDepthBase, 
    bool selectByNodeMass, 
    int placerType, 
    bool randomOffset, 
    bool weightedPositionPriority, 
    double circleSize, 
    int nodeSelection, 
    bool radiusFixed, 
    double randomRange)
{
    node *nodes;
    Graph G;
    GraphAttributes GA(G,
                       GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics);

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
    MultilevelLayout *model = new MultilevelLayout();

    LayoutModule *layout = getLayout(layoutType);
    model->setLayout(layout);

    MultilevelBuilder *builder = getMultilevelBuilder(multilevelBuilderType, edgeLengthAdjustment, factor, searchDepthBase, selectByNodeMass);
    model->setMultilevelBuilder(builder);

    InitialPlacer *placer = getInitialPlacer(placerType, randomOffset, weightedPositionPriority, circleSize, nodeSelection, radiusFixed, randomRange);
    model->setPlacer(placer);

    model->call(GA);

    float *re = (float *)malloc(node_num * 2 * 4);
    for (int i = 0; i < node_num; ++i)
    {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}