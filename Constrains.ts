/// <reference path="lib/collections.ts" />

module Constrains {
    export interface ConstrainNode<T> {type : string;
                                       stringParameter : string;
                                       variables : collections.LinkedList<DomainNode<T>>;}
    export interface DomainNode<T> {domain : collections.Set<T>;
                                    constrains : collections.LinkedList<ConstrainNode<T>>;}
    export interface ArcNode<T> {variable : DomainNode<T>;
                                 constrain : ConstrainNode<T>;
                                 reverseArc? : boolean;}

    export interface constrainInterface {
        printDebugInfo(info : string) : void;
    }

    //////////////////////////////////////////////////////////////////////
    // exported functions, classes and interfaces/types

    export function constrain<T>(fullDomain : collections.Set<T>,
                                 head : Parser.Entity,
                                 space : constrainInterface,
                                 state : WorldState) : Boolean {
        space.printDebugInfo('start');
        if((head == null) || (head.obj == null))
            return false;
        var arcs : collections.LinkedList<ArcNode<T>> = new collections.LinkedList<ArcNode<T>>();
        var mainVariables : DomainNode<T> = constructGraph<T>(fullDomain, head, space, arcs);
        space.printDebugInfo('arcs '+ arcs.size());
        arcs.forEach((arc) => {
            if(!arc.reverseArc) {
                if(reduceActiveVoice<T>(arc.variable, arc.constrain, space, state))
                    arcs.remove(arc);
            } else {
                if(reducePasiveVoice<T>(arc.variable, arc.constrain, space, state))
                    arcs.remove(arc);
            }
            return true;
        });
        printGraph<T>(mainVariables, space);

        space.printDebugInfo('end (arcs)' + arcs.size());
        return false;
    }

    export class Error implements Error {
        public name = "Constrainer.Error";
        constructor(public message? : string) {}
        public toString() {return this.name + ": " + this.message}
    }

    function printGraph<T>(node : DomainNode<T>, space : constrainInterface) : void {
        space.printDebugInfo('DomainNode, with ' + node.constrains.size() + ' Constrains');
        node.domain.forEach((ele) => {
            space.printDebugInfo('element ' + ele.toString());
            return true;
        });
        node.constrains.forEach((obj) => {
            printConstrain<T>(obj, space);
            return true;
        });
    }
    function printConstrain<T>(node : ConstrainNode<T>, space : constrainInterface) : void {
        space.printDebugInfo('ConstrainNode,' + node.type + ' str ' + node.stringParameter + ' with ' + node.variables.size() + ' Variables');
        node.variables.forEach((obj) => {
            printGraph<T>(obj, space);
            return true;
        });
    }

    //////////////////////////////////////////////////////////////////////
    // private functions and classes

    function constructGraph<T>(fullDomain : collections.Set<T>,
                               node : Parser.Entity,
                               space : constrainInterface,
                               arcs : collections.LinkedList<ArcNode<T>>) : DomainNode<T> {
        if((node == null) || (node.obj == null))
            return null;
        var variable : DomainNode<T> = {domain: copyDomain(fullDomain),
                                        constrains: new collections.LinkedList<ConstrainNode<T>>()};
        if(node.obj.loc == null)
            isAConstrains<T>(variable, node.obj, variable.constrains, arcs);
        else {
            isAConstrains<T>(variable, node.obj.obj, variable.constrains, arcs);
            var constrain : ConstrainNode<T> = constructRelation(fullDomain, node.obj.loc, space, arcs);
            variable.constrains.add(constrain);
            arcs.add({variable, constrain});
            arcs.add({variable, constrain, reverseArc : true});
        }
        return variable;
    }

    function constructRelation<T>(fullDomain : collections.Set<T>,
                                  node : Parser.Location,
                                  space : constrainInterface,
                                  arcs : collections.LinkedList<ArcNode<T>>) : ConstrainNode<T> {
        var constrain : ConstrainNode<T> = {type: node.rel,
                                            stringParameter: null,
                                            variables: new collections.LinkedList<DomainNode<T>>()};
        constrain.variables.add(constructGraph<T>(fullDomain, node.ent, space, arcs));
        return constrain;
    }

    function isAConstrains<T>(variable : DomainNode<T>,
                              obj : Parser.Object,
                              intoCollection : collections.LinkedList<ConstrainNode<T>>,
                              arcs : collections.LinkedList<ArcNode<T>>) : void {
        if(obj.size)
            addArcAndConstrain<T>(variable,
                                  {type:"hasSize", stringParameter:obj.size, variables:new collections.LinkedList<DomainNode<T>>()},
                                  intoCollection,
                                  arcs);
        if(obj.color)
            addArcAndConstrain<T>(variable,
                                  {type:"hasColor", stringParameter:obj.color, variables:new collections.LinkedList<DomainNode<T>>()},
                                  intoCollection,
                                  arcs);
        if(obj.form)
            addArcAndConstrain<T>(variable,
                                  {type:"isA", stringParameter:obj.form, variables:new collections.LinkedList<DomainNode<T>>()},
                                  intoCollection,
                                  arcs);
    }

