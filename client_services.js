$(document).ready(function(){
  nodeCollection.init(data);
  treeView.init($('.tree'), nodeCollection.nodes);
});

function NodeView(node) {
  this.model = node;
  this.$el = $("<li class='node'>" + this.model.title + "</li>");
  this.listen();
  this.isOpen = false;
}

NodeView.prototype.listen = function() {
  this.$el.on('click', this.renderChildren.bind(this));
}

NodeView.prototype.renderChildren = function(e) {
  e.stopPropagation();
  if (this.isOpen) {
    this.$el.children('ul').remove();
    this.isOpen = false;
  } else {
    if (this.model.childNodes.length > 0) {
      this.$el.append("<ul></ul>");
      for (var i in this.model.childNodes) {
        console.log(this.model.childNodes[i])
        var nodeView = new NodeView(this.model.childNodes[i]);
        this.$el.children("ul").append(nodeView.render())
      }
      this.isOpen = true;
    } else {

    }
  }
}

NodeView.prototype.render = function() {
  return this.$el;
}

var treeView = {
  init: function(el, collection) {
    this.$el = el;
    this.collection = collection;
    this.render();
  },

  render: function() {
    for (var i in this.collection) {
      this.$el.append(new NodeView(this.collection[i]).render());
    }
  },

  renderNode: function(node) {
    return "<li class='node' data-id=" + node.id + ">" + node.title + "</li>"
  }
}

var nodeCollection = {
  nodes: [],

  init: function(data) {
    this.load(data);
  },

  //TODO: refactor into one recursive load method
  load: function(data) {
    for (var i in data.topLevelItems) {
      var parent = new Node(data.topLevelItems[i], data.items[data.topLevelItems[i]]);
      this.nodes.push(parent);
      this.buildChildren(parent, data)
    }
  },

  buildChildren: function(parent, data) {
    for (var i in parent.childIds) {
      var id = parent.childIds[i];
      if (data.items[id]) {
        var child = new Node(id, data.items[id]);
        parent.childNodes.push(child);
        this.buildChildren(child, data);
      }
    }
  },
}

function Node(id, data) {
  this.id          = id;
  this.childNodes  = [];
  this.title       = data.title;
  this.description = data.description || "";
  this.parentId    = data.parent;
  this.childIds    = data.children || [];
}

var data = {
  "topLevelItems": ["1", "2", "3", "4"],

  "items": {

    "1": {
      "parent": null,
      "title": "Books",
      "children": ["11", "12", "13"]
    },
      "11": {
        "parent": "1",
        "title": "Fiction",
        "children": ["111", "112", "113"]
      },
        "111": {
          "parent": "11",
          "title": "Classic",
          "children": ["1111", "1112"]
        },
          "1111": {
            "parent": "111",
            "title": "Copyrighted"
          },
          "1112": {
            "parent": "111",
            "title": "Public Domain"
          },
        "112": {
          "parent": "11",
          "title": "Science Fiction"
        },
        "113": {
          "parent": "11",
          "title": "Thriller"
        },
      "12": {
        "parent": "1",
        "title": "Non-Fiction",
        "children": ["121", "122", "123"]
      },
        "121": {
          "parent": "12",
          "title": "How To",
          "description": "See also: 231, 122."
        },
        "122": {
          "parent": "12",
          "title": "Reference"
        },
        "123": {
          "parent": "12",
          "title": "True Crime"
        },

      "13": {
        "parent": "1",
        "title": "Other"
      },

    "2": {
      "parent": null,
      "title": "Cars",
      "children": ["21", "22", "23"]
    },
      "21": {
        "parent": "2",
        "title": "Sedans",
        "children": ["211", "212"]
      },
        "211": {
          "parent": "21",
          "title": "Accord"
        },
        "212": {
          "parent": "21",
          "title": "Camry"
        },
      "22": {
        "parent": "2",
        "title": "Trucks"
      },
      "23": {
        "parent": "2",
        "title": "Other",
        "children": ["231", "232"]
      },
        "231": {
          "parent": "21",
          "title": "Repair manuals",
          "description": "See also: 121."
        },
        "232": {
          "parent": "21",
          "title": "Tools",
          "description": "See also: 41."
        },

    "3": {
      "parent": null,
      "title": "Trains",
      "children": ["31", "32"]
    },
      "31": {
        "parent": "3",
        "title": "Big ones"
      },
      "32": {
        "parent": "3",
        "title": "Small ones"
      },

    "4": {
      "parent": null,
      "title": "Tools",
      "children": ["41", "42", "43"]
    },
      "41": {
        "parent": "4",
        "title": "Automotive",
        "children": ["411", "412", "413"]
      },
        "411": {
          "parent": "41",
          "title": "Other",
          "children": ["4111", "4112", "41113"]
        },
          "4111": {
            "parent": "411",
            "title": "Widgets",
            "children": ["41111", "41112"]
          },
            "41111": {
              "parent": "4111",
              "title": "Wamwozzles"
            },
            "41112": {
              "parent": "4111",
              "title": "Wunkles",
              "description": "Check out 41111, too."
            },
          "4112": {
            "parent": "411",
            "title": "Whatchamahoozers"
          },
          "4113": {
            "parent": "411",
            "title": "Beeps"
          },
        "412": {
          "parent": "41",
          "title": "Spanners"
        },
        "413": {
          "parent": "41",
          "title": "Wrenches"
        },
      "42": {
        "parent": "4",
        "title": "Metal"
      },
      "43": {
        "parent": "4",
        "title": "Woodworking"
      }

  }
}
