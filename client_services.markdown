Client Services Code Exercise
=============================

Using HTML, CSS, and JavaScript, you will create a tool that allows a user to
drill down through a tree of categories and select a final category. The
taxonomy data is represented as a tree of categories. A category can have any
number of children. A category with no children is considered a selectable
category (categories with children should not be selectable).

The taxonomy data is located at https://gist.github.com/5527862

The most basic UI would be a series of `<select>` elements that progressively
reveal children categories, but feel free to consider making it easier to use
with a better UI.

At a minimum, the tool should:

* Allow the user to drill down through the categories (without displaying the
  entire hierarchy at once) and select a single leaf node.
  
  * When the user selects a leaf node, a text input field should be populated
    with the full path of the leaf node. Eg. "Books > Fiction > Science Fiction"

* Allow the user to backtrack back up the hierarchy and select a different
  category if they are not satisfied with their current selection.

Use any open source libraries / frameworks that you want.

Bonus points
------------

* Provide a globally-scoped JS method that allows me to select a category via
  JavaScript: "setCategory('112')" This would potentially be used to pre-select
  a category on page load.

* Display the "description" information for the currently-selected category (at
  each depth).

* Link the item numbers in the "description" fields so that when I select one, I
  am automatically navigated to that category.
