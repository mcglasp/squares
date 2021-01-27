Milestone 2 project



**STRATEGY**

The purpose of this project is to create a fun game and accessible game. The intended user — or player — is a smartphone user looking to occupy themselves in those in those moments in the day in which we have a few snatched minutes to kill. The quantifiable value to the owner of any game app would be in the potential to attract advertising were it to become a popular game, thereby bringing in income and funding further projects. In this specific case, being a first-time builder of a Javascript game, it's value is less quantifiable, but no less valid: constructing a basic game in Javascript gives me invaluable experience of coding and a base from which I can develop more complicated games and apps that are outside of the scope of this project.

**User Stories**

* As a working 25-year old I spend a lot of time on public transport... or waiting for it to turn up. I'd like something to occupy me whilst I do that.

* As a parent of teenagers, I spend a lot my time running errands; waiting outside friends' houses to pick them up, for example. I always have my phone with me, so something I can do while I'm waiting would be great!

* As a young teen with an iPhone I'm looking for ways to avoid questions from my parents, and games that I can load instantly are a good way to look busy.

Essentially, this game aims to be a five-minute boredom-buster. As the user stories illustrate, there are many situations in everyday life that call for a few moments mindless escapism — queuing at the Post Office, for example — and this project aims to meet that need. It should be extremely quick to load, effortless to learn, and with a difficulty increase that does not frustrate, while still offering a developing level of challenge.

Above all it should be designed with a strictly mobile-first approach. It will, of course, be playable by iPad and laptop/desktop users, but it is expected that game play will be overwhelmingly via handheld devices in the situations outlined above.

There are a great many competitors in the market, of course, the most obvious among them being Two Dots:

Two Dots

An addictive puzzle game, Two Dots requires the player to match adjacent sequences of coloured dots to clear them from the board and meet a round-specific challenge. It's extremely accesible, with a gentle learning curve offers quick-to-access gameplay. However, as you progress, it does become significantly more challenging and strategy-based, making it less suitable for 5-minute, ad-hoc gameplay.

![Screenshot of Two Dots game](/readme-assets/two-dots.jpeg)

**SCOPE**

My project does not aim to compete with established apps as are mentioned above, which offer significant and deep levels of gameplay, building on years of development. The aim with this project is to create a simple puzzle game which could form the basis of a far larger development project in future. My game will work well, entertain the user, give the user what they're looking for (easy and quick access to simple gameplay), be simple to interact with and visually appealling. The feature list will therefore necessarily be far more conservative than a website project:

* Possible game features:

Simply puzzle game
Progression through levels based on success, with increasing difficulty
Top-score storage/player-acheivement memory
Touchscreen interactivity
Desktop (mouse/trackpad) interactivity
Desktop (keyboard) interactivity
Level-dependent design elements
Global scoreboard
Interaction with other players
Live multiplayer challenges
Bonus rounds (dependent on level acheived, or seasonal)

* Site/homepage features:
Developer contact information
Header/footer
Links to sister sites/games

![Feature matrix](/readme-assets/feature-matrix.png)

![Feasibility graph](/readme-assets/feasibility-graph.png)

We can see here that the majority of these features are important enough to be included in a first release or minimum viable product. On the surface that may seem excessive, but actually the majority of those features are aspects of the core game itself that are essential to satisfying gameplay and would be expected by any user.

Mid-development feature review update, January 2021: having spent a significant amount of time developing the game I have reconsidered the feasibility of features 'f' and 'g'. 
Feature 'f' is keyboard interactivity for the desktop game. Building this into the game's functionality is eminently possible, but would unecessarily complicate my code at this stage, given my current skill level. Reflecting on the fact this is is primarily intended to be a game played on a touchscreen device — the mobile-first approach — I have decided that it would be entirely acceptable to leave this feature to a further development stage.
Feature 'g' is, again, entirely possible, but is less critical to the MVP (minimum viable product) than other elements. It would certainly be fun to include and would be beneficial from a gameplay perspective, but is, again, an added complication for a first release.

