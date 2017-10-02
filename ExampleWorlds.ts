///<reference path="World.ts"/>

var ExampleWorlds : {[s:string]: WorldState} = {};


ExampleWorlds["complejo"] = {
    "stacks": [["e"],["a","l"],["i","h","j"],["c","k","g","b"],["d","m","f"]],
    "holding": null,
    "arm": 0,
    "objects": {
        "a": { "form":"brick",   "size":"large",  "color":"yellow" },
        "b": { "form":"brick",   "size":"small",  "color":"white" },
        "c": { "form":"plank",   "size":"large",  "color":"red"   },
        "d": { "form":"plank",   "size":"small",  "color":"green" },
        "e": { "form":"ball",    "size":"large",  "color":"white" },
        "f": { "form":"ball",    "size":"small",  "color":"black" },
        "g": { "form":"table",   "size":"large",  "color":"blue"  },
        "h": { "form":"table",   "size":"small",  "color":"red"   },
        "i": { "form":"pyramid", "size":"large",  "color":"yellow"},
        "j": { "form":"pyramid", "size":"small",  "color":"red"   },
        "k": { "form":"box",     "size":"large",  "color":"yellow"},
        "l": { "form":"box",     "size":"large",  "color":"red"   },
        "m": { "form":"box",     "size":"small",  "color":"blue"  }
    },
    "examples": [
        "pon una caja en una caja",
        "pon todas las bolas en el piso",
        "toma la caja amarilla",
        "pon cualquier cosa abajo de las mesas",
        "pon un objecto abajo de las mesas en el suelo",
        "pon una bola en una caja chica en una caja grande",
        "pon todas las bolas en una caja grande",
        "pon todas las bolas a la izquierda de una bola",
        "pon todas las bolas a lado de una bola",
        "pon una caja a lado de todos los objetos",
        "pon todos los objetos rojos arriba de un objeto amarillo en el suelo",
        "pon todos los objetos amarillos abajo de un objeto rojo abajo de un objeto"
    ]
};


ExampleWorlds["mediano"] = {
    "stacks": [["e"],["a","l"],[],[],["i","h","j"],[],[],["k","g","c","b"],[],["d","m","f"]],
    "holding": null,
    "arm": 0,
    "objects": {
        "a": { "form":"brick",   "size":"large",  "color":"green" },
        "b": { "form":"brick",   "size":"small",  "color":"white" },
        "c": { "form":"plank",   "size":"large",  "color":"red"   },
        "d": { "form":"plank",   "size":"small",  "color":"green" },
        "e": { "form":"ball",    "size":"large",  "color":"white" },
        "f": { "form":"ball",    "size":"small",  "color":"black" },
        "g": { "form":"table",   "size":"large",  "color":"blue"  },
        "h": { "form":"table",   "size":"small",  "color":"red"   },
        "i": { "form":"pyramid", "size":"large",  "color":"yellow"},
        "j": { "form":"pyramid", "size":"small",  "color":"red"   },
        "k": { "form":"box",     "size":"large",  "color":"yellow"},
        "l": { "form":"box",     "size":"large",  "color":"red"   },
        "m": { "form":"box",     "size":"small",  "color":"blue"  }
    },
    "examples": [
        "pon el rectangulo a la izquierda de una pyramide en una caja",
        "pon el circulo blanco en una caja en el suelo",
        "mueve la bola grande dentro de la caja amarilla en el suelo",
        "mueve la bola grande inside a red box on the floor",
        "toma un objeto rojo",
        "toma la bola blanca",
        "pon los cajas en el suelo",
        "pon la losa grande abajo de un rectangulo verde",
        "mueve todos los rectangulos en la mesa",
        "mueve todos los circulos adentro de una caja grande"
    ]
};

ExampleWorlds["debug"] = {
    "stacks": [[],[],[],["k","m","f"],[]],
    "holding": "a",
    "arm": 0,
    "objects": {
        "a": { "form":"brick",   "size":"large",  "color":"green" },
        "f": { "form":"ball",    "size":"small",  "color":"black" },
        "k": { "form":"box",     "size":"large",  "color":"yellow"},
        "m": { "form":"box",     "size":"small",  "color":"blue"  }
    },
    "examples": [
        "pon la bola negra en una caja en el suelo",
    ]
};


ExampleWorlds["chico"] = {
    "stacks": [["e"],["g","l"],[],["k","m","f"],[]],
    "holding": "a",
    "arm": 0,
    "objects": {
        "a": { "form":"brick",   "size":"large",  "color":"green" },
        "b": { "form":"brick",   "size":"small",  "color":"white" },
        "c": { "form":"plank",   "size":"large",  "color":"red"   },
        "d": { "form":"plank",   "size":"small",  "color":"green" },
        "e": { "form":"ball",    "size":"large",  "color":"white" },
        "f": { "form":"ball",    "size":"small",  "color":"black" },
        "g": { "form":"table",   "size":"large",  "color":"blue"  },
        "h": { "form":"table",   "size":"small",  "color":"red"   },
        "i": { "form":"pyramid", "size":"large",  "color":"yellow"},
        "j": { "form":"pyramid", "size":"small",  "color":"red"   },
        "k": { "form":"box",     "size":"large",  "color":"yellow"},
        "l": { "form":"box",     "size":"large",  "color":"red"   },
        "m": { "form":"box",     "size":"small",  "color":"blue"  }
    },
    "examples": [
        "pon la bola blanca en la caja en el suelo",
        "pon el circulo negro en una caja en el suelo",
        "toma un objeto azul",
        "toma la bola blanca",
        "pon las cajas en el suelo",
        "mueve todas las bolas dentro de una caja grande"
    ]
};


ExampleWorlds["imposible"] = {
    "stacks": [["lbrick1","lball1","sbrick1"], [],
               ["lpyr1","lbox1","lplank2","sball2"], [],
               ["sbrick2","sbox1","spyr1","ltable1","sball1"]],
    "holding": null,
    "arm": 0,
    "objects": {
        "lbrick1": { "form":"brick",   "size":"large",  "color":"green" },
        "sbrick1": { "form":"brick",   "size":"small",  "color":"yellow" },
        "sbrick2": { "form":"brick",   "size":"small",  "color":"blue" },
        "lplank1": { "form":"plank",   "size":"large",  "color":"red"   },
        "lplank2": { "form":"plank",   "size":"large",  "color":"black"   },
        "splank1": { "form":"plank",   "size":"small",  "color":"green" },
        "lball1":  { "form":"ball",    "size":"large",  "color":"white" },
        "sball1":  { "form":"ball",    "size":"small",  "color":"black" },
        "sball2":  { "form":"ball",    "size":"small",  "color":"red" },
        "ltable1": { "form":"table",   "size":"large",  "color":"green"  },
        "stable1": { "form":"table",   "size":"small",  "color":"red"   },
        "lpyr1":   { "form":"pyramid", "size":"large",  "color":"white"},
        "spyr1":   { "form":"pyramid", "size":"small",  "color":"blue"   },
        "lbox1":   { "form":"box",     "size":"large",  "color":"yellow"},
        "sbox1":   { "form":"box",     "size":"small",  "color":"red"   },
        "sbox2":   { "form":"box",     "size":"small",  "color":"blue"  }
    },
    "examples": [
        "este mundo es imposible"
    ]
};

module.exports.ExampleWorlds = ExampleWorlds;
