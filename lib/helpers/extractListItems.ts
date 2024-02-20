export function extractListItems(htmlString: string): string[] {
    // Create a new DOMParser instance
    const parser: DOMParser = new DOMParser();
    // Parse the HTML string into a document object
    const doc: Document = parser.parseFromString(htmlString, 'text/html');
    // Select all <li> elements from the parsed document
    const listItems: NodeListOf<HTMLLIElement> = doc.querySelectorAll('ol > li');
    // Extract the text content of each <li> element and add it to an array
    const textArray: string[] = Array.from(listItems).map((li, index): string => {
        return `${li.textContent}`; // Prepend the item number
    });
    return textArray;
}
