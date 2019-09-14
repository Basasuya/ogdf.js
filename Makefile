ogdf.js:
	emcc src/test_ogdf.cpp src/timer.cpp -o $@ -std=c++11 -s SINGLE_FILE=1 --bind -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s TOTAL_MEMORY=335544320 -O3 \
        -I./ogdf/include -L./ogdf/build -lCOIN -lOGDF -s ERROR_ON_UNDEFINED_SYMBOLS=0 -s ASSERTIONS=1
	mv $@ tmp-raw.js
	cat src/shell-pre.js tmp-raw.js src/shell-post.js > $@
	rm tmp-raw.js

clean:
	rm ogdf.js