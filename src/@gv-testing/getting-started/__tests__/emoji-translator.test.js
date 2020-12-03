const { emojiTranslator, emojiTranslatorV2 } = require("../emoji-translator");

describe('Test Emoji Translator', () => {

	test('should replace :)', () => {
		expect(emojiTranslator(':)')).toBe('😊');
	});

	test('should replace Hello :)', () => {
		expect(emojiTranslator('Hello :)')).toBe('Hello 😊');
	});

});
