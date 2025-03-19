// vitest is a test runner for javascript
import { describe, it, expect } from "vitest";

// import the calculate.js file
import { calculate } from "./calculate";

// describe is a function that groups tests together
describe("order_of_operations", () => {

    it("should multiply first", () => {
        expect(calculate("3+2*4")).toBe(11);
    });

    it("should divide first", () => {
        expect(calculate("2+6/3")).toBe(4);
    });

    it("should multiply when no ops between number and square", () => {
        expect(calculate("3√9")).toBe(9);
    });
    it("should do calculations from left to right, divide and multiply", () => {
        expect(calculate("3/3*3*3")).toBe(9);
    })
    it("should do calculations from left to right, plus and minus", () => {
        expect(calculate("10-3+4")).toBe(11);
    })
});

describe("large_and_small_numbers", () => {
    it("should be able to use exponential numbers when big", () => {
        expect(calculate("4,0000e+7*3")).toBe(120000000)
    })
    it("should be able to use exponential numbers when small", () => {
        expect(calculate("4,0000e-7*3")).toBe(0.00000012)
    })
})

// Dont think this will work
describe("divide by zero", () => {
    it("should occur Error when dividing by zero", () => {
        expect(calculate("1/0")).toBe("Error")
    })
})

describe("use_of_squareroot", () => {
    it("should remove one * when using *", () => {
        expect(calculate("2*√9")).toBe(6)
    })
    it("should add * when not using *" () => {
        expect(calculate("2√9")).toBe(6)
    })
})

describe("use negative numbers", () => {
    it("should be able to start expression with negative number", () => {
        expect(calculate("-3+6")).toBe(3)
    })

    it("should be able to add negative number in expression", () => {
        expect(calculate("6+-2")).toBe(-4)
    })
    
    it("should be able to multiply with negative number in expression", () => {
        expect(calculate("3*-2")).toBe(-6)
    })

    it("should be able to divide with negative number in expression", () => {
        expect(calculate("6/-2")).toBe(-3)
    })
})