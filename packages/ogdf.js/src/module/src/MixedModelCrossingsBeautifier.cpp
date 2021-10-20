#include "../main.h"

#include <ogdf/planarlayout/MixedModelLayout.h>
#include <ogdf/planarlayout/MMCBDoubleGrid.h>
#include <ogdf/planarlayout/MMCBLocalStretch.h>

EM_PORT_API(MMCBDoubleGrid *)
MixedModelCrossingsBeautifierModule_MMCBDoubleGrid()
{
    MMCBDoubleGrid *dg = new MMCBDoubleGrid();
    return dg;
}

EM_PORT_API(MMCBLocalStretch *)
MixedModelCrossingsBeautifierModule_MMCBLocalStretch()
{
    MMCBLocalStretch *ls = new MMCBLocalStretch();
    return ls;
}

EM_PORT_API(MMDummyCrossingsBeautifier *)
MixedModelCrossingsBeautifierModule_MMDummyCrossingsBeautifier()
{
    MMDummyCrossingsBeautifier *dummy = new MMDummyCrossingsBeautifier();
    return dummy;
}
