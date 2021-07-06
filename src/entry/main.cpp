
#include <ogdf/basic/GraphAttributes.h>
#include <ogdf/graphalg/steiner_tree/EdgeWeightedGraph.h>
#include <ogdf/energybased/DavidsonHarelLayout.h>
#include <ogdf/energybased/GEMLayout.h>
#include <ogdf/energybased/FMMMLayout.h>
#include <ogdf/energybased/PivotMDS.h>
#include <ogdf/energybased/StressMinimization.h>
using namespace ogdf;

#ifndef EM_PORT_API
#	if defined(__EMSCRIPTEN__)
#		include <emscripten.h>
#		if defined(__cplusplus)
#			define EM_PORT_API(rettype) extern "C" rettype EMSCRIPTEN_KEEPALIVE
#		else
#			define EM_PORT_API(rettype) rettype EMSCRIPTEN_KEEPALIVE
#		endif
#	else
#		if defined(__cplusplus)
#			define EM_PORT_API(rettype) extern "C" rettype
#		else
#			define EM_PORT_API(rettype) rettype
#		endif
#	endif
#endif

/*
PARAMETER_MAPPING = {
    pageFormat: {
        Square: 0,
        Portrait: 1,
        Landscape: 2,
    },
    qualityVersusSpeed: {
        BeautifulAndFast: 0,
        GorgeousAndEfficient: 1,
        NiceAndIncredibleSpeed: 2,
    },
}
*/
EM_PORT_API(float*) FM3(int node_num, int link_num, int* source, int* target, bool useHighLevelOptions, bool singleLevel, int pageFormat, double unitEdgeLength, bool newInitialPlacement, int qualityVersusSpeed, int randSeed, int edgeLengthMeasurement, int allowedPositions, int maxIntPosExponent, double pageRatio, int stepsForRotatingComponents, int tipOverCCs, double minDistCC, int presortCCs, int minGraphSize, int galaxyChoice, int randomTries, int maxIterChange, int maxIterFactor, int initialPlacementMult, int forceModel, double springStrength, double repForcesStrength, int repulsiveForcesCalculation, int stopCriterion, double threshold, int fixedIterations, double forceScalingFactor, bool coolTemperature, double coolValue, int initialPlacementForces, bool resizeDrawing, double resizingScalar, int fineTuningIterations, double fineTuneScalar, bool adjustPostRepStrengthDynamically, double postSpringStrength, double postStrengthOfRepForces, int frGridQuotient, int nmTreeConstruction, int nmSmallCell, int nmParticlesInLeaves, int nmPrecision) {
	node* nodes;
	Graph G;
	GraphAttributes GA(G,
		GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics);

		
	nodes = new node[node_num];
	for (int i = 0; i < node_num; i++){
		nodes[i] = G.newNode();
	}

	edge e;

	for (int i = 0; i < link_num; i++) {
		e = G.newEdge(nodes[source[i]], nodes[target[i]]);
		GA.bends(e);
	}
	//LayoutModule
	FMMMLayout *model = new FMMMLayout();

	// parameters: https://ogdf.uos.de/doc/classogdf_1_1_f_m_m_m_layout.html
	// high-level-options
	model->useHighLevelOptions(useHighLevelOptions);
	model->setSingleLevel(singleLevel);
	model->pageFormat(static_cast<FMMMOptions::PageFormatType>(pageFormat));
	model->unitEdgeLength(unitEdgeLength);
	model->newInitialPlacement(newInitialPlacement);
	model->qualityVersusSpeed(static_cast<FMMMOptions::QualityVsSpeed>(qualityVersusSpeed));

	// low-level-options
	model->randSeed(randSeed);
	model->edgeLengthMeasurement(static_cast<FMMMOptions::EdgeLengthMeasurement>(edgeLengthMeasurement));
	model->allowedPositions(static_cast<FMMMOptions::AllowedPositions>(allowedPositions));
	model->maxIntPosExponent(maxIntPosExponent);

	// divide-et-impera-step-options
	model->pageRatio(pageRatio);
	model->stepsForRotatingComponents(stepsForRotatingComponents);
	model->tipOverCCs(static_cast<FMMMOptions::TipOver>(tipOverCCs));
	model->minDistCC(minDistCC);
	model->presortCCs(static_cast<FMMMOptions::PreSort>(presortCCs));

	// multilevel-step-options
	model->minGraphSize(minGraphSize);
	model->galaxyChoice(static_cast<FMMMOptions::GalaxyChoice>(galaxyChoice));
	model->randomTries(randomTries);
	model->maxIterChange(static_cast<FMMMOptions::MaxIterChange>(maxIterChange));
	model->maxIterFactor(maxIterFactor);
	model->initialPlacementMult(static_cast<FMMMOptions::InitialPlacementMult>(initialPlacementMult));

	// force-calculation-step-options
	model->forceModel(static_cast<FMMMOptions::ForceModel>(forceModel));
	model->springStrength(springStrength);
	model->repForcesStrength(repForcesStrength);
	model->repulsiveForcesCalculation(static_cast<FMMMOptions::RepulsiveForcesMethod>(repulsiveForcesCalculation));
	model->stopCriterion(static_cast<FMMMOptions::StopCriterion>(stopCriterion));
	model->threshold(threshold);
	model->fixedIterations(fixedIterations);
	model->forceScalingFactor(forceScalingFactor);
	model->coolTemperature(coolTemperature);
	model->coolValue(coolValue);
	model->initialPlacementForces(static_cast<FMMMOptions::InitialPlacementForces>(initialPlacementForces));

	// postprocessing-step-options
	model->resizeDrawing(resizeDrawing);
	model->resizingScalar(resizingScalar);
	model->fineTuningIterations(fineTuningIterations);
	model->fineTuneScalar(fineTuneScalar);
	model->adjustPostRepStrengthDynamically(adjustPostRepStrengthDynamically);
	model->postSpringStrength(postSpringStrength);
	model->postStrengthOfRepForces(postStrengthOfRepForces);

	// repulsive-force-approximation-methods-options
    model->frGridQuotient(frGridQuotient);
	model->nmTreeConstruction(static_cast<FMMMOptions::ReducedTreeConstruction>(nmTreeConstruction));
	model->nmSmallCell(static_cast<FMMMOptions::SmallestCellFinding>(nmSmallCell));
	model->nmParticlesInLeaves(nmParticlesInLeaves);
	model->nmPrecision(nmPrecision);

	model->call(GA);

	float* re = (float*)malloc(node_num * 2 * 4);
    for(int i = 0; i < node_num; ++i) {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}

EM_PORT_API(void) free_buf(void* buf) {
    free(buf);
}


EM_PORT_API(float*) PMDS(int node_num, int link_num, int* source, int* target, double* edgesWeight, double edgeCosts , int numberOfPivots , bool useEdgeCostsAttribute) {
	node* nodes;
	Graph G;
	GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics | GraphAttributes::edgeDoubleWeight);

	nodes = new node[node_num];
	for (int i = 0; i < node_num; i++){
		nodes[i] = G.newNode();
	}

	edge e;

	for (int i = 0; i < link_num; i++) {
		e = G.newEdge(nodes[source[i]], nodes[target[i]]);
		GA.bends(e);
		GA.doubleWeight(e) = edgesWeight[i];
	}
	//LayoutModule
	PivotMDS *model = new PivotMDS();
	
	model->setEdgeCosts(edgeCosts);
	model->setNumberOfPivots(numberOfPivots);
	model->useEdgeCostsAttribute(true);

    model->call(GA);

	float* re = (float*)malloc(node_num * 2 * 4);
    for(int i = 0; i < node_num; ++i) {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}

EM_PORT_API(float*) SM(int node_num, int link_num, int* source, int* target, double* edgesWeight, double* nodesX, double* nodesY, int terminationCriterion, bool fixXCoords, bool fixYCoords, bool fixZCoords, bool hasInitialLayout, bool layoutComponentsSeparately, double edgeCosts, int numberOfIterations, bool useEdgeCostsAttribute){
	node* nodes;
	Graph G;
	GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics | GraphAttributes::edgeDoubleWeight);

	nodes = new node[node_num];
	for (int i = 0; i < node_num; i++){
		nodes[i] = G.newNode();
		GA.x(nodes[i]) = nodesX[i];
		GA.y(nodes[i]) = nodesY[i];
	}

	edge e;

	for (int i = 0; i < link_num; i++) {
		e = G.newEdge(nodes[source[i]], nodes[target[i]]);
		GA.bends(e);
		GA.doubleWeight(e) = edgesWeight[i];
	}
	//LayoutModule
	StressMinimization *model = new StressMinimization();

	model->convergenceCriterion(static_cast<StressMinimization::TerminationCriterion>(terminationCriterion));
	model->fixXCoordinates(fixXCoords);
	model->fixYCoordinates(fixYCoords);
	model->fixZCoordinates(fixZCoords);
	model->hasInitialLayout(hasInitialLayout);
	model->layoutComponentsSeparately(layoutComponentsSeparately);
	model->setEdgeCosts(edgeCosts);
	model->setIterations(numberOfIterations);
	model->useEdgeCostsAttribute(useEdgeCostsAttribute);

    model->call(GA);

	float* re = (float*)malloc(node_num * 2 * 4);
    for(int i = 0; i < node_num; ++i) {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}

EM_PORT_API(float*) GEM(int node_num, int link_num, int* source, int* target, double* nodesX, double* nodesY, int attractionFormula, double desiredLength, double gravitationalConstant, double initialTemperature, double maximalDisturbance, double minDistCC, double minimalTemperature, int numberOfRounds, double oscillationAngle, double oscillationSensitivity, double pageRatio, double rotationAngle, double rotationSensitivity){
	node* nodes;
	Graph G;
	GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics | GraphAttributes::edgeDoubleWeight);

	nodes = new node[node_num];
	for (int i = 0; i < node_num; i++){
		nodes[i] = G.newNode();
		GA.x(nodes[i]) = nodesX[i];
		GA.y(nodes[i]) = nodesY[i];
	}

	edge e;

	for (int i = 0; i < link_num; i++) {
		e = G.newEdge(nodes[source[i]], nodes[target[i]]);
		GA.bends(e);
	}
	//LayoutModule
	GEMLayout *model = new GEMLayout();

	model->attractionFormula(attractionFormula);
	model->desiredLength(desiredLength);
	model->gravitationalConstant(gravitationalConstant);
	model->initialTemperature(initialTemperature);
	model->maximalDisturbance(maximalDisturbance);
	model->minDistCC(minDistCC);
	model->minimalTemperature(minimalTemperature);
	model->numberOfRounds(numberOfRounds);
	model->oscillationAngle(oscillationAngle);
	model->oscillationSensitivity(oscillationSensitivity);
	model->pageRatio(pageRatio);
	model->rotationAngle(rotationAngle);
	model->rotationSensitivity(rotationSensitivity);

    model->call(GA);

	float* re = (float*)malloc(node_num * 2 * 4);
    for(int i = 0; i < node_num; ++i) {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}

EM_PORT_API(float*) DH(int node_num, int link_num, int* source, int* target, int settings, double attractionWeight, bool iterationNumberAsFactor, double nodeOverlapWeight, int numberOfIterations, double planarityWeight, double preferredEdgeLength, double preferredEdgeLengthMultiplier, double repulsionWeight, int speed, int startTemperature){
	node* nodes;
	Graph G;
	GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics | GraphAttributes::edgeDoubleWeight);

	nodes = new node[node_num];
	for (int i = 0; i < node_num; i++){
		nodes[i] = G.newNode();
	}

	edge e;

	for (int i = 0; i < link_num; i++) {
		e = G.newEdge(nodes[source[i]], nodes[target[i]]);
		GA.bends(e);
	}
	//LayoutModule
	DavidsonHarelLayout *model = new DavidsonHarelLayout();

	model->fixSettings(static_cast<DavidsonHarelLayout::SettingsParameter>(settings));
	model->setAttractionWeight(attractionWeight);
	model->setIterationNumberAsFactor(iterationNumberAsFactor);
	model->setNodeOverlapWeight(nodeOverlapWeight);
	model->setNumberOfIterations(numberOfIterations);
	model->setPlanarityWeight(planarityWeight);
	model->setPreferredEdgeLength(preferredEdgeLength);
	model->setPreferredEdgeLengthMultiplier(preferredEdgeLengthMultiplier);
	model->setRepulsionWeight(repulsionWeight);
	model->setSpeed(static_cast<DavidsonHarelLayout::SpeedParameter>(speed));
	model->setStartTemperature(startTemperature);

    model->call(GA);

	float* re = (float*)malloc(node_num * 2 * 4);
    for(int i = 0; i < node_num; ++i) {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}