#include <ogdf/energybased/GEMLayout.h>
#include "../main.h"

EM_PORT_API(GEMLayout *)
LayoutModule_GEMLayout(int attractionFormula, double desiredLength, double gravitationalConstant, double initialTemperature, double maximalDisturbance, double minDistCC, double minimalTemperature, int numberOfRounds, double oscillationAngle, double oscillationSensitivity, double pageRatio, double rotationAngle, double rotationSensitivity)
{
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

	return model;
}
