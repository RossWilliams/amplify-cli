"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const loading_1 = require("../../loading");
const schema = loading_1.loadSchema(require.resolve('../../../test/fixtures/starwars/schema.json'));
const compiler_1 = require("../../compiler");
const codeGeneration_1 = require("../codeGeneration");
function compile(source, options = {
    mergeInFieldsFromFragmentSpreads: true,
    addTypename: true,
}) {
    const document = graphql_1.parse(source);
    return compiler_1.compileToIR(schema, document, options);
}
describe('Flow codeGeneration', () => {
    test('multiple files', () => {
        const context = compile(`
      query HeroName($episode: Episode) {
        hero(episode: $episode) {
          name
          id
        }
      }

      query SomeOther($episode: Episode) {
        hero(episode: $episode) {
          name
          ...someFragment
        }
      }

      fragment someFragment on Character {
        appearsIn
      }

      mutation ReviewMovie($episode: Episode, $review: ReviewInput) {
        createReview(episode: $episode, review: $review) {
          stars
          commentary
        }
      }
    `);
        context.operations['HeroName'].filePath = '/some/file/ComponentA.js';
        context.operations['SomeOther'].filePath = '/some/file/ComponentB.js';
        context.fragments['someFragment'].filePath = '/some/file/ComponentB.js';
        const output = codeGeneration_1.generateSource(context);
        expect(output).toBeInstanceOf(Object);
        Object.keys(output).forEach(filePath => {
            expect(filePath).toMatchSnapshot();
            expect(output[filePath]).toMatchSnapshot();
        });
    });
    test('simple hero query', () => {
        const context = compile(`
      query HeroName($episode: Episode) {
        hero(episode: $episode) {
          name
          id
        }
      }
    `);
        const output = codeGeneration_1.generateSource(context);
        expect(output).toMatchSnapshot();
    });
    test('simple mutation', () => {
        const context = compile(`
      mutation ReviewMovie($episode: Episode, $review: ReviewInput) {
        createReview(episode: $episode, review: $review) {
          stars
          commentary
        }
      }
    `);
        const output = codeGeneration_1.generateSource(context);
        expect(output).toMatchSnapshot();
    });
    test('simple fragment', () => {
        const context = compile(`
      fragment SimpleFragment on Character{
        name
      }
    `);
        const output = codeGeneration_1.generateSource(context);
        expect(output).toMatchSnapshot();
    });
    test('fragment with fragment spreads', () => {
        const context = compile(`
      fragment simpleFragment on Character {
        name
      }

      fragment anotherFragment on Character {
        id
        ...simpleFragment
      }
    `);
        const output = codeGeneration_1.generateSource(context);
        expect(output).toMatchSnapshot();
    });
    test('fragment with fragment spreads with inline fragment', () => {
        const context = compile(`
      fragment simpleFragment on Character {
        name
      }

      fragment anotherFragment on Character {
        id
        ...simpleFragment

        ... on Human {
          appearsIn
        }
      }
    `);
        const output = codeGeneration_1.generateSource(context);
        expect(output).toMatchSnapshot();
    });
    test('query with fragment spreads', () => {
        const context = compile(`
      fragment simpleFragment on Character {
        name
      }

      query HeroFragment($episode: Episode) {
        hero(episode: $episode) {
          ...simpleFragment
          id
        }
      }
    `);
        const output = codeGeneration_1.generateSource(context);
        expect(output).toMatchSnapshot();
    });
    test('inline fragment', () => {
        const context = compile(`
      query HeroInlineFragment($episode: Episode) {
        hero(episode: $episode) {
          ... on Character {
            name
          }
          id
        }
      }
    `);
        const output = codeGeneration_1.generateSource(context);
        expect(output).toMatchSnapshot();
    });
    test('inline fragment on type conditions', () => {
        const context = compile(`
      query HeroName($episode: Episode) {
        hero(episode: $episode) {
          name
          id

          ... on Human {
            homePlanet
            friends {
              name
            }
          }

          ... on Droid {
            appearsIn
          }
        }
      }
    `);
        const output = codeGeneration_1.generateSource(context);
        expect(output).toMatchSnapshot();
    });
    test('inline fragment on type conditions with differing inner fields', () => {
        const context = compile(`
      query HeroName($episode: Episode) {
        hero(episode: $episode) {
          name
          id

          ... on Human {
            homePlanet
            friends {
              name
            }
          }

          ... on Droid {
            appearsIn
            friends {
              id
            }
          }
        }
      }
    `);
        const output = codeGeneration_1.generateSource(context);
        expect(output).toMatchSnapshot();
    });
    test('fragment spreads with inline fragments', () => {
        const context = compile(`
      query HeroName($episode: Episode) {
        hero(episode: $episode) {
          name
          id
          ...humanFragment
          ...droidFragment
        }
      }

      fragment humanFragment on Human {
        homePlanet
        friends {
          ... on Human {
            name
          }

          ... on Droid {
            id
          }
        }
      }

      fragment droidFragment on Droid {
        appearsIn
      }
    `);
        const output = codeGeneration_1.generateSource(context);
        expect(output).toMatchSnapshot();
    });
});
//# sourceMappingURL=codeGeneration.js.map