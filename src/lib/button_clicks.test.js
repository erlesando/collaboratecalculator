// vitest is a test runner for javascript
import { describe, it, expect } from "vitest";

// import functions from button_clicks.js
import { 
    reset_calculator, 
    backspace, 
    number_click, 
    operator_click, 
    calculate_result, 
    handle_keypress 
    } from "./button_clicks.js"

describe("reset_calculator", () => {
    it("should reset the calculator when C button", () => {
        expect(reset_calculator("35+124",false)).toStrictEqual({input_string: "", equalstate: false})
    })
})

describe("backspace", () => {
    it("should delete last char when backspace button, equalstate 0", () => {
        expect(backspace("35+124", false)).toStrictEqual({input_string: "35+12", equalstate: false})
    })

    it("should clear input when backspace button, equalstate 1", () => {
        expect(backspace("124",true)).toStrictEqual({input_string: "", equalstate: false})
    })

    it("should do nothing when nothing there", () => {
        expect(backspace("",false)).toStrictEqual({input_string: "", equalstate: false})
    })
})

describe("number_click", () => {
    it("should replace input_string when Error", () => {
        expect(number_click("Error", false, "3")).toStrictEqual({input_string: "3", equalstate: false})
    })

    it("should replace input_string when equalstate 1", () => {
        expect(number_click("124", true, "3")).toStrictEqual({input_string: "3", equalstate: false})
    })

    it("should add to input_string when equalstate 0", () => {
        expect(number_click("124", false, "3")).toStrictEqual({input_string: "1243", equalstate: false})
    })

    it("should not be able to add multiple 0 at start of a number", () => {
        expect(number_click("0", false, "0")).toStrictEqual({input_string: "0", equalstate: false})
    })

    it("should be able to add multiple 0 at end of a number", () => {
        expect(number_click("10+0", false, "0")).toStrictEqual({input_string: "10+0", equalstate: false})
    })
})

describe("operator_click", () => {
    it("should clear input_string when Error", () => {
        expect(operator_click("Error", false, "+")).toStrictEqual({input_string: "", equalstate: false, log: ""})
    })

    it("should add to input_string when equalstate 1", () => {
        expect(operator_click("124", true, "+")).toStrictEqual({input_string: "124+", equalstate: false, log: ""})
    })

    it("should add to input_string when equalstate 0", () => {
        expect(operator_click("124", false, "+")).toStrictEqual({input_string: "124+", equalstate: false, log: ""})
    })

    it("should be able to start with -", () => {
        expect(operator_click("", false, "-")).toStrictEqual({input_string: "-", equalstate: false, log: ""})
    })

    it("can add - after an operator (except after -)", () => {
        expect(operator_click("3+", false, "-")).toStrictEqual({input_string: "3+-", equalstate: false, log: ""})
    })

    it("cannot add - after -", () => {
        expect(operator_click("3-", false, "-")).toStrictEqual({input_string: "3-", equalstate: false, log: ""})
    })

    it("should be able to start with √", () => {
        expect(operator_click("", false, "√")).toStrictEqual({input_string: "√", equalstate: false, log: ""})
    })
    
    it("can add √ after an operator", () => {
        expect(operator_click("3+", false, "√")).toStrictEqual({input_string: "3+√", equalstate: false, log: ""})
    })

    it("if equalstate is true and value is √ replace input with squareroot of input", () => {
        expect(operator_click("81", true, "√")).toStrictEqual({input_string: "9", equalstate: true, log: "√81"})
    })

    it("should not be able to start with other operators", () => {
        expect(operator_click("", false, "+")).toStrictEqual({input_string: "", equalstate: false, log: ""})
    })

    it("should not be able to add comma to a number with a comma", () => {
        expect(operator_click("3,3", false, ",")).toStrictEqual({input_string: "3,3", equalstate: false, log: ""})
    })

    it("When equalstate is true, comma button should give input string 0,", () => {
        expect(operator_click("33", true, ",")).toStrictEqual({input_string: "0,", equalstate: false, log: ""})
    })

    it("Comma button when input is empty should give input string 0,", () => {
        expect(operator_click("", false, ",")).toStrictEqual({input_string: "0,", equalstate: false, log: ""})
    })

    it("Comma button when lastchar is an operator should add 0, to input string", () => {
        expect(operator_click("4+", false, ",")).toStrictEqual({input_string: "4+0,", equalstate: false, log: ""})
    })

    it("Comma button when lastchar is √ should add 0, to input string", () => {
        expect(operator_click("3√", false, ",")).toStrictEqual({input_string: "3√0,", equalstate: false, log: ""})
    })

    it("should not add another operator after an operator (except - and √)", () => {
        expect(operator_click("3+", false, "*")).toStrictEqual({input_string: "3+", equalstate: false, log: ""})
    })

    it("should not add another operator after an operator (except -)", () => {
        expect(operator_click("3+", false, "*")).toStrictEqual({input_string: "3+", equalstate: false, log: ""})
    })
})

