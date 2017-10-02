///<reference path="World.ts"/>
///<reference path="Parser.ts"/>
///<reference path="Interpreter.ts"/>
///<reference path="Planner.ts"/>


module Shrdlite {

    export function interactive(world : World) : void {
        function endlessLoop(utterance : string = "") : void {
            var inputPrompt = "En que te puedo ayudar? ";
            var nextInput = () => world.readUserInput(inputPrompt, endlessLoop);
            if (utterance.trim()) {
                var plan : string[] = splitStringIntoPlan(utterance);
                if (!plan) {
                    plan = parseUtteranceIntoPlan(world, utterance);
                }
                if (plan) {
                    world.printDebugInfo("Plan: " + plan.join(", "));
                    world.performPlan(plan, nextInput);
                    return;
                }
            }
            nextInput();
        }
        world.printWorld(endlessLoop);
    }


    // Generic function that takes an utterance and returns a plan:
    // - first it parses the utterance
    // - then it interprets the parse(s)
    // - then it creates plan(s) for the interpretation(s)

    export function parseUtteranceIntoPlan(world : World, utterance : string) : string[] {
        world.printDebugInfo('Analisando la oracion: "' + utterance + '"');
        try {
            var parses : Parser.Result[] = Parser.parse(utterance);
        } catch(err) {
            if (err instanceof Parser.Error) {
                world.printError("Error en el parser", err.message);
                return;
            } else {
                throw err;
            }
        }
        world.printDebugInfo("Encontre " + parses.length + " interpretaciones");
        parses.forEach((res, n) => {
            world.printDebugInfo("  (" + n + ") " + Parser.parseToString(res));
        });

        try {
            var interpretations : Interpreter.Result[] = Interpreter.interpret(parses, world.currentState);
        } catch(err) {
            if (err instanceof Interpreter.Error) {
                world.printError("Error de interpretacion", err.message);
                return;
            } else {
                throw err;
            }
        }
        world.printDebugInfo("Encontre " + interpretations.length + " interpretaciones");
        interpretations.forEach((res, n) => {
            world.printDebugInfo("  (" + n + ") " + Interpreter.interpretationToString(res));
        });

        try {
            var plans : Planner.Result[] = Planner.plan(interpretations, world.currentState);
        } catch(err) {
            if (err instanceof Planner.Error) {
                world.printError("Error logistico", err.message);
                return;
            } else {
                throw err;
            }
        }
        world.printDebugInfo("Encontre " + plans.length + " planes");
        plans.forEach((res, n) => {
            world.printDebugInfo("  (" + n + ") " + Planner.planToString(res));
        });

        var plan : string[] = plans[0].plan;
        world.printDebugInfo("Plan Final: " + plan.join(", "));
        return plan;
    }


    // This is a convenience function that recognizes strings
    // of the form "p r r d l p r d"

    export function splitStringIntoPlan(planstring : string) : string[] {
        var plan : string[] = planstring.trim().split(/\s+/);
        var actions = {p:"pick", d:"drop", l:"left", r:"right"};
        for (var i = plan.length-1; i >= 0; i--) {
            if (!actions[plan[i]]) {
                return;
            }
            plan.splice(i, 0, actions[plan[i]]);
        }
        return plan;
    }

}

module.exports.Shrdlite = Shrdlite;
