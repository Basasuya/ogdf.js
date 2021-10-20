#include "../main.h"

#include <ogdf/planarlayout/BiconnectedShellingOrder.h>
#include <ogdf/planarlayout/TriconnectedShellingOrder.h>

EM_PORT_API(BiconnectedShellingOrder *)
ShellingOrderModule_BiconnectedShellingOrder(double baseRatio)
{
    BiconnectedShellingOrder *bi = new BiconnectedShellingOrder();
    bi->baseRatio(baseRatio);
    return bi;
}

EM_PORT_API(TriconnectedShellingOrder *)
ShellingOrderModule_TriconnectedShellingOrder(double baseRatio)
{
    TriconnectedShellingOrder *tri = new TriconnectedShellingOrder();
    tri->baseRatio(baseRatio);
    return tri;
}
