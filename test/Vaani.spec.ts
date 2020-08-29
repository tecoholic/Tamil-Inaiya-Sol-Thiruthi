import Vaani from "../src/Vaani";

let v:Vaani;

const setupVaani = () => { v = new Vaani(); };

beforeAll(() => {
    return setupVaani();
});


test("Vaani", () => {
    expect(v.deri.length).toBeGreaterThan(10);
});

test("Vanni.tranlate()", () => {
    expect(v.tranlate('non-existant')).toEqual("");
    expect(v.tranlate("㚱")).toEqual("+ நான்காம் வேற்றுமை(கு)");
});

// NO idea what the function is supposed to return. The test is just to
// ensure that the function is working and that it is returning something
test("Vaan.checkroot", () => {
    expect(v.checkroot("ஓடிப்போக")).toEqual(["ஓடிப்போதல்", " "]);
    expect(v.checkroot("வள்ளல்")).toEqual(["வள்ளல்", " "]);
    expect(v.checkroot("english")).toEqual(["tword", ""]);
});