/*
    test utils.js

    test files must end with .test.js
*/

// vitest is a test runner for javascript
import { describe, it, expect } from "vitest";

// import the utils.js file
import { is_operator, is_number, lastchar } from "./utils.js";

// describe is a function that groups tests together
describe("is_operator", () => {

    // `it` is a function that runs a test
    // - the first argument is the name of the test
    // - the second argument is a function that contains the test
    it("should return true if the input is an operator", () => {
        
        // `expect` is a function that checks "something"
        // the format is 
        // 
        //     expect(actual).toBe(expected)
        // 
        // `actual` is the actual value (like here, you often call a function
        // to be tested, ie. `is_operator("+")`)
        //
        // `toBe` is a "matcher" that checks if the actual value is equal to 
        // the expected value (in this case, `true`)
        //
        // so, this test checks if `is_operator("+")` returns `true`
        //
        // (note: you can also use `toBeTruthy` or `toBeFalsy` to check if the
        // actual value is truthy or falsy)
        //
        // 
        expect(is_operator("+")).toBe(true);
    });

    it("should return false if the input is not an operator", () => {
        expect(is_operator("a")).toBe(false);
    });

    // it("should return false if the input is an empty string", () => {
    //     expect(is_operator("")).toBe(false);
    // });

    it("should return false if the input is a number", () => {
        expect(is_operator("1")).toBe(false);
    });
});