describe("calculate_result", () => {
    it("should do nothing when Error", () => {
        expect(calculate_result("Error")).toStrictEqual({input_string: "Error", equalstate: false, log:"Error"})
    })

    it("should do nothing when NaN", () => {
        expect(calculate_result("NaN")).toStrictEqual({input_string: "NaN", equalstate: false, log:"NaN"})
    })

    it("should do nothing when empty", () => {
        expect(calculate_result("")).toStrictEqual({input_string: "", equalstate: false, log:""})
    })

    it("should do nothing when operator lastchar", () => {
        expect(calculate_result("3+")).toStrictEqual({input_string: "3+", equalstate: false, log:"3+"})
    })

    it("should return calculated number", () => {
        expect(calculate_result("1234+5")).toStrictEqual({input_string: "1239", equalstate: true, log:"1234+5"})
    })

    it("should use , instead of .", () => {
        expect(calculate_result("3,4+3")).toStrictEqual({input_string: "6,4", equalstate: true, log:"3,4+3"})
    })

    it("should show exponential when large numbers", () => {
        expect(calculate_result("300000000")).toStrictEqual({input_string: "3,0000e+8", equalstate: true, log:"300000000"})
    })

    it("should show exponential when small numbers", () => {
        expect(calculate_result("0,00000003")).toStrictEqual({input_string: "3,0000e-8", equalstate: true, log:"0,00000003"})
    })

    it("should be thrown error when dividing by zero", () => {
        expect(calculate_result("3/0")).toStrictEqual({input_string: "Error", equalstate: true, log:"3/0"})
    })
})

/* describe("handle_keypress", () => {
    it("should add number to input_string when a number key is pressed", () => {
        expect(handle_keypress("12", false, "3")).toStrictEqual({input_string: "123", equalstate: false, log:""})
    })

    it("should add operator to input_string when a operator key is pressed", () => {
        expect(handle_keypress("12", false, "+")).toStrictEqual({input_string: "12+", equalstate: false, log:""})
    })

    it("should add × to input_string when * key is pressed", () => {
        expect(handle_keypress("12", false, "*")).toStrictEqual({input_string: "12×", equalstate: false, log:""})
    })

    it("should add ÷ to input_string when / key is pressed", () => {
        expect(handle_keypress("12", false, "/")).toStrictEqual({input_string: "12÷", equalstate: false, log:""})
    })

    it("should add comma to input_string when , key is pressed", () => {
        expect(handle_keypress("12", false, ",")).toStrictEqual({input_string: "12,", equalstate: false, log:""})
    })

    it("should add comma to input_string when a . key is pressed", () => {
        expect(handle_keypress("12", false, ".")).toStrictEqual({input_string: "12,", equalstate: false, log:""})
    })

    it("should calculate input_string when a Enter key is pressed", () => {
        expect(handle_keypress("12+4", false, "Enter")).toStrictEqual({input_string: "16", equalstate: true, log:"12+4"})
    })

    it("should calculate input_string when a = key is pressed", () => {
        expect(handle_keypress("12+4", false, "=")).toStrictEqual({input_string: "16", equalstate: true, log:"12+4"})
    })

    it("should clear input_string when a Escape key is pressed", () => {
        expect(handle_keypress("12+4", false, "Escape")).toStrictEqual({input_string: "", equalstate: false, log:""})
    })

    it("should delete last char when backspace button", () => {
        expect(handle_keypress("12+4", false, "Backspace")).toStrictEqual({input_string: "12+", equalstate: false, log:""})
    })
}) */