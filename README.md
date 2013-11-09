To do:
=======
Rework using handlebars.js instead of jQuery

Objective
---------
Write a player ranking page for a StarCraft tournament community. The focus of the page is a large data table that displays statistics about tournament players, and provide tools for sorting and filtering the data. You can use the provided dummy data.

Use Underscore to perform any data manipulation (mapping, filtering, counting, etc). It will also come in really handy for generating the statistics panel on Step 3.

#####Skills
* HTML Table
* DOM manipulation
* Design/Usability
* Functional Programming (underscore)
* Higher Order Programming
* Resources
* Underscore
* dummy data

Requirements
------------
1. Pagination
2. Basic Pagination Control
3. 20 players per page
4. next, previous, first, and last buttons in addition to each number
5. Dynamic Labels
	* If sorted by name: [ab-be] [bi-da] ...
	* games played: [1000+] [999-600] [599-300] ...
6. Filter
7. Add a form that allows the user to filter the table data by different fields, such as name and games played. Decide which UI component (text input, dropdown, slider, etc) makes sense for each field.

#####Statistics
* Render a panel above the table that displays overall statistics: total players,
games played, race popularity

Bonus I
-------
Implement the exercise using a data table Javascript library such as SlickGrid, DataTables, or another library of your choice.


Bonus II - **TO-DO**
----------------
Replace underscore with your own library that defines map, filter, etc. In addition, implement the following methods. Use the Underscore documentation to figure out how each method is intended to work (but avoid looking at the source).

* each
* map
* filter
* reduce
* find
* every
* some
* contains
* pluck
* max
* min
* groupBy
* countBy
* flatten
* union
* intersection
* uniq
* zip
* object
* range
