// vitest is a test runner for javascript
import { describe, it, expect } from "vitest";

// import the calculate.js file
import { calculate } from "./calculate";

// describe is a function that groups tests together
describe("calculate", () => {

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