**STRUCTURE**

To properly discuss the structure of this app we need to consider its basic functionality — essentially, the rules! Presented to the user are a selection of shapes (dots, squares or icons, for example). These flash in a random sequence and the user is required to match that sequence. In the early stages of the game there will be very few 'flashes', perhaps just starting with 2, and that will increase as gameplay goes on. Multiple different parameters could be changed to affect gameplay. For example, the number of flashes in a given sequence, the speed of the flashes and time between each, the visibility of the icons (or dots, squares) and the time given for the user to complete their sequence matching after the sequence of generated flashes has completed.

Given the simplicity of this game, and the simple aims of the app as a whole, the structure is similarly straightforward. It would be confusing and unecessary to add pages or multiple scrollable elements to the mobile or desktop site. The aim is to present the user with every aviable element in the one, initial view. Everything they need to interact with or to understand will be available to them on page load without further clicking or scrolling.

**SKELETON**

Initial wireframes:

![Initial mobile-view wireframe](/readme-assets/mobile-initial.png)

The mobile version will take priority as this is far more likely to be played via this medium. Two layouts of shapes (in this case, dots!) will be presented on screen. The top will be the game display grid, and the lower grid will be for user input; for the player to match the sequence. Separating the game display from the user input grid has two advantages: 
- firstly, as the player rises through the levels, the number and speed of 'flashes' increases. This allows the user to match the sequence on their own grid while the top grid is still in the process of displaying the sequence to be matched above. This would not be necessary in early levels, but may become a necessary strategy as difficult increases. Were there to be just one single grid, the user would be obscuring the still-displaying game sequence.
- secondly, a single grid would take up far more screen space. It is expected that a user will hold their device in one hand and input the sequence with their thumb. On a number of popular devices (the iPhone X and 'plus' versions of the 7 & 8, for example, plus a number of the larger-screened Android devices) it is not possible for the user to easily reach the upper portion of the screen with their thumb, without the risk of dropping the device. Indeed, 'reachability' is now a native feature of many touchscreen operating systems. A single, larger, gameplay grid would suffer from the problems addressed by such reachability features, but it would neither be practical nor appropriate to attempt to implement such a feature in this game. A far better solution is to separate the game into a read-only grid at the top, and a user-input grid at the bottom, within easy reach of the player's thumb!

![Initial desktop-view wireframe](/readme-assets/desktop-initial.png)

The desktop version, as can be seen in the wireframe, converts to a landscape view, with the game grid on the left and the player grid on the right. This is far more appropriate a layout for a desktop or laptop screen and the left-right information flow makes sense to the likely Western userbase of the app.

Updated wireframes:

A few additions and changes were made to the structure of both mobile and desktop versions after initial development.
![Updated mobile-view wireframe](/readme-assets/mobile-updated.png)
![Updated desktop-view wireframe](/readme-assets/desktop-updated.png)

- The 'dots' became squares. This was a design decision and is discussed in greater detail in the Surface section.
- A start button and permanently displayed instructions were added. Initially the game started on page refresh, which was clunky UX, to say the least!
- Both versions were given subtle header to display the game's name, rather than incorporating it into the design of the game grid container, which was becoming cluttered with the addition of the aforementioned instructional elements.

**SURFACE**

I played with a few design ideas before settling on the final concept. I started with simple red-on-white circles — hence the working title 'Sudden Dots' and even experimented with a grid of appearing and disappearing Fontawesome icons. Eventually, however, I took inspiration from music technology and based the design on the popular and iconic designs of MIDI controllers for digital audio workstations. Inspiration for this was taken from hardware such as Novation's Launchpad or Akai's control surfaces. The 'glow' you get from the pads worked well against the black background and the grid layout was precisely what was needed for this game.

Novation Launchpad:

![Novation Launchpad](/readme-assets/novation-launchpad.png) 

Game Pad Design:

