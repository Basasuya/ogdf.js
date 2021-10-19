#include <ogdf/energybased/SpringEmbedderKK.h>
#include "../main.h"

EM_PORT_API(SpringEmbedderKK *)
LayoutModule_SpringEmbedderKK(bool computeMaxIterations, double desLength, int globalIterationFactor, int maxGlobalIterations, int maxLocalIterations, double stopTolerance, bool useLayout, double zeroLength)
{
	//LayoutModule
	SpringEmbedderKK *model = new SpringEmbedderKK();

	model->computeMaxIterations(computeMaxIterations);
	model->setDesLength(desLength);
	model->setGlobalIterationFactor(globalIterationFactor);
	model->setMaxGlobalIterations(maxGlobalIterations);
	model->setMaxLocalIterations(maxLocalIterations);
	model->setStopTolerance(stopTolerance);
	model->setUseLayout(useLayout);
	model->setZeroLength(zeroLength);

	return model;
}