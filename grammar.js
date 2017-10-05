// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }


// Create a Javascript object by instantiating children
// Example:
// updateObject({a:2, b:{c:1, d:0}}, ['x', 'y', 'z'])
// ==> {a:'z', b:{c:'y', d:'x'}}

function updateObject(obj, children) {
    if (typeof obj == "object") {
        var result = obj.constructor();
        for (var key in obj) {
            result[key] = updateObject(obj[key], children);
        }
        return result;
    } else if (typeof obj == "number") {
        return children[obj];
    } else {
        return obj;
    }
}

// Wrapper function for updating Nearley parse results

function R(obj) {
    return function(d){return updateObject(obj, d)}
}

var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "main$ebnf$1", "symbols": ["will_you"], "postprocess": id},
    {"name": "main$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main$ebnf$2", "symbols": ["please"], "postprocess": id},
    {"name": "main$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main$ebnf$3", "symbols": ["please"], "postprocess": id},
    {"name": "main$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["main$ebnf$1", "main$ebnf$2", "command", "main$ebnf$3"], "postprocess": R(2)},
    {"name": "command", "symbols": ["take", "entity"], "postprocess": R({cmd:"take", ent:1})},
    {"name": "command", "symbols": ["move", "it", "location"], "postprocess": R({cmd:"put", loc:2})},
    {"name": "command", "symbols": ["move", "entity", "location"], "postprocess": R({cmd:"move", ent:1, loc:2})},
    {"name": "location", "symbols": ["relation", "entity"], "postprocess": R({rel:0, ent:1})},
    {"name": "entity", "symbols": ["quantifierSG", "objectSG"], "postprocess": R({quant:0, obj:1})},
    {"name": "entity", "symbols": ["quantifierPL", "objectPL"], "postprocess": R({quant:0, obj:1})},
    {"name": "objectSG$ebnf$1", "symbols": ["that_is"], "postprocess": id},
    {"name": "objectSG$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "objectSG", "symbols": ["objectSG", "objectSG$ebnf$1", "location"], "postprocess": R({obj:0, loc:2})},
    {"name": "objectPL$ebnf$1", "symbols": ["that_are"], "postprocess": id},
    {"name": "objectPL$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "objectPL", "symbols": ["objectPL", "objectPL$ebnf$1", "location"], "postprocess": R({obj:0, loc:2})},
    {"name": "objectSG$ebnf$2", "symbols": ["size"], "postprocess": id},
    {"name": "objectSG$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "objectSG$ebnf$3", "symbols": ["color"], "postprocess": id},
    {"name": "objectSG$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "objectSG", "symbols": ["formSG", "objectSG$ebnf$2", "objectSG$ebnf$3"], "postprocess": R({size:1, color:2, form:0})},
    {"name": "objectPL$ebnf$2", "symbols": ["size"], "postprocess": id},
    {"name": "objectPL$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "objectPL$ebnf$3", "symbols": ["color"], "postprocess": id},
    {"name": "objectPL$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "objectPL", "symbols": ["formPL", "objectPL$ebnf$2", "objectPL$ebnf$3"], "postprocess": R({size:1, color:2, form:0})},
    {"name": "quantifierSG$subexpression$1$string$1", "symbols": [{"literal":"c"}, {"literal":"u"}, {"literal":"a"}, {"literal":"l"}, {"literal":"q"}, {"literal":"u"}, {"literal":"i"}, {"literal":"e"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "quantifierSG$subexpression$1", "symbols": ["quantifierSG$subexpression$1$string$1"]},
    {"name": "quantifierSG$subexpression$1$string$2", "symbols": [{"literal":"c"}, {"literal":"u"}, {"literal":"a"}, {"literal":"l"}, {"literal":"q"}, {"literal":"u"}, {"literal":"i"}, {"literal":"e"}, {"literal":"r"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "quantifierSG$subexpression$1", "symbols": ["quantifierSG$subexpression$1$string$2"]},
    {"name": "quantifierSG$subexpression$1$string$3", "symbols": [{"literal":"u"}, {"literal":"n"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "quantifierSG$subexpression$1", "symbols": ["quantifierSG$subexpression$1$string$3"]},
    {"name": "quantifierSG$subexpression$1$string$4", "symbols": [{"literal":"u"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "quantifierSG$subexpression$1", "symbols": ["quantifierSG$subexpression$1$string$4"]},
    {"name": "quantifierSG", "symbols": ["quantifierSG$subexpression$1"], "postprocess": R("any")},
    {"name": "quantifierSG$subexpression$2$string$1", "symbols": [{"literal":"e"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "quantifierSG$subexpression$2", "symbols": ["quantifierSG$subexpression$2$string$1"]},
    {"name": "quantifierSG$subexpression$2$string$2", "symbols": [{"literal":"l"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "quantifierSG$subexpression$2", "symbols": ["quantifierSG$subexpression$2$string$2"]},
    {"name": "quantifierSG", "symbols": ["quantifierSG$subexpression$2"], "postprocess": R("the")},
    {"name": "quantifierSG$subexpression$3$string$1", "symbols": [{"literal":"t"}, {"literal":"o"}, {"literal":"d"}, {"literal":"o"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "quantifierSG$subexpression$3", "symbols": ["quantifierSG$subexpression$3$string$1"]},
    {"name": "quantifierSG$subexpression$3$string$2", "symbols": [{"literal":"t"}, {"literal":"o"}, {"literal":"d"}, {"literal":"a"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "quantifierSG$subexpression$3", "symbols": ["quantifierSG$subexpression$3$string$2"]},
    {"name": "quantifierSG", "symbols": ["quantifierSG$subexpression$3"], "postprocess": R("all")},
    {"name": "quantifierPL$subexpression$1$string$1", "symbols": [{"literal":"t"}, {"literal":"o"}, {"literal":"d"}, {"literal":"o"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "quantifierPL$subexpression$1$string$2", "symbols": [{"literal":"l"}, {"literal":"o"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "quantifierPL$subexpression$1", "symbols": ["quantifierPL$subexpression$1$string$1", "quantifierPL$subexpression$1$string$2"]},
    {"name": "quantifierPL$subexpression$1$string$3", "symbols": [{"literal":"t"}, {"literal":"o"}, {"literal":"d"}, {"literal":"a"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "quantifierPL$subexpression$1$string$4", "symbols": [{"literal":"l"}, {"literal":"a"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "quantifierPL$subexpression$1", "symbols": ["quantifierPL$subexpression$1$string$3", "quantifierPL$subexpression$1$string$4"]},
    {"name": "quantifierPL$subexpression$1$string$5", "symbols": [{"literal":"l"}, {"literal":"a"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "quantifierPL$subexpression$1", "symbols": ["quantifierPL$subexpression$1$string$5"]},
    {"name": "quantifierPL$subexpression$1$string$6", "symbols": [{"literal":"l"}, {"literal":"o"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "quantifierPL$subexpression$1", "symbols": ["quantifierPL$subexpression$1$string$6"]},
    {"name": "quantifierPL", "symbols": ["quantifierPL$subexpression$1"], "postprocess": R("all")},
    {"name": "relation$subexpression$1$string$1", "symbols": [{"literal":"i"}, {"literal":"z"}, {"literal":"q"}, {"literal":"u"}, {"literal":"i"}, {"literal":"e"}, {"literal":"r"}, {"literal":"d"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$1$string$2", "symbols": [{"literal":"d"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$1", "symbols": ["relation$subexpression$1$string$1", "relation$subexpression$1$string$2"]},
    {"name": "relation$subexpression$1$string$3", "symbols": [{"literal":"l"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$1$string$4", "symbols": [{"literal":"i"}, {"literal":"z"}, {"literal":"q"}, {"literal":"u"}, {"literal":"i"}, {"literal":"e"}, {"literal":"r"}, {"literal":"d"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$1$string$5", "symbols": [{"literal":"d"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$1", "symbols": [{"literal":"a"}, "relation$subexpression$1$string$3", "relation$subexpression$1$string$4", "relation$subexpression$1$string$5"]},
    {"name": "relation", "symbols": ["relation$subexpression$1"], "postprocess": R("leftof")},
    {"name": "relation$subexpression$2$string$1", "symbols": [{"literal":"d"}, {"literal":"e"}, {"literal":"r"}, {"literal":"e"}, {"literal":"c"}, {"literal":"h"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$2$string$2", "symbols": [{"literal":"d"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$2", "symbols": ["relation$subexpression$2$string$1", "relation$subexpression$2$string$2"]},
    {"name": "relation$subexpression$2$string$3", "symbols": [{"literal":"l"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$2$string$4", "symbols": [{"literal":"d"}, {"literal":"e"}, {"literal":"r"}, {"literal":"e"}, {"literal":"c"}, {"literal":"h"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$2$string$5", "symbols": [{"literal":"d"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$2", "symbols": [{"literal":"a"}, "relation$subexpression$2$string$3", "relation$subexpression$2$string$4", "relation$subexpression$2$string$5"]},
    {"name": "relation", "symbols": ["relation$subexpression$2"], "postprocess": R("rightof")},
    {"name": "relation$subexpression$3$string$1", "symbols": [{"literal":"a"}, {"literal":"d"}, {"literal":"e"}, {"literal":"n"}, {"literal":"t"}, {"literal":"r"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$3$string$2", "symbols": [{"literal":"d"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$3", "symbols": ["relation$subexpression$3$string$1", "relation$subexpression$3$string$2"]},
    {"name": "relation$subexpression$3$string$3", "symbols": [{"literal":"e"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$3", "symbols": ["relation$subexpression$3$string$3"]},
    {"name": "relation$subexpression$3$string$4", "symbols": [{"literal":"i"}, {"literal":"n"}, {"literal":"t"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$3", "symbols": ["relation$subexpression$3$string$4"]},
    {"name": "relation$subexpression$3$string$5", "symbols": [{"literal":"d"}, {"literal":"e"}, {"literal":"n"}, {"literal":"t"}, {"literal":"r"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$3$string$6", "symbols": [{"literal":"d"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$3", "symbols": ["relation$subexpression$3$string$5", "relation$subexpression$3$string$6"]},
    {"name": "relation", "symbols": ["relation$subexpression$3"], "postprocess": R("inside")},
    {"name": "relation$subexpression$4$string$1", "symbols": [{"literal":"e"}, {"literal":"n"}, {"literal":"c"}, {"literal":"i"}, {"literal":"m"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$4", "symbols": ["relation$subexpression$4$string$1"]},
    {"name": "relation$subexpression$4$string$2", "symbols": [{"literal":"a"}, {"literal":"r"}, {"literal":"r"}, {"literal":"i"}, {"literal":"b"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$4$string$3", "symbols": [{"literal":"d"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$4", "symbols": ["relation$subexpression$4$string$2", "relation$subexpression$4$string$3"]},
    {"name": "relation$subexpression$4$string$4", "symbols": [{"literal":"s"}, {"literal":"o"}, {"literal":"b"}, {"literal":"r"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$4", "symbols": ["relation$subexpression$4$string$4"]},
    {"name": "relation", "symbols": ["relation$subexpression$4"], "postprocess": R("ontop")},
    {"name": "relation$subexpression$5$string$1", "symbols": [{"literal":"a"}, {"literal":"b"}, {"literal":"a"}, {"literal":"j"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$5", "symbols": ["relation$subexpression$5$string$1"]},
    {"name": "relation$subexpression$5$string$2", "symbols": [{"literal":"a"}, {"literal":"b"}, {"literal":"a"}, {"literal":"j"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$5$string$3", "symbols": [{"literal":"d"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$5", "symbols": ["relation$subexpression$5$string$2", "relation$subexpression$5$string$3"]},
    {"name": "relation", "symbols": ["relation$subexpression$5"], "postprocess": R("under")},
    {"name": "relation$subexpression$6$string$1", "symbols": [{"literal":"l"}, {"literal":"a"}, {"literal":"d"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$6", "symbols": [{"literal":"a"}, "relation$subexpression$6$string$1"]},
    {"name": "relation", "symbols": ["relation$subexpression$6"], "postprocess": R("beside")},
    {"name": "relation$subexpression$7$string$1", "symbols": [{"literal":"a"}, {"literal":"b"}, {"literal":"o"}, {"literal":"v"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "relation$subexpression$7", "symbols": ["relation$subexpression$7$string$1"]},
    {"name": "relation", "symbols": ["relation$subexpression$7"], "postprocess": R("above")},
    {"name": "size$subexpression$1$string$1", "symbols": [{"literal":"c"}, {"literal":"h"}, {"literal":"i"}, {"literal":"c"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "size$subexpression$1", "symbols": ["size$subexpression$1$string$1"]},
    {"name": "size$subexpression$1$string$2", "symbols": [{"literal":"c"}, {"literal":"h"}, {"literal":"i"}, {"literal":"c"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "size$subexpression$1", "symbols": ["size$subexpression$1$string$2"]},
    {"name": "size", "symbols": ["size$subexpression$1"], "postprocess": R("small")},
    {"name": "size$string$1", "symbols": [{"literal":"g"}, {"literal":"r"}, {"literal":"a"}, {"literal":"n"}, {"literal":"d"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "size", "symbols": ["size$string$1"], "postprocess": R("large")},
    {"name": "color$subexpression$1$string$1", "symbols": [{"literal":"n"}, {"literal":"e"}, {"literal":"g"}, {"literal":"r"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "color$subexpression$1", "symbols": ["color$subexpression$1$string$1"]},
    {"name": "color$subexpression$1$string$2", "symbols": [{"literal":"n"}, {"literal":"e"}, {"literal":"g"}, {"literal":"r"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "color$subexpression$1", "symbols": ["color$subexpression$1$string$2"]},
    {"name": "color", "symbols": ["color$subexpression$1"], "postprocess": R("black")},
    {"name": "color$subexpression$2$string$1", "symbols": [{"literal":"b"}, {"literal":"l"}, {"literal":"a"}, {"literal":"n"}, {"literal":"c"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "color$subexpression$2", "symbols": ["color$subexpression$2$string$1"]},
    {"name": "color$subexpression$2$string$2", "symbols": [{"literal":"b"}, {"literal":"l"}, {"literal":"a"}, {"literal":"n"}, {"literal":"c"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "color$subexpression$2", "symbols": ["color$subexpression$2$string$2"]},
    {"name": "color", "symbols": ["color$subexpression$2"], "postprocess": R("white")},
    {"name": "color$string$1", "symbols": [{"literal":"a"}, {"literal":"z"}, {"literal":"u"}, {"literal":"l"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "color", "symbols": ["color$string$1"], "postprocess": R("blue")},
    {"name": "color$string$2", "symbols": [{"literal":"v"}, {"literal":"e"}, {"literal":"r"}, {"literal":"d"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "color", "symbols": ["color$string$2"], "postprocess": R("green")},
    {"name": "color$subexpression$3$string$1", "symbols": [{"literal":"a"}, {"literal":"m"}, {"literal":"a"}, {"literal":"r"}, {"literal":"i"}, {"literal":"l"}, {"literal":"l"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "color$subexpression$3", "symbols": ["color$subexpression$3$string$1"]},
    {"name": "color$subexpression$3$string$2", "symbols": [{"literal":"a"}, {"literal":"m"}, {"literal":"a"}, {"literal":"r"}, {"literal":"i"}, {"literal":"l"}, {"literal":"l"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "color$subexpression$3", "symbols": ["color$subexpression$3$string$2"]},
    {"name": "color", "symbols": ["color$subexpression$3"], "postprocess": R("yellow")},
    {"name": "color$subexpression$4$string$1", "symbols": [{"literal":"r"}, {"literal":"o"}, {"literal":"j"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "color$subexpression$4", "symbols": ["color$subexpression$4$string$1"]},
    {"name": "color$subexpression$4$string$2", "symbols": [{"literal":"r"}, {"literal":"o"}, {"literal":"j"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "color$subexpression$4", "symbols": ["color$subexpression$4$string$2"]},
    {"name": "color", "symbols": ["color$subexpression$4"], "postprocess": R("red")},
    {"name": "formSG", "symbols": ["form"], "postprocess": R(0)},
    {"name": "formPL", "symbols": ["form", {"literal":"s"}], "postprocess": R(0)},
    {"name": "form$subexpression$1$string$1", "symbols": [{"literal":"o"}, {"literal":"b"}, {"literal":"j"}, {"literal":"e"}, {"literal":"t"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form$subexpression$1", "symbols": ["form$subexpression$1$string$1"]},
    {"name": "form$subexpression$1$string$2", "symbols": [{"literal":"c"}, {"literal":"o"}, {"literal":"s"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form$subexpression$1", "symbols": ["form$subexpression$1$string$2"]},
    {"name": "form$subexpression$1$string$3", "symbols": [{"literal":"f"}, {"literal":"o"}, {"literal":"r"}, {"literal":"m"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form$subexpression$1", "symbols": ["form$subexpression$1$string$3"]},
    {"name": "form", "symbols": ["form$subexpression$1"], "postprocess": R("anyform")},
    {"name": "form$subexpression$2$string$1", "symbols": [{"literal":"c"}, {"literal":"u"}, {"literal":"a"}, {"literal":"d"}, {"literal":"r"}, {"literal":"a"}, {"literal":"d"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form$subexpression$2", "symbols": ["form$subexpression$2$string$1"]},
    {"name": "form$subexpression$2$string$2", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"c"}, {"literal":"t"}, {"literal":"a"}, {"literal":"n"}, {"literal":"g"}, {"literal":"u"}, {"literal":"l"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form$subexpression$2", "symbols": ["form$subexpression$2$string$2"]},
    {"name": "form", "symbols": ["form$subexpression$2"], "postprocess": R("brick")},
    {"name": "form$subexpression$3$string$1", "symbols": [{"literal":"l"}, {"literal":"o"}, {"literal":"s"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form$subexpression$3", "symbols": ["form$subexpression$3$string$1"]},
    {"name": "form$subexpression$3$string$2", "symbols": [{"literal":"l"}, {"literal":"a"}, {"literal":"d"}, {"literal":"r"}, {"literal":"i"}, {"literal":"l"}, {"literal":"l"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form$subexpression$3", "symbols": ["form$subexpression$3$string$2"]},
    {"name": "form$subexpression$3$string$3", "symbols": [{"literal":"l"}, {"literal":"i"}, {"literal":"n"}, {"literal":"g"}, {"literal":"o"}, {"literal":"t"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form$subexpression$3", "symbols": ["form$subexpression$3$string$3"]},
    {"name": "form", "symbols": ["form$subexpression$3"], "postprocess": R("plank")},
    {"name": "form$subexpression$4$string$1", "symbols": [{"literal":"p"}, {"literal":"e"}, {"literal":"l"}, {"literal":"o"}, {"literal":"t"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form$subexpression$4", "symbols": ["form$subexpression$4$string$1"]},
    {"name": "form$subexpression$4$string$2", "symbols": [{"literal":"b"}, {"literal":"o"}, {"literal":"l"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form$subexpression$4", "symbols": ["form$subexpression$4$string$2"]},
    {"name": "form$subexpression$4$string$3", "symbols": [{"literal":"c"}, {"literal":"i"}, {"literal":"r"}, {"literal":"c"}, {"literal":"u"}, {"literal":"l"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form$subexpression$4", "symbols": ["form$subexpression$4$string$3"]},
    {"name": "form", "symbols": ["form$subexpression$4"], "postprocess": R("ball")},
    {"name": "form$subexpression$5$string$1", "symbols": [{"literal":"p"}, {"literal":"i"}, {"literal":"r"}, {"literal":"a"}, {"literal":"m"}, {"literal":"i"}, {"literal":"d"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form$subexpression$5", "symbols": ["form$subexpression$5$string$1"]},
    {"name": "form$subexpression$5$string$2", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"i"}, {"literal":"a"}, {"literal":"n"}, {"literal":"g"}, {"literal":"u"}, {"literal":"l"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form$subexpression$5", "symbols": ["form$subexpression$5$string$2"]},
    {"name": "form", "symbols": ["form$subexpression$5"], "postprocess": R("pyramid")},
    {"name": "form$string$1", "symbols": [{"literal":"m"}, {"literal":"e"}, {"literal":"s"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form", "symbols": ["form$string$1"], "postprocess": R("table")},
    {"name": "form$subexpression$6$string$1", "symbols": [{"literal":"c"}, {"literal":"a"}, {"literal":"j"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form$subexpression$6", "symbols": ["form$subexpression$6$string$1"]},
    {"name": "form$subexpression$6$string$2", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"c"}, {"literal":"i"}, {"literal":"p"}, {"literal":"i"}, {"literal":"e"}, {"literal":"n"}, {"literal":"t"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form$subexpression$6", "symbols": ["form$subexpression$6$string$2"]},
    {"name": "form", "symbols": ["form$subexpression$6"], "postprocess": R("box")},
    {"name": "form$subexpression$7$string$1", "symbols": [{"literal":"p"}, {"literal":"i"}, {"literal":"s"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form$subexpression$7", "symbols": ["form$subexpression$7$string$1"]},
    {"name": "form$subexpression$7$string$2", "symbols": [{"literal":"s"}, {"literal":"u"}, {"literal":"e"}, {"literal":"l"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "form$subexpression$7", "symbols": ["form$subexpression$7$string$2"]},
    {"name": "form", "symbols": ["form$subexpression$7"], "postprocess": R("floor")},
    {"name": "take$string$1", "symbols": [{"literal":"t"}, {"literal":"o"}, {"literal":"m"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "take", "symbols": ["take$string$1"]},
    {"name": "take$string$2", "symbols": [{"literal":"a"}, {"literal":"g"}, {"literal":"a"}, {"literal":"r"}, {"literal":"r"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "take", "symbols": ["take$string$2"]},
    {"name": "move$string$1", "symbols": [{"literal":"m"}, {"literal":"u"}, {"literal":"e"}, {"literal":"v"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "move", "symbols": ["move$string$1"]},
    {"name": "move$string$2", "symbols": [{"literal":"p"}, {"literal":"o"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "move", "symbols": ["move$string$2"]},
    {"name": "move$string$3", "symbols": [{"literal":"s"}, {"literal":"u"}, {"literal":"e"}, {"literal":"l"}, {"literal":"t"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "move", "symbols": ["move$string$3"]},
    {"name": "it$string$1", "symbols": [{"literal":"l"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "it", "symbols": ["it$string$1"]},
    {"name": "that_is$string$1", "symbols": [{"literal":"q"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "that_is$string$2", "symbols": [{"literal":"e"}, {"literal":"s"}, {"literal":"t"}, {"literal":"a"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "that_is", "symbols": ["that_is$string$1", "that_is$string$2"]},
    {"name": "that_are$string$1", "symbols": [{"literal":"q"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "that_are$string$2", "symbols": [{"literal":"e"}, {"literal":"s"}, {"literal":"t"}, {"literal":"a"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "that_are", "symbols": ["that_are$string$1", "that_are$string$2"]},
    {"name": "will_you$subexpression$1$string$1", "symbols": [{"literal":"q"}, {"literal":"u"}, {"literal":"i"}, {"literal":"e"}, {"literal":"r"}, {"literal":"e"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "will_you$subexpression$1", "symbols": ["will_you$subexpression$1$string$1"]},
    {"name": "will_you$subexpression$1$string$2", "symbols": [{"literal":"p"}, {"literal":"u"}, {"literal":"e"}, {"literal":"d"}, {"literal":"e"}, {"literal":"s"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "will_you$subexpression$1", "symbols": ["will_you$subexpression$1$string$2"]},
    {"name": "will_you$subexpression$1$string$3", "symbols": [{"literal":"c"}, {"literal":"o"}, {"literal":"u"}, {"literal":"l"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "will_you$subexpression$1", "symbols": ["will_you$subexpression$1$string$3"]},
    {"name": "will_you", "symbols": ["will_you$subexpression$1"]},
    {"name": "please$subexpression$1$string$1", "symbols": [{"literal":"p"}, {"literal":"o"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "please$subexpression$1$string$2", "symbols": [{"literal":"f"}, {"literal":"a"}, {"literal":"v"}, {"literal":"o"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "please$subexpression$1", "symbols": ["please$subexpression$1$string$1", "please$subexpression$1$string$2"]},
    {"name": "please$subexpression$1$string$3", "symbols": [{"literal":"p"}, {"literal":"o"}, {"literal":"r"}, {"literal":"f"}, {"literal":"a"}, {"literal":"v"}, {"literal":"o"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "please$subexpression$1", "symbols": ["please$subexpression$1$string$3"]},
    {"name": "please", "symbols": ["please$subexpression$1"]}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
