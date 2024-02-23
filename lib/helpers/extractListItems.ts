import { parse } from 'node-html-parser';


export function extractListItems(htmlString: string): string[] {


    console.log("htmlString", htmlString)
    const doc = parse(htmlString);
    console.log("doc", doc)
    // Select all <li> elements from the parsed document
    const listItems = doc.querySelectorAll('ol > li');
    // Extract the text content of each <li> element and add it to an array
    const textArray: string[] = Array.from(listItems).map((li, index): string => {
        return `${li.textContent}`; // Prepend the item number
    });
    return textArray;
}
