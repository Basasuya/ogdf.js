
#include <ogdf/basic/GraphAttributes.h>
#include <ogdf/energybased/FMMMLayout.h>
#include <ogdf/energybased/PivotMDS.h>
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


EM_PORT_API(float*) PMDS(int node_num, int link_num, int* source, int* target) {
	node* nodes;
	Graph G;
	GraphAttributes GA(G, GraphAttributes::nodeGraphics | GraphAttributes::edgeGraphics);

		
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
	PivotMDS *model = new PivotMDS();

    model->call(GA);

	float* re = (float*)malloc(node_num * 2 * 4);
    for(int i = 0; i < node_num; ++i) {
        re[i * 2] = GA.x(nodes[i]);
        re[i * 2 + 1] = GA.y(nodes[i]);
    }

    return re;
}
