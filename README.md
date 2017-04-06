backstracks'
cWriter (Continous Writer) "Single Page Application"

cWriter is quickly becoming a text interpretation application, meaning that every pointed word is the subject of interpretation but there are issues when pointing to text, in defining its containing box.

Why the issues actually exist, could be resolved in part by defining specifically a box, width and height, and containing text, but the code over-head is considerable (if the intention, as is my intention in developing cWriter, a client-side application, automating writing a book and resulting site), since the application is being developed for every device.

Speeding things up with "contenteditable" and saving text to "localStorage" with every keypress is good, as is text selection and target a specific word, anywhere on the Web page, (eliminating all textarea and input mark-up), a canvas will measure text, yet the canvas routine leaves a lot to be desired. 

What developers, don't talk much about, any longer, when it comes to text, is proportional spacing. Back in the day, IBM called character width Picas. For example, a norrower character would be 2 picas, most were 3, and wider characters, such as an "m" or "w", depending on the font and proportional spacing, would be 5 picas.

So, calculating a range of applied characters and their font width, so that selected range is defined as equal to a "pageX", tells us if the click is, althought within the binding box of the text, will not tell us if the click is outside of the range of the actual text.
