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
        expect(calculate("4,0000e+7*3")).toBe(1.2e+8)
    })

    it("should be able to use exponential numbers when small", () => {
        expect(calculate("4,0000e-7*3")).toBe(1.2e-6)
    })

    it("should be able to use exponential numbers when really big", () => {
        expect(calculate("4,0e+31*3")).toBe(1.2e+32)
    })

    it("should be able to use exponential numbers when really small", () => {
        expect(calculate("4,0000e-31*3")).toBe(1.2e-30)
    })

    it("should be able to use negative exponential numbers when big", () => {
        expect(calculate("-4,0000e+7*2")).toBe(-8e7)
    })

    it("should be able to use negative exponential numbers when small", () => {
        expect(calculate("-4,0000e-7*2")).toBe(-8e-7)
    })
})

describe("divide by zero", () => {
    it("should throw an Error when dividing by zero", () => {
        expect(() => {
            calculate("1/0")
        }).toThrow("divide by zero")
    })
})

describe("use_of_squareroot", () => {
    it("should remove * when squareroot at start", () => {
        expect(calculate("√9")).toBe(3)
    })

    it("should remove one * when using *", () => {
        expect(calculate("2*√9")).toBe(6)
    })

    it("should add * when not using *", () => {
        expect(calculate("2√9")).toBe(6)
    })

    it("should be possible to have multiple √ after eachother", () => {
        expect(calculate("√√81")).toBe(3)
    })
})

describe("use negative numbers", () => {
    it("should be able to start expression with negative number", () => {
        expect(calculate("-3+6")).toBe(3)
    })

    it("should be able to add negative number in expression", () => {
        expect(calculate("6+-2")).toBe(4)
    })
    
    it("should be able to multiply with negative number in expression", () => {
        expect(calculate("3*-2")).toBe(-6)
    })

    it("should be able to divide with negative number in expression", () => {
        expect(calculate("6/-2")).toBe(-3)
    })
})