#include "../main.h"

#include <ogdf/packing/SimpleCCPacker.h>
#include <ogdf/packing/TileToRowsCCPacker.h>

EM_PORT_API(TileToRowsCCPacker *)
CCLayoutPackModule_TileToRowsCCPacker()
{
    TileToRowsCCPacker *tile2row = new TileToRowsCCPacker();
    return tile2row;
}

EM_PORT_API(SimpleCCPacker *)
CCLayoutPackModule_SimpleCCPacker()
{
    SimpleCCPacker *simple = new SimpleCCPacker();
    return simple;
}