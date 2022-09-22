const parse = require("../textProcessor/text_parser/parser").parse

jest.mock('../itemCategoriser/itemCategoriser');

/**
 * Test for parsing scanned text
 */
describe('Parser', () => {
    var receipt = 'Torpedos\nDate : 2022-05-27 12:52:55\n1 CHICKEN WRAP 55,00 55,00\nNumber of items : 1.00\nExclusive Invoice Total : 55,00\nVAT on Sale : 0.00\nInclusive Invoice Total : 85,00\nCard Amount : 55.00\nChange : 0.00';

    test('Should parse receipt correctly', async () => {
        const scannedContent = await parse(receipt);
        const actualResult = [
            "2022/05/27",
            "torpedos",
            [
                {
                    "item": "chicken wrap ",
                    "price": "55.00",
                    "quantity": "1",
                    "type": undefined
                }
            ],
            1,
            55
        ]
        expect(scannedContent).toEqual(actualResult)
    })
})  