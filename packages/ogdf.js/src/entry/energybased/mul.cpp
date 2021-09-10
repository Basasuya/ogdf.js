#include <ogdf/energybased/MultilevelLayout.h>
#include "../main.h"

EM_PORT_API(MultilevelLayout *)
LayoutModule_MultilevelLayout(LayoutModule *layout, MultilevelBuilder *builder, InitialPlacer *placer)
{
    //LayoutModule
    MultilevelLayout *model = new MultilevelLayout();

    model->setLayout(layout);
    model->setMultilevelBuilder(builder);
    model->setPlacer(placer);

    return model;
}

EM_PORT_API(float *)
MUL(
    int node_num,
    int link_num,
    int *source,
    int *target,
    int layoutType,
    int multilevelBuilderType,
    int multilevelBuilderType_EdgeCoverMerger_edgeLengthAdjustment,
    double multilevelBuilderType_EdgeCoverMerger_factor,
    int multilevelBuilderType_IndependentSetMerger_edgeLengthAdjustment,
    float multilevelBuilderType_IndependentSetMerger_searchDepthBase,
    int multilevelBuilderType_LocalBiconnectedMerger_edgeLengthAdjustment,
    double multilevelBuilderType_LocalBiconnectedMerger_factor,
    int multilevelBuilderType_MatchingMerger_edgeLengthAdjustment,
    bool multilevelBuilderType_MatchingMerger_selectByNodeMass,
    int multilevelBuilderType_RandomMerger_edgeLengthAdjustment,
    double multilevelBuilderType_RandomMerger_factor,
    int multilevelBuilderType_SolarMerger_edgeLengthAdjustment,
    int placerType,
    bool placerType_BarycenterPlacer_randomOffset,
    bool placerType_BarycenterPlacer_weightedPositionPriority,
    double placerType_CirclePlacer_circleSize,
    int placerType_CirclePlacer_nodeSelection,
    bool placerType_CirclePlacer_radiusFixed,
    bool placerType_CirclePlacer_randomOffset,
    bool placerType_MedianPlacer_randomOffset,
    bool placerType_RandomPlacer_randomOffset,
    double placerType_RandomPlacer_circleSize,
    bool placerType_SolarPlacer_randomOffset,
    double placerType_ZeroPlacer_randomRange,
    bool placerType_ZeroPlacer_randomOffset)
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

    MultilevelBuilder *builder = getMultilevelBuilder(
        multilevelBuilderType, multilevelBuilderType_EdgeCoverMerger_edgeLengthAdjustment,
        multilevelBuilderType_EdgeCoverMerger_factor,
        multilevelBuilderType_IndependentSetMerger_edgeLengthAdjustment,
        multilevelBuilderType_IndependentSetMerger_searchDepthBase,
        multilevelBuilderType_LocalBiconnectedMerger_edgeLengthAdjustment,
        multilevelBuilderType_LocalBiconnectedMerger_factor,
        multilevelBuilderType_MatchingMerger_edgeLengthAdjustment,
        multilevelBuilderType_MatchingMerger_selectByNodeMass,
        multilevelBuilderType_RandomMerger_edgeLengthAdjustment,
        multilevelBuilderType_RandomMerger_factor,
        multilevelBuilderType_SolarMerger_edgeLengthAdjustment);
    model->setMultilevelBuilder(builder);

    InitialPlacer *placer = getInitialPlacer(
        placerType,
        placerType_BarycenterPlacer_randomOffset,
        placerType_BarycenterPlacer_weightedPositionPriority,
        placerType_CirclePlacer_circleSize,
        placerType_CirclePlacer_nodeSelection,
        placerType_CirclePlacer_radiusFixed,
        placerType_CirclePlacer_randomOffset,
        placerType_MedianPlacer_randomOffset,
        placerType_RandomPlacer_randomOffset,
        placerType_RandomPlacer_circleSize,
        placerType_SolarPlacer_randomOffset,
        placerType_ZeroPlacer_randomRange,
        placerType_ZeroPlacer_randomOffset);
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