    function addArcAndConstrain<T>(variable : DomainNode<T>,
                                   constrain : ConstrainNode<T>,
                                   intoCollection : collections.LinkedList<ConstrainNode<T>>,
                                   arcs : collections.LinkedList<ArcNode<T>>) : void {
        intoCollection.add(constrain);
        arcs.add({variable : variable, constrain : constrain});
    }

    function reduceActiveVoice<T>(variable : DomainNode<T>,
                                  constrain : ConstrainNode<T>,
                                  space : constrainInterface,
                                  state : WorldState) {
        var a=getActiveVoiceAction<T>(constrain.type);
        if(a == null)
            return false;
        variable.domain.forEach((ele) => {
            if(a(state.objects[ele.toString()], constrain.stringParameter, constrain.variables, state) == false)
                variable.domain.remove(ele);
            return true;
        });
        return true;
    }

    function reducePasiveVoice<T>(source : DomainNode<T>,
                                  constrain : ConstrainNode<T>,
                                  space : constrainInterface,
                                  state : WorldState) {
        var a=getPasiveVoiceAction<T>(constrain.type);
        if(a == null)
            return false;
        constrain.variables.forEach((variable) => {
            variable.domain.forEach((ele) => {
                if(a(source, constrain.stringParameter, ele, state) == false)
                    variable.domain.remove(ele);
                return true;
            });
            return true;
        });
        return true;
    }

    //////////////////////////////////////////////////////////////////////
    // Constrains
    function getActiveVoiceAction<T>(act : string) {
        var actions = {hasSize:hasSize, hasColor:hasColor, isA:isA, inside:isInside, ontop:isOntop,
                       under:isUnder, above:isAbove, beside:isBeside, leftof:isLeftof, rightof:isRightof
        };
        return actions[act.trim()];
    }
    function getPasiveVoiceAction<T>(act : string) {
        var actions = {inside:hasSomethingInside, ontop:hasSomethingOntop,
                       under:hasSomethingUnder, above:hasSomethingAbove, beside:hasSomethingBeside,
                       leftof:hasSomethingLeftof, rightof:hasSomethingRightof};
        return actions[act.trim()];
    }

    function hasSize<T>(obj:ObjectDefinition,
                     stringParameter:string,
                     variables:collections.LinkedList<DomainNode<T>>,
                     state : WorldState) {
        if(obj==null)
            return true; //the floor has an unspecified size
        if(obj.size != stringParameter)
            return false;
        return true;
    }

    function hasColor<T>(obj:ObjectDefinition,
                      stringParameter:string,
                      variables:collections.LinkedList<DomainNode<T>>,
                      state : WorldState) {
        if(obj==null)
            return true; //the floor has an unspecified color
        if(obj.color != stringParameter)
            return false;
        return true;
    }

    function isA<T>(obj:ObjectDefinition,
                    stringParameter:string,
                    variables:collections.LinkedList<DomainNode<T>>,
                    state : WorldState) {
        if(obj==null)
            return stringParameter == 'floor'; //the floor is something in particular
        if(obj.form != stringParameter)
            return false;
        return true;
    }

    interface whereInTheWorld {stack:number; row:number; what:string}

    function findInWorld(obj:ObjectDefinition,
                         state : WorldState) : whereInTheWorld {
        for(var stack=0; stack < state.stacks.length; ++stack)
            for(var row=0; row < state.stacks[stack].length; ++row)
                if(state.objects[state.stacks[stack][row]] == obj)
                    return {stack:stack, row:row, what:state.stacks[stack][row]};
    }

    function inside(lhs : whereInTheWorld,
                    ele : string,
                    state : WorldState) : boolean {
        var eleDefinition : ObjectDefinition = state.objects[ele];
        if(eleDefinition.form == 'box') {
            var rhs : whereInTheWorld = findInWorld(eleDefinition, state);
            if((rhs.stack == lhs.stack) &&
               (lhs.row > rhs.row))
                return true;
        }
        return false;
    }

