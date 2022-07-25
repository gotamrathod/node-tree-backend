const db = require("../../database");
const _ = require("lodash");

const Node = db.node;

exports.insertNode = async (req, res) => {
  try {
    const nodeData = req.body;
    const data = [];
    const income = await Node.create({
      name: nodeData.name,
      email: nodeData.email,
      dob: nodeData.dob,
      parent: nodeData.parent,
    });
    data.push(income);
    res.status(200).send({
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
    });
  }
};

exports.getAllNode = async (req, res) => {
  try {
    Node.findAll()
      .then((list) => {
        const data = findNodes(0, list);
        res.status(200).send({
          success: true,
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: err.message || "Something went wrong!",
        });
      });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: err.message || "Something went wrong!",
    });
  }
};

exports.deleteNodeById = async (req, res) => {
  const id = req.params.id;

  Node.findOne({
    where: { id: id },
  })
    .then((list) => {
      Node.destroy({
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            Node.update({ parent: list.parent }, { where: { parent: id } })
              .then((numb) => {
                  res.send({
                    success: true,
                    id: id,
                    nodeUpdate:numb,
                    message: "Node was deleted successfully!",
                  });
              
              })
              .catch((err) => {
                res.status(500).send({
                  success: false,
                  message: "Error updating Node with id=" + id,
                });
              });
          } else {
            res.send({
              success: false,
              message: `Cannot delete Node with id=${id}. Maybe Node was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            success: false,
            message: "Could not delete Node with id=" + id,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        success: false,
        message: "Could not delete Node with id=" + id,
      });
    });
};

const findNodes = (parentKey, items) => {
  let subItems = items.filter((word) => word.parent == parentKey);
  const result = [];
  for (let i = 0; i < subItems.length; i++) {
    let subItem = subItems[i];
    let resultItem = {
      name: subItem.name,
      id: subItem.id,
      parent: subItem.parent,
    };
    let kids = findNodes(subItem.id, items);
    if (kids.length) {
      resultItem.children = kids;
    }
    result.push(resultItem);
  }
  return result;
};
