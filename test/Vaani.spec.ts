import Vaani from "../src/Vaani";

test("Vaani", () => {
    let v = new Vaani();
    expect(v.deri.length).toBeGreaterThan(10);
});