    function isInside<T>(obj:ObjectDefinition,
                 stringParameter:string,
                 variables:collections.LinkedList<DomainNode<T>>,
                 state : WorldState) {
        if(obj==null)
            return false; //the floor cant be inside anything
        var objPos : whereInTheWorld = findInWorld(obj, state);
        var ret : boolean = false;
        variables.forEach((variable) => {
            variable.domain.forEach((ele) => {
                ret = inside(objPos, ele.toString(), state);
                return !ret;
            });
            return !ret;
        });
        return ret;
    }

    function hasSomethingInside<T>(variable:DomainNode<T>,
                 stringParameter:string,
                 objEle:T,
                 state : WorldState) {
        if(state.objects[objEle.toString()] == null)
            return false; //the floor cant have anything inside
        var ret : boolean = false;
        variable.domain.forEach((ele) => {
            var objPos : whereInTheWorld = findInWorld(state.objects[ele.toString()], state);
            ret = inside(objPos, objEle.toString(), state);
            return !ret;
        });
        return ret;
    }

    function ontop(lhs : whereInTheWorld,
                   eleDefinition : ObjectDefinition,
                   state : WorldState) : boolean {
        if(eleDefinition == null)
            return lhs.row == 0; //the floor
        var rhs : whereInTheWorld = findInWorld(eleDefinition, state);
        if((rhs.stack == lhs.stack) &&
           (lhs.row - 1 == rhs.row))
            return true;
        return false;
    }

    function isOntop<T>(obj:ObjectDefinition,
                        stringParameter:string,
                        variables:collections.LinkedList<DomainNode<T>>,
                        state : WorldState) {
        if(obj==null)
            return false; //the floor cant be on top of anything
        var objPos : whereInTheWorld = findInWorld(obj, state);
        var ret : boolean = false;
        variables.forEach((variable) => {
            variable.domain.forEach((ele) => {
                ret = ontop(objPos, state.objects[ele.toString()], state);
                return !ret;
            });
            return !ret;
        });
        return ret;
    }

    function hasSomethingOntop<T>(variable:DomainNode<T>,
                         stringParameter:string,
                         objEle:T,
                         state : WorldState) {
        var ret : boolean = false;
        variable.domain.forEach((ele) => {
            var objPos : whereInTheWorld = findInWorld(state.objects[ele.toString()], state);
            ret = ontop(objPos, state.objects[objEle.toString()], state);
            return !ret;
        });
        return ret;
    }

    function under(lhs : whereInTheWorld,
                   eleDefinition : ObjectDefinition,
                   state : WorldState) : boolean {
        if(eleDefinition == null)
            return false; //the floor
        var rhs : whereInTheWorld = findInWorld(eleDefinition, state);
        if((rhs.stack == lhs.stack) &&
           (lhs.row < rhs.row))
            return true;
        return false;
    }

    function isUnder<T>(obj:ObjectDefinition,
                        stringParameter:string,
                        variables:collections.LinkedList<DomainNode<T>>,
                        state : WorldState) {
        if(obj==null)
            return true; //the floor is under everything
        var objPos : whereInTheWorld = findInWorld(obj, state);
        var ret : boolean = false;
        variables.forEach((variable) => {
            variable.domain.forEach((ele) => {
                ret = under(objPos, state.objects[ele.toString()], state);
                return !ret;
            });
            return !ret;
        });
        return ret;
    }

    function hasSomethingUnder<T>(variable:DomainNode<T>,
                         stringParameter:string,
                         objEle:T,
                         state : WorldState) {
        var ret : boolean = false;
        variable.domain.forEach((ele) => {
            var objPos : whereInTheWorld = findInWorld(state.objects[ele.toString()], state);
            ret = under(objPos, state.objects[objEle.toString()], state);
            return !ret;
        });
        return ret;
    }

    function above(lhs : whereInTheWorld,
                   eleDefinition : ObjectDefinition,
                   state : WorldState) : boolean {
        if(eleDefinition == null)
            return true; //the floor
        var rhs : whereInTheWorld = findInWorld(eleDefinition, state);
        if((lhs.stack == rhs.stack) &&
           (lhs.row > rhs.row))
            return true;
        return false;
    }

    function isAbove<T>(obj:ObjectDefinition,
                        stringParameter:string,
                        variables:collections.LinkedList<DomainNode<T>>,
                        state : WorldState) {
        if(obj==null)
            return false; //the floor cant be above of anything
        var objPos : whereInTheWorld = findInWorld(obj, state);
        var ret : boolean = false;
        variables.forEach((variable) => {
            variable.domain.forEach((ele) => {
                ret = above(objPos, state.objects[ele.toString()], state);
                return !ret;
            });
            return !ret;
        });
        return ret;
    }

