
## This is a grammar for Shrdlite, written for the Nearley Javascript chartparser
## To compile into a Javascript file:  nearleyc grammar.ne > grammar.js
## For more information:  https://github.com/Hardmath123/nearley

@{%

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

%}


## Grammar rules

main --> will_you:? please:? command please:?  {% R(2) %}  

command --> take entity           {% R({cmd:"take", ent:1}) %}
command --> move  it    location  {% R({cmd:"put", loc:2}) %}
command --> move entity location  {% R({cmd:"move", ent:1, loc:2}) %}

location --> relation entity  {% R({rel:0, ent:1}) %}

entity --> quantifierSG objectSG {% R({quant:0, obj:1}) %}
entity --> quantifierPL objectPL {% R({quant:0, obj:1}) %}

objectSG --> objectSG that_is:?  location  {% R({obj:0, loc:2}) %}
objectPL --> objectPL that_are:? location  {% R({obj:0, loc:2}) %}

objectSG --> formSG size:? color:?  {% R({size:1, color:2, form:0}) %}
objectPL --> formPL size:? color:?  {% R({size:1, color:2, form:0}) %}


## Lexical rules

quantifierSG --> ("cualquier" | "cualquiera" |"una" | "un")  {% R("any") %}
quantifierSG --> ("el" | "la")                               {% R("the") %}
quantifierSG --> ("todos" | "todas")                         {% R("all") %}
quantifierPL --> ("todos" "los" | "todas" "las" | "las" | "los")  {% R("all") %}

relation --> ("izquierda"  "de" | "a" "la" "izquierda"  "de")  {% R("leftof") %}
relation --> ("derecha" "de" | "a" "la" "derecha" "de")        {% R("rightof") %}
relation --> ("adentro" "de" | "en" | "into" | "dentro" "de")  {% R("inside") %}
relation --> ("encima" | "arriba" "de" | "sobre")              {% R("ontop") %}
relation --> ("abajo" | "abajo" "de")                          {% R("under") %}
relation --> ("a" "lado")                                      {% R("beside") %}
relation --> ("above")                                         {% R("above") %}

size --> ("chica" | "chico")  {% R("small") %}
size --> "grande"   {% R("large") %}

color --> ("negro" | "negra")       {% R("black") %}
color --> ("blanco" | "blanca")     {% R("white") %}
color --> "azul"                    {% R("blue") %}
color --> "verde"                   {% R("green") %}
color --> ("amarillo" | "amarilla") {% R("yellow") %}
color --> ("rojo" | "roja")         {% R("red") %}

formSG --> form      {% R(0) %}
formPL --> form "s"  {% R(0) %}

form --> ("objeto" | "cosa" | "forma")  {% R("anyform") %}
form --> ("cuadrado" | "rectangulo")    {% R("brick") %}
form --> "losa"                         {% R("plank") %}
form --> ("pelota" | "bola" | "circulo"){% R("ball") %}
form --> ("piramide" | "triangulo")     {% R("pyramid") %}
form --> "mesa"                         {% R("table") %}
form --> "caja"                         {% R("box") %}
form --> ("piso" | "suelo")             {% R("floor") %}


## Lexicon (without semantic content)

take --> "toma" | "agarra"
move --> "mueve" | "pon" | "suelta"
it --> "lo"

that_is  --> "que" "esta"
that_are --> "que" "estan"

will_you --> ("quieres" | "puedes" | "could")

please --> ("por" "favor" | "porfavor")
