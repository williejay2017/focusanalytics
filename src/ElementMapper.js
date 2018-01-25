import {Coordinate} from './MapAssist.js';

class ElementMapper {
    //Figured I would go through and comment this for you Mike.
    static elementMap;

    //This method builds an element map for each url on the first users first visit
    static elemMapBuilder() {
        ElementMapper.elementMap = new Map();
        //gathering a list of all elements
        var elemList = document.getElementsByTagName("*");
        //constructing a map to hold the elementmap for a specific url
        for (var i = 0; i < elemList.length; ++i) {
            ElementMapper.elemLoader(elemList[i], ElementMapper.elementMap);
        }
    }

    //assigning the correct coordinates to each element and loading it up in the element map
    static elemLoader(element, elementMap) {
        //getting an object with the elements top bottom left right attributes
        var rect = element.getBoundingClientRect();
        //adjusting each number to account for any scroll, margin, or border (offset takes care of padding)
        //unary operator "+" converts all strings to numerical values
        var top = rect.top + window.scrollY - +window.getComputedStyle(element, null)
            .getPropertyValue("margin-top")[0] - +window.getComputedStyle(element, null)
                .getPropertyValue("border-top")[0];
                
        var left = rect.left - window.scrollX + +window.getComputedStyle(element, null)
            .getPropertyValue("margin-left")[0] + +window.getComputedStyle(element, null)
                .getPropertyValue("border-left")[0];
                
        //maps the element to the above constructed coordinates
        elementMap.set([element.tagName, element.className, element.id,element.parentElement].toString(), new Coordinate(top, left)) //, bottom, right))

    }

}

export default ElementMapper;