    function hasSomethingAbove<T>(variable:DomainNode<T>,
                         stringParameter:string,
                         objEle:T,
                         state : WorldState) {
        var ret : boolean = false;
        variable.domain.forEach((ele) => {
            var objPos : whereInTheWorld = findInWorld(state.objects[ele.toString()], state);
            ret = above(objPos, state.objects[objEle.toString()], state);
            return !ret;
        });
        return ret;
    }

    function beside(lhs : whereInTheWorld,
                   eleDefinition : ObjectDefinition,
                   state : WorldState) : boolean {
        if(eleDefinition == null)
            return false; //the floor
        var rhs : whereInTheWorld = findInWorld(eleDefinition, state);
        if((rhs.stack-1 == lhs.stack) &&
           (rhs.stack+1 == lhs.stack))
            return true;
        return false;
    }

    function isBeside<T>(obj:ObjectDefinition,
                        stringParameter:string,
                        variables:collections.LinkedList<DomainNode<T>>,
                        state : WorldState) {
        if(obj==null)
            return false; //the floor cant be beside of anything
        var objPos : whereInTheWorld = findInWorld(obj, state);
        var ret : boolean = false;
        variables.forEach((variable) => {
            variable.domain.forEach((ele) => {
                ret = beside(objPos, state.objects[ele.toString()], state);
                return !ret;
            });
            return !ret;
        });
        return ret;
    }

    function hasSomethingBeside<T>(variable:DomainNode<T>,
                         stringParameter:string,
                         objEle:T,
                         state : WorldState) {
        var ret : boolean = false;
        variable.domain.forEach((ele) => {
            var objPos : whereInTheWorld = findInWorld(state.objects[ele.toString()], state);
            ret = beside(objPos, state.objects[objEle.toString()], state);
            return !ret;
        });
        return ret;
    }

    function leftof(lhs : whereInTheWorld,
                   eleDefinition : ObjectDefinition,
                   state : WorldState) : boolean {
        if(eleDefinition == null)
            return false; //the floor
        var rhs : whereInTheWorld = findInWorld(eleDefinition, state);
        if(lhs.stack < rhs.stack)
            return true;
        return false;
    }

    function isLeftof<T>(obj:ObjectDefinition,
                        stringParameter:string,
                        variables:collections.LinkedList<DomainNode<T>>,
                        state : WorldState) {
        if(obj==null)
            return false; //the floor cant be left of anything
        var objPos : whereInTheWorld = findInWorld(obj, state);
        var ret : boolean = false;
        variables.forEach((variable) => {
            variable.domain.forEach((ele) => {
                ret = leftof(objPos, state.objects[ele.toString()], state);
                return !ret;
            });
            return !ret;
        });
        return ret;
    }

    function hasSomethingLeftof<T>(variable:DomainNode<T>,
                         stringParameter:string,
                         objEle:T,
                         state : WorldState) {
        var ret : boolean = false;
        variable.domain.forEach((ele) => {
            var objPos : whereInTheWorld = findInWorld(state.objects[ele.toString()], state);
            ret = leftof(objPos, state.objects[objEle.toString()], state);
            return !ret;
        });
        return ret;
    }

    function rightof(lhs : whereInTheWorld,
                   eleDefinition : ObjectDefinition,
                   state : WorldState) : boolean {
        if(eleDefinition == null)
            return false; //the floor
        var rhs : whereInTheWorld = findInWorld(eleDefinition, state);
        if(lhs.stack > rhs.stack)
            return true;
        return false;
    }

    function isRightof<T>(obj:ObjectDefinition,
                        stringParameter:string,
                        variables:collections.LinkedList<DomainNode<T>>,
                        state : WorldState) {
        if(obj==null)
            return false; //the floor cant be right of anything
        var objPos : whereInTheWorld = findInWorld(obj, state);
        var ret : boolean = false;
        variables.forEach((variable) => {
            variable.domain.forEach((ele) => {
                ret = rightof(objPos, state.objects[ele.toString()], state);
                return !ret;
            });
            return !ret;
        });
        return ret;
    }

    function hasSomethingRightof<T>(variable:DomainNode<T>,
                         stringParameter:string,
                         objEle:T,
                         state : WorldState) {
        var ret : boolean = false;
        variable.domain.forEach((ele) => {
            var objPos : whereInTheWorld = findInWorld(state.objects[ele.toString()], state);
            ret = rightof(objPos, state.objects[objEle.toString()], state);
            return !ret;
        });
        return ret;
    }

    //////////////////////////////////////////////////////////////////////
    // Utilities
    function copyDomain<T>(fullDomain : collections.Set<T>) : collections.Set<T> {
        var domain : collections.Set<T> = new collections.Set<T>();
        fullDomain.forEach((obj) => {
            domain.add(obj);
            return true;
        });
        return domain;
    }
}
