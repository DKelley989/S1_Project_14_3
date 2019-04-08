"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 12
   Case Problem 3

   Author: Dylan Kelley
   Date:   4.8.19

   Filename: js_tree.js

   Global Variables:
   nodeCount
      Running count of all nodes in the source document
   elementCount
      Running count of all element nodes in the source document
   textCount
      Running count of all text nodes in the source document
   wsCount
      Running count of all white space text nodes in the source document


   Functions List:
   makeTree() 
      Sets up and places the node tree within the HTML document and
      displays the node counts from the document

   makeBranches(treeNode, nestedList)
      Makes a list item or an ordered list based on the contents and type
      of node from the sourceNode parameter and then appends that list
      item or ordered list to nestedList. The function recursively calls 
      itself to navigate throught the node tree of the source document.

   isWhiteSpaceNode(tString)
      Returns true if tString represents the text of a white space text
      node and false if it doesn't
*/

// Var: Initial variables.
var nodeCount = 0;
var elemCount = 0;
var textCount = 0;
var wsCount = 0;

/// Event listener to run the makeTree() function when the page loads.
window.addEventListener('load', makeTree);

// Func: Function to create the node tree for the source article on the page. It sets up and places the node tree within the HTML document and displays the node counts from the document.
function makeTree() {

      // Var: Creates an document fragment of an aside element with the ID of treeBox and a h1 heading element nested within.
      var aside = document.createDocumentFragment("<aside id=”treeBox”> <h1>Node Tree</h1></aside>");

      /// Appends the document fragment to the section element with the ID “main”.
      aside.appendChild(document.getElementById("main"));

      // Var: Contains the initial ordered list element node that will be the foundation of the node tree.
      var nodeList = document.getElementsByTagName("ol");

      /// Appends the ordered list element node to the aside element fragment.
      aside.appendChild(nodeList);

      // Var: Creates a node tree will be based on the contents of the elements matching the CSS selector "#main article".
      var sourceArticle = document.querySelectorAll("#main article");

      /// Calls the makeBranches() function using the sourceArticle and nodeList variables as parameter values.
      makeBranches(sourceArticle, nodeList);

      document.getElementById("totalNodes").innerHTML = nodeCount;

      document.getElementById("elemNodes").innerHTML = elemCount;

      document.getElementById("textNodes").innerHTML = textCount;

      document.getElementById("wsNodes").innerHTML = wsCount;
}

// Func: Updates the contents of the node tree and the count of the different global variables, and appends node branches to the node tree diagram.
function makeBranches(treeNode, nestedList) {

      /// Increases the value of the nodeCount variable by 1.
      nodeCount++;

      // Var: Creates a list item HTML fragment and stores it in the liElem variable.
      var liElem = document.createElement("li");
      liElem.textContent = "+--";

      var spanElem = document.createElement("span");

      liElem.appendChild(spanElem);

      nestedList.appendChild(liElem);

      // If: Checks if treeNode represents an element node.
      if (treeNode.nodeType === Node.ELEMENT_NODE) {

            /// Increases the value of the elemCount variable by 1.
            elemCount++

            /// Adds the "class" attribute to the spanElem node, setting its value to "elementNode".
            spanElem.setAttribute("class", "elementNode");

            /// Appends the treeNode text string to the spanElem node.
            spanElem.textContent = "<" + treeNode + ">";
      }
      // Else: If treeNode represents a text node.
      else {
            /// Increases the textCount variable by 1.
            textCount++;

            // Var: Declares the variable textString equal to the value of the text node.
            var textString = treeNode;

            // If: Checks if the isWhiteSpaceNode() function using textString as the parameter value returns the value true.
            if (isWhiteSpaceNode(textString) === true) {

                  /// Increase the value of the wsCount variable by 1.
                  wsCount++;

                  /// Changes the "class" attribute of the spanElem node to "whiteSpaceNode".
                  spanElem.setAttribute("class", "whiteSpaceNode");

                  /// Append the text string “#text” to the spanElem node.
                  spanElem.innerText += "#text";
            }

            // If: Checks if the isWhiteSpaceNode() function returns the value false.
            if (isWhiteSpaceNode(textString) === false) {

                  /// Changes the "class" attribute of the spanElem node to "textNode".
                  spanElem.setAttribute("class", "textNode");

                  /// Appends the textString variable to the spanElem node.
                  spanElem.innerText += textString.value;
            }

            // If: Tests whether the number of child nodes of treeNode is greater than zero.
            if (treeNode.childNodes.value > 0) {

                  // Var: Creates an ordered list as an element node stored in the newList variable.
                  var newList = document.createElement("ol");

                  /// Sets the inner text newList to "|".
                  newList.innerText = "|";

                  /// Appends newList to the nestedList element node.
                  nestedList.appendChild(newList);

                  // For: Loops through the child nodes of treeNode using n to represent each child node. 
                  for (var n = 0; n < treeNode.childNodes.length; n++) {

                        /// Calls the makeBranches() function using n and newList as the parameter values.
                        makeBranches(n, newList);
                  }
            }
      }
}

// Func: Returns true if tString represents the text of a white space text node and false if it doesn't.
function isWhiteSpaceNode(tString) {
      return !(/[^\t\n\r ]/.test(tString));
}