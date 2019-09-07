/** \file
 * \brief Implements GML write functionality of class GraphIO.
 *
 * \author Carsten Gutwenger
 *
 * \par License:
 * This file is part of the Open Graph Drawing Framework (OGDF).
 *
 * \par
 * Copyright (C)<br>
 * See README.md in the OGDF root directory for details.
 *
 * \par
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * Version 2 or 3 as published by the Free Software Foundation;
 * see the file LICENSE.txt included in the packaging of this file
 * for details.
 *
 * \par
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * \par
 * You should have received a copy of the GNU General Public
 * License along with this program; if not, see
 * http://www.gnu.org/copyleft/gpl.html
 */

#include <ogdf/fileformats/GraphIO.h>


namespace ogdf {


// begin of GML file
static void write_gml_header(std::ostream &os, bool directed)
{
	os << "Creator \"ogdf::GraphIO::writeGML\"\n";
	os << "graph\n[\n";
	GraphIO::indent(os,1) << "directed\t" << ((directed) ? 1 : 0) << "\n";
}


// end of GML file
static void write_gml_footer(std::ostream &os)
{
	os << "]\n"; // graph
}


// write graph structure
static void write_gml_graph(const Graph &G, std::ostream &os, NodeArray<int> &index)
{
	int nextId = 0;

	for(node v : G.nodes) {
		GraphIO::indent(os,1) << "node\n";
		GraphIO::indent(os,1) << "[\n";
		GraphIO::indent(os,2) << "id\t" << (index[v] = nextId++) << "\n";
		GraphIO::indent(os,1) << "]\n"; // node
	}

	for(edge e : G.edges) {
		GraphIO::indent(os,1) << "edge\n";
		GraphIO::indent(os,1) << "[\n";
		GraphIO::indent(os,2) << "source\t" << index[e->source()] << "\n";
		GraphIO::indent(os,2) << "target\t" << index[e->target()] << "\n";
		GraphIO::indent(os,1) << "]\n"; // edge
	}
}


const int c_maxLengthPerLine = 200;

static void writeLongString(std::ostream &os, const string &str)
{
	os << "\"";

	int num = 1;
	for(auto &elem : str)
	{
		switch(elem) {
		case '\\':
			os << "\\\\";
			num += 2;
			break;
		case '\"':
			os << "\\\"";
			num += 2;
			break;

		// ignored white space
		case '\r':
		case '\n':
		case '\t':
			break;

		default:
			os << elem;
			++num;
		}

		if(num >= c_maxLengthPerLine) {
			os << "\\\n";
			num = 0;
		}
	}

	os << "\"";
}

const char *arrow_str[4] = {
	"none", "last", "first", "both"
};

// write graph structure with attributes
static void write_gml_graph(const GraphAttributes &A, std::ostream &os, NodeArray<int> &index)
{
	const Graph &G = A.constGraph();
	int nextId = 0;

	os.setf(std::ios::showpoint);
	os.precision(10);

	for(node v : G.nodes) {
		GraphIO::indent(os,1) << "node\n";
		GraphIO::indent(os,1) << "[\n";
		GraphIO::indent(os,2) << "id\t" << (index[v] = nextId++) << "\n";

		if (A.has(GraphAttributes::nodeTemplate)) {
			GraphIO::indent(os,2) << "template\t";
			writeLongString(os, A.templateNode(v));
			os << "\n";
		}
		if (A.has(GraphAttributes::nodeLabel)) {
			GraphIO::indent(os,2) << "label\t";
			writeLongString(os, A.label(v));
			os << "\n";
		}
		if (A.has(GraphAttributes::nodeWeight)) {
			GraphIO::indent(os,2) << "weight\t"  << A.weight(v) << "\n";
		}
		if (A.has(GraphAttributes::nodeGraphics)) {
			GraphIO::indent(os,2) << "graphics\n";
			GraphIO::indent(os,2) << "[\n";
			GraphIO::indent(os,3) << "x\t" << A.x(v) << "\n";
			GraphIO::indent(os,3) << "y\t" << A.y(v) << "\n";
			if(A.has(GraphAttributes::threeD)) {
				GraphIO::indent(os,3) << "z\t" << A.z(v) << "\n";
			}
			GraphIO::indent(os,3) << "w\t" << A.width (v) << "\n";
			GraphIO::indent(os,3) << "h\t" << A.height(v) << "\n";
			if (A.has(GraphAttributes::nodeStyle))
			{
				GraphIO::indent(os,3) << "fill\t\"" << A.fillColor(v) << "\"\n";
				GraphIO::indent(os,3) << "line\t\"" << A.strokeColor (v) << "\"\n";
				GraphIO::indent(os,3) << "pattern\t\"" << toString(A.fillPattern(v)) << "\"\n";
				GraphIO::indent(os,3) << "stipple\t\""   << toString(A.strokeType(v)) << "\"\n";
				GraphIO::indent(os,3) << "lineWidth\t" << A.strokeWidth(v) << "\n";
			}
			GraphIO::indent(os,3) << "type\t\"" << toString(A.shape(v)) << "\"\n";

			GraphIO::indent(os,2) << "]\n"; // graphics
		}

		GraphIO::indent(os,1) << "]\n"; // node
	}

	for(edge e : G.edges) {
		GraphIO::indent(os,1) << "edge\n";
		GraphIO::indent(os,1) << "[\n";
		GraphIO::indent(os,2) << "source\t" << index[e->source()] << "\n";
		GraphIO::indent(os,2) << "target\t" << index[e->target()] << "\n";

		if (A.has(GraphAttributes::edgeType)){
			GraphIO::indent(os, 2) << "generalization\t" << int(A.type(e)) << "\n";
		}

		if (A.has(GraphAttributes::edgeLabel)){
			GraphIO::indent(os,2) << "label ";
			writeLongString(os, A.label(e));
			os << "\n";
		}

		if (A.has(GraphAttributes::edgeSubGraphs))
			GraphIO::indent(os,2) << "subgraph\t" << A.subGraphBits(e) << "\n";

		if (A.has(GraphAttributes::edgeGraphics) || A.has(GraphAttributes::edgeArrow) || A.has(GraphAttributes::edgeType)
		          || A.has(GraphAttributes::edgeStyle) || A.has(GraphAttributes::edgeDoubleWeight)) {
			GraphIO::indent(os,2) << "graphics\n";
			GraphIO::indent(os,2) << "[\n";

			GraphIO::indent(os,3) << "type\t\"line\"\n";

			GraphIO::indent(os,3) << "arrow\t\"";
			if (!A.has(GraphAttributes::edgeArrow)) {
				if (A.has(GraphAttributes::edgeType)) {
					if (A.type(e) == Graph::EdgeType::generalization) {
						os << "last";
					} else {
						os << "none";
					}
				} else {
					if (A.directed()) {
						os << "last";
					} else {
						os << "none";
					}
				}
			} else {
				int ae = (int)A.arrowType(e);
				OGDF_ASSERT(0 <= ae && ae < 4);
				os << arrow_str[ae];
			}
			os << "\"\n";

			if (A.has(GraphAttributes::edgeStyle)) {
				GraphIO::indent(os,3) << "stipple\t\""   << toString(A.strokeType(e)) << "\"\n";
				GraphIO::indent(os,3) << "lineWidth\t" << A.strokeWidth(e) << "\n";
			}

			if (A.has(GraphAttributes::edgeDoubleWeight)) {
				GraphIO::indent(os,3) << "weight\t" << A.doubleWeight(e) << "\n";
			}

			if (A.has(GraphAttributes::edgeGraphics)) {
				const DPolyline &dpl = A.bends(e);
				if (!dpl.empty()) {
					GraphIO::indent(os,3) << "Line [\n";
					node v = e->source();
					if( dpl.front().m_x < A.x(v) - A.width (v)/2 ||
					    dpl.front().m_x > A.x(v) + A.width (v)/2 ||
					    dpl.front().m_y < A.y(v) - A.height(v)/2 ||
					    dpl.front().m_y > A.y(v) + A.height(v)/2)
					{
						GraphIO::indent(os,4) << "point [ x " << A.x(e->source()) << " y " << A.y(e->source()) << " ]\n";
					}

					for(const DPoint &dp : dpl) {
						GraphIO::indent(os, 4) << "point [ x " << dp.m_x << " y " << dp.m_y << " ]\n";
					}

					v = e->target();
					if( dpl.back().m_x < A.x(v) - A.width (v)/2 ||
					    dpl.back().m_x > A.x(v) + A.width (v)/2 ||
					    dpl.back().m_y < A.y(v) - A.height(v)/2 ||
					    dpl.back().m_y > A.y(v) + A.height(v)/2)
					{
						GraphIO::indent(os,4) << "point [ x " << A.x(e->target()) << " y " << A.y(e->target()) << " ]\n";
					}

					GraphIO::indent(os,3) << "]\n"; // Line
				}//bends
			}

			//output width and color
			if (A.has(GraphAttributes::edgeStyle)){
				GraphIO::indent(os, 3) << "fill \"" << A.strokeColor(e) << "\"\n";
			}

			GraphIO::indent(os,2) << "]\n"; // graphics
		}

		GraphIO::indent(os,1) << "]\n"; // edge
	}
}


// write cluster structure
static void write_gml_cluster(cluster c, int d, std::ostream &os, const NodeArray<int> &index, int &nextClusterIndex)
{
	if (nextClusterIndex == 0) {
		GraphIO::indent(os, d) << "rootcluster\n";
		GraphIO::indent(os, d) << "[\n";
	}
	else
	{
		GraphIO::indent(os,d) << "cluster\n";
		GraphIO::indent(os, d) << "[\n";
		GraphIO::indent(os,d+1) << "id\t" << nextClusterIndex << "\n";
	}

	nextClusterIndex++;

	for (cluster child : c->children)
		write_gml_cluster(child, d+1, os, index, nextClusterIndex);

	for (node v : c->nodes)
		GraphIO::indent(os,d+1) << "vertex \"" << index[v] << "\"\n";

	GraphIO::indent(os,d) << "]\n"; // cluster
}


// write cluster structure with attributes
static void write_gml_cluster(const ClusterGraphAttributes &A, cluster c, int d, std::ostream &os, const NodeArray<int> &index, int &nextClusterIndex)
{
	if (nextClusterIndex == 0) {
		GraphIO::indent(os, d) << "rootcluster\n";
		GraphIO::indent(os, d) << "[\n";
	}
	else
	{
		GraphIO::indent(os,d) << "cluster\n";
		GraphIO::indent(os, d) << "[\n";
		GraphIO::indent(os,d+1) << "id\t" << nextClusterIndex << "\n";

		const string &templStr = A.templateCluster(c);
		if(templStr.length() > 0) {
			// GDE extension: Write cluster template and custom attribute
			GraphIO::indent(os,d+1) << "template ";
			writeLongString(os, templStr);
			os << "\n";

			GraphIO::indent(os,d+1) << "label ";
			writeLongString(os, A.label(c));
			os << "\n";

		} else {
			GraphIO::indent(os,d+1) << "label \"" << A.label(c) << "\"\n";
		}

		GraphIO::indent(os,d+1) << "graphics\n";
		GraphIO::indent(os,d+1) << "[\n";

		double shiftPos;
		shiftPos = A.y(c);

		GraphIO::indent(os,d+2) << "x\t" << A.x(c) << "\n";
		GraphIO::indent(os,d+2) << "y\t" << shiftPos/*y(c->index())*/ << "\n";

		GraphIO::indent(os,d+2) << "width\t"     << A.width(c)       << "\n";
		GraphIO::indent(os,d+2) << "height\t"    << A.height(c)      << "\n";
		GraphIO::indent(os,d+2) << "fill\t\""    << A.fillColor(c)   << "\"\n";
		GraphIO::indent(os,d+2) << "pattern\t\""   << A.fillPattern(c) << "\"\n";

		GraphIO::indent(os,d+2) << "color\t\""   << A.strokeColor(c)       << "\"\n";
		GraphIO::indent(os,d+2) << "lineWidth\t" << A.strokeWidth(c)   << "\n";

		if (A.strokeType(c) != StrokeType::Solid)
			GraphIO::indent(os,d+2) << "stipple\t\"" << A.strokeType(c) << "\"\n";

		GraphIO::indent(os,d+2) << "style \"rectangle\"\n";

		GraphIO::indent(os,d+1) << "]\n"; //graphics
	}

	nextClusterIndex++;

	for (cluster child : c->children)
		write_gml_cluster(A, child, d+1, os, index, nextClusterIndex);

	for (node v : c->nodes)
		GraphIO::indent(os,d+1) << "vertex \"" << index[v] << "\"\n";

	GraphIO::indent(os,d) << "]\n"; // cluster
}


// write Graph
bool GraphIO::writeGML(const Graph &G, std::ostream &os)
{
	bool result = os.good();

	if(result) {
		std::ios_base::fmtflags currentFlags = os.flags();
		os.flags(currentFlags | std::ios::fixed);
		write_gml_header(os, true);
		NodeArray<int> index(G);
		write_gml_graph(G, os, index);
		write_gml_footer(os);
		os.flags(currentFlags);
	}

	return result;
}


// write ClusterGraph
bool GraphIO::writeGML(const ClusterGraph &C, std::ostream &os)
{
	bool result = os.good();

	if(result) {
		std::ios_base::fmtflags currentFlags = os.flags();
		os.flags(currentFlags | std::ios::fixed);
		const Graph &G = C.constGraph();

		write_gml_header(os,true);
		NodeArray<int> index(G);
		write_gml_graph(G, os, index);
		write_gml_footer(os);

		int nextClusterIndex = 0;
		write_gml_cluster(C.rootCluster(), 1, os, index, nextClusterIndex);
		os.flags(currentFlags);
	}

	return result;
}


// write GraphAttributes
bool GraphIO::writeGML(const GraphAttributes &A, std::ostream &os)
{
	bool result = os.good();

	if(result) {
		std::ios_base::fmtflags currentFlags = os.flags();
		os.flags(currentFlags | std::ios::fixed);
		write_gml_header(os, A.directed());
		NodeArray<int> index(A.constGraph());
		write_gml_graph(A, os, index);
		write_gml_footer(os);
		os.flags(currentFlags);
	}

	return result;
}


// write ClusterGraphAttributes
bool GraphIO::writeGML(const ClusterGraphAttributes &A, std::ostream &os)
{
	bool result = os.good();

	if(result) {
		std::ios_base::fmtflags currentFlags = os.flags();
		os.flags(currentFlags | std::ios::fixed);
		write_gml_header(os, A.directed());
		NodeArray<int> index(A.constGraph());
		write_gml_graph(A, os, index);
		write_gml_footer(os);

		int nextClusterIndex = 0;
		write_gml_cluster(A, A.constClusterGraph().rootCluster(), 1, os, index, nextClusterIndex);
		os.flags(currentFlags);
	}

	return result;
}


}
