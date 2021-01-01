describe("test", function() {
    // // A test suite begins with a call to the global Jasmine function describe with two parameters: a string and a function.
    beforeEach(function() {
        play = new startGame()
    });
    
    describe("Match user and game arrays", function() {
        // // Specs are defined by calling the global Jasmine function it
        it("should exist", function() {
            // Expectations are built with the function expect which takes a value, called the actual.
            // Each matcher implements a boolean comparison between the actual value and the expected value.
            // Any matcher can evaluate to a negative assertion by chaining the call to expect with a not before calling the matcher.
            expect(gameArray).toBeDefined();
        });
          it("should call levelUp", function() {
        expect(gameArray).toMatch(/bar/)
expect(message).toMatch('bar')
 

        
        });
    });
// });