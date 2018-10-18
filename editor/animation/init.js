//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function rectangles_unionCanvas(dom, input, exp) {
            const attr = {
                rect: {
                    grid: {
                        'stroke': '#6FB3DE',
                        'stroke-width': 0.5,
                    },
                    frame: {
                        'stroke': 'orange',
                        'stroke-width': 2.0,
                    },
                    squre: {
                        'stroke': '#f18617',
                        'stroke-width': 0.5,
                        'fill': '#faba00',
                    },
                },
                line: {
                    scale: {
                        'stroke': '#6FB3DE',
                        'stroke-width': 1.5,
                    },
                },
                text: {
                    scale: {
                        'font-size': '10px',
                        'font-family': 'robot', 
                        'fill': '#006CA9',
                        'stroke-width': 0,
                    },
                    explanation: {
                        'font-size': '15px',
                        'font-family': 'Verdana', 
                        'text-anchor': 'middle',
                        'color': 'rgb(105,105,105)',
                    },
                }
            };
            let [min_x, min_y, max_x, max_y] = [100, 100, 0, 0];
            let [neg_x, neg_y] = [0, 0];

            // check input empty ?
            input = input.length ? input: [[10, 0, 10, 5]];

            // get size of data
            input.forEach(rect=>{
                const [sx, sy, ex, ey] = rect;
                min_x = Math.min(min_x, sx-1);
                min_y = Math.min(min_y, sy-1);
                max_x = Math.max(max_x, ex+1);
                max_y = Math.max(max_y, ey+1);
                neg_x = Math.min(...[neg_x, sx-1]);
                neg_y = Math.min(...[neg_y, sy-1]);

            });

            const SIZE = Math.min(250/(max_x-neg_x), 250/(max_y-neg_y));
            const os = 20;

            // canvas
            const paper = Raphael(dom, 250+(os*2),
                SIZE*(max_y-neg_y)+os*1.5, 0, 0);

            // scale column (number and line)
            for (let i = Math.min(0, min_x); i <= max_x; i += 1) { 
                if (i % 5 === 0) {
                    paper.text(os+(i-neg_x)*SIZE, os/2, i).attr(
                        attr.text.scale);
                    paper.path('M' + (os+(i-neg_x)*SIZE) + ',' + os +
                        ' l0,' + ((max_y-neg_y)*SIZE)).attr(
                            attr.line.scale); 
                }
            }

            // scale row (number and line)
            for (let i = Math.min(0, min_y)+1; i <= max_y; i += 1) { 
                if (i % 5 === 0) {
                    paper.text(os/2, os+(i-neg_y)*SIZE, i).attr(
                        attr.text.scale);
                    paper.path('M' + os + ',' + (os+(i-neg_y)*SIZE) + ' l' +
                        ((max_x-neg_x)*SIZE) + ',0').attr(attr.line.scale); 
                }
            }

            // draw grid
            for (let x=0; x < max_x-neg_x; x += 1) {
                for (let y=0; y < max_y-neg_y; y += 1) {
                        paper.rect(x*SIZE+os, y*SIZE+os, SIZE, SIZE).attr(
                            attr.rect.grid);
                }
            }

            // draw rect
            input.forEach(rect=>{
                const [sx, sy, ex, ey] = rect;

                // frame
                paper.rect((sx-neg_x)*SIZE+os, (sy-neg_y)*SIZE+os,
                    (ex-sx)*SIZE, (ey-sy)*SIZE).attr(attr.rect.frame);

                // squares
                for (let r=sy; r < ey; r += 1) {
                    for (let c=sx; c < ex; c += 1) {
                        paper.rect((c-neg_x)*SIZE+os, (r-neg_y)*SIZE+os,
                            SIZE, SIZE).attr(attr.rect.squre);
                    }
                }
            });

            // explanation
            if (exp) {
                const exp_div = document.createElement('div');
                exp_div.innerHTML = exp;

                exp_div.style.fontFamily
                    = attr.text.explanation['font-family'];
                exp_div.style.fontSize
                    = attr.text.explanation['font-size'];
                exp_div.style.color
                    = attr.text.explanation['color'];
                exp_div.style.textAlign = 'center';

                dom.appendChild(exp_div);
            }
        }
        
        var $tryit;

        var io = new extIO({
            multipleArguments: true,
            functions: {
                python: 'rectangles_union',
                js: 'rectanglesUnion'
            },
            animation: function($expl, data){
                rectangles_unionCanvas(
                    $expl[0],
                    data.in[0],
                    data.ext.explanation
                );
            }
        });
        io.start();
    }
);
