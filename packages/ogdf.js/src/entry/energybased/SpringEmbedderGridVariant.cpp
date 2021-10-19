#include <ogdf/energybased/SpringEmbedderGridVariant.h>
#include "../main.h"

EM_PORT_API(SpringEmbedderGridVariant *)
LayoutModule_SpringEmbedderGridVariant(double avgConvergenceFactor, int forceModel, int forceModelImprove, double idealEdgeLength, int iterations, int iterationsImprove, double maxConvergenceFactor, unsigned int maxThreads, double minDistCC, bool noise, double pageRatio, double scaleFunctionFactor, int scaling, double userBoundingBoxXmin, double userBoundingBoxYmin, double userBoundingBoxXmax, double userBoundingBoxYmax)
{
    //LayoutModule
	SpringEmbedderGridVariant *model = new SpringEmbedderGridVariant();
	
	model->avgConvergenceFactor(avgConvergenceFactor);
    model->forceModel(static_cast<SpringForceModel>(forceModel));
    model->forceModelImprove(static_cast<SpringForceModel>(forceModelImprove));
    model->idealEdgeLength(idealEdgeLength);
    model->iterations(iterations);
    model->iterationsImprove(iterationsImprove);
    model->maxConvergenceFactor(maxConvergenceFactor);
    model->maxThreads(maxThreads);
    model->minDistCC(minDistCC);
    model->noise(noise);
    model->pageRatio(pageRatio);
    model->scaleFunctionFactor(scaleFunctionFactor);
    model->scaling(static_cast<spring_embedder::SpringEmbedderBase::Scaling>(scaling));
    model->userBoundingBox(userBoundingBoxXmin,userBoundingBoxYmin,userBoundingBoxXmax,userBoundingBoxYmax);

    return model;
}