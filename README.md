 backstracks'
cWriter (Continous Writer) "Single Page Application"

cWriter is quickly becoming a text interpretation application, meaning that every pointed word is the subject of interpretation but there are issues when pointing to text, in defining its containing box.

Why the issues actually exist, could be resolved in part by defining specifically a box, width and height, and containing text, but the code over-head is considerable (if the intention, as is my intention in developing cWriter, a client-side application, automating writing a book and resulting site), since the application is being developed for every device.

Speeding things up with "contenteditable" and saving text to "localStorage" with every keypress is good, as is text selection and target a specific word, anywhere on the Web page, (eliminating all textarea and input mark-up), a canvas will measure text, yet the canvas routine leaves a lot to be desired. 

What developers, don't talk much about, any longer, when it comes to text, is proportional spacing. Back in the day, IBM called character width Picas. For example, a norrower character would be 2 picas, most were 3, and wider characters, such as an "m" or "w", depending on the font and proportional spacing, would be 5 picas.

So, calculating a range of applied characters and their font width, so that selected range is defined as equal to a "pageX", tells us if the click is, althought within the binding box of the text, will not tell us if the click is outside of the range of the actual text. Getting the range of the text with "getRangeAt(0)" and its "startOffset" will give us the number of characters, but pageX cannot be calculated based on the range of characters.

The point of the exercise of eliminating HTML, such as no forms, which I did not think was possible, no direct links, is possibly because, from an evolutionary point of view, we have been looking for a while about, what's new, and I tend to think we are there with text interpretation, which might be about voice applications. We cannot say to end user, "You have clicked input. What do you want to do with input?" or "What type of input do you want?", it's more like what type of instruction might help with the text.

To me, at 60, I'd say, we are in the New World, we just have to apply the technology.