![Game pad design](/readme-assets/game-pad.png)

Sounds: the implementation of sounds risked becoming an afterthought in this project; in initial development I felt it was more of a 'nice-to-have' than a top priority. However, when testing the game I came to realise that it would be hugely beneficial from a UX/gameplay perspective. specifically, it would help to distinguish between 'flashes' in later levels where the flashes to closer together and the number of them had increased sufficiently to be challenging to recall. Again, inspiration was taken from the aforementioned MIDI control surfaces for the sound design. Although by their nature, these devices do not make sounds themselves, are commissioned the sort of sounds both familiar to users of such devices, and auditorily respresentative of the visual effect, with it's glowing colours and fast, ease-in-out transition. For the user grid I commissioned a slightly more 'musical' version of the sound of someone tapping the square pads of a MIDI control surface.
Testing notes:

Expected behaviour: speed of appearance of flashes would vary, but still display consequtively. Found behaviour: very occassionally the timings would 'leapfrog' each other cause flashes to appear in the wrong order, thereby making it impossible for the user to correctly match the pattern through skill rather than luck. Update: made the decision to remove the variable-length flashes feature as it created an unecessary complication that was not matched by the benefits of retaining the feature.

Expected behaviour: pressing play button should invoke a new game everytime. Found behaviour: Very strange behaviour - multiple flashes and speeds. Score and level not clearing. Update: It is actually adding the level values of the previous game to the newgame, thereby creating odd behaviour - multiple dots, strange speeds, etc. I went through the entire code more carefully and identified a large number of variables and functions that needed resetting within the newGame function.

Expected behaviour: Timer should call endGame() after a certain period of time has elapsed. Found behaviour: Not able to create a timer that properly controlled the outcome of the game. Was attempting to use setTimeout. Initially using a function that changed a variable (timesUp) from false to true; if the variable was true, then endGame should be called, but this was not properly invoking endGame at the expected time, or at all in some cases. Switched to setInterval, which worked much better!  

Expected behaviour: Two toggles should control the light theme option and hard mode option respectively. It is excepted that these will operate entirely independently from one another. For example, I should be able to select the light theme and hard mode, then change my mind and switch off light theme while remaining in hard mode. Found behaviour: the hard mode toggle calls the light theme function as well as hard mode. Update: closer inspection of the code revealed that the jquery function referenced both toggles, which had mistakenly been given the same class. Once the classes were differentiated from each other, this worked correctly. 

Expected behaviour: Greyed-out cells (greyed as a result of endGame being called) should 'light up' when a new game is started. Found behaviour: Similarly to the above, it was found that the part of the endGame function that greys the cells when the user loses the game, as well as the startGame section which 'lights them up' again, was not functioning correctly in hard mode. At endGame, the cells would be greyed out, but would then not light again, remaining grey throughout the new game. The solution was to change the way that the greying function operated. Rather than using the css() jQuery function, I updated the function to use the add() and remove() functions.

Expected behaviour: endGame should be called if users click too many times, even if their click pattern has included the given game array. Found behaviour: Game only registers the correct user clicks array and does not penalise player for unnecessary extra clicks. Update: further testing shows that the game is registering the clicks against each newly generated random array, but this results in somewhat unsatisfactory behaviour form a UX point-of-view. Specifically, if the user 'over-clicks', the game moves on to the next round, registering the last of the user's clicks against the new round and newly generated array. This results in endGame being called before the user has even entered the full number of clicks, which gives the impression of being a bug.

**Responsiveness Review**

Much of the work on responsiveness with regard to the front-end design of this project was done using Chrome's Developer Tools. A considerable amount of work went into adjusting the design to work across all popular platforms, including iPhone, iPad, desktop, laptop and a number of Android devices. These were working all working well on the Chrome Developer Tools, but when double-checked using the websites responsinator.com and ami.responsivedesign.is both showed that the game pads were disappearing below the initial viewport on a number of devices, but were appearing too close to the top of desktop and laptop screens.

