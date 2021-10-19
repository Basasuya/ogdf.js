#include <ogdf/layered/FastSimpleHierarchyLayout.h>
#include <ogdf/layered/SugiyamaLayout.h>
#include <ogdf/layered/CoffmanGrahamRanking.h>
#include <ogdf/layered/LongestPathRanking.h>
#include "../main.h"

EM_PORT_API(SugiyamaLayout *)
LayoutModule_SugiyamaLayout(bool alignBaseClasses, bool alignSiblings, bool arrangeCCs, int fails, unsigned int maxThreads, double minDistCC, double pageRatio, bool permuteFirst, int runs, bool transpose, HierarchyClusterLayoutModule *clusterLayout, LayeredCrossMinModule *crossMin, HierarchyLayoutModule *layout, CCLayoutPackModule *packer, RankingModule *ranking)
{
	//LayoutModule
	SugiyamaLayout *model = new SugiyamaLayout();

	model->alignBaseClasses(alignBaseClasses);
	model->alignSiblings(alignSiblings);
	model->arrangeCCs(arrangeCCs);
	model->fails(fails);
	model->maxThreads(maxThreads);
	model->minDistCC(minDistCC);
	model->pageRatio(pageRatio);
	model->permuteFirst(permuteFirst);
	model->runs(runs);
	model->transpose(transpose);

	model->setClusterLayout(clusterLayout);
	model->setCrossMin(crossMin);
	model->setLayout(layout);
	model->setPacker(packer);
	model->setRanking(ranking);

	return model;
}